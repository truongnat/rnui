#!/usr/bin/env node
/**
 * Surface visibility contrast audit for RNUI semantic tokens.
 * Run after build: bun run build && bun run surface:audit
 */

import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distEntry = join(root, 'packages/tokens/dist/index.mjs');

const MIN_LUMINANCE_DELTA = 0.025;
const MIN_BORDER_DELTA = 0.04;
const MIN_STATUS_BG_DELTA = 0.03;

function fail(message) {
  console.error(`\nsurface:audit — FAIL: ${message}`);
  process.exit(1);
}

function parseHex(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) return null;
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
    a: 1,
  };
}

function parseRgb(input) {
  const rgba =
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/.exec(
      input
    );
  if (!rgba) return null;
  return {
    r: Number(rgba[1]),
    g: Number(rgba[2]),
    b: Number(rgba[3]),
    a: rgba[4] !== undefined ? Number(rgba[4]) : 1,
  };
}

function parseColor(input) {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (trimmed.startsWith('#')) return parseHex(trimmed);
  if (trimmed.startsWith('rgb')) return parseRgb(trimmed);
  return null;
}

function blendOverBackground(fg, bg) {
  const a = fg.a ?? 1;
  if (a >= 1) return fg;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function relativeLuminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function luminanceDelta(a, b) {
  return Math.abs(relativeLuminance(a) - relativeLuminance(b));
}

function resolveTokenColor(value, canvasRgb) {
  const parsed = parseColor(value);
  if (!parsed) return null;
  return blendOverBackground(parsed, canvasRgb);
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function checkPair(label, fgValue, bgValue, canvasRgb, options = {}) {
  const {
    minDelta = MIN_LUMINANCE_DELTA,
    kind = 'surface',
  } = options;

  const fg = resolveTokenColor(fgValue, canvasRgb);
  const bg = resolveTokenColor(bgValue, canvasRgb);

  if (!fg || !bg) {
    return {
      label,
      fg: fgValue,
      bg: bgValue,
      delta: null,
      ratio: null,
      level: 'skip',
      note: 'unparsed color',
    };
  }

  const delta = luminanceDelta(fg, bg);
  const ratio = contrastRatio(relativeLuminance(fg), relativeLuminance(bg));
  const equal =
    rgbToHex(fg) === rgbToHex(bg) ||
    (typeof fgValue === 'string' &&
      typeof bgValue === 'string' &&
      fgValue.toLowerCase() === bgValue.toLowerCase());

  let level = 'ok';
  let note = '';

  if (equal) {
    level = 'fail';
    note = 'identical token values';
  } else if (delta < minDelta) {
    level = 'warn';
    note = `weak luminance delta (${delta.toFixed(3)} < ${minDelta})`;
  } else if (kind === 'border' && delta < MIN_BORDER_DELTA) {
    level = 'warn';
    note = `border may be faint (delta ${delta.toFixed(3)})`;
  }

  return { label, fg: fgValue, bg: bgValue, delta, ratio, level, note };
}

function printTable(mode, rows) {
  console.log(`\n${'─'.repeat(72)}`);
  console.log(` ${mode} mode surface pairs`);
  console.log(`${'─'.repeat(72)}`);
  console.log(
    `${'Pair'.padEnd(36)} ${'ΔL'.padStart(6)} ${'Ratio'.padStart(7)} ${'Status'.padStart(8)}`
  );
  console.log(`${'─'.repeat(72)}`);

  for (const row of rows) {
    if (row.level === 'skip') {
      console.log(`${row.label.padEnd(36)} ${'—'.padStart(6)} ${'—'.padStart(7)} skip`);
      continue;
    }
    const deltaStr = row.delta?.toFixed(3) ?? '—';
    const ratioStr = row.ratio?.toFixed(2) ?? '—';
    const status =
      row.level === 'fail' ? 'FAIL' : row.level === 'warn' ? 'WARN' : 'OK';
    console.log(
      `${row.label.padEnd(36)} ${deltaStr.padStart(6)} ${ratioStr.padStart(7)} ${status.padStart(8)}`
    );
    if (row.note && row.level !== 'ok') {
      console.log(`  ↳ ${row.note}`);
    }
  }
}

function auditMode(modeName, tokens) {
  const c = tokens.color;
  const canvas = parseColor(c.bg.default) ?? { r: 255, g: 255, b: 255, a: 1 };
  const white = { r: 255, g: 255, b: 255, a: 1 };

  const pairs = [
    checkPair('bg.default vs surface.default', c.surface.default, c.bg.default, canvas),
    checkPair('bg.default vs surface.raised', c.surface.raised, c.bg.default, canvas),
    checkPair('bg.default vs surface.sunken', c.surface.sunken, c.bg.default, canvas),
    checkPair(
      'surface.default vs surface.raised',
      c.surface.raised,
      c.surface.default,
      white
    ),
    checkPair(
      'surface.default vs border.default',
      c.border.default,
      c.surface.default,
      white,
      { kind: 'border', minDelta: MIN_BORDER_DELTA }
    ),
    checkPair(
      'surface.default vs border.subtle',
      c.border.subtle,
      c.surface.default,
      white,
      { kind: 'border', minDelta: MIN_BORDER_DELTA }
    ),
    checkPair(
      'surface.default vs border.input',
      c.border.input,
      c.surface.default,
      white,
      { kind: 'border', minDelta: MIN_BORDER_DELTA }
    ),
    checkPair(
      'surface.raised vs border.default (card nest)',
      c.border.default,
      c.surface.raised,
      white,
      { kind: 'border', minDelta: MIN_BORDER_DELTA }
    ),
    checkPair(
      'success.bg vs surface.default',
      c.success.bg,
      c.surface.default,
      white,
      { minDelta: MIN_STATUS_BG_DELTA }
    ),
    checkPair(
      'warning.bg vs surface.default',
      c.warning.bg,
      c.surface.default,
      white,
      { minDelta: MIN_STATUS_BG_DELTA }
    ),
    checkPair(
      'error.bg vs surface.default',
      c.error.bg,
      c.surface.default,
      white,
      { minDelta: MIN_STATUS_BG_DELTA }
    ),
    checkPair(
      'info.bg vs surface.default',
      c.info.bg,
      c.surface.default,
      white,
      { minDelta: MIN_STATUS_BG_DELTA }
    ),
    checkPair(
      'surface.disabled vs bg.default',
      c.surface.disabled,
      c.bg.default,
      canvas
    ),
    checkPair(
      'glassBorder vs surface.glass',
      c.surface.glassBorder,
      c.surface.glass,
      canvas,
      { kind: 'border', minDelta: 0.02 }
    ),
  ];

  printTable(modeName, pairs);

  const fails = pairs.filter((p) => p.level === 'fail');
  const warns = pairs.filter((p) => p.level === 'warn');
  return { fails, warns };
}

async function main() {
  if (!existsSync(distEntry)) {
    fail(
      `Missing ${distEntry}. Run: bun run build (packages/tokens must be compiled first).`
    );
  }

  const { lightTokens, darkTokens } = await import(pathToFileURL(distEntry).href);

  console.log('RNUI surface visibility audit');
  console.log(`Tokens: ${distEntry}`);

  const light = auditMode('Light', lightTokens);
  const dark = auditMode('Dark', darkTokens);

  let brandFails = [];
  let brandWarns = [];
  const themesEntry = join(root, 'packages/themes/dist/index.mjs');
  if (existsSync(themesEntry)) {
    const { allBrands } = await import(pathToFileURL(themesEntry).href);
    console.log(`\n${'─'.repeat(72)}`);
    console.log(' Brand themes (light mode)');
    console.log(`${'─'.repeat(72)}`);
    for (const brand of allBrands) {
      const c = brand.light;
      const canvas = parseColor(c.bg.default) ?? { r: 255, g: 255, b: 255, a: 1 };
      const white = { r: 255, g: 255, b: 255, a: 1 };
      const pairs = [
        checkPair(
          `${brand.id}: bg vs surface.default`,
          c.surface.default,
          c.bg.default,
          canvas
        ),
        checkPair(
          `${brand.id}: surface.default vs raised`,
          c.surface.raised,
          c.surface.default,
          white
        ),
      ];
      for (const row of pairs) {
        const status =
          row.level === 'fail' ? 'FAIL' : row.level === 'warn' ? 'WARN' : 'OK';
        console.log(` ${row.label.padEnd(34)} ${status}`);
        if (row.note && row.level !== 'ok') {
          console.log(`   ↳ ${row.note}`);
        }
      }
      brandFails.push(...pairs.filter((p) => p.level === 'fail'));
      brandWarns.push(...pairs.filter((p) => p.level === 'warn'));
    }
  } else {
    console.log('\nBrand audit skipped — themes dist missing (run bun run build).');
  }

  const totalFails =
    light.fails.length + dark.fails.length + brandFails.length;
  const totalWarns =
    light.warns.length + dark.warns.length + brandWarns.length;

  console.log(`\n${'─'.repeat(72)}`);
  console.log(` Summary: ${totalFails} critical failure(s), ${totalWarns} warning(s)`);
  console.log(`${'─'.repeat(72)}`);

  if (totalWarns > 0) {
    console.log(
      '\nWarnings are informational — review nested surfaces and brand themes on device.'
    );
  }

  if (totalFails > 0) {
    console.error('\nCritical pairs collapsed — fix semantic tokens before release.');
    for (const f of [...light.fails, ...dark.fails, ...brandFails]) {
      console.error(`  • ${f.label}: ${f.note}`);
    }
    process.exit(1);
  }

  console.log('\nsurface:audit — PASS');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
