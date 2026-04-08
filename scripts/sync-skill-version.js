#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(repoRoot, 'package.json');
const skillPath = path.join(repoRoot, '.agent', 'skills', 'harnessing-agents', 'SKILL.md');

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(packageJsonPath)) {
  fail('package.json is missing.');
}

if (!fs.existsSync(skillPath)) {
  fail('.agent/skills/harnessing-agents/SKILL.md is missing.');
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const rootVersion = packageJson.version;

if (!rootVersion || typeof rootVersion !== 'string') {
  fail('package.json does not contain a valid string version.');
}

const original = fs.readFileSync(skillPath, 'utf-8');
if (!original.startsWith('---\n')) {
  fail('SKILL.md is missing YAML frontmatter.');
}

const updated = original.replace(/^version:\s*"[^"]+"\s*$/m, `version: "${rootVersion}"`);

if (updated === original && !/^version:\s*"[^"]+"\s*$/m.test(original)) {
  fail('SKILL.md frontmatter does not contain a version field to sync.');
}

if (updated !== original) {
  fs.writeFileSync(skillPath, updated, 'utf-8');
  console.log(`Synced harnessing-agents skill version to ${rootVersion}.`);
} else {
  console.log(`harnessing-agents skill version already matches ${rootVersion}.`);
}