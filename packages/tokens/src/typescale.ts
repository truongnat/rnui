/**
 * Geometric type scale — Astryx-aligned.
 *
 * Sizes follow `round(base * ratio^step)` and line-heights use a tiered target
 * ratio snapped to a 4px vertical grid, so baselines and component heights stay
 * predictable. This runs in parallel with the existing t-shirt `fontSize` scale
 * and typography ramp in `semantic.ts` — it is additive, not a replacement.
 *
 * Reference: https://astryx.atmeta.com/docs/typography
 */

export interface TypeScaleConfig {
  /** Base font size in px (Astryx default: 14). */
  base: number;
  /** Geometric ratio between steps (Astryx default: 1.2). */
  ratio: number;
}

export type TypeScaleStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700';
  letterSpacing?: number;
};

/** Rounds a value to the nearest 4px grid increment. */
function snapTo4(value: number): number {
  return Math.round(value / 4) * 4;
}

/**
 * Compute a grid-aligned line height for a given font size.
 * Tiered target ratio: <20 → 1.5, 20–31 → 1.4, ≥32 → 1.25.
 * Enforces a minimum gap of `fontSize + 4`.
 */
export function computeLineHeight(fontSize: number): number {
  let target: number;
  if (fontSize < 20) target = 1.5;
  else if (fontSize < 32) target = 1.4;
  else target = 1.25;

  const snapped = snapTo4(fontSize * target);
  return Math.max(snapped, fontSize + 4);
}

/** Geometric size at a given step: `round(base * ratio^step)`. */
export function sizeAtStep(config: TypeScaleConfig, step: number): number {
  return Math.round(config.base * config.ratio ** step);
}

/**
 * Semantic step map (relative to `base` at step 0). Mirrors the Astryx ramp
 * where headings/body sit near the base and display types extend above h1.
 */
const STEP_MAP = {
  'display-1': 6,
  'display-2': 5,
  'display-3': 4,
  h1: 4,
  h2: 3,
  h3: 2,
  h4: 1,
  h5: 0,
  h6: -1,
  body: 0,
  label: 0,
  supporting: -1,
} as const;

export type TypeScaleKey = keyof typeof STEP_MAP;

/**
 * Expand a base/ratio config into a full semantic type scale.
 * Display variants use normal weight (400) with tighter leading; headings use
 * semibold (600); body/supporting use normal; label uses medium (500).
 */
export function expandTypeScale(
  config: TypeScaleConfig = { base: 14, ratio: 1.2 }
): Record<TypeScaleKey, TypeScaleStyle> {
  const build = (
    step: number,
    fontWeight: TypeScaleStyle['fontWeight'],
    tightLeading = false
  ): TypeScaleStyle => {
    const fontSize = sizeAtStep(config, step);
    const lineHeight = tightLeading
      ? Math.max(snapTo4(fontSize * 1.2), fontSize + 4)
      : computeLineHeight(fontSize);
    return { fontSize, lineHeight, fontWeight };
  };

  return {
    'display-1': build(STEP_MAP['display-1'], '400', true),
    'display-2': build(STEP_MAP['display-2'], '400', true),
    'display-3': build(STEP_MAP['display-3'], '400', true),
    h1: build(STEP_MAP.h1, '600'),
    h2: build(STEP_MAP.h2, '600'),
    h3: build(STEP_MAP.h3, '600'),
    h4: build(STEP_MAP.h4, '600'),
    h5: build(STEP_MAP.h5, '600'),
    h6: build(STEP_MAP.h6, '600'),
    body: build(STEP_MAP.body, '400'),
    label: build(STEP_MAP.label, '500'),
    supporting: build(STEP_MAP.supporting, '400'),
  };
}

/** Default geometric type scale (base 14, ratio 1.2) — Astryx default. */
export const typeScale = expandTypeScale({ base: 14, ratio: 1.2 });

/** Display-only subset for hero/marketing/data-callout typography. */
export const displayScale = {
  'display-1': typeScale['display-1'],
  'display-2': typeScale['display-2'],
  'display-3': typeScale['display-3'],
} as const;
