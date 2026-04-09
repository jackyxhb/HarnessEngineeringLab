#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(repoRoot, 'framework');
const targetDir = path.join(repoRoot, '.agent', 'skills', 'harnessing-agents', 'framework');

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  fail('framework/ is missing.');
}

if (!fs.statSync(sourceDir).isDirectory()) {
  fail('framework/ exists but is not a directory.');
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log('Synced framework/ to .agent/skills/harnessing-agents/framework/.');