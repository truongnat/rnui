"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  avatarTokens: () => avatarTokens,
  badgeTokens: () => badgeTokens,
  buildSemanticTokens: () => buildSemanticTokens,
  buttonTokens: () => buttonTokens,
  cardTokens: () => cardTokens,
  checkboxTokens: () => checkboxTokens,
  chipTokens: () => chipTokens,
  darkTokens: () => darkTokens,
  defineBrand: () => defineBrand,
  dialogTokens: () => dialogTokens,
  duration: () => duration,
  easing: () => easing,
  fabTokens: () => fabTokens,
  focusRingAnimation: () => focusRingAnimation,
  getBrandColors: () => getBrandColors,
  inputTokens: () => inputTokens,
  lightTokens: () => lightTokens,
  motionPreset: () => motionPreset,
  paginationTokens: () => paginationTokens,
  pressFeedback: () => pressFeedback,
  primitive: () => primitive,
  radioTokens: () => radioTokens,
  ratingTokens: () => ratingTokens,
  resolveComponentTokens: () => resolveComponentTokens,
  selectTokens: () => selectTokens,
  semanticTokens: () => semanticTokens,
  sliderTokens: () => sliderTokens,
  spring: () => spring,
  switchTokens: () => switchTokens,
  tabsTokens: () => tabsTokens,
  timelineTokens: () => timelineTokens,
  timingPreset: () => timingPreset,
  toastTokens: () => toastTokens
});
module.exports = __toCommonJS(index_exports);

// src/primitive.ts
var primitive = {
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
      950: "#020617"
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
      950: "#2E1065"
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
      900: "#78350F"
    },
    // Semantic palette
    red: {
      50: "#FEF2F2",
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
      900: "#7F1D1D"
    },
    green: {
      50: "#F0FDF4",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      900: "#14532D"
    },
    blue: {
      50: "#EFF6FF",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      900: "#1E3A8A"
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
      950: "#431407"
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
      950: "#042F2E"
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
      950: "#4C0519"
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
      950: "#022C22"
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
      950: "#1E1B4B"
    }
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
    24: 96
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
    full: 9999
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
    "4xl": 36
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1
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
    100: 1
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
    tooltip: 600
  },
  // ─── Focus ring ──────────────────────────────────────────────
  focusRing: {
    width: 2,
    offset: 2,
    outlineWidth: 2
  },
  // ─── Elevation (Android shadow level) ────────────────────────
  elevation: {
    none: 0,
    xs: 1,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16
  }
};

// src/brand.ts
function defineBrand(brand) {
  return brand;
}
function getBrandColors(brand, scheme) {
  return scheme === "dark" ? brand.dark : brand.light;
}

