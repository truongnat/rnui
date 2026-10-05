import * as p from '@clack/prompts';
import {
  getRegistryBase,
  VARIANTS,
  type RegistryOptions,
} from '../registry.js';

interface CatalogIndex {
  name: string;
  homepage?: string;
  variants: string[];
  items: string[];
}

export async function list(opts: RegistryOptions = {}): Promise<number> {
  const base = getRegistryBase(opts);
  const res = await fetch(`${base}/index.json`);
  if (!res.ok) {
    p.log.error(
      `Failed to fetch registry index: ${res.status} ${res.statusText} (${base})`
    );
    return 1;
  }
  const index = (await res.json()) as CatalogIndex;

  p.log.info(
    `${index.name} — ${index.items.length} items × variants: ${index.variants.join(', ')}`
  );
  for (const item of index.items) {
    p.log.step(item);
  }
  p.log.info(
    `Add with: npx shadcn add ${base}/<${VARIANTS.join('|')}>/<item>.json`
  );
  return 0;
}
