#!/usr/bin/env node
/**
 * Generates AI-readable JSON from @truongdq01/component-schema dist output.
 * Run after: bun run build (in packages/component-schema)
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '.ai/generated');
const distEntry = join(root, 'packages/component-schema/dist/index.mjs');

async function main() {
  const mod = await import(pathToFileURL(distEntry).href);

  const schemas = mod.listComponentSchemas();
  const webPreview = mod.listWebPreviewComponents();
  const nativeOnly = schemas.filter((s) => !s.support.webPreview);

  mkdirSync(outDir, { recursive: true });

  writeFileSync(
    join(outDir, 'component-schema.json'),
    `${JSON.stringify({ version: '1', generatedAt: new Date().toISOString(), components: schemas }, null, 2)}\n`
  );

  writeFileSync(
    join(outDir, 'web-preview-components.json'),
    `${JSON.stringify({ version: '1', generatedAt: new Date().toISOString(), components: webPreview.map((s) => s.name) }, null, 2)}\n`
  );

  writeFileSync(
    join(outDir, 'native-only-components.json'),
    `${JSON.stringify(
      {
        version: '1',
        generatedAt: new Date().toISOString(),
        components: nativeOnly.map((s) => ({
          name: s.name,
          status: s.status,
          reason: s.support.reason,
          docsPath: s.docsPath,
        })),
      },
      null,
      2
    )}\n`
  );

  console.log(`Wrote ${schemas.length} component schemas to .ai/generated/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
