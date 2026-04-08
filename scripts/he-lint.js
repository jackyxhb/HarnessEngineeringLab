#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = process.cwd();
const requirementIds = new Set();

// --- DYNAMIC REGISTRIES --- //
const anchorsMap = new Map(); // Concept -> Source File
const featureMap = new Map(); // ID -> Name String

function buildDynamicRegistries() {
  // 1. Extract Anchors from ANCHORS.md
  const anchorsPath = path.join(repoRoot, 'ANCHORS.md');
  if (fs.existsSync(anchorsPath)) {
    const lines = fs.readFileSync(anchorsPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const match = line.match(/^###\s+A\d+:\s+(.*)$/);
      if (match) {
        anchorsMap.set(match[1].trim(), 'ANCHORS.md');
      }
    });
  }

  // 2. Extract Cross-Cutting Concerns from Prevention Checklist
  const preventionPath = path.join(repoRoot, 'framework', 'cross-cutting', 'HE Prevention Checklist.md');
  if (fs.existsSync(preventionPath)) {
    const lines = fs.readFileSync(preventionPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const match = line.match(/^##\s+(.*)$/);
      if (match && !line.includes('Checklist')) {
        anchorsMap.set(match[1].trim(), 'HE Prevention Checklist.md');
      }
    });
  }
}

// --- STRUCTURAL VALIDATION --- //
const EXPECTED_FEATURE_FILES = 32;
const EXPECTED_PRINCIPLE_FILES = 19;

function validateDAGStructure() {
  // Validate feature files exist (filenames P0-01..P0-11, P1-01..P1-12, P2-01..P2-05, P3-01..P3-04)
  const featuresDir = path.join(repoRoot, 'framework', 'features');
  const principlesDir = path.join(repoRoot, 'framework', 'principles');

  if (!fs.existsSync(featuresDir)) {
    reportError(featuresDir, 0, 'DAG Structure: framework/features/ directory is missing.', 'Create framework/features/ and populate with modular feature files (P0-01.md through P3-04.md).');
    return;
  }
  if (!fs.existsSync(principlesDir)) {
    reportError(principlesDir, 0, 'DAG Structure: framework/principles/ directory is missing.', 'Create framework/principles/ and populate with EP-01.md through EP-19.md');
    return;
  }

  const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.md'));
  const principleFiles = fs.readdirSync(principlesDir).filter(f => f.endsWith('.md'));

  if (featureFiles.length !== EXPECTED_FEATURE_FILES) {
    reportError(featuresDir, 0, `DAG Structure: Expected ${EXPECTED_FEATURE_FILES} feature files, found ${featureFiles.length}.`, `Ensure framework/features/ contains exactly ${EXPECTED_FEATURE_FILES} files (P0-01.md..P3-04.md).`);
  }
  if (principleFiles.length !== EXPECTED_PRINCIPLE_FILES) {
    reportError(principlesDir, 0, `DAG Structure: Expected ${EXPECTED_PRINCIPLE_FILES} principle files, found ${principleFiles.length}.`, `Ensure framework/principles/ contains exactly ${EXPECTED_PRINCIPLE_FILES} files (EP-01..EP-19).`);
  }

  // Validate HE Index.md exists
  const indexPath = path.join(repoRoot, 'framework', 'HE Index.md');
  if (!fs.existsSync(indexPath)) {
    reportError(indexPath, 0, 'DAG Structure: framework/HE Index.md is missing.', 'Create HE Index.md — the DAG navigation index.');
  }
}

