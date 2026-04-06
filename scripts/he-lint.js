#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();

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
  // Validate feature files exist (P0-01..P0-11, P1-01..P1-12, P2-01..P2-05, P3-01..P3-04)
  const featuresDir = path.join(repoRoot, 'framework', 'features');
  const principlesDir = path.join(repoRoot, 'framework', 'principles');

  if (!fs.existsSync(featuresDir)) {
    reportError(featuresDir, 0, 'DAG Structure: framework/features/ directory is missing.', 'Create framework/features/ and populate with P0-01.md through P3-04.md');
    return;
  }
  if (!fs.existsSync(principlesDir)) {
    reportError(principlesDir, 0, 'DAG Structure: framework/principles/ directory is missing.', 'Create framework/principles/ and populate with EP-01.md through EP-19.md');
    return;
  }

  const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.md'));
  const principleFiles = fs.readdirSync(principlesDir).filter(f => f.endsWith('.md'));

  if (featureFiles.length !== EXPECTED_FEATURE_FILES) {
    reportError(featuresDir, 0, `DAG Structure: Expected ${EXPECTED_FEATURE_FILES} feature files, found ${featureFiles.length}.`, `Ensure framework/features/ contains exactly ${EXPECTED_FEATURE_FILES} files (P0-01..P0-11, P1-01..P1-12, P2-01..P2-05, P3-01..P3-04).`);
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
    // Validates that extracted IDs fit logical constraints (P0-1 to P0-8, P1-1 to P1-10, P2-1 to P2-5, P3-1 to P3-4)
    const idRegex = /\b(P\d+(?:-\d+)?)\b/g;
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
      
      if (invalid) {
        reportError(filePath, lineNum, `Invalid Feature ID constraint: "${id}" is out of bounds.`, 'Valid IDs are P0-1..P0-11, P1-1..P1-12, P2-1..P2-5, P3-1..P3-4. See: framework/HE Index.md');
      }
    }

    // 3. Pillar Label Integrity Check
    // Section headings that label a Pillar must use the canonical verb annotation.
    const pillarLabelChecks = [
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

  const args = process.argv.slice(2).filter(a => a !== '--all');
  const allMode = process.argv.includes('--all');
  if (args.length > 0 && !allMode) {
    // Run only on provided files (lint-staged)
    args.forEach(file => {
      if (file.endsWith('.md')) scanFile(path.resolve(file));
    });
  } else {
    // Run globally (or provided defaults)
    const DIRS_TO_SCAN = ['framework', 'research', 'references', 'case-studies'];
    DIRS_TO_SCAN.forEach(dir => {
      walkDir(path.join(repoRoot, dir));
    });
    ['README.md', 'ANCHORS.md', 'CLAUDE.md'].forEach(file => scanFile(path.join(repoRoot, file)));
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
