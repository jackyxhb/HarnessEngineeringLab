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
  const preventionPath = path.join(repoRoot, 'framework', 'HE Prevention Checklist.md');
  if (fs.existsSync(preventionPath)) {
    const lines = fs.readFileSync(preventionPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const match = line.match(/^##\s+(.*)$/);
      if (match && !line.includes('Checklist')) {
        anchorsMap.set(match[1].trim(), 'HE Prevention Checklist.md');
      }
    });
  }

  // 3. Extract Feature IDs and Names from Core Features
  const coreSasPath = path.join(repoRoot, 'framework', 'Core Features for SAS.md');
  if (fs.existsSync(coreSasPath)) {
    const lines = fs.readFileSync(coreSasPath, 'utf-8').split('\n');
    // F1, P1-1 logic needs to be inferred or structured, since the markdown uses bullets, 
    // we'll assign generic bounds logic rather than strict extraction, 
    // but we can extract bold terms: * **Feature Name:**
    // Actually, setting generic bounds is safer for IDs.
  }
}

let hasErrors = false;

function reportError(filePath, lineNum, message) {
  hasErrors = true;
  console.error(`\x1b[31m[HE-LINT]\x1b[0m ${path.basename(filePath)}:${lineNum > 0 ? lineNum : 'ALL'} -> ${message}`);
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
      if (match[1] !== "28") {
        reportError(filePath, lineNum, `Number Bias: Detected "${match[0]}" instead of the canonical 28.`);
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
        if (pillar === 0 && (num < 1 || num > 9)) invalid = true;
        if (pillar === 1 && (num < 1 || num > 10)) invalid = true;
        if (pillar === 2 && (num < 1 || num > 5)) invalid = true;
        if (pillar === 3 && (num < 1 || num > 4)) invalid = true;
        if (pillar < 0 || pillar > 3) invalid = true;
      } else {
        // just P0, P1, P2, P3 is valid
        const pillar = parseInt(id.replace('P', ''), 10);
        if (pillar < 0 || pillar > 3) invalid = true;
      }
      
      if (invalid) {
        reportError(filePath, lineNum, `Invalid Feature ID constraint: "${id}" is out of bounds.`);
      }
    }
  });

  // 3. Generic Orphan Concept Check
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
        reportError(filePath, 0, `Orphan Concept Gap: Mentions dynamic concept "${concept}" but fails to link back to canonical source: ${sourceDoc}`);
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

  const args = process.argv.slice(2);
  if (args.length > 0) {
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
