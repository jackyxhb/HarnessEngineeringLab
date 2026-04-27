#!/usr/bin/env node

/**
 * generate-observation-report.js
 *
 * Generates JSON-standardized observation reports for P1-5 Observability.
 * Reads agent logs from .harness/agent-logs.jsonl and produces summary metrics.
 */

const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "..", ".harness", "agent-logs.jsonl");
const REPORT_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "observation-report.json",
);
const DASHBOARD_FILE = path.join(__dirname, "..", ".harness", "dashboard.md");
const ESCALATION_LOG_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "escalation-events.jsonl",
);
const REINJECTION_LOG_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "reinjection-log.jsonl",
);
const TASK_STATE_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "task-state.json",
);
const PERMISSIONS_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "agent-permissions.json",
);
const MCP_CAPABILITIES_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "mcp-capabilities.json",
);
const MEASUREMENT_SCHEMA_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "measurement-schema.json",
);
const MEASUREMENT_DEFINITIONS_FILE = path.join(
  __dirname,
  "..",
  ".harness",
  "measurement-definitions.json",
);
const MEASUREMENT_STANDARDS_FILE = path.join(
  __dirname,
  "..",
  "framework",
  "HE Measurement Standards.md",
);
const EXPECTED_MEASUREMENT_FEATURES = [
  "P0-5",
  "P0-10",
  "P1-1",
  "P1-5",
  "P1-11",
  "P2-3",
  "P2-5",
  "P3-1",
  "P3-3",
];