// src/semantic.ts
var { color, spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing, opacity, zIndex, elevation, focusRing } = primitive;
var shared = {
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
    sans: void 0,
    mono: void 0
  },
  // Typography styles (composite)
  text: {
    xs: { fontSize: fontSize.xs, lineHeight: fontSize.xs * lineHeight.normal, fontWeight: fontWeight.regular },
    sm: { fontSize: fontSize.sm, lineHeight: fontSize.sm * lineHeight.normal, fontWeight: fontWeight.regular },
    md: { fontSize: fontSize.md, lineHeight: fontSize.md * lineHeight.normal, fontWeight: fontWeight.regular },
    lg: { fontSize: fontSize.lg, lineHeight: fontSize.lg * lineHeight.normal, fontWeight: fontWeight.regular },
    xl: { fontSize: fontSize.xl, lineHeight: fontSize.xl * lineHeight.snug, fontWeight: fontWeight.medium },
    "2xl": { fontSize: fontSize["2xl"], lineHeight: fontSize["2xl"] * lineHeight.snug, fontWeight: fontWeight.medium },
    "3xl": { fontSize: fontSize["3xl"], lineHeight: fontSize["3xl"] * lineHeight.tight, fontWeight: fontWeight.semibold }
  }
};
var lightTokens = {
  ...shared,
  color: {
    // Backgrounds
    bg: {
      default: color.white,
      subtle: color.gray[50],
      // F8FAFC
      muted: color.gray[200],
      // E2E8F0
      emphasis: color.gray[400],
      // 94A3B8 - Highly visible for skeletons
      inverse: color.gray[900],
      // 0F172A
      overlay: "rgba(0,0,0,0.6)",
      hover: color.gray[100],
      // #F1F5F9 - hover state
      disabled: color.gray[100]
      // #F1F5F9 - disabled background
    },
    // Surfaces (cards, sheets, modals)
    surface: {
      default: color.white,
      raised: color.white,
      overlay: color.white,
      sunken: color.gray[100],
      hover: color.gray[50],
      // #F8FAFC - subtle hover on elevated surface
      disabled: color.gray[100]
      // #F1F5F9
    },
    // Text - Much darker overall
    text: {
      primary: color.gray[950],
      // 020617 - Pure contrast
      secondary: color.gray[700],
      // 334155 - Very readable
      tertiary: color.gray[500],
      // 64748B - Not "faded" anymore
      disabled: color.gray[500],
      // #64748B — 4.8x on white ✅ WCAG AA
      inverse: color.white,
      link: color.brand[700],
      // #6D28D9
      visited: color.brand[900],
      // #4C1D95
      selected: color.brand[800],
      // #5B21B6
      onBrand: color.white,
      // text on violet backgrounds
      onAccent: "#1C1917",
      // text on amber backgrounds
      success: color.green[900],
      warning: color.amber[900],
      error: color.red[900],
      info: color.blue[900]
    },
    // Border - Ultra visible
    border: {
      default: color.gray[300],
      // #CBD5E1 - Default decorative border
      subtle: color.gray[200],
      // #E2E8F0 - Subtle border
      strong: color.gray[500],
      // #64748B - Strong border
      input: color.gray[400],
      // #94A3B8 - Form input border
      focus: color.brand[600],
      // #7C3AED - Focus ring
      error: color.red[600],
      // #DC2626
      success: color.green[500],
      warning: color.amber[500],
      info: color.blue[500]
    },
    // Brand — Violet
    brand: {
      default: color.brand[600],
      // #7C3AED — 5.7x on white ✅
      hover: color.brand[700],
      // #6D28D9
      active: color.brand[800],
      // #5B21B6
      subtle: color.brand[100],
      // #EDE9FE
      muted: color.brand[200],
      // #DDD6FE
      text: color.brand[700]
      // #6D28D9
    },
    // Accent — Amber (CTAs, highlights)
    accent: {
      default: color.amber[500],
      // #F59E0B
      hover: color.amber[600],
      // #D97706
      active: color.amber[700],
      // #B45309
      subtle: color.amber[50],
      // #FFFBEB
      muted: color.amber[100],
      // #FEF3C7
      text: color.amber[800],
      // #92400E — 5.0x on white ✅
      onAccent: "#1C1917"
      // near-black text on amber bg
    },
    // Feedback - Max visibility, high contrast
    success: { bg: color.green[50], text: color.green[900], border: color.green[500], icon: color.green[600] },
    warning: { bg: color.amber[50], text: color.amber[900], border: color.amber[500], icon: color.amber[600] },
    error: { bg: color.red[50], text: color.red[900], border: color.red[500], icon: color.red[600] },
    info: { bg: color.blue[50], text: color.blue[900], border: color.blue[500], icon: color.blue[600] }
  },
  // Shadows — cross-platform (iOS shadowProps + Android elevation)
  shadow: {
    none: { shadowColor: "transparent", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 8 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.2, shadowRadius: 32, elevation: 16 }
  }
};
var darkTokens = {
  ...shared,
  color: {
    bg: {
      default: "#0D0D14",
      // warm near-black (not pure cold gray)
      subtle: color.gray[900],
      muted: color.gray[800],
      emphasis: color.gray[700],
      inverse: color.gray[50],
      overlay: `rgba(0,0,0,0.6)`,
      hover: color.gray[800],
      // #1E293B - hover state dark
      disabled: color.gray[800]
      // #1E293B - disabled bg dark
    },
    surface: {
      default: color.gray[900],
      raised: color.gray[800],
      overlay: color.gray[800],
      sunken: color.gray[950],
      // One step lighter than raised (gray[800]) for hover affordance
      hover: color.gray[700],
      disabled: "#0D0D14"
      // same as bg.default = sunken feel
    },
    text: {
      primary: color.gray[50],
      secondary: color.gray[400],
      tertiary: color.gray[500],
      // #64748B — 4.2x on dark-bg ✅
      disabled: color.gray[600],
      // #475569 — clearer than before
      inverse: color.gray[900],
      link: color.brand[400],
      // #A78BFA
      visited: color.brand[300],
      // #C4B5FD
      selected: color.brand[200],
      // #DDD6FE
      onBrand: color.white,
      // text on violet backgrounds
      onAccent: "#1C1917",
      // text on amber backgrounds
      success: color.green[400],
      warning: color.amber[400],
      error: color.red[400],
      info: color.blue[400]
    },
    border: {
      default: color.gray[700],
      // #334155 - Standard border
      subtle: color.gray[800],
      // #1E293B - Subtle
      strong: color.gray[500],
      // #64748B - Visible border ✅
      input: color.gray[600],
      // #475569 - Form input border
      focus: color.brand[400],
      // #A78BFA - Focus ring ✅
      error: color.red[400],
      success: color.green[400],
      warning: color.amber[400],
      info: color.blue[400]
    },
    // Brand — Violet dark mode
    brand: {
      default: color.brand[400],
      // #A78BFA — 7.1x on dark-bg ✅ AAA
      hover: color.brand[300],
      // #C4B5FD
      active: color.brand[200],
      // #DDD6FE
      subtle: color.brand[950],
      // #2E1065
      muted: color.brand[900],
      // #4C1D95
      text: color.brand[300]
      // #C4B5FD
    },
    // Accent — Amber dark mode
    accent: {
      default: color.amber[400],
      // #FBBF24 — 11.6x on dark-bg ✅ AAA
      hover: color.amber[300],
      // #FCD34D
      active: color.amber[500],
      // #F59E0B
      subtle: "rgba(251,191,36,0.12)",
      muted: "rgba(251,191,36,0.2)",
      text: color.amber[400],
      // #FBBF24
      onAccent: "#1C1917"
    },
    success: { bg: `rgba(34,197,94,0.12)`, text: color.green[400], border: color.green[600], icon: color.green[400] },
    warning: { bg: `rgba(245,158,11,0.12)`, text: color.amber[400], border: color.amber[600], icon: color.amber[400] },
    error: { bg: `rgba(239,68,68,0.12)`, text: color.red[400], border: color.red[600], icon: color.red[400] },
    info: { bg: `rgba(59,130,246,0.12)`, text: color.blue[400], border: color.blue[600], icon: color.blue[400] }
  },
  // Shadows dark mode — stronger for depth perception
  shadow: {
    none: { shadowColor: "transparent", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 4 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 20, elevation: 8 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.55, shadowRadius: 36, elevation: 16 }
  }
};
function buildSemanticTokens(brand, scheme) {
  const colors = getBrandColors(brand, scheme);
  const baseShadow = scheme === "dark" ? darkTokens.shadow : lightTokens.shadow;
  return {
    ...shared,
    color: colors,
    shadow: baseShadow
  };
}
var semanticTokens = {
  light: lightTokens,
  dark: darkTokens
};

