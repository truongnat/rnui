'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// If Bun executes this file (e.g. old `bun run` script or turbo PATH), re-exec with real Node so Jest works.
const ranByBun =
  typeof process.versions.bun === 'string' ||
  (process.execPath && /bun/i.test(path.basename(process.execPath)));
if (ranByBun) {
  const nodeCandidates = [
    process.env.NODE_BINARY,
    '/usr/bin/node',
    '/usr/local/bin/node',
    '/opt/homebrew/bin/node',
  ].filter(Boolean);
  for (const nodeBin of nodeCandidates) {
    try {
      if (!fs.existsSync(nodeBin)) continue;
      const r = spawnSync(nodeBin, process.argv.slice(1), {
        stdio: 'inherit',
        cwd: process.cwd(),
        env: process.env,
      });
      process.exit(r.status === null ? 1 : r.status);
    } catch {
      /* next */
    }
  }
  console.error(
    '[run-jest] Running under Bun but no system Node found. Install Node or set NODE_BINARY.'
  );
  process.exit(1);
}

const uiDir = path.resolve(__dirname, '..');
process.chdir(uiDir);

let jestBin;
try {
  jestBin = require.resolve('jest/bin/jest');
} catch {
  console.error(
    '[run-jest] Cannot resolve jest. Run `bun install` from the monorepo root.'
  );
  process.exit(1);
}

const configPath = path.join(uiDir, 'jest.config.js');
const args = [jestBin, '--config', configPath, ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  cwd: uiDir,
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