function readJson(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsonLines(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const parsed = [];
  fs.readFileSync(filePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .forEach((line, index) => {
      if (!line) {
        return;
      }

      try {
        parsed.push(JSON.parse(line));
      } catch (error) {
        // Keep reporting resilient even if a single JSONL record is malformed.
        console.warn(
          `[OBSERVE] Skipping malformed JSONL entry at ${path.basename(filePath)}:${index + 1} (${error.message})`,
        );
      }
    });

  return parsed;
}

function toIsoTimestamp(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
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

function calculatePercentile(values, percentile) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(
    sorted.length - 1,
    Math.ceil((percentile / 100) * sorted.length) - 1,
  );
  return sorted[index];
}

function buildAlerts({
  latestLog,
  taskState,
  escalationEvents,
  reportTimestamp,
  measurementHealth,
}) {
  const alerts = [];
  const staleHeartbeatMinutes = differenceInMinutes(
    taskState?.last_heartbeat_at,
    new Date(reportTimestamp),
  );
  const openEscalations = escalationEvents.filter(
    (event) => event.status !== "resolved",
  );

  if (latestLog && ["fail", "error", "warn"].includes(latestLog.result)) {
    alerts.push({
      severity:
        latestLog.result === "fail" || latestLog.result === "error"
          ? "high"
          : "medium",
      type: "latest-log-result",
      message: `Latest logged action ended with result=${latestLog.result}`,
    });
  }

  if (
    taskState &&
    !["completed", "idle", "absent"].includes(taskState.status)
  ) {
    alerts.push({
      severity: taskState.status === "escalated" ? "high" : "medium",
      type: "active-task",
      message: `Task ${taskState.task_id || taskState.taskId} remains ${taskState.status}`,
    });
  }

  if (staleHeartbeatMinutes !== null && staleHeartbeatMinutes > 30) {
    alerts.push({
      severity: "high",
      type: "stale-heartbeat",
      message: `Task heartbeat is stale by ${staleHeartbeatMinutes} minute(s)`,
    });
  }

  if (openEscalations.length > 0) {
    alerts.push({
      severity: "high",
      type: "open-escalation",
      message: `${openEscalations.length} escalation event(s) remain unresolved`,
    });
  }

  if (
    measurementHealth &&
    measurementHealth.missing_feature_bindings.length > 0
  ) {
    alerts.push({
      severity: "high",
      type: "measurement-coverage",
      message: `Measurement registry is missing bindings for ${measurementHealth.missing_feature_bindings.join(", ")}`,
    });
  }

  return alerts;
}

function buildMeasurementHealth(reportTimestamp) {
  const definitions = readJson(MEASUREMENT_DEFINITIONS_FILE, null);
  const featureMeasurements = Array.isArray(definitions?.feature_measurements)
    ? definitions.feature_measurements
    : [];
  const metricsByStatus = {};
  let totalMetricsDefined = 0;

  featureMeasurements.forEach((featureMeasurement) => {
    const metrics = Array.isArray(featureMeasurement.metrics)
      ? featureMeasurement.metrics
      : [];
    metrics.forEach((metric) => {
      const status = metric.status || "unknown";
      metricsByStatus[status] = (metricsByStatus[status] || 0) + 1;
      totalMetricsDefined += 1;
    });
  });

  const boundFeatureIds = new Set(
    featureMeasurements
      .map((featureMeasurement) => featureMeasurement.feature_id)
      .filter(Boolean),
  );

  return {
    standards_present: fs.existsSync(MEASUREMENT_STANDARDS_FILE),
    schema_present: fs.existsSync(MEASUREMENT_SCHEMA_FILE),
    registry_present: Boolean(definitions),
    registry_age_minutes: fs.existsSync(MEASUREMENT_DEFINITIONS_FILE)
      ? differenceInMinutes(
          fs.statSync(MEASUREMENT_DEFINITIONS_FILE).mtime,
          new Date(reportTimestamp),
        )
      : null,
    expected_feature_count: EXPECTED_MEASUREMENT_FEATURES.length,
    defined_feature_count: featureMeasurements.length,
    total_metrics_defined: totalMetricsDefined,
    missing_feature_bindings: EXPECTED_MEASUREMENT_FEATURES.filter(
      (featureId) => !boundFeatureIds.has(featureId),
    ),
    metrics_by_status: metricsByStatus,
  };
}

function renderDashboard(report) {
  const recentActions =
    report.recent_actions.length > 0
      ? report.recent_actions
          .map(
            (action) =>
              `- ${action.timestamp} | ${action.action} | ${action.result} | ${action.target}`,
          )
          .join("\n")
      : "- No recent actions recorded";

  const alerts =
    report.alerts.length > 0
      ? report.alerts
          .map((alert) => `- ${alert.severity.toUpperCase()}: ${alert.message}`)
          .join("\n")
      : "- No active alerts";

  const taskState =
    report.task_state.status === "absent"
      ? "- No active task-state file present"
      : [
          `- Status: ${report.task_state.status}`,
          `- Task ID: ${report.task_state.task_id || "n/a"}`,
          `- Progress: ${report.task_state.completed_steps}/${report.task_state.expected_steps}`,
          `- Reinjections Used: ${report.task_state.reinjections_used}/${report.task_state.max_reinjections}`,
          `- Last Heartbeat: ${report.task_state.last_heartbeat_at || "n/a"}`,
        ].join("\n");

  return [
    "# Agent Observability Dashboard",
    "",
    `Generated from [.harness/observation-report.json](.harness/observation-report.json) at ${report.timestamp}.`,
    "",
    "## Current Metrics",
    "",
    `- Total Actions: ${report.total_actions}`,
    `- Unique Agents: ${report.unique_agents}`,
    `- Error Rate: ${(report.error_rate * 100).toFixed(1)}%`,
    `- Average Duration: ${report.average_duration_ms} ms`,
    `- 95th Percentile Duration: ${report.p95_duration_ms} ms`,
    "",
    "## Result Breakdown",
    "",
    ...Object.entries(report.results_by_type).map(
      ([result, count]) => `- ${result}: ${count}`,
    ),
    "",
    "## Task State",
    "",
    taskState,
    "",
    "## Escalations",
    "",
    `- Total Events: ${report.escalation_summary.total_events}`,
    `- Open Events: ${report.escalation_summary.open_events}`,
    `- Reinjection Events: ${report.reinjection_summary.total_events}`,
    "",
    "## Recent Activity",
    "",
    recentActions,
    "",
    "## Alerts",
    "",
    alerts,
    "",
    "## System Health",
    "",
    `- Permission Manifest Present: ${report.system_health.permission_manifest_present}`,
    `- MCP Manifest Present: ${report.system_health.mcp_manifest_present}`,
    `- Task-State Schema Present: ${report.system_health.task_state_schema_present}`,
    `- Escalation Rules Present: ${report.system_health.escalation_rules_present}`,
    `- Measurement Standards Present: ${report.measurement_health.standards_present}`,
    `- Measurement Schema Present: ${report.measurement_health.schema_present}`,
    `- Measurement Registry Present: ${report.measurement_health.registry_present}`,
    "",
    "## Measurement Health",
    "",
    `- Bound Features: ${report.measurement_health.defined_feature_count}/${report.measurement_health.expected_feature_count}`,
    `- Total Metrics Defined: ${report.measurement_health.total_metrics_defined}`,
    `- Registry Age: ${report.measurement_health.registry_age_minutes ?? "n/a"} minute(s)`,
    `- Missing Bindings: ${report.measurement_health.missing_feature_bindings.length > 0 ? report.measurement_health.missing_feature_bindings.join(", ") : "none"}`,
    ...Object.entries(report.measurement_health.metrics_by_status).map(
      ([status, count]) => `- ${status}: ${count}`,
    ),
  ].join("\n");
}

function generateReport() {
  const reportTimestamp = new Date().toISOString();
  const logs = readJsonLines(LOG_FILE);
  const escalationEvents = readJsonLines(ESCALATION_LOG_FILE);
  const reinjectionEvents = readJsonLines(REINJECTION_LOG_FILE);
  const taskState = readJson(TASK_STATE_FILE, null);
  const permissions = readJson(PERMISSIONS_FILE, null);
  const mcpCapabilities = readJson(MCP_CAPABILITIES_FILE, null);
  const measurementHealth = buildMeasurementHealth(reportTimestamp);
  const totalActions = logs.length;
  const actionsByType = {};
  const resultsByType = {};
  const durations = [];
  const errors = logs.filter((log) =>
    ["error", "fail"].includes(log.result),
  ).length;

  logs.forEach((log) => {
    actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
    resultsByType[log.result] = (resultsByType[log.result] || 0) + 1;
    if (typeof log.duration_ms === "number" && log.duration_ms >= 0) {
      durations.push(log.duration_ms);
    }
  });

  const avgDuration =
    durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;
  const errorRate = totalActions > 0 ? errors / totalActions : 0;
  const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;
  const report = {
    timestamp: reportTimestamp,
    total_actions: totalActions,
    unique_agents: new Set(logs.map((log) => log.agent_id)).size,
    actions_by_type: actionsByType,
    results_by_type: resultsByType,
    average_duration_ms: Math.round(avgDuration),
    p95_duration_ms: calculatePercentile(durations, 95),
    error_rate: errorRate,
    recent_actions: logs.slice(-10),
    escalation_summary: {
      total_events: escalationEvents.length,
      open_events: escalationEvents.filter(
        (event) => event.status !== "resolved",
      ).length,
      by_level: escalationEvents.reduce((counts, event) => {
        const level = event.level || "unknown";
        counts[level] = (counts[level] || 0) + 1;
        return counts;
      }, {}),
    },
    reinjection_summary: {
      total_events: reinjectionEvents.length,
      total_reinjections_used: taskState?.reinjections_used || 0,
      max_reinjections_budget: taskState?.max_reinjections || 0,
    },
    task_state: taskState
      ? {
          status: taskState.status,
          task_id: taskState.task_id,
          title: taskState.title,
          completed_steps: taskState.completed_steps,
          expected_steps: taskState.expected_steps,
          reinjections_used: taskState.reinjections_used,
          max_reinjections: taskState.max_reinjections,
          last_heartbeat_at: toIsoTimestamp(taskState.last_heartbeat_at),
          updated_at: toIsoTimestamp(taskState.updated_at),
        }
      : {
          status: "absent",
        },
    system_health: {
      permission_manifest_present: Boolean(permissions),
      mcp_manifest_present: Boolean(mcpCapabilities),
      task_state_schema_present: fs.existsSync(
        path.join(__dirname, "..", ".harness", "task-state.schema.json"),
      ),
      escalation_rules_present: fs.existsSync(
        path.join(__dirname, "..", ".harness", "escalation-rules.json"),
      ),
    },
    measurement_health: measurementHealth,
    summary:
      totalActions > 0
        ? `Processed ${totalActions} actions with ${(errorRate * 100).toFixed(1)}% error rate`
        : "No logs available",
  };

  report.alerts = buildAlerts({
    latestLog,
    taskState: report.task_state,
    escalationEvents,
    reportTimestamp,
    measurementHealth,
  });

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  fs.writeFileSync(DASHBOARD_FILE, `${renderDashboard(report)}\n`);
  console.log("Observation report generated:", REPORT_FILE);
  console.log("Dashboard generated:", DASHBOARD_FILE);
}

generateReport();