// src/component.ts
function buttonTokens(t) {
  const base = {
    borderRadius: t.radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: t.spacing[2]
  };
  return {
    variant: {
      solid: {
        container: {
          ...base,
          backgroundColor: t.color.brand.default,
          borderWidth: 0,
          ...t.shadow.md
        },
        text: { color: t.color.text.onBrand, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.brand.active, ...t.shadow.none }
      },
      outline: {
        container: { ...base, backgroundColor: "transparent", borderWidth: 1.5, borderColor: t.color.border.default },
        text: { color: t.color.text.primary, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.bg.muted }
      },
      ghost: {
        container: { ...base, backgroundColor: "transparent", borderWidth: 0 },
        text: { color: t.color.brand.default, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.brand.subtle }
      },
      destructive: {
        container: { ...base, backgroundColor: t.color.error.bg, borderWidth: 1, borderColor: t.color.error.border },
        text: { color: t.color.error.text, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.error.border }
      },
      // Accent/CTA — Amber, stands out from brand violet
      accent: {
        container: {
          ...base,
          backgroundColor: t.color.accent.default,
          borderWidth: 0,
          ...t.shadow.md
        },
        text: { color: t.color.accent.onAccent, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.accent.active, ...t.shadow.none }
      }
    },
    size: {
      sm: { container: { height: 36, paddingHorizontal: t.spacing[4] }, text: { fontSize: t.fontSize.sm } },
      md: { container: { height: 44, paddingHorizontal: t.spacing[6] }, text: { fontSize: t.fontSize.md } },
      lg: { container: { height: 54, paddingHorizontal: t.spacing[8] }, text: { fontSize: t.fontSize.lg } }
    },
    disabled: {
      container: { opacity: t.opacity[40], ...t.shadow.none }
    }
  };
}
function inputTokens(t) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.input,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: t.spacing[3],
      gap: t.spacing[2]
    },
    hover: {
      borderColor: t.color.border.strong
    },
    disabled: {
      backgroundColor: t.color.bg.disabled,
      borderColor: t.color.border.default,
      opacity: t.opacity[50]
    },
    size: {
      sm: { height: 32, fontSize: t.fontSize.sm },
      md: { height: 40, fontSize: t.fontSize.md },
      lg: { height: 48, fontSize: t.fontSize.lg }
    },
    focusRing: { borderColor: t.color.border.focus, borderWidth: 2, outlineOffset: t.focusRing.offset },
    state: {
      default: { borderColor: t.color.border.default },
      focused: { borderColor: t.color.border.focus, borderWidth: 1.5 },
      error: { borderColor: t.color.border.error },
      disabled: { backgroundColor: t.color.bg.muted, opacity: t.opacity[60] }
    },
    text: {
      color: t.color.text.primary,
      placeholderColor: t.color.text.tertiary
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.secondary,
      marginBottom: t.spacing[1]
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
      marginTop: t.spacing[1]
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
      marginTop: t.spacing[1]
    }
  };
}
function cardTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.raised,
      borderRadius: t.radius.lg,
      borderWidth: 1,
      borderColor: t.color.border.default,
      ...t.shadow.sm
    },
    padding: {
      sm: t.spacing[3],
      md: t.spacing[4],
      lg: t.spacing[6]
    },
    pressed: {
      opacity: t.opacity[80]
    }
  };
}
function badgeTokens(t) {
  return {
    base: {
      borderRadius: t.radius.full,
      alignSelf: "flex-start"
    },
    size: {
      sm: { paddingHorizontal: t.spacing[2], paddingVertical: t.spacing[0.5], fontSize: t.fontSize.xs },
      md: { paddingHorizontal: t.spacing[2.5], paddingVertical: t.spacing[1], fontSize: t.fontSize.xs },
      lg: { paddingHorizontal: t.spacing[3], paddingVertical: t.spacing[1.5], fontSize: t.fontSize.sm }
    },
    variant: {
      default: { bg: t.color.bg.emphasis, text: t.color.text.secondary },
      brand: { bg: t.color.brand.subtle, text: t.color.brand.text },
      accent: { bg: t.color.accent.subtle, text: t.color.accent.text },
      success: { bg: t.color.success.bg, text: t.color.success.text },
      warning: { bg: t.color.warning.bg, text: t.color.warning.text },
      error: { bg: t.color.error.bg, text: t.color.error.text },
      info: { bg: t.color.info.bg, text: t.color.info.text }
    },
    text: {
      fontWeight: t.fontWeight.semibold
    },
    dot: {
      size: 8,
      offset: -2
    }
  };
}
function toastTokens(t) {
  return {
    container: {
      borderRadius: t.radius.lg,
      paddingHorizontal: t.spacing[6],
      paddingVertical: t.spacing[5],
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[4],
      ...t.shadow.lg
    },
    variant: {
      default: { backgroundColor: t.color.bg.inverse, borderWidth: 0 },
      success: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.success.icon },
      warning: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.warning.icon },
      error: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.error.icon },
      info: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.info.icon }
    },
    text: {
      fontSize: t.fontSize.sm,
      color: t.color.text.inverse,
      flex: 1
    }
  };
}
function avatarTokens(t) {
  return {
    container: {
      backgroundColor: t.color.bg.muted,
      alignItems: "center",
      justifyContent: "center"
    },
    size: {
      xs: { width: 24, height: 24, borderRadius: 12, fontSize: t.fontSize.xs },
      sm: { width: 32, height: 32, borderRadius: 16, fontSize: t.fontSize.sm },
      md: { width: 40, height: 40, borderRadius: 20, fontSize: t.fontSize.md },
      lg: { width: 48, height: 48, borderRadius: 24, fontSize: t.fontSize.lg },
      xl: { width: 64, height: 64, borderRadius: 32, fontSize: t.fontSize.xl },
      "2xl": { width: 80, height: 80, borderRadius: 40, fontSize: t.fontSize["2xl"] }
    },
    text: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.semibold
    },
    // Text on brand background (e.g. avatar with brand bg)
    onBrand: {
      color: t.color.text.onBrand,
      fontWeight: t.fontWeight.semibold
    },
    presence: {
      borderWidth: 2,
      borderColor: t.color.surface.default
    }
  };
}
function checkboxTokens(t) {
  return {
    size: {
      sm: { width: 16, height: 16, borderRadius: t.radius.xs, borderWidth: 1.5, iconSize: 10 },
      md: { width: 20, height: 20, borderRadius: t.radius.xs, borderWidth: 2, iconSize: 12 },
      lg: { width: 24, height: 24, borderRadius: t.radius.sm, borderWidth: 2, iconSize: 14 }
    },
    container: {
      alignItems: "center",
      justifyContent: "center"
    },
    focusRing: { borderColor: t.color.border.focus, borderWidth: 2, outlineOffset: t.focusRing.offset },
    state: {
      default: { borderColor: t.color.border.strong, backgroundColor: "transparent" },
      checked: { borderColor: t.color.brand.default, backgroundColor: t.color.brand.default },
      disabled: { opacity: t.opacity[40] }
    }
  };
}
function switchTokens(t) {
  return {
    track: {
      sm: { width: 36, height: 20, borderRadius: 10, padding: 2 },
      md: { width: 46, height: 26, borderRadius: 13, padding: 2 },
      lg: { width: 56, height: 30, borderRadius: 15, padding: 2 }
    },
    thumb: {
      sm: { width: 16, height: 16, borderRadius: 8 },
      md: { width: 22, height: 22, borderRadius: 11 },
      lg: { width: 26, height: 26, borderRadius: 13 }
    },
    colors: {
      trackOff: t.color.border.default,
      trackOn: t.color.brand.default,
      thumb: t.color.text.inverse,
      disabledOpacity: t.opacity[40]
    }
  };
}
function radioTokens(t) {
  return {
    container: {
      sm: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
      md: { width: 20, height: 20, borderRadius: 10, borderWidth: 2 },
      lg: { width: 24, height: 24, borderRadius: 12, borderWidth: 2 }
    },
    dot: {
      sm: { width: 8, height: 8, borderRadius: 4 },
      md: { width: 10, height: 10, borderRadius: 5 },
      lg: { width: 12, height: 12, borderRadius: 6 }
    },
    colors: {
      borderOff: t.color.border.strong,
      borderOn: t.color.brand.default,
      bgOff: "transparent",
      bgOn: "transparent",
      dot: t.color.brand.default,
      disabledOpacity: t.opacity[40]
    }
  };
}
function sliderTokens(t) {
  return {
    track: {
      height: 4,
      borderRadius: t.radius.full,
      bgOff: t.color.bg.muted,
      bgOn: t.color.brand.default
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      bg: t.color.surface.raised,
      borderColor: t.color.border.default,
      borderWidth: 1,
      ...t.shadow.sm
    },
    disabledOpacity: t.opacity[40]
  };
}
function chipTokens(t) {
  return {
    container: {
      borderRadius: t.radius.full,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: t.spacing[1]
    },
    size: {
      sm: { height: 24, paddingHorizontal: t.spacing[2], fontSize: t.fontSize.xs },
      md: { height: 32, paddingHorizontal: t.spacing[3], fontSize: t.fontSize.sm },
      lg: { height: 40, paddingHorizontal: t.spacing[4], fontSize: t.fontSize.md }
    },
    variant: {
      solid: { bg: t.color.bg.emphasis, text: t.color.text.inverse, border: "transparent" },
      outlined: { bg: "transparent", text: t.color.text.primary, border: t.color.border.default },
      subtle: { bg: t.color.brand.subtle, text: t.color.brand.text, border: "transparent" },
      accent: { bg: t.color.accent.subtle, text: t.color.accent.text, border: "transparent" }
    },
    deleteIcon: { color: t.color.text.tertiary, size: 16 }
  };
}
function fabTokens(t) {
  return {
    container: {
      alignItems: "center",
      justifyContent: "center",
      ...t.shadow.lg
    },
    size: {
      sm: { width: 40, height: 40, borderRadius: 20 },
      md: { width: 56, height: 56, borderRadius: 28 },
      lg: { width: 72, height: 72, borderRadius: 36 }
    },
    color: {
      primary: { bg: t.color.brand.default, text: t.color.text.inverse },
      secondary: { bg: t.color.surface.raised, text: t.color.brand.default }
    }
  };
}
function dialogTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.xl,
      padding: t.spacing[6],
      ...t.shadow.xl
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      marginBottom: t.spacing[2]
    },
    content: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      lineHeight: t.fontSize.md * 1.5
    },
    actions: {
      marginTop: t.spacing[6],
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: t.spacing[2]
    }
  };
}
function accordionTokens(t) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default
    },
    summary: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.surface.default,
      gap: t.spacing[2]
    },
    details: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.bg.subtle
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.primary
    },
    icon: {
      color: t.color.text.tertiary,
      size: 16
    }
  };
}
function alertTokens(t) {
  return {
    container: {
      padding: t.spacing[4],
      borderRadius: t.radius.md,
      borderWidth: 1,
      flexDirection: "row",
      gap: t.spacing[3]
    },
    variant: {
      info: {
        bg: t.color.info.bg,
        border: t.color.info.border,
        text: t.color.info.text,
        icon: t.color.info.icon
      },
      success: {
        bg: t.color.success.bg,
        border: t.color.success.border,
        text: t.color.success.text,
        icon: t.color.success.icon
      },
      warning: {
        bg: t.color.warning.bg,
        border: t.color.warning.border,
        text: t.color.warning.text,
        icon: t.color.warning.icon
      },
      error: {
        bg: t.color.error.bg,
        border: t.color.error.border,
        text: t.color.error.text,
        icon: t.color.error.icon
      }
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.semibold,
      marginBottom: t.spacing[0.5]
    },
    message: {
      fontSize: t.fontSize.sm,
      lineHeight: t.fontSize.sm * 1.4
    }
  };
}
function carouselTokens(t) {
  return {
    dot: {
      active: { bg: t.color.brand.default, width: 20 },
      inactive: { bg: t.color.brand.default, width: 8, opacity: 0.3 },
      height: 8,
      borderRadius: 4
    },
    pagination: {
      marginTop: t.spacing[4],
      gap: 6
    }
  };
}
function animatedListTokens(t) {
  return {
    container: {
      flex: 1
    },
    item: {
      paddingVertical: t.spacing[2]
    }
  };
}
function appBarTokens(t) {
  return {
    container: {
      height: 64,
      backgroundColor: t.color.surface.default,
      paddingHorizontal: t.spacing[4],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...t.shadow.md,
      zIndex: t.zIndex.sticky
    },
    title: {
      fontSize: t.fontSize.lg,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary
    }
  };
}
function autocompleteTokens(t) {
  return {
    container: {
      width: "100%"
    },
    menu: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      ...t.shadow.lg,
      marginTop: t.spacing[1],
      maxHeight: 250,
      borderWidth: 1,
      borderColor: t.color.border.default
    },
    item: {
      padding: t.spacing[3],
      hover: { backgroundColor: t.color.bg.hover },
      active: { backgroundColor: t.color.brand.subtle }
    }
  };
}
function bottomNavigationTokens(t) {
  return {
    container: {
      height: 56,
      backgroundColor: t.color.surface.default,
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: t.color.border.subtle,
      paddingBottom: t.spacing[2]
    },
    item: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      active: { color: t.color.brand.default },
      inactive: { color: t.color.text.tertiary }
    },
    label: {
      fontSize: t.fontSize.xs,
      marginTop: 4
    }
  };
}
function bottomSheetTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderTopLeftRadius: t.radius.xl,
      borderTopRightRadius: t.radius.xl,
      ...t.shadow.xl
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: t.color.border.strong,
      alignSelf: "center",
      marginVertical: t.spacing[3]
    },
    backdrop: {
      backgroundColor: t.color.bg.overlay
    }
  };
}
function boxTokens(t) {
  return {
    // Box is a layout primitive, usually just provides access to spacing/theme
    defaults: {
      backgroundColor: "transparent"
    }
  };
}
function breadcrumbsTokens(t) {
  return {
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[2]
    },
    separator: {
      color: t.color.text.tertiary,
      fontSize: t.fontSize.sm
    },
    item: {
      fontSize: t.fontSize.sm,
      color: t.color.text.secondary,
      active: { color: t.color.text.primary, fontWeight: t.fontWeight.medium }
    }
  };
}
function buttonGroupTokens(t) {
  return {
    container: {
      flexDirection: "row",
      borderRadius: t.radius.md,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: t.color.border.default
    },
    divider: {
      width: 1,
      backgroundColor: t.color.border.default
    }
  };
}
function circularProgressTokens(t) {
  return {
    color: t.color.brand.default,
    trackColor: t.color.bg.muted,
    size: {
      sm: 24,
      md: 40,
      lg: 56
    },
    thickness: {
      sm: 2,
      md: 4,
      lg: 6
    }
  };
}
function datePickerTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.lg,
      padding: t.spacing[4],
      ...t.shadow.lg
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: t.spacing[4]
    },
    day: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.full,
      selected: { backgroundColor: t.color.brand.default, color: t.color.text.onBrand },
      today: { borderColor: t.color.brand.default, borderWidth: 1 },
      outside: { color: t.color.text.disabled }
    }
  };
}
function dividerTokens(t) {
  return {
    color: t.color.border.subtle,
    thickness: 1,
    margin: t.spacing[4]
  };
}
function drawerTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      width: 280,
      height: "100%",
      ...t.shadow.xl
    },
    overlay: {
      backgroundColor: t.color.bg.overlay
    }
  };
}
function emptyStateTokens(t) {
  return {
    container: {
      padding: t.spacing[8],
      alignItems: "center",
      justifyContent: "center",
      gap: t.spacing[4]
    },
    icon: {
      size: 64,
      color: t.color.text.tertiary
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      textAlign: "center"
    },
    description: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      textAlign: "center"
    }
  };
}
function formControlTokens(t) {
  return {
    container: {
      width: "100%",
      gap: t.spacing[1.5]
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.secondary
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text
    }
  };
}
function formFieldTokens(t) {
  return {
    // Usually a wrapper for FormControl + actual input
    container: {
      marginBottom: t.spacing[4]
    }
  };
}
function gridTokens(t) {
  return {
    container: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    gap: {
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6]
    }
  };
}
function iconTokens(t) {
  return {
    size: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      "2xl": 48,
      // Aliases for compatibility
      small: 16,
      medium: 20,
      large: 24
    },
    color: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      brand: t.color.brand.default,
      error: t.color.error.icon,
      success: t.color.success.icon,
      warning: t.color.warning.icon,
      info: t.color.info.icon
    }
  };
}
function imageTokens(t) {
  return {
    borderRadius: t.radius.md,
    placeholder: {
      backgroundColor: t.color.bg.muted
    }
  };
}
function imageListTokens(t) {
  return {
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: t.spacing[1]
    },
    item: {
      borderRadius: t.radius.sm,
      overflow: "hidden"
    }
  };
}
function linearProgressTokens(t) {
  return {
    track: {
      height: 4,
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.full,
      overflow: "hidden"
    },
    indicator: {
      height: "100%",
      backgroundColor: t.color.brand.default
    },
    variant: {
      brand: { indicator: { backgroundColor: t.color.brand.default } },
      accent: { indicator: { backgroundColor: t.color.accent.default } },
      success: { indicator: { backgroundColor: t.color.success.icon } },
      error: { indicator: { backgroundColor: t.color.error.icon } }
    }
  };
}
function linkTokens(t) {
  return {
    text: {
      color: t.color.text.link,
      fontSize: t.fontSize.md,
      textDecorationLine: "none"
    },
    hover: {
      textDecorationLine: "underline"
    },
    pressed: {
      opacity: t.opacity[70]
    }
  };
}
function listTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.default
    },
    item: {
      padding: t.spacing[4],
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[3],
      pressed: { backgroundColor: t.color.bg.hover }
    },
    itemText: {
      fontSize: t.fontSize.md,
      color: t.color.text.primary
    },
    subheader: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[2],
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.tertiary
    }
  };
}
function menuTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[1],
      minWidth: 160,
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle
    },
    item: {
      paddingHorizontal: t.spacing[3],
      paddingVertical: t.spacing[2],
      borderRadius: t.radius.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[2],
      pressed: { backgroundColor: t.color.bg.hover }
    },
    itemText: {
      fontSize: t.fontSize.sm,
      color: t.color.text.primary
    }
  };
}
function modalTokens(t) {
  return {
    overlay: {
      backgroundColor: t.color.bg.overlay,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: t.spacing[4]
    },
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.xl,
      width: "100%",
      maxWidth: 500,
      ...t.shadow.xl,
      overflow: "hidden"
    }
  };
}
function otpInputTokens(t) {
  return {
    container: {
      flexDirection: "row",
      gap: t.spacing[2],
      justifyContent: "center"
    },
    cell: {
      width: 48,
      height: 56,
      borderWidth: 1.5,
      borderColor: t.color.border.input,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      alignItems: "center",
      justifyContent: "center",
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      focused: { borderColor: t.color.brand.default },
      error: { borderColor: t.color.error.border }
    }
  };
}
function paperTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.md,
      borderWidth: 0,
      borderColor: t.color.border.default
    },
    elevation: {
      none: { ...t.shadow.none },
      sm: { ...t.shadow.sm },
      md: { ...t.shadow.md },
      lg: { ...t.shadow.lg }
    },
    variant: {
      outlined: { borderWidth: 1 },
      flat: { borderWidth: 0, ...t.shadow.none }
    }
  };
}
function popoverTokens(t) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[4],
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle
    },
    arrow: {
      backgroundColor: t.color.surface.overlay
    }
  };
}
function popperTokens(t) {
  return {
    // Popper is mostly positioning logic, but can have some basic tokens
    container: {
      zIndex: t.zIndex.dropdown
    }
  };
}
function pressableTokens(t) {
  return {
    container: {
      opacity: t.opacity[70],
      backgroundColor: "transparent"
    },
    opacity: t.opacity[70],
    backgroundColor: "transparent",
    hover: { backgroundColor: t.color.bg.hover }
  };
}
function segmentedControlTokens(t) {
  return {
    container: {
      flexDirection: "row",
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.lg,
      padding: 2
    },
    item: {
      flex: 1,
      paddingVertical: t.spacing[1.5],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
      active: { backgroundColor: t.color.surface.default, ...t.shadow.sm },
      text: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.medium, color: t.color.text.primary },
      activeText: { color: t.color.brand.default }
    }
  };
}
function skeletonTokens(t) {
  return {
    backgroundColor: t.color.bg.emphasis,
    borderRadius: t.radius.sm,
    opacity: {
      start: 0.3,
      end: 0.6
    }
  };
}
function snackbarTokens(t) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...t.shadow.lg,
      minWidth: 280
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.sm
    },
    action: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.bold,
      marginLeft: t.spacing[4]
    }
  };
}
function speedDialTokens(t) {
  return {
    container: {
      alignItems: "center",
      gap: t.spacing[3]
    },
    action: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: t.color.surface.raised,
      alignItems: "center",
      justifyContent: "center",
      ...t.shadow.md
    }
  };
}
function stackTokens(t) {
  return {
    gap: {
      xs: t.spacing[1],
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6],
      xl: t.spacing[8]
    }
  };
}
function stepperTokens(t) {
  return {
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[4]
    },
    step: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[2],
      active: { color: t.color.brand.default },
      completed: { color: t.color.success.icon },
      pending: { color: t.color.text.tertiary }
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: t.color.border.default,
      active: { backgroundColor: t.color.brand.default }
    }
  };
}
function tableTokens(t) {
  return {
    container: {
      width: "100%",
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      overflow: "hidden"
    },
    header: {
      backgroundColor: t.color.bg.subtle,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.default
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.subtle,
      hover: { backgroundColor: t.color.bg.hover }
    },
    cell: {
      padding: t.spacing[3],
      fontSize: t.fontSize.sm,
      color: t.color.text.primary
    }
  };
}
function textAreaTokens(t) {
  return {
    ...inputTokens(t),
    container: {
      ...inputTokens(t).container,
      height: "auto",
      minHeight: 100,
      paddingVertical: t.spacing[2],
      textAlignVertical: "top"
    }
  };
}
function textFieldTokens(t) {
  return {
    ...inputTokens(t),
    container: {
      ...inputTokens(t).container
      // Any specific TextField overrides
    }
  };
}
function toggleButtonTokens(t) {
  return {
    container: {
      padding: t.spacing[2],
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.color.border.default,
      backgroundColor: t.color.surface.default,
      alignItems: "center",
      justifyContent: "center",
      selected: {
        backgroundColor: t.color.brand.subtle,
        borderColor: t.color.brand.default
      }
    },
    size: {
      sm: { height: 32, paddingHorizontal: 12, fontSize: t.fontSize.sm },
      md: { height: 40, paddingHorizontal: 16, fontSize: t.fontSize.md },
      lg: { height: 48, paddingHorizontal: 20, fontSize: t.fontSize.lg }
    },
    icon: {
      color: t.color.text.secondary,
      selected: { color: t.color.brand.default }
    }
  };
}
function tooltipTokens(t) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      paddingHorizontal: t.spacing[2],
      paddingVertical: t.spacing[1],
      borderRadius: t.radius.xs,
      ...t.shadow.sm
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.xs
    }
  };
}
function typographyTokens(t) {
  return {
    variants: {
      h1: { fontSize: t.fontSize["4xl"], fontWeight: t.fontWeight.semibold, lineHeight: t.fontSize["4xl"] * 1.1 },
      h2: { fontSize: t.fontSize["3xl"], fontWeight: t.fontWeight.semibold, lineHeight: t.fontSize["3xl"] * 1.1 },
      h3: { fontSize: t.fontSize["2xl"], fontWeight: t.fontWeight.semibold, lineHeight: t.fontSize["2xl"] * 1.2 },
      h4: { fontSize: t.fontSize.xl, fontWeight: t.fontWeight.semibold, lineHeight: t.fontSize.xl * 1.2 },
      h5: { fontSize: t.fontSize.lg, fontWeight: t.fontWeight.medium, lineHeight: t.fontSize.lg * 1.3 },
      h6: { fontSize: t.fontSize.md, fontWeight: t.fontWeight.medium, lineHeight: t.fontSize.md * 1.4 },
      subtitle1: { fontSize: t.fontSize.md, fontWeight: t.fontWeight.medium, lineHeight: t.fontSize.md * 1.4 },
      subtitle2: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.medium, lineHeight: t.fontSize.sm * 1.4 },
      body1: { fontSize: t.fontSize.md, fontWeight: t.fontWeight.regular, lineHeight: t.fontSize.md * 1.5 },
      body2: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.regular, lineHeight: t.fontSize.sm * 1.5 },
      caption: { fontSize: t.fontSize.xs, fontWeight: t.fontWeight.regular, lineHeight: t.fontSize.xs * 1.4 },
      button: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.semibold, textTransform: "uppercase" },
      overline: { fontSize: t.fontSize.xs, fontWeight: t.fontWeight.semibold, letterSpacing: 1.2, textTransform: "uppercase" }
    },
    colors: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      tertiary: t.color.text.tertiary,
      disabled: t.color.text.disabled,
      brand: t.color.brand.text,
      error: t.color.error.text
    }
  };
}
function resolveComponentTokens(t) {
  return {
    button: buttonTokens(t),
    input: inputTokens(t),
    card: cardTokens(t),
    badge: badgeTokens(t),
    toast: toastTokens(t),
    avatar: avatarTokens(t),
    checkbox: checkboxTokens(t),
    switch: switchTokens(t),
    radio: radioTokens(t),
    slider: sliderTokens(t),
    chip: chipTokens(t),
    fab: fabTokens(t),
    dialog: dialogTokens(t),
    tabs: tabsTokens(t),
    select: selectTokens(t),
    rating: ratingTokens(t),
    pagination: paginationTokens(t),
    timeline: timelineTokens(t),
    accordion: accordionTokens(t),
    alert: alertTokens(t),
    carousel: carouselTokens(t),
    animatedList: animatedListTokens(t),
    appBar: appBarTokens(t),
    autocomplete: autocompleteTokens(t),
    bottomNavigation: bottomNavigationTokens(t),
    bottomSheet: bottomSheetTokens(t),
    box: boxTokens(t),
    breadcrumbs: breadcrumbsTokens(t),
    buttonGroup: buttonGroupTokens(t),
    circularProgress: circularProgressTokens(t),
    datePicker: datePickerTokens(t),
    divider: dividerTokens(t),
    drawer: drawerTokens(t),
    emptyState: emptyStateTokens(t),
    formControl: formControlTokens(t),
    formField: formFieldTokens(t),
    grid: gridTokens(t),
    icon: iconTokens(t),
    image: imageTokens(t),
    imageList: imageListTokens(t),
    linearProgress: linearProgressTokens(t),
    link: linkTokens(t),
    list: listTokens(t),
    menu: menuTokens(t),
    modal: modalTokens(t),
    otpInput: otpInputTokens(t),
    paper: paperTokens(t),
    popover: popoverTokens(t),
    popper: popperTokens(t),
    pressable: pressableTokens(t),
    segmentedControl: segmentedControlTokens(t),
    skeleton: skeletonTokens(t),
    snackbar: snackbarTokens(t),
    speedDial: speedDialTokens(t),
    stack: stackTokens(t),
    stepper: stepperTokens(t),
    table: tableTokens(t),
    textArea: textAreaTokens(t),
    textField: textFieldTokens(t),
    toggleButton: toggleButtonTokens(t),
    tooltip: tooltipTokens(t),
    typography: typographyTokens(t)
  };
}
function tabsTokens(t) {
  return {
    indicator: { bg: t.color.brand.default, height: 2 },
    tab: {
      active: { color: t.color.brand.default, fontWeight: "600" },
      inactive: { color: t.color.text.secondary },
      hover: { bg: t.color.bg.hover }
    },
    container: { borderBottomColor: t.color.border.default }
  };
}
function selectTokens(t) {
  return {
    trigger: {
      bg: t.color.surface.default,
      borderColor: t.color.border.default,
      focusBorderColor: t.color.border.focus,
      borderRadius: t.radius.md,
      padding: { x: t.spacing[3], y: t.spacing[2] }
    },
    menu: {
      bg: t.color.surface.default,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      shadow: t.shadow.md
    },
    option: {
      selected: { bg: t.color.brand.subtle, color: t.color.brand.default },
      hover: { bg: t.color.bg.hover },
      default: { color: t.color.text.primary }
    }
  };
}
function ratingTokens(t) {
  const accent = t.color.accent.default;
  return {
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing[1]
    },
    /** Tighter row for `compact` Rating — same flex as `container`, smaller gap */
    containerCompact: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2
    },
    star: {
      filled: { color: accent },
      empty: { color: t.color.border.strong },
      half: { color: accent }
    },
    size: { sm: 16, md: 20, lg: 28 }
  };
}
function paginationTokens(t) {
  return {
    item: {
      active: { bg: t.color.brand.default, color: "#fff", borderColor: t.color.brand.default },
      default: { bg: "transparent", color: t.color.text.primary, borderColor: t.color.border.default },
      hover: { bg: t.color.bg.hover },
      disabled: { color: t.color.text.disabled, borderColor: t.color.border.default }
    },
    size: { sm: 28, md: 36, lg: 44 },
    gap: t.spacing[1]
  };
}
function timelineTokens(t) {
  return {
    connector: { color: t.color.border.default, width: 2 },
    dot: {
      completed: { bg: t.color.brand.default, borderColor: t.color.brand.default },
      active: { bg: t.color.surface.default, borderColor: t.color.brand.default },
      pending: { bg: t.color.surface.default, borderColor: t.color.border.strong },
      size: 12
    },
    content: { gap: t.spacing[2] }
  };
}

