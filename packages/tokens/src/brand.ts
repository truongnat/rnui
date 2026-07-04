/**
 * @truongdq01/tokens — brand.ts
 *
 * A Brand defines a complete color identity:
 *   - Two full ColorGroup objects (light + dark)
 *   - Metadata (name, description, preview swatches)
 *
 * Architecture:
 *   Branch (primitive scale) → Brand (color identity) → Mode (light/dark) → SemanticTokens
 *
 * Components never hardcode color values. They read from SemanticTokens,
 * which are built by merging the base scale with a Brand's color group.
 */

import type { ColorScheme } from './semantic';

/**
 * Categorical + sequential data colors for charts/visualizations.
 * Astryx-aligned: https://astryx.atmeta.com/docs/color
 */
export interface DataColors {
  categorical: {
    blue: string;
    orange: string;
    purple: string;
    green: string;
    pink: string;
    cyan: string;
    red: string;
    teal: string;
    brown: string;
    indigo: string;
  };
  neutral: string;
  /** Sequential ramps (1 = lightest → 5 = darkest). */
  blue: [string, string, string, string, string];
  green: [string, string, string, string, string];
  orange: [string, string, string, string, string];
  pink: [string, string, string, string, string];
  purple: [string, string, string, string, string];
  red: [string, string, string, string, string];
  teal: [string, string, string, string, string];
  yellow: [string, string, string, string, string];
  gray: [string, string, string, string, string];
}

/** Syntax-highlighting colors for code surfaces. */
export interface SyntaxColors {
  keyword: string;
  string: string;
  comment: string;
  number: string;
  function: string;
  type: string;
  variable: string;
  operator: string;
  constant: string;
  tag: string;
  attribute: string;
  property: string;
  punctuation: string;
  background: string;
}

// ─── Color Group — the "color" section of SemanticTokens ─────────
// A Brand must supply a full ColorGroup for each mode.
export interface BrandColorGroup {
  bg: {
    default: string;
    subtle: string;
    muted: string;
    emphasis: string;
    inverse: string;
    overlay: string;
    hover: string;
    disabled: string;
    /** Astryx overlay interaction states (optional; defaulted). */
    overlayHover?: string;
    overlayPressed?: string;
  };
  surface: {
    default: string;
    raised: string;
    overlay: string;
    sunken: string;
    hover: string;
    disabled: string;
    glass?: string;
    glassBorder?: string;
    /**
     * Astryx surface hierarchy: body → surface → card → popover.
     * Optional; `fillColorDefaults` derives sensible values when omitted.
     */
    card?: string;
    popover?: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    muted: string; // Alias for tertiary
    disabled: string;
    inverse: string;
    link: string;
    visited?: string;
    selected?: string;
    onBrand: string;
    onAccent: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    emphasis?: string; // High contrast border
    input: string;
    focus: string;
    error: string;
    success?: string;
    warning?: string;
    info?: string;
  };
  brand: {
    default: string;
    primary: string; // Alias for default
    hover: string;
    active: string;
    subtle: string;
    muted: string;
    text: string;
  };
  accent: {
    default: string;
    secondary: string; // Alias for default
    hover: string;
    active: string;
    subtle: string;
    muted: string;
    text: string;
    onAccent: string;
  };
  /** Semantic status group alias for direct access */
  status: {
    success: string;
    warning: string;
    error: string;
    danger: string; // Alias for error
    info: string;
  };
  success: {
    bg: string;
    text: string;
    border: string;
    icon: string;
    emphasis?: string;
  };
  warning: {
    bg: string;
    text: string;
    border: string;
    icon: string;
    emphasis?: string;
  };
  error: {
    bg: string;
    text: string;
    border: string;
    icon: string;
    emphasis?: string;
  };
  info: {
    bg: string;
    text: string;
    border: string;
    icon: string;
    emphasis?: string;
  };
  /** Loading placeholder fill (optional; defaulted). */
  skeleton?: string;
  /** Track color for sliders/progress rails (optional; defaulted). */
  track?: string;
  /** Subtle tint applied on hover (optional; defaulted). */
  tintHover?: string;
  /** Categorical + sequential data colors for charts (optional; defaulted). */
  data?: DataColors;
  /** Syntax highlighting colors for code surfaces (optional; defaulted). */
  syntax?: SyntaxColors;
}

// ─── Brand — the root plugin unit ────────────────────────────────
export interface Brand {
  /** Unique identifier, e.g. "love", "ocean" */
  id: string;
  /** Display name, e.g. "Love" */
  name: string;
  /** Short description */
  description: string;
  /** Preview swatches for brand pickers */
  preview: {
    primary: string;
    secondary: string;
    background: string;
  };
  /** Full color group for light mode */
  light: BrandColorGroup;
  /** Full color group for dark mode */
  dark: BrandColorGroup;
  /** Optional font family override (e.g. midnight → monospace) */
  fontFamily?: {
    sans?: string;
    mono?: string;
  };
  /** Optional style overrides (e.g. button radius per brand) */
  style?: {
    buttonRadius?: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────

/**
 * Type-safe factory for defining a brand.
 * Ensures both light and dark modes are fully specified.
 *
 * @example
 * const myBrand = defineBrand({
 *   id: "ocean",
 *   name: "Ocean",
 *   description: "Teal & Cyan",
 *   preview: { primary: "#0D9488", secondary: "#06B6D4", background: "#F0FDFA" },
 *   light: { ... },
 *   dark: { ... },
 * });
 */
export function defineBrand(brand: Brand): Brand {
  return brand;
}

/**
 * Get the color group for the active color scheme.
 */
export function getBrandColors(
  brand: Brand,
  scheme: ColorScheme
): BrandColorGroup {
  return scheme === 'dark' ? brand.dark : brand.light;
}
