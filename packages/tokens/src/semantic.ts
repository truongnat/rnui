import type { Brand, BrandColorGroup } from './brand';
import { getBrandColors } from './brand';
import { primitive } from './primitive';

/**
 * Semantic tokens — maps raw primitives to design intent.
 * Supports light and dark mode.
 * RULE: Components import from here, never from primitive.
 */

const {
  color,
  spacing,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  opacity,
  zIndex,
  elevation,
  focusRing,
} = primitive;

// ─── Shared (mode-independent) ───────────────────────────────────
const shared = {
  spacing,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  opacity,
  zIndex,
  elevation,
  focusRing,

  fontFamily: {
    /** Omit / undefined = system default sans */
    sans: undefined as string | undefined,
    mono: undefined as string | undefined,
  },

  /**
   * Composite typography ramp — IMPROVEMENT_PLAN.md Issue #2 (mode-independent).
   * Consumed by `typographyTokens()` in `component.ts` (plus subtitle/button variants).
   */
  typography: {
    display: {
      fontSize: 34,
      fontWeight: '700' as const,
      lineHeight: 40,
      letterSpacing: -0.4,
    },
    h1: { fontSize: 28, fontWeight: '600' as const, lineHeight: 36 },
    h2: { fontSize: 22, fontWeight: '500' as const, lineHeight: 30 },
    h3: { fontSize: 20, fontWeight: '500' as const, lineHeight: 28 },
    h4: { fontSize: 18, fontWeight: '500' as const, lineHeight: 26 },
    h5: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
    h6: { fontSize: 14, fontWeight: '500' as const, lineHeight: 22 },
    body1: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    body2: { fontSize: 14, fontWeight: '400' as const, lineHeight: 22 },
    caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 18 },
    overline: {
      fontSize: 11,
      fontWeight: '700' as const,
      lineHeight: 16,
      letterSpacing: 1.2,
      textTransform: 'uppercase' as const,
    },
    label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
    code: {
      fontSize: 13,
      fontWeight: '400' as const,
      fontFamily: 'monospace' as const,
      lineHeight: 20,
    },
  },

  // Typography styles (composite)
  text: {
    xs: {
      fontSize: fontSize.xs,
      lineHeight: fontSize.xs * lineHeight.normal,
      fontWeight: fontWeight.regular,
    },
    sm: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * lineHeight.normal,
      fontWeight: fontWeight.regular,
    },
    md: {
      fontSize: fontSize.md,
      lineHeight: fontSize.md * lineHeight.normal,
      fontWeight: fontWeight.regular,
    },
    lg: {
      fontSize: fontSize.lg,
      lineHeight: fontSize.lg * lineHeight.normal,
      fontWeight: fontWeight.regular,
    },
    xl: {
      fontSize: fontSize.xl,
      lineHeight: fontSize.xl * lineHeight.snug,
      fontWeight: fontWeight.medium,
    },
    '2xl': {
      fontSize: fontSize['2xl'],
      lineHeight: fontSize['2xl'] * lineHeight.snug,
      fontWeight: fontWeight.medium,
    },
    '3xl': {
      fontSize: fontSize['3xl'],
      lineHeight: fontSize['3xl'] * lineHeight.tight,
      fontWeight: fontWeight.semibold,
    },
    '4xl': {
      fontSize: fontSize['4xl'],
      lineHeight: fontSize['4xl'] * lineHeight.tight,
      fontWeight: fontWeight.bold,
    },
  },
} as const;