// src/motion.ts
var spring = {
  // Snappy — buttons, toggles, checkboxes
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8
  },
  // Bouncy — FABs, badges, notifications
  bouncy: {
    damping: 12,
    stiffness: 300,
    mass: 1
  },
  // Gentle — modals, sheets, page transitions
  gentle: {
    damping: 28,
    stiffness: 200,
    mass: 1
  },
  // Stiff — tooltips, dropdowns (quick in/out)
  stiff: {
    damping: 32,
    stiffness: 500,
    mass: 0.6
  }
};
var duration = {
  instant: 50,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500
};
var easing = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear"
};
var pressFeedback = {
  // Scale down on press
  scaleDown: { pressed: 0.96, released: 1, spring: spring.snappy },
  // Subtle scale for list items
  scaleDownSubtle: { pressed: 0.98, released: 1, spring: spring.snappy },
  // Opacity only (no scale) — for icon buttons
  opacityOnly: { pressed: 0.6, released: 1, duration: duration.fast }
};
var motionPreset = {
  enter: {
    fadeUp: "FadeInUp",
    fadeDown: "FadeInDown",
    fadeIn: "FadeIn",
    scaleIn: "ZoomIn",
    slideFromBottom: "SlideInDown",
    slideFromTop: "SlideInUp",
    slideFromRight: "SlideInRight"
  },
  exit: {
    fadeDown: "FadeOutDown",
    fadeUp: "FadeOutUp",
    fadeOut: "FadeOut",
    scaleOut: "ZoomOut",
    slideToBottom: "SlideOutDown",
    slideToTop: "SlideOutUp",
    slideToRight: "SlideOutRight"
  }
};
var timingPreset = {
  // Fade in/out — opacity only
  fadeIn: { duration: duration.fast, easing: easing.easeOut },
  fadeOut: { duration: duration.fast, easing: easing.easeIn },
  // Scale up — micro interactions
  popIn: { duration: duration.normal, easing: easing.easeOut },
  popOut: { duration: duration.fast, easing: easing.easeIn },
  // Slide — panels, sheets
  slideIn: { duration: duration.slow, easing: easing.easeOut },
  slideOut: { duration: duration.normal, easing: easing.easeIn },
  // Color transitions — theme switch, hover
  color: { duration: duration.fast, easing: easing.linear }
};
var focusRingAnimation = {
  in: { duration: duration.fast, easing: easing.easeOut },
  out: { duration: duration.fast, easing: easing.easeIn }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  avatarTokens,
  badgeTokens,
  buildSemanticTokens,
  buttonTokens,
  cardTokens,
  checkboxTokens,
  chipTokens,
  darkTokens,
  defineBrand,
  dialogTokens,
  duration,
  easing,
  fabTokens,
  focusRingAnimation,
  getBrandColors,
  inputTokens,
  lightTokens,
  motionPreset,
  paginationTokens,
  pressFeedback,
  primitive,
  radioTokens,
  ratingTokens,
  resolveComponentTokens,
  selectTokens,
  semanticTokens,
  sliderTokens,
  spring,
  switchTokens,
  tabsTokens,
  timelineTokens,
  timingPreset,
  toastTokens
});
//# sourceMappingURL=index.js.map