import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as p from '@clack/prompts';
import { detectProject } from '../detect.js';
import {
  getRegistryBase,
  itemUrl,
  VARIANTS,
  type RegistryOptions,
  type Variant,
} from '../registry.js';
import {
  BABEL_CONFIG_NATIVEWIND,
  COMPONENTS_JSON,
  ensureAppJsonStyle,
  ensureGlobalCssImport,
  ensureTsconfigAlias,
  metroConfig,
  writeWithBackup,
} from '../files.js';

export interface InitOptions extends RegistryOptions {
  variant?: Variant;
  yes?: boolean;
}

const ICON_DEPS = ['lucide-react-native', 'react-native-svg'];

const ENGINE_DEPS: Record<Variant, string[]> = {
  nativewind: [
    'nativewind',
    'tailwindcss@^3.4',
    'react-native-reanimated',
    'react-native-worklets',
    ...ICON_DEPS,
  ],
  uniwind: ['uniwind', 'tailwindcss', ...ICON_DEPS],
};

function installDeps(
  info: ReturnType<typeof detectProject>,
  deps: string[]
): boolean {
  const cmd = info.isExpo
    ? { bin: 'npx', args: ['expo', 'install', ...deps] }
    : info.packageManager === 'bun'
      ? { bin: 'bun', args: ['add', ...deps] }
      : info.packageManager === 'pnpm'
        ? { bin: 'pnpm', args: ['add', ...deps] }
        : info.packageManager === 'yarn'
          ? { bin: 'yarn', args: ['add', ...deps] }
          : { bin: 'npm', args: ['install', ...deps] };

  const res = spawnSync(cmd.bin, cmd.args, { stdio: 'inherit', cwd: info.cwd });
  return res.status === 0;
}

export async function init(opts: InitOptions = {}): Promise<number> {
  p.intro('rnui init — shadcn-style components for React Native');

  const info = detectProject();
  if (!info.isRN) {
    p.log.error(
      'No `expo` or `react-native` dependency found — run inside a React Native project.'
    );
    return 1;
  }
  if (!info.isExpo) {
    p.log.warn(
      'Bare React Native detected — init is tuned for Expo; verify babel/metro output manually.'
    );
  }

  const variant: Variant =
    opts.variant ??
    info.variant ??
    (await (async () => {
      const picked = await p.select({
        message: 'Styling engine?',
        options: VARIANTS.map((v) => ({
          value: v,
          label: v,
          hint:
            v === 'uniwind'
              ? 'Tailwind v4, CSS-first, metro only'
              : 'Tailwind v3, babel preset',
        })),
      });
      if (p.isCancel(picked)) {
        p.cancel('Cancelled');
        process.exit(0);
      }
      return picked as Variant;
    })());

  // 1. Engine deps
  const spinner = p.spinner();
  spinner.start(`Installing ${ENGINE_DEPS[variant].join(', ')}`);
  if (!installDeps(info, ENGINE_DEPS[variant])) {
    spinner.stop('Dependency install failed');
    p.log.error('Install the packages manually, then re-run `rnui init`.');
    return 1;
  }
  spinner.stop('Dependencies installed');

  // 2. Config files (backup + confirm when overwriting)
  const results: string[] = [];
  const write = async (file: string, content: string) => {
    const r = await writeWithBackup(join(info.cwd, file), content, {
      yes: opts.yes,
      label: file,
    });
    results.push(`${file} — ${r.action}`);
  };

  if (variant === 'nativewind')
    await write('babel.config.js', BABEL_CONFIG_NATIVEWIND);
  await write('metro.config.js', metroConfig(variant));
  await write(
    'components.json',
    `${JSON.stringify(COMPONENTS_JSON, null, 2)}\n`
  );

  const tsconfig = await ensureTsconfigAlias(info.cwd, { yes: opts.yes });
  results.push(
    `tsconfig.json — ${tsconfig.action}${tsconfig.note ? ` (${tsconfig.note})` : ''}`
  );
  const appJson = ensureAppJsonStyle(info.cwd);
  results.push(
    `app.json — ${appJson.action}${appJson.note ? ` (${appJson.note})` : ''}`
  );
  p.log.step(`Config: ${results.join('; ')}`);

  // 3. Theme files via the registry (same path consumers use)
  const existingGlobalCss = join(info.cwd, 'global.css');
  if (
    existsSync(existingGlobalCss) &&
    readFileSync(existingGlobalCss, 'utf8').trim().length > 0
  ) {
    p.log.warn(
      'global.css already has content — skipping theme install. Merge theme vars manually (see registry/templates/setup.md).'
    );
  } else {
    const themeUrl = itemUrl(getRegistryBase(opts), variant, 'theme');
    const theme = spawnSync(
      'npx',
      ['--yes', 'shadcn@latest', 'add', '--yes', themeUrl],
      {
        stdio: 'inherit',
        cwd: info.cwd,
      }
    );
    if (theme.status !== 0) {
      p.log.warn(
        'Theme install via registry failed — fetch files manually (see registry/templates/setup.md).'
      );
    }
  }

  // 4. global.css import in app entry
  const css = ensureGlobalCssImport(info.cwd, info.hasExpoRouter);
  if (css.action === 'added')
    p.log.step(`Added global.css import to ${css.entry}`);
  else if (css.action === 'manual')
    p.log.warn(css.note ?? 'Add the global.css import manually.');

  p.outro(
    `Done. Add components: npx @rnui/cli add button  (variant: ${variant})`
  );
  return 0;
}