// ─── Light mode ──────────────────────────────────────────────────
export const lightTokens = {
  ...shared,

  color: {
    // Backgrounds
    bg: {
      // Soft premium app canvas — slight violet warmth, not flat gray
      default: '#F3F1F8',
      subtle: '#ECE8F4',
      muted: color.gray[200],
      emphasis: color.gray[300],
      inverse: color.gray[900],
      overlay: 'rgba(15,23,42,0.32)',
      hover: '#E8E4F0',
      disabled: '#ECE8F4',
    },
    // Surfaces (cards, sheets, modals)
    surface: {
      default: color.white,
      raised: '#FAFAFE',
      overlay: '#FAFAFE',
      sunken: '#E8E4F0',
      hover: '#F8F6FC',
      disabled: '#ECE8F4',
      glass: 'rgba(255,255,255,0.88)',
      glassBorder: 'rgba(30,27,75,0.18)',
    },
    text: {
      primary: color.gray[800],
      secondary: color.gray[600],
      tertiary: color.gray[500],
      muted: color.gray[500],
      disabled: color.gray[400],
      inverse: color.white,
      link: color.brand[700], // #6D28D9
      visited: color.brand[900], // #4C1D95
      selected: color.brand[800], // #5B21B6
      onBrand: color.white, // text on violet backgrounds
      onAccent: '#1C1917', // text on amber backgrounds
      success: color.green[900],
      warning: color.amber[900],
      error: color.red[900],
      info: color.blue[900],
    },
    border: {
      default: '#CDC4DE',
      subtle: '#DAD2E6',
      strong: color.gray[400],
      emphasis: color.gray[600],
      input: '#C2B8D0',
      focus: color.brand[600],
      error: color.red[600], // #DC2626
      success: color.green[500],
      warning: color.amber[500],
      info: color.blue[500],
    },
    // Brand — Violet
    brand: {
      default: color.brand[600], // #7C3AED — 5.7x on white ✅
      primary: color.brand[600], // Alias for default
      hover: color.brand[700], // #6D28D9
      active: color.brand[800], // #5B21B6
      subtle: color.brand[100], // #EDE9FE
      muted: color.brand[200], // #DDD6FE
      text: color.brand[700], // #6D28D9
    },
    // Accent — Amber (CTAs, highlights)
    accent: {
      default: color.amber[500], // #F59E0B
      secondary: color.amber[500], // Alias for default
      hover: color.amber[600], // #D97706
      active: color.amber[700], // #B45309
      subtle: color.amber[100],
      muted: color.amber[200], // #FDE68A — borders / secondary accent fill
      text: color.amber[800], // #92400E — 5.0x on white ✅
      onAccent: '#1C1917', // near-black text on amber bg
    },
    // Feedback - Max visibility, high contrast
    success: {
      bg: color.green[100],
      text: color.green[800],
      border: color.green[300],
      icon: color.green[600],
      emphasis: color.green[700],
    },
    warning: {
      bg: color.amber[100],
      text: color.amber[900],
      border: color.amber[300],
      icon: color.amber[600],
      emphasis: color.amber[700],
    },
    error: {
      bg: color.red[100],
      text: color.red[800],
      border: color.red[300],
      icon: color.red[600],
      emphasis: color.red[700],
    },
    info: {
      bg: color.blue[100],
      text: color.blue[800],
      border: color.blue[300],
      icon: color.blue[600],
      emphasis: color.blue[700],
    },
    /** Semantic status group alias for direct access */
    status: {
      success: color.green[600],
      warning: color.amber[600],
      error: color.red[600],
      danger: color.red[600],
      info: color.blue[600],
    },
  },

  // Shadows — cross-platform (iOS shadowProps + Android elevation)
  shadow: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 8,
    },
    xl: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.09,
      shadowRadius: 24,
      elevation: 12,
    },
  },
} as const;

