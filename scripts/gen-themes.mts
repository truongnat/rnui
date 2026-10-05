#!/usr/bin/env bun
/**
 * Generate registry/themes/<brand>.json from packages/themes brand presets.
 *
 * Maps RNUI token names → shadcn semantic CSS var names (hex values kept as-is;
 * the registry builder converts to HSL channels at emit time).
 *
 * Run: bun scripts/gen-themes.mts
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const THEMES_OUT = join(ROOT, 'registry', 'themes');

type Scheme = Record<string, Record<string, string>>;

function mapScheme(s: Scheme): Record<string, string> {
  return {
    background: s.bg.default,
    foreground: s.text.primary,
    card: s.surface.card,
    'card-foreground': s.text.primary,
    popover: s.surface.popover,
    'popover-foreground': s.text.primary,
    primary: s.brand.primary,
    'primary-foreground': s.text.onBrand,
    secondary: s.bg.muted,
    'secondary-foreground': s.text.primary,
    muted: s.bg.muted,
    'muted-foreground': s.text.muted,
    accent: s.accent.subtle,
    'accent-foreground': s.accent.text,
    destructive: s.status.error,
    'destructive-foreground': '#FFFFFF',
    border: s.border.subtle,
    input: s.border.input,
    ring: s.border.focus,
  };
}

const brandsDir = join(ROOT, 'packages', 'themes', 'src', 'brands');
const files = readdirSync(brandsDir).filter((f) => f.endsWith('.ts'));

mkdirSync(THEMES_OUT, { recursive: true });

interface Brand {
  id: string;
  name: string;
  description?: string;
  light: Scheme;
  dark: Scheme;
}

for (const file of files) {
  const mod = await import(join(brandsDir, file));
  const brand = Object.values(mod).find(
    (v): v is Brand =>
      !!v && typeof v === 'object' && 'light' in v && 'dark' in v
  );
  if (!brand) {
    console.warn(`skip ${file}: no brand export found`);
    continue;
  }
  const theme = {
    name: brand.id,
    title: brand.name,
    description: brand.description,
    radius: '0.5rem',
    light: mapScheme(brand.light),
    dark: mapScheme(brand.dark),
  };
  writeFileSync(
    join(THEMES_OUT, `${brand.id}.json`),
    `${JSON.stringify(theme, null, 2)}\n`
  );
  console.log(`✓ themes/${brand.id}.json (${brand.name})`);
}
