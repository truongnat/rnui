#!/usr/bin/env node
/**
 * Build RNUI registry items into shadcn-compatible registry-item JSON files.
 *
 * Source:  registry/registry.json (catalog) + registry/shared + registry/variants
 * Output:  docs/public/r/<variant>/<item>.json
 *
 * Resolution rules:
 * - A file entry with `variants: [...]` is only emitted for those variants.
 * - For a `shared/...` src, if `variants/<variant>/...` exists it overrides.
 * - `registryDependencies` bare names are rewritten to absolute URLs when
 *   RNUI_REGISTRY_BASE_URL is set (e.g. https://raw.githubusercontent.com/.../dist -> .../nativewind/utils.json).
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_DIR = join(ROOT, 'registry');
const OUT_DIR = join(ROOT, 'registry', 'dist');
const VARIANTS = ['nativewind', 'uniwind'];
const BASE_URL = (
  process.env.RNUI_REGISTRY_BASE_URL ??
  'https://raw.githubusercontent.com/truongnat/rnui/main/registry/dist'
).replace(/\/$/, '');

const catalog = JSON.parse(
  readFileSync(join(REGISTRY_DIR, 'registry.json'), 'utf8')
);
const brandThemes = loadBrandThemes();

function resolveFile(file, variant) {
  if (file.variants && !file.variants.includes(variant)) return null;

  let src = file.src;
  if (src.startsWith('shared/')) {
    const override = src.replace(/^shared\//, `variants/${variant}/`);
    if (existsSync(join(REGISTRY_DIR, override))) src = override;
  }

  const abs = join(REGISTRY_DIR, src);
  if (!existsSync(abs)) {
    throw new Error(
      `[${variant}] ${file.src}: source file not found at ${src}`
    );
  }

  return {
    path: `registry/${src}`,
    type: file.type,
    target: file.target,
    content: readFileSync(abs, 'utf8'),
  };
}

function resolveRegistryDeps(deps, variant) {
  return deps.map((dep) => {
    if (dep.includes('://') || dep.endsWith('.json') || dep.startsWith('.'))
      return dep;
    if (BASE_URL) return `${BASE_URL}/${variant}/${dep}.json`;
    return dep;
  });
}

// ---- theme generation (registry/themes/<brand>.json → theme-<brand> items) --

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

/** Resolve a color value (hex or rgba()) to [r,g,b] 0–255. */
function toRgb(value, base = [255, 255, 255]) {
  const rgb = hexToRgb(value);
  if (rgb) return rgb;
  const m =
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(
      value.trim()
    );
  if (!m) throw new Error(`unsupported color value: ${value}`);
  const a = m[4] === undefined ? 1 : parseFloat(m[4]);
  return [0, 1, 2].map((i) =>
    Math.round(parseFloat(m[i + 1]) * a + base[i] * (1 - a))
  );
}

function hexToHslChannels(value, base) {
  const [r8, g8, b8] = toRgb(value, base);
  const r = r8 / 255;
  const g = g8 / 255;
  const b = b8 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${(l * 100).toFixed(1)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

function renderNativewindCss(theme) {
  const block = (vars) => {
    const base = toRgb(vars.background ?? '#FFFFFF');
    return Object.entries(vars)
      .map(([k, v]) => `  --${k}: ${hexToHslChannels(v, base)};`)
      .join('\n');
  };
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
${block(theme.light)}
  --radius: ${theme.radius ?? '0.5rem'};
}

.dark:root {
${block(theme.dark)}
}
`;
}

function renderUniwindCss(theme) {
  const block = (vars) => {
    const base = toRgb(vars.background ?? '#FFFFFF');
    return Object.entries(vars)
      .map(([k, v]) => `  --color-${k}: hsl(${hexToHslChannels(v, base)});`)
      .join('\n');
  };
  const r = theme.radius ?? '0.5rem';
  return `@import "tailwindcss";
@import "uniwind";

@theme {
${block(theme.light)}
  --radius-lg: ${r};
  --radius-md: calc(${r} - 2px);
  --radius-sm: calc(${r} - 4px);
}

@layer theme {
  :root {
    @variant light {
${block(theme.light)}
    }

    @variant dark {
${block(theme.dark)}
    }
  }
}
`;
}

const themeRenderers = {
  nativewind: renderNativewindCss,
  uniwind: renderUniwindCss,
};

function loadBrandThemes() {
  const dir = join(REGISTRY_DIR, 'themes');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
}

let emitted = 0;
for (const variant of VARIANTS) {
  const outDir = join(OUT_DIR, variant);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  for (const item of catalog.items) {
    const files = item.files
      .map((f) => resolveFile(f, variant))
      .filter(Boolean);
    if (files.length === 0) continue;

    const out = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: item.name,
      type: item.type,
      ...(item.title && { title: item.title }),
      ...(item.description && { description: item.description }),
      ...(item.registryDependencies?.length && {
        registryDependencies: resolveRegistryDeps(
          item.registryDependencies,
          variant
        ),
      }),
      ...(item.dependencies?.length && { dependencies: item.dependencies }),
      files,
    };

    writeFileSync(
      join(outDir, `${item.name}.json`),
      `${JSON.stringify(out, null, 2)}\n`
    );
    emitted += 1;
    console.log(
      `✓ ${variant}/${item.name}.json (${files.length} file${files.length > 1 ? 's' : ''})`
    );
  }

  // Generated brand themes: theme-<brand>.json (global.css override only)
  for (const theme of brandThemes) {
    const out = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: `theme-${theme.name}`,
      type: 'registry:item',
      title: `Theme: ${theme.title}`,
      description:
        theme.description ??
        `Brand theme "${theme.title}" — overwrites global.css.`,
      files: [
        {
          path: `registry/themes/${theme.name}.json`,
          type: 'registry:theme',
          target: 'global.css',
          content: themeRenderers[variant](theme),
        },
      ],
    };
    writeFileSync(
      join(outDir, `theme-${theme.name}.json`),
      `${JSON.stringify(out, null, 2)}\n`
    );
    emitted += 1;
    console.log(`✓ ${variant}/theme-${theme.name}.json (generated)`);
  }
}

writeFileSync(
  join(OUT_DIR, 'index.json'),
  `${JSON.stringify(
    {
      name: catalog.name,
      homepage: catalog.homepage,
      variants: VARIANTS,
      items: [
        ...catalog.items.map((i) => i.name),
        ...brandThemes.map((t) => `theme-${t.name}`),
      ],
    },
    null,
    2
  )}\n`
);

console.log(
  `\nDone: ${emitted} items → ${OUT_DIR}${BASE_URL ? ` (base: ${BASE_URL})` : ' (bare registryDependencies — set RNUI_REGISTRY_BASE_URL for absolute URLs)'}`
);
