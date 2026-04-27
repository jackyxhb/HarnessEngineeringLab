#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const HARNESS_DIR = path.join(__dirname, "..", ".harness");
const STATE_FILE = path.join(HARNESS_DIR, "task-state.json");
const RULES_FILE = path.join(HARNESS_DIR, "escalation-rules.json");

function ensureHarnessDir() {
  fs.mkdirSync(HARNESS_DIR, { recursive: true });
}

function readJson(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function parseArgs(argv) {
  return argv.reduce((result, arg) => {
    if (!arg.startsWith("--")) {
      return result;
    }

    const trimmed = arg.slice(2);
    const [key, ...valueParts] = trimmed.split("=");
    result[key] = valueParts.length > 0 ? valueParts.join("=") : "true";
    return result;
  }, {});
}

function isTruthyOption(value) {
  return value === true || value === "true" || value === "1";
}

function getRules() {
  return readJson(RULES_FILE, {
    thresholds: {
      max_reinjections: 3,
      escalate_after_reinjections: 2,
      consecutive_failures: 3,
      heartbeat_stale_minutes: 30,
    },
  });
}

function getState() {
  return readJson(STATE_FILE, null);
}

function setState(state) {
  ensureHarnessDir();
  writeJson(STATE_FILE, state);
}

function currentTimestamp() {
  return new Date().toISOString();
}

function startState(options) {
  const rules = getRules();
  const now = currentTimestamp();
  const state = {
    version: 1,
    task_id: options["task-id"],
    title: options.title || options["task-id"],
    plan_ref: options.plan || null,
    requirement_ids: options["requirement-ids"]
      ? options["requirement-ids"].split(",").filter(Boolean)
      : [],
    status: "active",
    expected_steps: Number.parseInt(options["expected-steps"] || "0", 10),
    completed_steps: 0,
    completed_step_labels: [],
    current_step: options["current-step"] || null,
    state_summary: options.summary || "",
    reinjections_used: 0,
    max_reinjections: rules.thresholds.max_reinjections,
    consecutive_failures: 0,
    last_failure: null,
    started_at: now,
    updated_at: now,
    last_heartbeat_at: now,
  };

  setState(state);
  console.log(JSON.stringify(state, null, 2));
}

function heartbeatState(options) {
  const state = getState();
  if (!state) {
    throw new Error("No task-state file exists. Run start first.");
  }

  state.updated_at = currentTimestamp();
  state.last_heartbeat_at = state.updated_at;
  if (options.summary) {
    state.state_summary = options.summary;
  }

  setState(state);
  console.log(JSON.stringify(state, null, 2));
}

function markStep(options) {
  const state = getState();
  if (!state) {
    throw new Error("No task-state file exists. Run start first.");
  }

  const completedSteps = Number.parseInt(
    options["completed-steps"] || `${state.completed_steps + 1}`,
    10,
  );
  state.completed_steps = completedSteps;
  state.current_step = options["current-step"] || null;
  state.updated_at = currentTimestamp();
  state.last_heartbeat_at = state.updated_at;
  state.consecutive_failures = 0;
  if (options.label) {
    state.completed_step_labels = [
      ...new Set([...(state.completed_step_labels || []), options.label]),
    ];
  }
  if (options.summary) {
    state.state_summary = options.summary;
  }

  setState(state);
  console.log(JSON.stringify(state, null, 2));
}

function markFailure(options) {
  const state = getState();
  if (!state) {
    throw new Error("No task-state file exists. Run start first.");
  }

  state.status = "blocked";
  state.consecutive_failures = (state.consecutive_failures || 0) + 1;
  state.last_failure = {
    timestamp: currentTimestamp(),
    step: options.step || state.current_step || null,
    message: options.message || "Unspecified failure",
  };
  state.updated_at = state.last_failure.timestamp;
  state.last_heartbeat_at = state.last_failure.timestamp;
  if (options.summary) {
    state.state_summary = options.summary;
  }

  setState(state);
  console.log(JSON.stringify(state, null, 2));
}

function completeState(options) {
  const state = getState();
  if (!state) {
    throw new Error("No task-state file exists. Run start first.");
  }

  const requestedCompletedSteps = Number.parseInt(
    options["completed-steps"] || `${state.expected_steps}`,
    10,
  );
  const expectedSteps = Number.parseInt(`${state.expected_steps || 0}`, 10);
  const forceComplete = isTruthyOption(options.force);

  if (
    !Number.isFinite(requestedCompletedSteps) ||
    requestedCompletedSteps < 0
  ) {
    throw new Error(
      "complete requires completed-steps to be a non-negative number.",
    );
  }

  if (!forceComplete && requestedCompletedSteps < expectedSteps) {
    throw new Error(
      `Cannot mark task complete: completed_steps (${requestedCompletedSteps}) is below expected_steps (${expectedSteps}). ` +
        "Finish remaining steps or pass --force=true to override with explicit intent.",
    );
  }

  state.status = "completed";
  state.completed_steps = requestedCompletedSteps;
  state.updated_at = currentTimestamp();
  state.last_heartbeat_at = state.updated_at;
  if (forceComplete && requestedCompletedSteps < expectedSteps) {
    state.completion_override = {
      timestamp: state.updated_at,
      completed_steps: requestedCompletedSteps,
      expected_steps: expectedSteps,
      reason: options["override-reason"] || "force-complete",
    };
  }
  if (options.summary) {
    state.state_summary = options.summary;
  }

  setState(state);
  console.log(JSON.stringify(state, null, 2));
}

function resetState() {
  if (fs.existsSync(STATE_FILE)) {
    fs.unlinkSync(STATE_FILE);
  }
  console.log('{"status":"deleted"}');
}

function showState() {
  const state = getState();
  console.log(JSON.stringify(state || { status: "absent" }, null, 2));
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const options = parseArgs(rest);

  switch (command) {
    case "start":
      if (!options["task-id"]) {
        throw new Error("start requires --task-id=<id>");
      }
      startState(options);
      break;
    case "heartbeat":
      heartbeatState(options);
      break;
    case "step":
      markStep(options);
      break;
    case "fail":
      markFailure(options);
      break;
    case "complete":
      completeState(options);
      break;
    case "reset":
      resetState();
      break;
    case "show":
      showState();
      break;
    default:
      throw new Error(
        "Usage: node scripts/task-state.js <start|heartbeat|step|fail|complete|reset|show> [--key=value]",
      );
  }
}

main();
