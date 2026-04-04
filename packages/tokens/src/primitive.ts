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
      550: "#7F4BF0",  // mid-step for finer gradients
      600: "#7C3AED",
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95",
      950: "#2E1065",
    },
    // Warm neutrals — cream/ivory tones for softer light backgrounds
    warmNeutral: {
      50: "#FEFDFB",
      100: "#FBF8F3",
      200: "#F5F0E8",
      300: "#EBE3D6",
      400: "#D5CBBC",
      500: "#A8A093",
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
      50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5",
      400: "#F87171", 500: "#EF4444", 600: "#DC2626", 700: "#B91C1C",
      800: "#991B1B", 900: "#7F1D1D", 950: "#450A0A",
    },
    green: {
      50: "#F0FDF4", 100: "#DCFCE7", 200: "#BBF7D0", 300: "#86EFAC",
      400: "#4ADE80", 500: "#22C55E", 600: "#16A34A", 700: "#15803D",
      800: "#166534", 900: "#14532D", 950: "#052E16",
    },
    blue: {
      50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 300: "#93C5FD",
      400: "#60A5FA", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8",
      800: "#1E40AF", 900: "#1E3A8A", 950: "#172554",
    },
    // Orange — for sunset theme
    orange: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316",
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A3412",
      900: "#7C2D12",
      950: "#431407",
    },
    // Teal — for ocean theme
    teal: {
      50: "#F0FDFA",
      100: "#CCFBF1",
      200: "#99F6E4",
      300: "#5EEAD4",
      400: "#2DD4BF",
      500: "#14B8A6",
      600: "#0D9488",
      700: "#0F766E",
      800: "#115E59",
      900: "#134E4A",
      950: "#042F2E",
    },
    // Rose — for love theme
    rose: {
      50: "#FFF1F2",
      100: "#FFE4E6",
      200: "#FECDD3",
      300: "#FDA4AF",
      400: "#FB7185",
      500: "#F43F5E",
      600: "#E11D48",
      700: "#BE123C",
      800: "#9F1239",
      900: "#881337",
      950: "#4C0519",
    },
    // Emerald — for forest theme
    emerald: {
      50: "#ECFDF5",
      100: "#D1FAE5",
      200: "#A7F3D0",
      300: "#6EE7B7",
      400: "#34D399",
      500: "#10B981",
      600: "#059669",
      700: "#047857",
      800: "#065F46",
      900: "#064E3B",
      950: "#022C22",
    },
    // Indigo — for midnight theme
    indigo: {
      50: "#EEF2FF",
      100: "#E0E7FF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#6366F1",
      600: "#4F46E5",
      700: "#4338CA",
      800: "#3730A3",
      900: "#312E81",
      950: "#1E1B4B",
    },
  },

  // ─── Gradient presets ────────────────────────────────────────
  gradient: {
    brand:   ["#8B5CF6", "#6D28D9"] as readonly [string, string],
    accent:  ["#F59E0B", "#D97706"] as readonly [string, string],
    success: ["#34D399", "#059669"] as readonly [string, string],
    sunrise: ["#F59E0B", "#EF4444"] as readonly [string, string],
    ocean:   ["#60A5FA", "#7C3AED"] as readonly [string, string],
    midnight:["#312E81", "#1E1B4B"] as readonly [string, string],
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
    18: 72,
    20: 80,
    24: 96,
    28: 112,
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