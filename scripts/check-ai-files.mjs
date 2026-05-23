#!/usr/bin/env node
/**
 * Verifies required AI-native metadata files exist.
 * Usage: node scripts/check-ai-files.mjs
 */

import { accessSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const requiredFiles = [
  'AGENTS.md',
  '.claude/CLAUDE.md',
  '.cursor/rules/rnui.mdc',
  '.github/copilot-instructions.md',
  '.ai/rnui.manifest.json',
  '.ai/component-registry.json',
  '.ai/package-map.json',
  '.ai/design-rules.md',
  '.ai/screen-generation.md',
  '.ai/prompts/build-screen.md',
  '.ai/prompts/build-app-flow.md',
  '.ai/prompts/add-component-doc.md',
  '.ai/prompts/review-rnui-usage.md',
  '.ai/prompts/refactor-to-rnui.md',
];

const missing = [];

for (const relativePath of requiredFiles) {
  const absolutePath = join(root, relativePath);
  try {
    accessSync(absolutePath);
  } catch {
    missing.push(relativePath);
  }
}

if (missing.length > 0) {
  console.error('RNUI AI check failed — missing files:\n');
  for (const file of missing) {
    console.error(`  - ${file}`);
  }
  process.exit(1);
}

console.log(`RNUI AI check passed — ${requiredFiles.length} required files present.`);
