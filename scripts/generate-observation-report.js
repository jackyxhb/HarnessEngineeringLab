#!/usr/bin/env node

/**
 * generate-observation-report.js
 *
 * Generates JSON-standardized observation reports for P1-5 Observability.
 * Reads agent logs from .harness/agent-logs.jsonl and produces summary metrics.
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', '.harness', 'agent-logs.jsonl');
const REPORT_FILE = path.join(__dirname, '..', '.harness', 'observation-report.json');

function generateReport() {
  if (!fs.existsSync(LOG_FILE)) {
    console.log('No agent logs found. Creating empty report.');
    const report = {
      timestamp: new Date().toISOString(),
      total_actions: 0,
      actions_by_type: {},
      average_duration: 0,
      error_rate: 0,
      summary: 'No logs available'
    };
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    return;
  }

  const logs = fs.readFileSync(LOG_FILE, 'utf8').trim().split('\n').map(line => JSON.parse(line));
  
  const totalActions = logs.length;
  const actionsByType = {};
  const durations = [];
  const errors = logs.filter(log => log.result === 'error').length;

  logs.forEach(log => {
    actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
    if (log.duration_ms) durations.push(log.duration_ms);
  });

  const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
  const errorRate = totalActions > 0 ? errors / totalActions : 0;

  const report = {
    timestamp: new Date().toISOString(),
    total_actions: totalActions,
    actions_by_type: actionsByType,
    average_duration: Math.round(avgDuration),
    error_rate: errorRate,
    summary: `Processed ${totalActions} actions with ${errorRate * 100}% error rate`
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log('Observation report generated:', REPORT_FILE);
}

generateReport();