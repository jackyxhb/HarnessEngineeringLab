#!/usr/bin/env node

/**
 * Standalone duplication checker for pre-commit hook integration.
 * Detects duplicate sections and declarations in feature files.
 */

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const featureDir = path.join(repoRoot, "framework", "features");
let errorCount = 0;

function reportError(file, message) {
  console.error(`[DUPLICATION CHECK] ${file}: ${message}`);
  errorCount++;
}

function checkFeatureFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const fileName = path.basename(filePath);

  // Check duplicate L5: Improvement Policies
  const l5Count = lines.filter(
    (line) => line.includes("## L5: Improvement Policies"),
  ).length;
  if (l5Count > 1) {
    reportError(fileName, `${l5Count} duplicate "## L5: Improvement Policies" sections`);
  }

  // Check duplicate Binding Keys
  const bindingKeyCount = (content.match(/\*\*Binding Key:\*\*/g) || [])
    .length;
  if (bindingKeyCount > 1) {
    reportError(
      fileName,
      `${bindingKeyCount} duplicate "**Binding Key:**" declarations`,
    );
  }

  // Check duplicate L4 sections
  const l4ConcreteCount = lines.filter(
    (line) => line.includes("## L4: Concrete Actions"),
  ).length;
  if (l4ConcreteCount > 1) {
    reportError(
      fileName,
      `${l4ConcreteCount} duplicate "## L4: Concrete Actions & Tools" sections`,
    );
  }

  // Check duplicate L4 Prevention sections
  const l4PreventionCount = lines.filter(
    (line) => line.includes("## L4: Prevention"),
  ).length;
  if (l4PreventionCount > 1) {
    reportError(
      fileName,
      `${l4PreventionCount} duplicate "## L4: Prevention" sections`,
    );
  }

  // Check duplicate Enforcement Bindings headers
  const enforcementCount = lines.filter(
    (line) => line.includes("## Enforcement Bindings"),
  ).length;
  if (enforcementCount > 1) {
    reportError(
      fileName,
      `${enforcementCount} duplicate "## Enforcement Bindings" sections`,
    );
  }
}

if (fs.existsSync(featureDir)) {
  fs.readdirSync(featureDir)
    .filter((f) => f.endsWith(".md"))
    .forEach((file) => checkFeatureFile(path.join(featureDir, file)));
}

if (errorCount > 0) {
  console.error(
    `\n[DUPLICATION CHECK] Found ${errorCount} duplication issue(s)`,
  );
  process.exit(1);
}

console.log("[DUPLICATION CHECK] No duplication issues detected");
process.exit(0);