// ─── Dark mode ───────────────────────────────────────────────────
export const darkTokens = {
  ...shared,

  color: {
    bg: {
      default: '#12121C',
      subtle: '#181824',
      muted: '#222233',
      emphasis: color.gray[600],
      inverse: color.gray[50],
      overlay: 'rgba(0,0,0,0.55)',
      hover: '#222233',
      disabled: '#181824',
    },
    surface: {
      default: '#1E1E30',
      raised: '#2E2E48',
      overlay: '#2E2E48',
      sunken: '#0A0A14',
      hover: '#2A2A3D',
      disabled: '#181824',
      glass: 'rgba(26,26,40,0.88)',
      glassBorder: 'rgba(255,255,255,0.18)',
    },
    text: {
      primary: color.gray[50],
      secondary: color.gray[400],
      tertiary: color.gray[500], // #64748B — 4.2x on dark-bg ✅
      muted: color.gray[500], // Alias
      disabled: color.gray[600], // #475569 — clearer than before
      inverse: color.gray[900],
      link: color.brand[400], // #A78BFA
      visited: color.brand[300], // #C4B5FD
      selected: color.brand[200], // #DDD6FE
      onBrand: color.white, // text on violet backgrounds
      onAccent: '#1C1917', // text on amber backgrounds
      success: color.green[400],
      warning: color.amber[400],
      error: color.red[400],
      info: color.blue[400],
    },
    border: {
      default: '#454560',
      subtle: '#383852',
      strong: color.gray[500],
      emphasis: color.gray[400],
      input: '#505070',
      focus: color.brand[400],
      error: color.red[400],
      success: color.green[400],
      warning: color.amber[400],
      info: color.blue[400],
    },
    // Brand — Violet dark mode
    brand: {
      default: color.brand[400], // #A78BFA — 7.1x on dark-bg ✅ AAA
      primary: color.brand[400], // Alias
      hover: color.brand[300], // #C4B5FD
      active: color.brand[200], // #DDD6FE
      subtle: color.brand[950], // #2E1065
      muted: color.brand[900], // #4C1D95
      text: color.brand[300], // #C4B5FD
    },
    // Accent — Amber dark mode
    accent: {
      default: color.amber[400], // #FBBF24 — 11.6x on dark-bg ✅ AAA
      secondary: color.amber[400], // Alias
      hover: color.amber[300], // #FCD34D
      active: color.amber[500], // #F59E0B
      subtle: 'rgba(251,191,36,0.12)',
      muted: 'rgba(251,191,36,0.28)',
      text: color.amber[400], // #FBBF24
      onAccent: '#1C1917',
    },
    success: {
      bg: `rgba(34,197,94,0.2)`,
      text: color.green[400],
      border: color.green[700],
      icon: color.green[400],
      emphasis: color.green[500],
    },
    warning: {
      bg: `rgba(245,158,11,0.2)`,
      text: color.amber[400],
      border: color.amber[700],
      icon: color.amber[400],
      emphasis: color.amber[500],
    },
    error: {
      bg: `rgba(239,68,68,0.2)`,
      text: color.red[400],
      border: color.red[700],
      icon: color.red[400],
      emphasis: color.red[500],
    },
    info: {
      bg: `rgba(59,130,246,0.2)`,
      text: color.blue[400],
      border: color.blue[700],
      icon: color.blue[400],
      emphasis: color.blue[500],
    },
    status: {
      success: color.green[400],
      warning: color.amber[400],
      error: color.red[400],
      danger: color.red[400],
      info: color.blue[400],
    },
  },

  // Shadows dark mode — stronger for depth perception
  shadow: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.26,
      shadowRadius: 10,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 18,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.34,
      shadowRadius: 24,
      elevation: 12,
    },
  },
} as const;

export interface SemanticTokens {
  spacing: typeof shared.spacing;
  radius: typeof shared.radius;
  fontSize: typeof shared.fontSize;
  fontWeight: typeof shared.fontWeight;
  lineHeight: typeof shared.lineHeight;
  letterSpacing: typeof shared.letterSpacing;
  opacity: typeof shared.opacity;
  zIndex: typeof shared.zIndex;
  elevation: typeof shared.elevation;
  focusRing: typeof shared.focusRing;
  fontFamily: typeof shared.fontFamily;
  /** Per-brand style overrides (button radius, etc.) */
  brandStyle?: { buttonRadius?: number };
  /** Issue #2 scale — see `shared.typography` */
  typography: typeof shared.typography;
  text: typeof shared.text;
  /**
   * Color group for the active scheme.
   * Keep this aligned with `BrandColorGroup` to avoid type drift between default tokens and brands.
   */
  color: BrandColorGroup;
  shadow: {
    none: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xl: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

export type ColorScheme = 'light' | 'dark';

// ─── Brand-aware token factory ────────────────────────────────────

/**
 * Build a full SemanticTokens object from a Brand + color scheme.
 *
 * Architecture:
 *   primitive scale (spacing, radius, type...)
 *   + brand color group (bg, surface, text, border, brand, accent, states)
 *   = SemanticTokens (what components consume)
 *
 * @example
 * const tokens = buildSemanticTokens(loveBrand, "dark");
 * <ThemeProvider brand={loveBrand}>...</ThemeProvider>  // automatic
 */
export function buildSemanticTokens(
  brand: Brand,
  scheme: ColorScheme
): SemanticTokens {
  const colors = getBrandColors(brand, scheme);
  const baseShadow =
    scheme === 'dark'
      ? (darkTokens as SemanticTokens).shadow
      : (lightTokens as SemanticTokens).shadow;

  return {
    ...shared,
    fontFamily: brand.fontFamily
      ? {
          sans: brand.fontFamily.sans ?? shared.fontFamily.sans,
          mono: brand.fontFamily.mono ?? shared.fontFamily.mono,
        }
      : shared.fontFamily,
    brandStyle: brand.style,
    color: colors,
    shadow: baseShadow,
  } as SemanticTokens;
}

// ─── Re-export Brand types for consumers ─────────────────────────
export type { Brand, BrandColorGroup } from './brand';
export { defineBrand, getBrandColors } from './brand';

export const semanticTokens: Record<ColorScheme, SemanticTokens> = {
  light: lightTokens as SemanticTokens,
  dark: darkTokens as SemanticTokens,
};
