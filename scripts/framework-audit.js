#!/usr/bin/env node

/**
 * Framework coherency audit - comprehensive quality check.
 * Runs all quality-level validations (Tier 2) in addition to structural checks (Tier 1).
 *
 * This is distinct from 'npm run smoke' (structural validation only).
 * Run this before releases to catch coherency issues.
 *
 * Tier 1: Structural checks (file existence, DAG counts, manifest validity)
 * Tier 2: Quality checks (duplication, registry completeness, content coherency)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();

console.log("\n=== FRAMEWORK COHERENCY AUDIT ===\n");
console.log("Running Tier 1 (Structural) + Tier 2 (Quality) checks\n");

let passCount = 0;
let failCount = 0;

function runCheck(name, command, isTier2 = false) {
  const tier = isTier2 ? "Tier 2" : "Tier 1";
  try {
    console.log(`[RUNNING] ${tier}: ${name}...`);
    execSync(command, { cwd: repoRoot, stdio: "inherit" });
    console.log(`[✓ PASS] ${tier}: ${name}\n`);
    passCount++;
    return true;
  } catch (error) {
    console.error(`[✗ FAIL] ${tier}: ${name}\n`);
    failCount++;
    return false;
  }
}

// Tier 1: Structural checks (run the existing audit.sh)
console.log("--- Tier 1: Structural Validation ---");
const tier1Pass = runCheck(
  "Structural validation (audit.sh)",
  "bash scripts/harness/audit.sh"
);

// Tier 2: Quality checks
console.log("\n--- Tier 2: Content Quality Validation ---");

// Run he-lint.js which includes:
// - Duplication checks (L5 Improvement Policies, L4 sections, Binding Keys, Enforcement Bindings)
// - Registry completeness (validateMeasurementRegistry)
// - Binding key existence validation
const tier2Quality = runCheck(
  "Content coherency (he-lint.js with quality checks)",
  "node scripts/he-lint.js",
  true
);

// Code formatting checks
console.log("\n--- Tier 2: Code Quality ---");
const markdownLint = runCheck(
  "Markdown linting",
  "markdownlint \"**/*.md\" --ignore node_modules",
  true
);

const spellCheck = runCheck(
  "Spell checking",
  "cspell \"**/*.md\" --no-progress",
  true
);

// Summary
console.log("\n=== AUDIT SUMMARY ===");
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log("");

if (failCount > 0) {
  console.error("[FAILED] Framework coherency audit found issues.");
  console.error("Issues:");
  if (!tier1Pass) console.error("  - Tier 1 structural checks failed");
  if (!tier2Quality) console.error("  - Tier 2 quality/coherency checks failed");
  if (!markdownLint) console.error("  - Markdown linting failed");
  if (!spellCheck) console.error("  - Spell checking failed");
  console.error("\nFix all issues before release.");
  process.exit(1);
} else {
  console.log("[SUCCESS] Framework coherency audit passed. Ready for release.");
  process.exit(0);
}
