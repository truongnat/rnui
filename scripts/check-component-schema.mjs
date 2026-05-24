#!/usr/bin/env node
/**
 * Validates generated component schema JSON artifacts.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const generatedDir = join(root, '.ai/generated');
const distEntry = join(root, 'packages/component-schema/dist/index.mjs');

const requiredFiles = [
  'component-schema.json',
  'web-preview-components.json',
  'native-only-components.json',
];

function fail(message) {
  console.error(`component-schema:check — ${message}`);
  process.exit(1);
}

async function main() {
  for (const file of requiredFiles) {
    try {
      readFileSync(join(generatedDir, file), 'utf8');
    } catch {
      fail(`Missing ${file}. Run: bun run component-schema:generate`);
    }
  }

  const registryJson = JSON.parse(
    readFileSync(join(generatedDir, 'component-schema.json'), 'utf8')
  );

  const components = registryJson.components;
  if (!Array.isArray(components) || components.length === 0) {
    fail('component-schema.json has no components');
  }

  const names = new Set();
  for (const schema of components) {
    if (!schema.name) fail('Component missing name');
    if (names.has(schema.name)) fail(`Duplicate component name: ${schema.name}`);
    names.add(schema.name);

    if (!schema.package || !schema.import || !schema.category || !schema.status) {
      fail(`Component ${schema.name} missing package/import/category/status`);
    }

    if (schema.support?.webPreview && !Array.isArray(schema.props)) {
      fail(`Web preview component ${schema.name} missing props array`);
    }

    const propNames = new Set();
    for (const prop of schema.props ?? []) {
      if (propNames.has(prop.name)) {
        fail(`Duplicate prop "${prop.name}" on ${schema.name}`);
      }
      propNames.add(prop.name);
      if (
        prop.safeForAI === true &&
        prop.type === 'object' &&
        prop.name !== 'action'
      ) {
        fail(
          `Unsafe object prop "${prop.name}" marked safeForAI on ${schema.name}`
        );
      }
    }
  }

  const mod = await import(pathToFileURL(distEntry).href);
  const webFromRegistry = mod
    .listWebPreviewComponents()
    .map((s) => s.name)
    .sort();
  const webFromJson = JSON.parse(
    readFileSync(join(generatedDir, 'web-preview-components.json'), 'utf8')
  ).components.sort();

  if (JSON.stringify(webFromRegistry) !== JSON.stringify(webFromJson)) {
    fail('web-preview-components.json is stale — re-run component-schema:generate');
  }

  console.log(
    `component-schema:check OK — ${components.length} components, ${webFromJson.length} web-preview safe`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
