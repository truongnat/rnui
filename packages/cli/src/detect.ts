import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Variant } from './registry.js';

export type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm';

export interface ProjectInfo {
  cwd: string;
  pkg: Record<string, unknown>;
  isExpo: boolean;
  isRN: boolean;
  packageManager: PackageManager;
  variant?: Variant;
  hasExpoRouter: boolean;
}

function deps(pkg: Record<string, unknown>): Record<string, unknown> {
  return {
    ...(pkg.dependencies as Record<string, unknown> | undefined),
    ...(pkg.devDependencies as Record<string, unknown> | undefined),
  };
}

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'bun.lock')) || existsSync(join(cwd, 'bun.lockb')))
    return 'bun';
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

export function detectProject(cwd = process.cwd()): ProjectInfo {
  const pkgPath = join(cwd, 'package.json');
  if (!existsSync(pkgPath)) {
    throw new Error(
      'No package.json found. Run rnui inside a React Native / Expo project root.'
    );
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const allDeps = deps(pkg);
  const isExpo = 'expo' in allDeps;
  const isRN = isExpo || 'react-native' in allDeps;
  const variant: Variant | undefined =
    'uniwind' in allDeps
      ? 'uniwind'
      : 'nativewind' in allDeps
        ? 'nativewind'
        : undefined;

  return {
    cwd,
    pkg,
    isExpo,
    isRN,
    packageManager: detectPackageManager(cwd),
    variant,
    hasExpoRouter: 'expo-router' in allDeps,
  };
}
