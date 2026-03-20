import { primitive } from "./primitive";

/**
 * Semantic tokens — maps raw primitives to design intent.
 * Supports light and dark mode.
 * RULE: Components import from here, never from primitive.
 */

const { color, spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing, opacity, zIndex, elevation } = primitive;

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

  // Typography styles (composite)
  text: {
    xs: { fontSize: fontSize.xs, lineHeight: fontSize.xs * lineHeight.normal, fontWeight: fontWeight.regular },
    sm: { fontSize: fontSize.sm, lineHeight: fontSize.sm * lineHeight.normal, fontWeight: fontWeight.regular },
    md: { fontSize: fontSize.md, lineHeight: fontSize.md * lineHeight.normal, fontWeight: fontWeight.regular },
    lg: { fontSize: fontSize.lg, lineHeight: fontSize.lg * lineHeight.normal, fontWeight: fontWeight.regular },
    xl: { fontSize: fontSize.xl, lineHeight: fontSize.xl * lineHeight.snug, fontWeight: fontWeight.medium },
    "2xl": { fontSize: fontSize["2xl"], lineHeight: fontSize["2xl"] * lineHeight.snug, fontWeight: fontWeight.medium },
    "3xl": { fontSize: fontSize["3xl"], lineHeight: fontSize["3xl"] * lineHeight.tight, fontWeight: fontWeight.semibold },
  },
} as const;

// ─── Light mode ──────────────────────────────────────────────────
export const lightTokens = {
  ...shared,

  color: {
    // Backgrounds
    bg: {
      default: color.white,
      subtle: color.gray[50], // F8FAFC
      muted: color.gray[200],    // E2E8F0
      emphasis: color.gray[400], // 94A3B8 - Highly visible for skeletons
      inverse: color.gray[900],  // 0F172A
      overlay: "rgba(0,0,0,0.6)",
      hover: color.gray[100],  // F1F5F9 - hover state
    },
    // Surfaces (cards, sheets, modals)
    surface: {
      default: color.white,
      raised: color.white,
      overlay: color.white,
      sunken: color.gray[100],
    },
    // Text - Much darker overall
    text: {
      primary: color.gray[950],   // 020617 - Pure contrast
      secondary: color.gray[700], // 334155 - Very readable
      tertiary: color.gray[500],  // 64748B - Not "faded" anymore
      disabled: color.gray[400],  // 94A3B8
      inverse: color.white,
      link: color.brand[700],     // Darker blue for links
    },
    // Border - Ultra visible
    border: {
      default: color.gray[400],  // 94A3B8 - Highly visible
      subtle: color.gray[200],   // E2E8F0 - Subtle border
      strong: color.gray[600],   // 475569 - Very dark
      focus: color.brand[600],
      error: color.red[600],
    },
    // Brand / action
    brand: {
      default: color.brand[600],
      hover: color.brand[700],
      active: color.brand[800],
      subtle: color.brand[100],  // Stronger subtle background
      muted: color.brand[200],
      text: color.brand[800],
    },
    // Feedback - Max visibility, high contrast
    success: { bg: color.green[50], text: color.green[900], border: color.green[500], icon: color.green[600] },
    warning: { bg: color.amber[50], text: color.amber[900], border: color.amber[500], icon: color.amber[600] },
    error: { bg: color.red[50], text: color.red[900], border: color.red[500], icon: color.red[600] },
    info: { bg: color.blue[50], text: color.blue[900], border: color.blue[500], icon: color.blue[600] },
  },

  // Shadows (iOS) - Aggressive elevation for clear separation
  shadow: {
    none: {},
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 40 },
  },
} as const;

// ─── Dark mode ───────────────────────────────────────────────────
export const darkTokens = {
  ...shared,

  color: {
    bg: {
      default: color.gray[950],
      subtle: color.gray[900],
      muted: color.gray[800],
      emphasis: color.gray[700],
      inverse: color.gray[50],
      overlay: `rgba(0,0,0,0.6)`,
      hover: color.gray[800],  // 1E293B - hover state dark
    },
    surface: {
      default: color.gray[900],
      raised: color.gray[800],
      overlay: color.gray[800],
      sunken: color.gray[950],
    },
    text: {
      primary: color.gray[50],
      secondary: color.gray[400],
      tertiary: color.gray[600],
      disabled: color.gray[700],
      inverse: color.gray[900],
      link: color.brand[400],
    },
    border: {
      default: color.gray[700],
      subtle: color.gray[800],  // 1E293B - Subtle border dark
      strong: color.gray[600],
      focus: color.brand[400],
      error: color.red[400],
    },
    brand: {
      default: color.brand[500],
      hover: color.brand[400],
      active: color.brand[300],
      subtle: color.brand[950],
      muted: color.brand[900],
      text: color.brand[300],
    },
    success: { bg: `rgba(34,197,94,0.12)`, text: color.green[400], border: color.green[600], icon: color.green[400] },
    warning: { bg: `rgba(245,158,11,0.12)`, text: color.amber[400], border: color.amber[600], icon: color.amber[400] },
    error: { bg: `rgba(239,68,68,0.12)`, text: color.red[400], border: color.red[600], icon: color.red[400] },
    info: { bg: `rgba(59,130,246,0.12)`, text: color.blue[400], border: color.blue[600], icon: color.blue[400] },
  },

  shadow: {
    none: {},
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 8 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 16 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 24 },
  },
} as const;

interface ColorGroup {
  bg: {
    default: string;
    subtle: string;
    muted: string;
    emphasis: string;
    inverse: string;
    overlay: string;
    hover: string;
  };
  surface: {
    default: string;
    raised: string;
    overlay: string;
    sunken: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
    error: string;
  };
  brand: {
    default: string;
    hover: string;
    active: string;
    subtle: string;
    muted: string;
    text: string;
  };
  success: { bg: string; text: string; border: string; icon: string };
  warning: { bg: string; text: string; border: string; icon: string };
  error: { bg: string; text: string; border: string; icon: string };
  info: { bg: string; text: string; border: string; icon: string };
}

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
  text: typeof shared.text;
  color: ColorGroup;
  shadow: {
    none: object;
    sm: object;
    md: object;
    lg: object;
    xl: object;
  };
}

export type ColorScheme = "light" | "dark";

export const semanticTokens: Record<ColorScheme, SemanticTokens> = {
  light: lightTokens as SemanticTokens,
  dark: darkTokens as SemanticTokens,
};