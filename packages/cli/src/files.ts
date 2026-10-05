import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import * as p from '@clack/prompts';
import type { Variant } from './registry.js';

export const COMPONENTS_JSON = {
  $schema: 'https://ui.shadcn.com/schema.json',
  style: 'default',
  rsc: false,
  tsx: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'global.css',
    baseColor: 'neutral',
    cssVariables: true,
    prefix: '',
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    hooks: '@/hooks',
  },
  iconLibrary: 'lucide',
};

export const BABEL_CONFIG_NATIVEWIND = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
`;

export function metroConfig(variant: Variant): string {
  if (variant === 'uniwind') {
    return `const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
});
`;
  }
  return `const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
`;
}

export interface WriteResult {
  path: string;
  action: 'created' | 'updated' | 'skipped' | 'backed-up';
}

export async function writeWithBackup(
  filePath: string,
  content: string,
  opts: { yes?: boolean; label?: string } = {}
): Promise<WriteResult> {
  const label = opts.label ?? filePath;
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
    return { path: filePath, action: 'created' };
  }
  if (readFileSync(filePath, 'utf8') === content) {
    return { path: filePath, action: 'skipped' };
  }

  const overwrite =
    opts.yes ??
    (await p.confirm({
      message: `${label} already exists with different content. Overwrite? (backup will be saved to ${label}.bak)`,
      initialValue: false,
    }));

  if (p.isCancel(overwrite) || !overwrite) {
    return { path: filePath, action: 'skipped' };
  }

  copyFileSync(filePath, `${filePath}.bak`);
  writeFileSync(filePath, content);
  return { path: filePath, action: 'backed-up' };
}

function stripJsonComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
}

export interface TsconfigResult {
  action: 'updated' | 'skipped' | 'manual';
  note?: string;
}

export async function ensureTsconfigAlias(
  cwd: string,
  _opts: { yes?: boolean } = {}
): Promise<TsconfigResult> {
  const path = join(cwd, 'tsconfig.json');
  if (!existsSync(path))
    return { action: 'manual', note: 'tsconfig.json not found' };

  const raw = readFileSync(path, 'utf8');
  let config: Record<string, unknown>;
  try {
    config = JSON.parse(stripJsonComments(raw));
  } catch {
    return {
      action: 'manual',
      note: 'could not parse tsconfig.json — add "@/*": ["./*"] to compilerOptions.paths manually',
    };
  }

  const compilerOptions = (config.compilerOptions ?? {}) as Record<
    string,
    unknown
  >;
  const paths = (compilerOptions.paths ?? {}) as Record<string, unknown>;
  if (paths['@/*']) return { action: 'skipped' };

  paths['@/*'] = ['./*'];
  compilerOptions.paths = paths;
  config.compilerOptions = compilerOptions;
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
  return { action: 'updated' };
}

export interface AppJsonResult {
  action: 'updated' | 'skipped' | 'manual';
  note?: string;
}

export function ensureAppJsonStyle(cwd: string): AppJsonResult {
  const path = join(cwd, 'app.json');
  if (!existsSync(path))
    return { action: 'manual', note: 'app.json not found' };

  let config: Record<string, unknown>;
  try {
    config = JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {
      action: 'manual',
      note: 'could not parse app.json — set "userInterfaceStyle": "automatic" manually for dark mode',
    };
  }

  const expo = (config.expo ?? {}) as Record<string, unknown>;
  if (expo.userInterfaceStyle === 'automatic') return { action: 'skipped' };

  expo.userInterfaceStyle = 'automatic';
  config.expo = expo;
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
  return { action: 'updated' };
}

const ENTRY_CANDIDATES = [
  'app/_layout.tsx',
  'src/app/_layout.tsx',
  'App.tsx',
  'src/App.tsx',
  'index.ts',
];

export function findEntry(
  cwd: string,
  hasExpoRouter: boolean
): string | undefined {
  const candidates = hasExpoRouter
    ? ENTRY_CANDIDATES
    : [...ENTRY_CANDIDATES.slice(2), ...ENTRY_CANDIDATES.slice(0, 2)];
  return candidates.find((rel) => existsSync(join(cwd, rel)));
}

export interface CssImportResult {
  action: 'added' | 'skipped' | 'manual';
  entry?: string;
  note?: string;
}

export function ensureGlobalCssImport(
  cwd: string,
  hasExpoRouter: boolean
): CssImportResult {
  const entry = findEntry(cwd, hasExpoRouter);
  if (!entry) {
    return {
      action: 'manual',
      note: "entry file not found — add `import './global.css';` to your app entry",
    };
  }

  const abs = join(cwd, entry);
  const src = readFileSync(abs, 'utf8');
  if (src.includes('global.css')) return { action: 'skipped', entry };

  const rel = relative(dirname(abs), join(cwd, 'global.css')).replace(
    /\\/g,
    '/'
  );
  const specifier = rel.startsWith('.') ? rel : `./${rel}`;
  writeFileSync(abs, `import '${specifier}';\n${src}`);
  return { action: 'added', entry };
}
