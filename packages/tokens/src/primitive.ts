/**
 * Primitive tokens — raw values.
 * RULE: Never import these directly in components.
 * Always go through semantic tokens.
 */

export const primitive = {
  // ─── Color palette ───────────────────────────────────────────
  color: {
    // Neutrals
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
      950: "#020617",
    },
    // Brand — Violet (premium, warm, unique in RN UI lib space)
    brand: {
      50: "#F5F3FF",
      100: "#EDE9FE",
      200: "#DDD6FE",
      300: "#C4B5FD",
      400: "#A78BFA",
      500: "#8B5CF6",
      600: "#7C3AED",
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95",
      950: "#2E1065",
    },
    // Accent — Amber (warm CTA accent, creates visual hierarchy)
    amber: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },
    // Semantic palette
    red: {
      50: "#FEF2F2",
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
      900: "#7F1D1D",
    },
    green: {
      50: "#F0FDF4",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      900: "#14532D",
    },
    blue: {
      50: "#EFF6FF",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      900: "#1E3A8A",
    },
  },

  // ─── Spacing scale (4px base) ────────────────────────────────
  spacing: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
  },

  // ─── Border radius ───────────────────────────────────────────
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },

  // ─── Typography ──────────────────────────────────────────────
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },

  // ─── Opacity ─────────────────────────────────────────────────
  opacity: {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    25: 0.25,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    75: 0.75,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
  },

  // ─── Z-index ─────────────────────────────────────────────────
  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
    tooltip: 600,
  },

  // ─── Focus ring ──────────────────────────────────────────────
  focusRing: {
    width: 2,
    offset: 2,
    outlineWidth: 2,
  },

  // ─── Elevation (Android shadow level) ────────────────────────
  elevation: {
    none: 0,
    xs: 1,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
  },
} as const;

export type PrimitiveTokens = typeof primitive;