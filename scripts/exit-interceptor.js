#!/usr/bin/env node

/**
 * exit-interceptor.js
 *
 * Exit interception hook for P0-4 Ralph Loops.
 * Detects premature completion and triggers reinjection.
 */

const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, '..', '.harness', 'task-state.json');
const RULES_FILE = path.join(__dirname, '..', '.harness', 'escalation-rules.json');
const REINJECTION_LOG_FILE = path.join(__dirname, '..', '.harness', 'reinjection-log.jsonl');
const ESCALATION_LOG_FILE = path.join(__dirname, '..', '.harness', 'escalation-events.jsonl');

function readJson(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function appendJsonLine(filePath, value) {
  fs.appendFileSync(filePath, `${JSON.stringify(value)}\n`);
}

function getRules() {
  return readJson(RULES_FILE, {
    thresholds: {
      max_reinjections: 3,
      escalate_after_reinjections: 2,
      consecutive_failures: 3,
      heartbeat_stale_minutes: 30
    },
    routing: {
      first_response: 'retry-same-agent',
      second_response: 'different-agent',
      final_response: 'human-review'
    }
  });
}

function getState() {
  return readJson(STATE_FILE, null);
}

function setState(state) {
  writeJson(STATE_FILE, state);
}

function differenceInMinutes(from, to = new Date()) {
  if (!from) {
    return null;
  }

  const fromDate = new Date(from);
  if (Number.isNaN(fromDate.getTime())) {
    return null;
  }

  return Math.max(0, Math.round((to.getTime() - fromDate.getTime()) / 60000));
}

function buildDiagnostic(state, rules, reason) {
  return {
    task_id: state.task_id,
    title: state.title,
    status: state.status,
    reason,
    completed_steps: state.completed_steps,
    expected_steps: state.expected_steps,
    reinjections_used: state.reinjections_used,
    max_reinjections: state.max_reinjections || rules.thresholds.max_reinjections,
    consecutive_failures: state.consecutive_failures || 0,
    last_failure: state.last_failure || null,
    last_heartbeat_at: state.last_heartbeat_at || null,
    proposed_next_action: state.reinjections_used >= rules.thresholds.escalate_after_reinjections
      ? rules.routing.final_response
      : rules.routing.first_response
  };
}

function checkPrematureExit({ mode = 'completion', taskId, expectedSteps } = {}) {
  const state = getState();
  const rules = getRules();

  if (!state) {
    return { triggered: false, state: null, rules, reason: 'no-task-state' };
  }

  if (taskId && state.task_id !== taskId) {
    return { triggered: false, state, rules, reason: 'task-id-mismatch' };
  }

  const stepsTarget = Number.isFinite(expectedSteps) ? expectedSteps : state.expected_steps || 0;
  const heartbeatAgeMinutes = differenceInMinutes(state.last_heartbeat_at);
  const incomplete = (state.completed_steps || 0) < stepsTarget || state.status === 'active' || state.status === 'blocked';
  const staleHeartbeat = heartbeatAgeMinutes !== null && heartbeatAgeMinutes > rules.thresholds.heartbeat_stale_minutes;
  const tooManyFailures = (state.consecutive_failures || 0) >= rules.thresholds.consecutive_failures;

  if (tooManyFailures) {
    return { triggered: true, state, rules, reason: 'consecutive-failures' };
  }

  if (mode === 'audit') {
    return { triggered: staleHeartbeat, state, rules, reason: staleHeartbeat ? 'stale-heartbeat' : 'task-fresh' };
  }

  return { triggered: incomplete, state, rules, reason: incomplete ? 'incomplete-task' : 'task-complete' };
}

function triggerReinjection(state, rules, reason) {
  const nextReinjectionCount = (state.reinjections_used || 0) + 1;
  const diagnostic = buildDiagnostic(state, rules, reason);

  state.reinjections_used = nextReinjectionCount;
  state.updated_at = new Date().toISOString();
  state.status = nextReinjectionCount >= rules.thresholds.max_reinjections ? 'escalated' : 'active';
  state.reinjection_summary = diagnostic;
  setState(state);

  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'reinjection_triggered',
    task_id: state.task_id,
    reason,
    reinjections_used: nextReinjectionCount,
    diagnostic
  };

  appendJsonLine(REINJECTION_LOG_FILE, logEntry);
  return diagnostic;
}

function emitEscalation(state, rules, reason) {
  const diagnostic = buildDiagnostic(state, rules, reason);
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'task_escalated',
    level: 'human-review',
    status: 'open',
    task_id: state.task_id,
    reason,
    diagnostic
  };

  state.status = 'escalated';
  state.updated_at = new Date().toISOString();
  state.escalation_summary = diagnostic;
  setState(state);
  appendJsonLine(ESCALATION_LOG_FILE, logEntry);
  return diagnostic;
}

module.exports = {
  checkPrematureExit,
  triggerReinjection,
  emitEscalation
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const modeArg = args.find(arg => arg.startsWith('--mode='));
  const taskIdArg = args.find(arg => arg.startsWith('--task-id='));
  const expectedStepsArg = args.find(arg => arg.startsWith('--expected-steps='));
  const mode = modeArg ? modeArg.split('=')[1] : 'completion';
  const taskId = taskIdArg ? taskIdArg.split('=')[1] : undefined;
  const expectedSteps = expectedStepsArg ? Number.parseInt(expectedStepsArg.split('=')[1], 10) : undefined;
  const result = checkPrematureExit({ mode, taskId, expectedSteps });

  if (!result.state) {
    console.log('No task-state file present.');
    process.exit(0);
  }

  if (result.triggered) {
    let diagnostic;
    if ((result.state.reinjections_used || 0) >= result.rules.thresholds.max_reinjections || result.reason === 'consecutive-failures') {
      diagnostic = emitEscalation(result.state, result.rules, result.reason);
      console.log(`Premature exit detected for task ${result.state.task_id}. Escalating.`);
    } else {
      diagnostic = triggerReinjection(result.state, result.rules, result.reason);
      console.log(`Premature exit detected for task ${result.state.task_id}. Triggering reinjection.`);
    }

    console.log(JSON.stringify(diagnostic, null, 2));
  } else {
    console.log('Task completed normally.');
  }
}