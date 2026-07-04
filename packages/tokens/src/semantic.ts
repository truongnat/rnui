import type { Brand, BrandColorGroup, DataColors, SyntaxColors } from './brand';
import { getBrandColors } from './brand';
import { primitive } from './primitive';
import { typeScale } from './typescale';

// ─── Data-viz colors (Astryx-aligned, shared across modes) ───────
const dataColors: DataColors = {
  categorical: {
    blue: '#0171E3',
    orange: '#EB6E00',
    purple: '#6B1EFD',
    green: '#0B991F',
    pink: '#F351C0',
    cyan: '#0171A4',
    red: '#F5394F',
    teal: '#08A3A3',
    brown: '#965E03',
    indigo: '#6F8AFF',
  },
  neutral: '#8494A3',
  blue: ['#DBECFF', '#78BEFF', '#2694FE', '#004CBC', '#02165E'],
  green: ['#D6FEE4', '#8EF7AA', '#24BB5E', '#138546', '#0B603D'],
  orange: ['#FFE6CF', '#FDB876', '#FD9537', '#D66100', '#A13F04'],
  pink: ['#FCE3F4', '#FEADE3', '#F989D3', '#D123A1', '#8E1073'],
  purple: ['#E8E8FB', '#B3B0FE', '#9081FF', '#6B1EFD', '#3E0697'],
  red: ['#FEE4E6', '#FFB2B8', '#FB7D87', '#D31130', '#9D0519'],
  teal: ['#D7FCF8', '#6CE6D8', '#0DB7AF', '#0C9293', '#08767D'],
  yellow: ['#FDF6BA', '#FCEC85', '#FBCE03', '#D69804', '#8A5001'],
  gray: ['#F1F4F7', '#CCD3DB', '#AFB9C4', '#5D6C7B', '#25363F'],
};

// ─── Syntax-highlighting colors (Astryx-aligned) ─────────────────
const syntaxColorsLight: SyntaxColors = {
  keyword: '#6B1EFD',
  string: '#0B991F',
  comment: '#8494A3',
  number: '#EB6E00',
  function: '#0171E3',
  type: '#08A3A3',
  variable: '#15110C',
  operator: '#F351C0',
  constant: '#965E03',
  tag: '#F5394F',
  attribute: '#EB6E00',
  property: '#0171A4',
  punctuation: '#5D6C7B',
  background: '#F8F4ED',
};
const syntaxColorsDark: SyntaxColors = {
  keyword: '#9081FF',
  string: '#8EF7AA',
  comment: '#8C939B',
  number: '#FD9537',
  function: '#78BEFF',
  type: '#6CE6D8',
  variable: '#DFE2E5',
  operator: '#F989D3',
  constant: '#FBCE03',
  tag: '#FB7D87',
  attribute: '#FDB876',
  property: '#78BEFF',
  punctuation: '#AFB9C4',
  background: '#1F1F22',
};

/**
 * Semantic tokens — maps raw primitives to design intent.
 * Supports light and dark mode.
 * RULE: Components import from here, never from primitive.
 */

