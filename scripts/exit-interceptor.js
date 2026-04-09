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

function checkPrematureExit(taskId, expectedSteps) {
  if (!fs.existsSync(STATE_FILE)) return false;
  
  const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  if (state.taskId !== taskId) return false;
  
  const completedSteps = state.completedSteps || 0;
  return completedSteps < expectedSteps;
}

function triggerReinjection(taskId, stateSummary) {
  console.log(`Premature exit detected for task ${taskId}. Triggering reinjection.`);
  
  // In a real implementation, this would reinject the prompt with state summary
  // For now, log the reinjection trigger
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'reinjection_triggered',
    taskId: taskId,
    stateSummary: stateSummary
  };
  
  const LOG_FILE = path.join(__dirname, '..', '.harness', 'reinjection-log.jsonl');
  fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n');
  
  // Here you would actually reinject the prompt to the agent
  // This is a placeholder for the reinjection mechanism
}

module.exports = {
  checkPrematureExit,
  triggerReinjection
};

// CLI usage
if (require.main === module) {
  const [,, taskId, expectedSteps] = process.argv;
  if (checkPrematureExit(taskId, parseInt(expectedSteps))) {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    triggerReinjection(taskId, state);
  } else {
    console.log('Task completed normally.');
  }
}