function extractJsonCodeBlock(content) {
  const match = content.match(/```json\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : null;
}

function extractSkillVersion(content) {
  const match = content.match(/^version:\s*"([^"]+)"\s*$/m);
  return match ? match[1] : null;
}

function getGitChangedFiles() {
  const changed = new Set();

  try {
    const tracked = execSync('git diff --name-only HEAD', { cwd: repoRoot, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
    tracked.split('\n').map(line => line.trim()).filter(Boolean).forEach(file => changed.add(file));
  } catch {
    // Ignore git diff failures and fall back to whatever can be observed.
  }

  try {
    const untracked = execSync('git ls-files --others --exclude-standard', { cwd: repoRoot, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
    untracked.split('\n').map(line => line.trim()).filter(Boolean).forEach(file => changed.add(file));
  } catch {
    // Ignore git ls-files failures and fall back to tracked changes only.
  }

  return Array.from(changed);
}

function validateReleaseNotesSurface() {
  const releasesPath = path.join(repoRoot, 'RELEASES.md');
  if (!fs.existsSync(releasesPath)) {
    reportError(releasesPath, 0, 'Release Notes: RELEASES.md is missing.', 'Create RELEASES.md as the canonical HELab release-notes surface.');
    return;
  }

  const content = fs.readFileSync(releasesPath, 'utf-8');
  if (!/^##\s+Unreleased\s*$/m.test(content)) {
    reportError(releasesPath, 0, 'Release Notes: RELEASES.md is missing an Unreleased section.', 'Add a `## Unreleased` section for pending downstream changes.');
  }
}

function validateDownstreamImpactNotes(explicitFiles) {
  const candidateFiles = explicitFiles.length > 0
    ? explicitFiles.map(file => path.relative(repoRoot, path.resolve(file)).split(path.sep).join('/'))
    : getGitChangedFiles();

  const downstreamPrefixes = ['framework/', '.agent/skills/harnessing-agents/'];
  const hasDownstreamChange = candidateFiles.some(file => downstreamPrefixes.some(prefix => file.startsWith(prefix)));
  if (!hasDownstreamChange) return;

  const releasesTouched = candidateFiles.includes('RELEASES.md');
  if (!releasesTouched) {
    reportError(path.join(repoRoot, 'RELEASES.md'), 0, 'Downstream Impact: framework/ or .agent/skills/harnessing-agents/ changed without updating RELEASES.md.', 'Update the `Unreleased` section in RELEASES.md with the downstream-facing impact of the change.');
  }
}

function validateSkillVersionSync() {
  const packageJsonPath = path.join(repoRoot, 'package.json');
  const skillPath = path.join(repoRoot, '.agent', 'skills', 'harnessing-agents', 'SKILL.md');

  if (!fs.existsSync(packageJsonPath)) {
    reportError(packageJsonPath, 0, 'Version Sync: package.json is missing.', 'Restore package.json so the canonical HELab version can be read.');
    return;
  }

  if (!fs.existsSync(skillPath)) {
    reportError(skillPath, 0, 'Version Sync: .agent/skills/harnessing-agents/SKILL.md is missing.', 'Restore SKILL.md so downstream consumers have visible skill metadata.');
    return;
  }

  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  } catch (error) {
    reportError(packageJsonPath, 0, `Version Sync: package.json is invalid JSON (${error.message}).`, 'Fix package.json so the canonical HELab version can be parsed.');
    return;
  }

  const rootVersion = packageJson.version;
  if (!rootVersion || typeof rootVersion !== 'string') {
    reportError(packageJsonPath, 0, 'Version Sync: package.json is missing a string version field.', 'Add a canonical root version string to package.json.');
    return;
  }

  const skillContent = fs.readFileSync(skillPath, 'utf-8');
  const skillVersion = extractSkillVersion(skillContent);
  if (!skillVersion) {
    reportError(skillPath, 0, 'Version Sync: SKILL.md frontmatter is missing a version field.', 'Add a version field and sync it from package.json.');
    return;
  }

  if (skillVersion !== rootVersion) {
    reportError(skillPath, 0, `Version Sync: SKILL.md version "${skillVersion}" does not match package.json version "${rootVersion}".`, 'Run `npm run sync:skill-version` to mirror the canonical HELab version into the skill metadata.');
  }
}

