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
      onBrand: color.white,
      // text on violet backgrounds
      onAccent: "#1C1917"
      // text on amber backgrounds
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
      error: color.red[600]
      // #DC2626
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
      hover: "#1A1A28",
      // slightly lighter than raised
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
      onBrand: color.white,
      // text on violet backgrounds
      onAccent: "#1C1917"
      // text on amber backgrounds
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
      error: color.red[400]
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
        text: { color: "#FFFFFF", fontWeight: t.fontWeight.semibold },
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
      color: "#FFFFFF",
      // Use definite white for background inverse for maximum contrast
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
      thumb: "#FFFFFF",
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
      bg: "#FFFFFF",
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
    timeline: timelineTokens(t)
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
  return {
    star: {
      filled: { color: "#F59E0B" },
      empty: { color: t.color.border.strong },
      half: { color: "#F59E0B" }
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
export {
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
};
//# sourceMappingURL=index.mjs.map