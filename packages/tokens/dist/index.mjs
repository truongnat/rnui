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
    // Brand — Deep Blue (Tailwind Indigo/Blue mix inspired)
    brand: {
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
    amber: {
      50: "#FFFBEB",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      900: "#78350F"
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

// src/semantic.ts
var { color, spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing, opacity, zIndex, elevation } = primitive;
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
      overlay: "rgba(0,0,0,0.6)"
    },
    // Surfaces (cards, sheets, modals)
    surface: {
      default: color.white,
      raised: color.white,
      overlay: color.white,
      sunken: color.gray[100]
    },
    // Text - Much darker overall
    text: {
      primary: color.gray[950],
      // 020617 - Pure contrast
      secondary: color.gray[700],
      // 334155 - Very readable
      tertiary: color.gray[500],
      // 64748B - Not "faded" anymore
      disabled: color.gray[400],
      // 94A3B8
      inverse: color.white,
      link: color.brand[700]
      // Darker blue for links
    },
    // Border - Ultra visible
    border: {
      default: color.gray[400],
      // 94A3B8 - Highly visible
      strong: color.gray[600],
      // 475569 - Very dark
      focus: color.brand[600],
      error: color.red[600]
    },
    // Brand / action
    brand: {
      default: color.brand[600],
      hover: color.brand[700],
      active: color.brand[800],
      subtle: color.brand[100],
      // Stronger subtle background
      muted: color.brand[200],
      text: color.brand[800]
    },
    // Feedback - Max visibility, high contrast
    success: { bg: color.green[50], text: color.green[900], border: color.green[500], icon: color.green[600] },
    warning: { bg: color.amber[50], text: color.amber[900], border: color.amber[500], icon: color.amber[600] },
    error: { bg: color.red[50], text: color.red[900], border: color.red[500], icon: color.red[600] },
    info: { bg: color.blue[50], text: color.blue[900], border: color.blue[500], icon: color.blue[600] }
  },
  // Shadows (iOS) - Aggressive elevation for clear separation
  shadow: {
    none: {},
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 40 }
  }
};
var darkTokens = {
  ...shared,
  color: {
    bg: {
      default: color.gray[950],
      subtle: color.gray[900],
      muted: color.gray[800],
      emphasis: color.gray[700],
      inverse: color.gray[50],
      overlay: `rgba(0,0,0,0.6)`
    },
    surface: {
      default: color.gray[900],
      raised: color.gray[800],
      overlay: color.gray[800],
      sunken: color.gray[950]
    },
    text: {
      primary: color.gray[50],
      secondary: color.gray[400],
      tertiary: color.gray[600],
      disabled: color.gray[700],
      inverse: color.gray[900],
      link: color.brand[400]
    },
    border: {
      default: color.gray[700],
      strong: color.gray[600],
      focus: color.brand[400],
      error: color.red[400]
    },
    brand: {
      default: color.brand[500],
      hover: color.brand[400],
      active: color.brand[300],
      subtle: color.brand[950],
      muted: color.brand[900],
      text: color.brand[300]
    },
    success: { bg: `rgba(34,197,94,0.12)`, text: color.green[400], border: color.green[600], icon: color.green[400] },
    warning: { bg: `rgba(245,158,11,0.12)`, text: color.amber[400], border: color.amber[600], icon: color.amber[400] },
    error: { bg: `rgba(239,68,68,0.12)`, text: color.red[400], border: color.red[600], icon: color.red[400] },
    info: { bg: `rgba(59,130,246,0.12)`, text: color.blue[400], border: color.blue[600], icon: color.blue[400] }
  },
  shadow: {
    none: {},
    sm: { shadowColor: color.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
    md: { shadowColor: color.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 8 },
    lg: { shadowColor: color.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 16 },
    xl: { shadowColor: color.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 24 }
  }
};
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
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: t.spacing[3],
      gap: t.spacing[2]
    },
    size: {
      sm: { height: 32, fontSize: t.fontSize.sm },
      md: { height: 40, fontSize: t.fontSize.md },
      lg: { height: 48, fontSize: t.fontSize.lg }
    },
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
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[2],
      alignSelf: "flex-start"
    },
    variant: {
      default: { bg: t.color.bg.emphasis, text: t.color.text.secondary },
      brand: { bg: t.color.brand.subtle, text: t.color.brand.text },
      success: { bg: t.color.success.bg, text: t.color.success.text },
      warning: { bg: t.color.warning.bg, text: t.color.warning.text },
      error: { bg: t.color.error.bg, text: t.color.error.text },
      info: { bg: t.color.info.bg, text: t.color.info.text }
    },
    text: {
      fontSize: t.fontSize.xs,
      fontWeight: t.fontWeight.semibold
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
    text: {
      color: t.color.brand.default,
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
    container: {
      width: 20,
      height: 20,
      borderRadius: t.radius.xs,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    state: {
      default: { borderColor: t.color.border.strong, backgroundColor: "transparent" },
      checked: { borderColor: t.color.brand.default, backgroundColor: t.color.brand.default },
      disabled: { opacity: t.opacity[40] }
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
    checkbox: checkboxTokens(t)
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

export { badgeTokens, buttonTokens, cardTokens, darkTokens, duration, easing, inputTokens, lightTokens, motionPreset, pressFeedback, primitive, resolveComponentTokens, semanticTokens, spring, toastTokens };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map