function validateRequirementsLedger() {
  const requirementsPath = path.join(repoRoot, 'REQUIREMENTS.md');
  if (!fs.existsSync(requirementsPath)) {
    reportError(requirementsPath, 0, 'Requirements Ledger: REQUIREMENTS.md is missing.', 'Create REQUIREMENTS.md with a machine-readable JSON ledger of active requirements.');
    return;
  }

  const content = fs.readFileSync(requirementsPath, 'utf-8');
  const jsonBlock = extractJsonCodeBlock(content);
  if (!jsonBlock) {
    reportError(requirementsPath, 0, 'Requirements Ledger: missing JSON code block.', 'Add a ```json block containing the canonical requirements ledger.');
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonBlock);
  } catch (error) {
    reportError(requirementsPath, 0, `Requirements Ledger: invalid JSON (${error.message}).`, 'Fix REQUIREMENTS.md so the ledger JSON parses cleanly.');
    return;
  }

  const requirements = Array.isArray(parsed) ? parsed : parsed.requirements;
  if (!Array.isArray(requirements) || requirements.length === 0) {
    reportError(requirementsPath, 0, 'Requirements Ledger: no requirement entries found.', 'Define at least one requirement entry with id, title, narrative, acceptance_criteria, status, and source.');
    return;
  }

  requirements.forEach((requirement, index) => {
    const entryLine = index + 1;
    if (!requirement || typeof requirement !== 'object') {
      reportError(requirementsPath, entryLine, 'Requirements Ledger: entry is not an object.', 'Each requirement must be a JSON object.');
      return;
    }

    const { id, title, narrative, acceptance_criteria: acceptanceCriteria, status, source } = requirement;
    if (!id || typeof id !== 'string') {
      reportError(requirementsPath, entryLine, 'Requirements Ledger: entry missing string id.', 'Add a unique string id such as "HE-R001".');
      return;
    }
    if (requirementIds.has(id)) {
      reportError(requirementsPath, entryLine, `Requirements Ledger: duplicate id "${id}".`, 'Ensure each requirement id is unique.');
    }
    requirementIds.add(id);

    if (!title || typeof title !== 'string') {
      reportError(requirementsPath, entryLine, `Requirements Ledger: requirement "${id}" missing title.`, 'Add a human-readable title.');
    }
    if (!narrative || typeof narrative !== 'string') {
      reportError(requirementsPath, entryLine, `Requirements Ledger: requirement "${id}" missing narrative.`, 'Add a narrative describing the requirement.');
    }
    if (!Array.isArray(acceptanceCriteria) || acceptanceCriteria.length === 0) {
      reportError(requirementsPath, entryLine, `Requirements Ledger: requirement "${id}" missing acceptance_criteria array.`, 'Add at least one acceptance criterion for the requirement.');
    }
    if (!status || typeof status !== 'string') {
      reportError(requirementsPath, entryLine, `Requirements Ledger: requirement "${id}" missing status.`, 'Add a string status such as "active".');
    }
    if (!source || typeof source !== 'string') {
      reportError(requirementsPath, entryLine, `Requirements Ledger: requirement "${id}" missing source.`, 'Add a source string describing where the requirement came from.');
    }
  });
}

