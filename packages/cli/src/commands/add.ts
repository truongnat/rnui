import { spawnSync } from 'node:child_process';
import * as p from '@clack/prompts';
import { detectProject } from '../detect.js';
import {
  getRegistryBase,
  itemUrl,
  type RegistryOptions,
  type Variant,
} from '../registry.js';

export interface AddOptions extends RegistryOptions {
  variant?: Variant;
  yes?: boolean;
}

export async function add(
  items: string[],
  opts: AddOptions = {}
): Promise<number> {
  if (items.length === 0) {
    p.log.error('Usage: rnui add <component> [component...]');
    return 1;
  }

  const info = detectProject();
  const variant = opts.variant ?? info.variant;
  if (!variant) {
    p.log.error(
      'Could not detect styling engine — neither `nativewind` nor `uniwind` is installed. Run `rnui init` first or pass --variant.'
    );
    return 1;
  }

  const base = getRegistryBase(opts);
  // theme-* items also target global.css, which every ui item's `theme`
  // registryDependency writes too — add them in a second pass so the brand
  // theme wins instead of losing shadcn's same-target dedup.
  const themes = items.filter((n) => n.startsWith('theme-'));
  const components = items.filter((n) => !n.startsWith('theme-'));

  const shadcnFlags: string[] = [];
  if (opts.yes) shadcnFlags.push('--yes', '--overwrite');

  if (components.length > 0) {
    p.log.info(`Adding ${components.join(', ')} (${variant}) via shadcn`);
    const urls = components.map((name) => itemUrl(base, variant, name));
    const result = spawnSync(
      'npx',
      ['--yes', 'shadcn@latest', 'add', ...shadcnFlags, ...urls],
      { stdio: 'inherit', cwd: info.cwd }
    );
    if (result.status !== 0) return result.status ?? 1;
  }

  for (const name of themes) {
    p.log.info(`Applying theme ${name} (${variant})`);
    const result = spawnSync(
      'npx',
      [
        '--yes',
        'shadcn@latest',
        'add',
        ...shadcnFlags,
        itemUrl(base, variant, name),
      ],
      { stdio: 'inherit', cwd: info.cwd }
    );
    if (result.status !== 0) return result.status ?? 1;
  }

  return 0;
}
