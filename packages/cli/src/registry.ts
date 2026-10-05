export type Variant = 'nativewind' | 'uniwind';

export const VARIANTS: Variant[] = ['nativewind', 'uniwind'];

// TODO: replace with the real docs domain before publishing the CLI.
export const DEFAULT_REGISTRY_BASE = 'https://rnui.vercel.app/r';

export interface RegistryOptions {
  registry?: string;
}

export function getRegistryBase(opts: RegistryOptions = {}): string {
  const base =
    opts.registry ??
    process.env.RNUI_REGISTRY_BASE_URL ??
    DEFAULT_REGISTRY_BASE;
  return base.replace(/\/+$/, '');
}

export function itemUrl(base: string, variant: Variant, name: string): string {
  const file = name.endsWith('.json') ? name : `${name}.json`;
  return `${base}/${variant}/${file}`;
}