function validatePlanRequirementIds() {
  const plansPath = path.join(repoRoot, 'PLANS.md');
  if (!fs.existsSync(plansPath)) return;

  const lines = fs.readFileSync(plansPath, 'utf-8').split('\n');
  const activeHeaderIndex = lines.findIndex(line => line.trim() === '## Active Plans');
  if (activeHeaderIndex === -1) return;

  let activeSectionEnd = lines.length;
  for (let index = activeHeaderIndex + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) {
      activeSectionEnd = index;
      break;
    }
  }

  const activeSection = lines.slice(activeHeaderIndex + 1, activeSectionEnd);
  if (activeSection.some(line => line.includes('_No active plans._'))) return;

  const plans = [];
  let currentPlan = null;
  activeSection.forEach((line, offset) => {
    const lineNum = activeHeaderIndex + 2 + offset;
    if (line.startsWith('### Plan:')) {
      if (currentPlan) plans.push(currentPlan);
      currentPlan = { title: line.replace('### Plan:', '').trim(), lineNum, lines: [] };
      return;
    }
    if (currentPlan) currentPlan.lines.push({ text: line, lineNum });
  });
  if (currentPlan) plans.push(currentPlan);

  plans.forEach(plan => {
    const requirementLine = plan.lines.find(entry => entry.text.includes('**Requirement IDs:**'));
    if (!requirementLine) {
      reportError(plansPath, plan.lineNum, `Requirements Gate: active plan "${plan.title}" is missing a Requirement IDs field.`, 'Add a "- **Requirement IDs:** `...`" line referencing REQUIREMENTS.md entries.');
      return;
    }

    const ids = Array.from(requirementLine.text.matchAll(/`([^`]+)`/g)).map(match => match[1]);
    if (ids.length === 0) {
      reportError(plansPath, requirementLine.lineNum, `Requirements Gate: active plan "${plan.title}" has no backticked requirement IDs.`, 'List one or more requirement IDs such as `HE-R003`.');
      return;
    }

    ids.forEach(id => {
      if (!requirementIds.has(id)) {
        reportError(plansPath, requirementLine.lineNum, `Requirements Gate: active plan "${plan.title}" references unknown requirement ID "${id}".`, 'Add the requirement to REQUIREMENTS.md or fix the referenced ID.');
      }
    });
  });
}

let hasErrors = false;

function reportError(filePath, lineNum, message, fix) {
  hasErrors = true;
  console.error(`\x1b[31m[HE-LINT]\x1b[0m ${path.basename(filePath)}:${lineNum > 0 ? lineNum : 'ALL'} -> ${message}`);
  if (fix) {
    console.error(`  \x1b[33m\u21b3 Fix:\x1b[0m ${fix}`);
  }
}

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const basename = path.basename(filePath);

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // 1. Generic Number Bias Check
    // Detects any double-digit number of features that isn't exactly a valid count (ignoring single digits like Pillar 1).
    const countRegex = /\b((?:1[0-9]|[2-9][0-9]+))\s+(?:core\s+)?features\b/gi;
    let match;
    while ((match = countRegex.exec(line)) !== null) {
      if (match[1] !== "32") {
        reportError(filePath, lineNum, `Number Bias: Detected "${match[0]}" instead of the canonical 32.`, 'Update to "32 core features" (11 Foundation + 12 P1 + 5 P2 + 4 P3). See: framework/HE Index.md');
      }
    }

    // 2. Generic ID Validation
    // Validates that extracted IDs fit logical constraints (P0-1 to P0-11, P1-1 to P1-12, P2-1 to P2-5, P3-1 to P3-4)
    const idRegex = /\b(P\d+(?:-\d+)?|EP-\d+)\b/g;
    let idMatch;
    while ((idMatch = idRegex.exec(line)) !== null) {
      const id = idMatch[1];
      let invalid = false;
      const parts = id.split('-');
      if (parts.length === 2) {
        const pillar = parseInt(parts[0].replace('P', ''), 10);
        const num = parseInt(parts[1], 10);
        if (pillar === 0 && (num < 1 || num > 11)) invalid = true;
        if (pillar === 1 && (num < 1 || num > 12)) invalid = true;
        if (pillar === 2 && (num < 1 || num > 5)) invalid = true;
        if (pillar === 3 && (num < 1 || num > 4)) invalid = true;
        if (pillar < 0 || pillar > 3) invalid = true;
      } else {
        // just P0, P1, P2, P3 is valid
        const pillar = parseInt(id.replace('P', ''), 10);
        if (pillar < 0 || pillar > 3) invalid = true;
      }

      // New check: No leading zeros allowed in IDs (e.g. P0-01 is forbidden, use P0-1)
      // We exclude cases where the ID is part of a filename (e.g. P0-01.md)
      const isFilename = line.slice(idMatch.index + id.length).startsWith('.md') || 
                         line.slice(idMatch.index + id.length).startsWith('.json');

      if (id.includes('-0') && !isFilename) {
        reportError(filePath, lineNum, `ID Format Violation: Leading zero detected in "${id}".`, `Remove leading zero per v3.3.1 standard (e.g., "${id.replace('-0', '-')}" instead of "${id}").`);
      }
      
      if (invalid) {
        reportError(filePath, lineNum, `Invalid Feature ID constraint: "${id}" is out of bounds.`, 'Valid IDs are P0-1..P0-11, P1-1..P1-12, P2-1..P2-5, P3-1..P3-4. See: framework/HE Index.md');
      }
    }

    // 3. Pillar Label Integrity Check
    // Section headings that label a Pillar must use the canonical verb annotation.
    const pillarLabelChecks = [
      { regex: /^#+\s+(?:Foundation[:\s]+)?Infrastructure\s*$/, canonical: 'Foundation: Infrastructure (Execute)' },
      { regex: /^#+\s+(?:Pillar\s+1[:\s]+)?Context\s+Engineering\s*$/, canonical: 'Context Engineering (Inform)' },
      { regex: /^#+\s+(?:Pillar\s+2[:\s]+)?Architectural\s+Constraints\s*$/, canonical: 'Architectural Constraints (Constrain)' },
      { regex: /^#+\s+(?:Pillar\s+3[:\s]+)?Entropy\s+Management\s*$/, canonical: 'Entropy Management (Maintain)' },
    ];
    pillarLabelChecks.forEach(({ regex, canonical }) => {
      if (regex.test(line)) {
        reportError(filePath, lineNum, `Pillar Label: Heading uses unlabelled pillar name.`, `Use canonical label "${canonical}". See: framework/HE Index.md`);
      }
    });
  });

  // 4. Generic Orphan Concept Check
  // Check against our dynamically extracted anchors Map.
  anchorsMap.forEach((sourceDoc, concept) => {
    // Escape concept for regex
    const escapedConcept = concept.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const conceptRegex = new RegExp(`\\b${escapedConcept}\\b`, 'gi');
    
    // Skip checking if the file is the source doc itself
    if (basename === sourceDoc) return;
    
    // If concept is used, ensure the source doc is referenced SOMEWHERE in the file.
    if (conceptRegex.test(content) && !content.includes(sourceDoc)) {
      // Exclude generic terms that might overlap (like "Context Compaction" vs "Context")
      if (concept.split(' ').length > 1) { 
        reportError(filePath, 0, `Orphan Concept Gap: Mentions dynamic concept "${concept}" but fails to link back to canonical source: ${sourceDoc}`, `Add a markdown reference link to "${sourceDoc}" in this file, or remove the concept mention.`);
      }
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith('.md')) {
      scanFile(fullPath);
    }
  });
}

function run() {
  console.log('Running Generic HE Validations...');
  buildDynamicRegistries();

  // Always validate DAG structure
  validateDAGStructure();
  validateRequirementsLedger();
  validatePlanRequirementIds();
  validateSkillVersionSync();
  validateReleaseNotesSurface();

  const args = process.argv.slice(2).filter(a => a !== '--all');
  const allMode = process.argv.includes('--all');
  validateDownstreamImpactNotes(args);
  if (args.length > 0 && !allMode) {
    // Run only on provided files (lint-staged)
    args.forEach(file => {
      if (file.endsWith('.md')) scanFile(path.resolve(file));
    });
  } else {
    // Run globally on the active framework, skill, and harness surface only.
    const DIRS_TO_SCAN = ['framework', '.agent/workflows', '.agent/skills/harnessing-agents'];
    DIRS_TO_SCAN.forEach(dir => {
      walkDir(path.join(repoRoot, dir));
    });
    ['README.md', 'AGENTS.md', 'ANCHORS.md', 'CLAUDE.md', 'PLANS.md', 'REQUIREMENTS.md', 'RELEASES.md'].forEach(file => scanFile(path.join(repoRoot, file)));
  }

  if (hasErrors) {
    console.error(`\x1b[31m[FAILED]\x1b[0m HE Validation failed on strict logical rule constraints.`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Generic HE Rules passed.`);
    process.exit(0);
  }
}

run();
