'use strict';

const path = require('path');
const { spawnSync } = require('child_process');

const headlessDir = path.resolve(__dirname, '..');
process.chdir(headlessDir);

let jestBin;
try {
  jestBin = require.resolve('jest/bin/jest');
} catch {
  console.error(
    '[run-jest] Cannot resolve jest. Run `bun install` from the monorepo root.'
  );
  process.exit(1);
}

const configPath = path.join(headlessDir, 'jest.config.js');
const args = [jestBin, '--config', configPath, ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  cwd: headlessDir,
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