const {
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
    // Astryx geometric display variants — hero / marketing / data callouts.
    display1: {
      fontSize: typeScale['display-1'].fontSize,
      fontWeight: typeScale['display-1'].fontWeight,
      lineHeight: typeScale['display-1'].lineHeight,
      letterSpacing: -0.4,
    },
    display2: {
      fontSize: typeScale['display-2'].fontSize,
      fontWeight: typeScale['display-2'].fontWeight,
      lineHeight: typeScale['display-2'].lineHeight,
      letterSpacing: -0.3,
    },
    display3: {
      fontSize: typeScale['display-3'].fontSize,
      fontWeight: typeScale['display-3'].fontWeight,
      lineHeight: typeScale['display-3'].lineHeight,
      letterSpacing: -0.2,
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
    // Backgrounds — Astryx neutral (body → surface → card → popover)
    bg: {
      default: '#FFFFFF',
      subtle: '#F8F9FA',
      muted: '#F1F4F7',
      emphasis: '#E5E8EB',
      inverse: '#15110C',
      overlay: 'rgba(1,18,40,0.4)',
      hover: '#F1F4F7',
      disabled: '#F1F4F7',
      overlayHover: 'rgba(5,54,89,0.05)',
      overlayPressed: 'rgba(5,54,89,0.10)',
    },
    surface: {
      default: '#FFFFFF',
      raised: '#F8F9FA',
      overlay: '#FFFFFF',
      sunken: '#F1F4F7',
      hover: '#F1F4F7',
      disabled: '#F8F9FA',
      glass: 'rgba(255,255,255,0.88)',
      glassBorder: 'rgba(1,18,40,0.12)',
      card: '#FFFFFF',
      popover: '#FFFFFF',
    },
    text: {
      primary: '#15110C',
      secondary: '#4E606F',
      tertiary: '#A4B0BC',
      muted: '#A4B0BC',
      disabled: '#A4B0BC',
      inverse: '#FFFFFF',
      link: '#0064E0',
      visited: '#02165E',
      selected: '#004CBC',
      onBrand: '#FFFFFF',
      onAccent: '#FFFFFF',
      success: '#0B603D',
      warning: '#8A5001',
      error: '#9D0519',
      info: '#02165E',
    },
    border: {
      default: '#CCD3DB',
      subtle: '#E5E8EB',
      strong: '#AFB9C4',
      emphasis: '#8494A3',
      input: '#CCD3DB',
      focus: '#0064E0',
      error: '#E3193B',
      success: '#24BB5E',
      warning: '#FBCE03',
      info: '#2694FE',
    },
    // Brand — Astryx blue accent
    brand: {
      default: '#0064E0',
      primary: '#0064E0',
      hover: '#004CBC',
      active: '#02165E',
      subtle: '#DBECFF',
      muted: '#78BEFF',
      text: '#004CBC',
    },
    // Accent — neutral slate (secondary emphasis)
    accent: {
      default: '#4E606F',
      secondary: '#4E606F',
      hover: '#3A4956',
      active: '#25363F',
      subtle: '#F1F4F7',
      muted: '#CCD3DB',
      text: '#25363F',
      onAccent: '#FFFFFF',
    },
    // Feedback — Astryx status colors
    success: {
      bg: '#E7F6EB',
      text: '#0B603D',
      border: '#24BB5E',
      icon: '#0D8626',
      emphasis: '#0B603D',
    },
    warning: {
      bg: '#FDF6BA',
      text: '#8A5001',
      border: '#FBCE03',
      icon: '#D69804',
      emphasis: '#8A5001',
    },
    error: {
      bg: '#FDE4E6',
      text: '#9D0519',
      border: '#F5394F',
      icon: '#E3193B',
      emphasis: '#7B0210',
    },
    info: {
      bg: '#DBECFF',
      text: '#02165E',
      border: '#2694FE',
      icon: '#0064E0',
      emphasis: '#02165E',
    },
    /** Semantic status group alias for direct access */
    status: {
      success: '#0D8626',
      warning: '#B47700',
      error: '#E3193B',
      danger: '#E3193B',
      info: '#0064E0',
    },
    skeleton: '#ECEEF1',
    track: '#E5E8EB',
    tintHover: 'rgba(0,100,224,0.06)',
    data: dataColors,
    syntax: syntaxColorsLight,
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
      shadowColor: '#15110C',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#15110C',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#15110C',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 8,
    },
    xl: {
      shadowColor: '#15110C',
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
    // Backgrounds — Astryx neutral dark
    bg: {
      default: '#111112',
      subtle: '#18181A',
      muted: '#1F1F22',
      emphasis: '#28292C',
      inverse: '#F2F4F6',
      overlay: 'rgba(0,0,0,0.6)',
      hover: '#1F1F22',
      disabled: '#18181A',
      overlayHover: 'rgba(255,255,255,0.06)',
      overlayPressed: 'rgba(255,255,255,0.10)',
    },
    surface: {
      default: '#1F1F22',
      raised: '#28292C',
      overlay: '#28292C',
      sunken: '#111112',
      hover: '#28292C',
      disabled: '#18181A',
      glass: 'rgba(31,31,34,0.88)',
      glassBorder: 'rgba(255,255,255,0.14)',
      card: '#28292C',
      popover: '#1F1F22',
    },
    text: {
      primary: '#DFE2E5',
      secondary: '#AAAFB5',
      tertiary: '#6F747C',
      muted: '#6F747C',
      disabled: '#5A5E66',
      inverse: '#111112',
      link: '#2694FE',
      visited: '#78BEFF',
      selected: '#78BEFF',
      onBrand: '#FFFFFF',
      onAccent: '#111112',
      success: '#8EF7AA',
      warning: '#FCEC85',
      error: '#FFB2B8',
      info: '#DBECFF',
    },
    border: {
      default: '#494D53',
      subtle: '#333338',
      strong: '#5A5E66',
      emphasis: '#6F747C',
      input: '#494D53',
      focus: '#2694FE',
      error: '#F5394F',
      success: '#138546',
      warning: '#D69804',
      info: '#2694FE',
    },
    // Brand — Astryx blue accent (dark)
    brand: {
      default: '#2694FE',
      primary: '#2694FE',
      hover: '#78BEFF',
      active: '#DBECFF',
      subtle: '#02165E',
      muted: '#004CBC',
      text: '#78BEFF',
    },
    // Accent — neutral slate (dark)
    accent: {
      default: '#AAAFB5',
      secondary: '#AAAFB5',
      hover: '#C8CCD0',
      active: '#DFE2E5',
      subtle: '#28292C',
      muted: '#494D53',
      text: '#DFE2E5',
      onAccent: '#111112',
    },
    success: {
      bg: 'rgba(13,134,38,0.2)',
      text: '#8EF7AA',
      border: '#138546',
      icon: '#26A756',
      emphasis: '#26A756',
    },
    warning: {
      bg: 'rgba(233,175,8,0.2)',
      text: '#FCEC85',
      border: '#D69804',
      icon: '#F2C00B',
      emphasis: '#F2C00B',
    },
    error: {
      bg: 'rgba(227,25,59,0.2)',
      text: '#FFB2B8',
      border: '#E3193B',
      icon: '#F5394F',
      emphasis: '#F5394F',
    },
    info: {
      bg: 'rgba(0,100,224,0.2)',
      text: '#DBECFF',
      border: '#2694FE',
      icon: '#2694FE',
      emphasis: '#2694FE',
    },
    status: {
      success: '#26A756',
      warning: '#F2C00B',
      error: '#F5394F',
      danger: '#F5394F',
      info: '#2694FE',
    },
    skeleton: '#2A2A2E',
    track: '#333338',
    tintHover: 'rgba(38,148,254,0.12)',
    data: dataColors,
    syntax: syntaxColorsDark,
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
 * const tokens = buildSemanticTokens(matchaBrand, "dark");
 * <ThemeProvider brand={matchaBrand}>...</ThemeProvider>  // automatic
 */
/**
 * Fill Astryx-aligned optional color groups (surface hierarchy, overlay states,
 * skeleton/track/tintHover, data & syntax) when a brand omits them, so every
 * branded theme exposes the same token surface as the built-in default.
 * Non-destructive: explicit brand values always win.
 */
export function fillColorDefaults(
  colors: BrandColorGroup,
  scheme: ColorScheme
): BrandColorGroup {
  const base = scheme === 'dark' ? darkTokens.color : lightTokens.color;
  return {
    ...colors,
    bg: {
      ...colors.bg,
      overlayHover: colors.bg.overlayHover ?? base.bg.overlayHover,
      overlayPressed: colors.bg.overlayPressed ?? base.bg.overlayPressed,
    },
    surface: {
      ...colors.surface,
      card: colors.surface.card ?? colors.surface.raised,
      popover:
        colors.surface.popover ??
        colors.surface.overlay ??
        colors.surface.raised,
    },
    skeleton: colors.skeleton ?? base.skeleton,
    track: colors.track ?? base.track,
    tintHover: colors.tintHover ?? base.tintHover,
    data: colors.data ?? base.data,
    syntax: colors.syntax ?? base.syntax,
  };
}

export function buildSemanticTokens(
  brand: Brand,
  scheme: ColorScheme
): SemanticTokens {
  const colors = fillColorDefaults(getBrandColors(brand, scheme), scheme);
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
