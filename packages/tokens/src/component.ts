import type { SemanticTokens } from "./semantic";

/**
 * Component tokens — computed per component from semantic tokens.
 * Generated at theme-resolution time inside ThemeProvider.
 * RULE: One function per component, takes SemanticTokens, returns typed style map.
 */

// ─── Button ──────────────────────────────────────────────────────
export function buttonTokens(t: SemanticTokens) {
  const base = {
    borderRadius: t.radius.full,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: t.spacing[2],
  };

  return {
    variant: {
      solid: {
        container: {
          ...base,
          backgroundColor: t.color.brand.default,
          borderWidth: 0,
          ...t.shadow.md,
        },
        text: { color: "#FFFFFF", fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.brand.active, ...t.shadow.none },
      },
      outline: {
        container: { ...base, backgroundColor: "transparent", borderWidth: 1.5, borderColor: t.color.border.default },
        text: { color: t.color.text.primary, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.bg.muted },
      },
      ghost: {
        container: { ...base, backgroundColor: "transparent", borderWidth: 0 },
        text: { color: t.color.brand.default, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.brand.subtle },
      },
      destructive: {
        container: { ...base, backgroundColor: t.color.error.bg, borderWidth: 1, borderColor: t.color.error.border },
        text: { color: t.color.error.text, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.error.border },
      },
      // Accent/CTA — Amber, stands out from brand violet
      accent: {
        container: {
          ...base,
          backgroundColor: t.color.accent.default,
          borderWidth: 0,
          ...t.shadow.md,
        },
        text: { color: t.color.accent.onAccent, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.accent.active, ...t.shadow.none },
      },
    },
    size: {
      sm: { container: { height: 36, paddingHorizontal: t.spacing[4] }, text: { fontSize: t.fontSize.sm } },
      md: { container: { height: 44, paddingHorizontal: t.spacing[6] }, text: { fontSize: t.fontSize.md } },
      lg: { container: { height: 54, paddingHorizontal: t.spacing[8] }, text: { fontSize: t.fontSize.lg } },
    },
    disabled: {
      container: { opacity: t.opacity[40], ...t.shadow.none },
    },
  };
}

// ─── Input ───────────────────────────────────────────────────────
export function inputTokens(t: SemanticTokens) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.input,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: t.spacing[3],
      gap: t.spacing[2],
    },
    hover: {
      borderColor: t.color.border.strong,
    },
    disabled: {
      backgroundColor: t.color.bg.disabled,
      borderColor: t.color.border.default,
      opacity: t.opacity[50],
    },
    size: {
      sm: { height: 32, fontSize: t.fontSize.sm },
      md: { height: 40, fontSize: t.fontSize.md },
      lg: { height: 48, fontSize: t.fontSize.lg },
    },
    focusRing: { borderColor: t.color.border.focus, borderWidth: 2, outlineOffset: t.focusRing.offset },
    state: {
      default: { borderColor: t.color.border.default },
      focused: { borderColor: t.color.border.focus, borderWidth: 1.5 },
      error: { borderColor: t.color.border.error },
      disabled: { backgroundColor: t.color.bg.muted, opacity: t.opacity[60] },
    },
    text: {
      color: t.color.text.primary,
      placeholderColor: t.color.text.tertiary,
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.secondary,
      marginBottom: t.spacing[1],
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
      marginTop: t.spacing[1],
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
      marginTop: t.spacing[1],
    },
  };
}

// ─── Card ────────────────────────────────────────────────────────
export function cardTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.raised,
      borderRadius: t.radius.lg,
      borderWidth: 1,
      borderColor: t.color.border.default,
      ...t.shadow.sm,
    },
    padding: {
      sm: t.spacing[3],
      md: t.spacing[4],
      lg: t.spacing[6],
    },
    pressed: {
      opacity: t.opacity[80],
    },
  };
}

// ─── Badge ───────────────────────────────────────────────────────
export function badgeTokens(t: SemanticTokens) {
  return {
    base: {
      borderRadius: t.radius.full,
      alignSelf: "flex-start" as const,
    },
    size: {
      sm: { paddingHorizontal: t.spacing[2],   paddingVertical: t.spacing[0.5], fontSize: t.fontSize.xs  },
      md: { paddingHorizontal: t.spacing[2.5], paddingVertical: t.spacing[1],   fontSize: t.fontSize.xs  },
      lg: { paddingHorizontal: t.spacing[3],   paddingVertical: t.spacing[1.5], fontSize: t.fontSize.sm  },
    },
    variant: {
      default: { bg: t.color.bg.emphasis,     text: t.color.text.secondary  },
      brand:   { bg: t.color.brand.subtle,    text: t.color.brand.text      },
      accent:  { bg: t.color.accent.subtle,   text: t.color.accent.text     },
      success: { bg: t.color.success.bg,      text: t.color.success.text    },
      warning: { bg: t.color.warning.bg,      text: t.color.warning.text    },
      error:   { bg: t.color.error.bg,        text: t.color.error.text      },
      info:    { bg: t.color.info.bg,         text: t.color.info.text       },
    },
    text: {
      fontWeight: t.fontWeight.semibold,
    },
    dot: {
      size: 8,
      offset: -2,
    },
  };
}

// ─── Toast / Snackbar ────────────────────────────────────────────
export function toastTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.lg,
      paddingHorizontal: t.spacing[6],
      paddingVertical: t.spacing[5],
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[4],
      ...t.shadow.lg,
    },
    variant: {
      default: { backgroundColor: t.color.bg.inverse, borderWidth: 0 },
      success: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.success.icon },
      warning: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.warning.icon },
      error: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.error.icon },
      info: { backgroundColor: t.color.bg.inverse, borderLeftWidth: 4, borderLeftColor: t.color.info.icon },
    },
    text: {
      fontSize: t.fontSize.sm,
      color: "#FFFFFF", // Use definite white for background inverse for maximum contrast
      flex: 1,
    },
  };
}

// ─── Avatar ──────────────────────────────────────────────────────
export function avatarTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.muted,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    size: {
      xs: { width: 24, height: 24, borderRadius: 12, fontSize: t.fontSize.xs },
      sm: { width: 32, height: 32, borderRadius: 16, fontSize: t.fontSize.sm },
      md: { width: 40, height: 40, borderRadius: 20, fontSize: t.fontSize.md },
      lg: { width: 48, height: 48, borderRadius: 24, fontSize: t.fontSize.lg },
      xl: { width: 64, height: 64, borderRadius: 32, fontSize: t.fontSize.xl },
      "2xl": { width: 80, height: 80, borderRadius: 40, fontSize: t.fontSize["2xl"] },
    },
    text: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.semibold,
    },
    // Text on brand background (e.g. avatar with brand bg)
    onBrand: {
      color: t.color.text.onBrand,
      fontWeight: t.fontWeight.semibold,
    },
    presence: {
      borderWidth: 2,
      borderColor: t.color.surface.default,
    },
  };
}

// ─── Checkbox ────────────────────────────────────────────────────
export function checkboxTokens(t: SemanticTokens) {
  return {
    size: {
      sm: { width: 16, height: 16, borderRadius: t.radius.xs, borderWidth: 1.5, iconSize: 10 },
      md: { width: 20, height: 20, borderRadius: t.radius.xs, borderWidth: 2,   iconSize: 12 },
      lg: { width: 24, height: 24, borderRadius: t.radius.sm, borderWidth: 2,   iconSize: 14 },
    },
    container: {
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    focusRing: { borderColor: t.color.border.focus, borderWidth: 2, outlineOffset: t.focusRing.offset },
    state: {
      default: { borderColor: t.color.border.strong, backgroundColor: "transparent" },
      checked: { borderColor: t.color.brand.default, backgroundColor: t.color.brand.default },
      disabled: { opacity: t.opacity[40] },
    },
  };
}

// ─── Switch ──────────────────────────────────────────────────────
export function switchTokens(t: SemanticTokens) {
  return {
    track: {
      sm: { width: 36, height: 20, borderRadius: 10, padding: 2 },
      md: { width: 46, height: 26, borderRadius: 13, padding: 2 },
      lg: { width: 56, height: 30, borderRadius: 15, padding: 2 },
    },
    thumb: {
      sm: { width: 16, height: 16, borderRadius: 8 },
      md: { width: 22, height: 22, borderRadius: 11 },
      lg: { width: 26, height: 26, borderRadius: 13 },
    },
    colors: {
      trackOff: t.color.border.default,
      trackOn: t.color.brand.default,
      thumb: "#FFFFFF",
      disabledOpacity: t.opacity[40],
    },
  };
}

// ─── Radio ───────────────────────────────────────────────────────
export function radioTokens(t: SemanticTokens) {
  return {
    container: {
      sm: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
      md: { width: 20, height: 20, borderRadius: 10, borderWidth: 2 },
      lg: { width: 24, height: 24, borderRadius: 12, borderWidth: 2 },
    },
    dot: {
      sm: { width: 8, height: 8, borderRadius: 4 },
      md: { width: 10, height: 10, borderRadius: 5 },
      lg: { width: 12, height: 12, borderRadius: 6 },
    },
    colors: {
      borderOff: t.color.border.strong,
      borderOn: t.color.brand.default,
      bgOff: "transparent",
      bgOn: "transparent",
      dot: t.color.brand.default,
      disabledOpacity: t.opacity[40],
    },
  };
}

// ─── Slider ──────────────────────────────────────────────────────
export function sliderTokens(t: SemanticTokens) {
  return {
    track: {
      height: 4,
      borderRadius: t.radius.full,
      bgOff: t.color.bg.muted,
      bgOn: t.color.brand.default,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      bg: "#FFFFFF",
      borderColor: t.color.border.default,
      borderWidth: 1,
      ...t.shadow.sm,
    },
    disabledOpacity: t.opacity[40],
  };
}

// ─── Chip ────────────────────────────────────────────────────────
export function chipTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.full,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      gap: t.spacing[1],
    },
    size: {
      sm: { height: 24, paddingHorizontal: t.spacing[2],   fontSize: t.fontSize.xs },
      md: { height: 32, paddingHorizontal: t.spacing[3],   fontSize: t.fontSize.sm },
      lg: { height: 40, paddingHorizontal: t.spacing[4],   fontSize: t.fontSize.md },
    },
    variant: {
      solid:   { bg: t.color.bg.emphasis,   text: t.color.text.inverse,  border: "transparent" },
      outlined:{ bg: "transparent",         text: t.color.text.primary,  border: t.color.border.default },
      subtle:  { bg: t.color.brand.subtle,  text: t.color.brand.text,    border: "transparent" },
      accent:  { bg: t.color.accent.subtle, text: t.color.accent.text,   border: "transparent" },
    },
    deleteIcon: { color: t.color.text.tertiary, size: 16 },
  };
}

// ─── Fab ─────────────────────────────────────────────────────────
export function fabTokens(t: SemanticTokens) {
  return {
    container: {
      alignItems: "center" as const,
      justifyContent: "center" as const,
      ...t.shadow.lg,
    },
    size: {
      sm: { width: 40, height: 40, borderRadius: 20 },
      md: { width: 56, height: 56, borderRadius: 28 },
      lg: { width: 72, height: 72, borderRadius: 36 },
    },
    color: {
      primary: { bg: t.color.brand.default, text: t.color.text.inverse },
      secondary: { bg: t.color.surface.raised, text: t.color.brand.default },
    },
  };
}

// ─── Dialog ──────────────────────────────────────────────────────
export function dialogTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.xl,
      padding: t.spacing[6],
      ...t.shadow.xl,
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      marginBottom: t.spacing[2],
    },
    content: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      lineHeight: t.fontSize.md * 1.5,
    },
    actions: {
      marginTop: t.spacing[6],
      flexDirection: "row" as const,
      justifyContent: "flex-end" as const,
      gap: t.spacing[2],
    },
  };
}

// ─── Accordion ───────────────────────────────────────────────────
export function accordionTokens(t: SemanticTokens) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
    },
    summary: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.surface.default,
      gap: t.spacing[2],
    },
    details: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.bg.subtle,
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.primary,
    },
    icon: {
      color: t.color.text.tertiary,
      size: 16,
    },
  } as const;
}

// ─── Alert ───────────────────────────────────────────────────────
export function alertTokens(t: SemanticTokens) {
  return {
    container: {
      padding: t.spacing[4],
      borderRadius: t.radius.md,
      borderWidth: 1,
      flexDirection: "row" as const,
      gap: t.spacing[3],
    },
    variant: {
      info: {
        bg: t.color.info.bg,
        border: t.color.info.border,
        text: t.color.info.text,
        icon: t.color.info.icon,
      },
      success: {
        bg: t.color.success.bg,
        border: t.color.success.border,
        text: t.color.success.text,
        icon: t.color.success.icon,
      },
      warning: {
        bg: t.color.warning.bg,
        border: t.color.warning.border,
        text: t.color.warning.text,
        icon: t.color.warning.icon,
      },
      error: {
        bg: t.color.error.bg,
        border: t.color.error.border,
        text: t.color.error.text,
        icon: t.color.error.icon,
      },
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.semibold,
      marginBottom: t.spacing[0.5],
    },
    message: {
      fontSize: t.fontSize.sm,
      lineHeight: t.fontSize.sm * 1.4,
    },
  } as const;
}

// ─── Carousel ────────────────────────────────────────────────────
export function carouselTokens(t: SemanticTokens) {
  return {
    dot: {
      active: { bg: t.color.brand.default, width: 20 },
      inactive: { bg: t.color.brand.default, width: 8, opacity: 0.3 },
      height: 8,
      borderRadius: 4,
    },
    pagination: {
      marginTop: t.spacing[4],
      gap: 6,
    },
  } as const;
}

// ─── AnimatedList ────────────────────────────────────────────────
export function animatedListTokens(t: SemanticTokens) {
  return {
    container: {
      flex: 1,
    },
    item: {
      paddingVertical: t.spacing[2],
    },
  } as const;
}

// ─── AppBar ──────────────────────────────────────────────────────
export function appBarTokens(t: SemanticTokens) {
  return {
    container: {
      height: 64,
      backgroundColor: t.color.surface.default,
      paddingHorizontal: t.spacing[4],
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      ...t.shadow.md,
      zIndex: t.zIndex.sticky,
    },
    title: {
      fontSize: t.fontSize.lg,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
    },
  } as const;
}

// ─── Autocomplete ────────────────────────────────────────────────
export function autocompleteTokens(t: SemanticTokens) {
  return {
    container: {
      width: "100%",
    },
    menu: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      ...t.shadow.lg,
      marginTop: t.spacing[1],
      maxHeight: 250,
      borderWidth: 1,
      borderColor: t.color.border.default,
    },
    item: {
      padding: t.spacing[3],
      hover: { backgroundColor: t.color.bg.hover },
      active: { backgroundColor: t.color.brand.subtle },
    },
  } as const;
}

// ─── BottomNavigation ───────────────────────────────────────────
export function bottomNavigationTokens(t: SemanticTokens) {
  return {
    container: {
      height: 56,
      backgroundColor: t.color.surface.default,
      flexDirection: "row" as const,
      borderTopWidth: 1,
      borderTopColor: t.color.border.subtle,
      paddingBottom: t.spacing[2],
    },
    item: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      active: { color: t.color.brand.default },
      inactive: { color: t.color.text.tertiary },
    },
    label: {
      fontSize: t.fontSize.xs,
      marginTop: 4,
    },
  } as const;
}

// ─── BottomSheet ────────────────────────────────────────────────
export function bottomSheetTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderTopLeftRadius: t.radius.xl,
      borderTopRightRadius: t.radius.xl,
      ...t.shadow.xl,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: t.color.border.strong,
      alignSelf: "center" as const,
      marginVertical: t.spacing[3],
    },
    backdrop: {
      backgroundColor: t.color.bg.overlay,
    },
  } as const;
}

// ─── Box ─────────────────────────────────────────────────────────
export function boxTokens(t: SemanticTokens) {
  return {
    // Box is a layout primitive, usually just provides access to spacing/theme
    defaults: {
      backgroundColor: "transparent",
    },
  } as const;
}

// ─── Breadcrumbs ─────────────────────────────────────────────────
export function breadcrumbsTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[2],
    },
    separator: {
      color: t.color.text.tertiary,
      fontSize: t.fontSize.sm,
    },
    item: {
      fontSize: t.fontSize.sm,
      color: t.color.text.secondary,
      active: { color: t.color.text.primary, fontWeight: t.fontWeight.medium },
    },
  } as const;
}

// ─── ButtonGroup ────────────────────────────────────────────────
export function buttonGroupTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      borderRadius: t.radius.md,
      overflow: "hidden" as const,
      borderWidth: 1,
      borderColor: t.color.border.default,
    },
    divider: {
      width: 1,
      backgroundColor: t.color.border.default,
    },
  } as const;
}

// ─── CircularProgress ───────────────────────────────────────────
export function circularProgressTokens(t: SemanticTokens) {
  return {
    color: t.color.brand.default,
    trackColor: t.color.bg.muted,
    size: {
      sm: 24,
      md: 40,
      lg: 56,
    },
    thickness: {
      sm: 2,
      md: 4,
      lg: 6,
    },
  } as const;
}

// ─── DatePicker ──────────────────────────────────────────────────
export function datePickerTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.lg,
      padding: t.spacing[4],
      ...t.shadow.lg,
    },
    header: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      marginBottom: t.spacing[4],
    },
    day: {
      width: 40,
      height: 40,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      borderRadius: t.radius.full,
      selected: { backgroundColor: t.color.brand.default, color: "#FFFFFF" },
      today: { borderColor: t.color.brand.default, borderWidth: 1 },
      outside: { color: t.color.text.disabled },
    },
  } as const;
}

// ─── Divider ─────────────────────────────────────────────────────
export function dividerTokens(t: SemanticTokens) {
  return {
    color: t.color.border.subtle,
    thickness: 1,
    margin: t.spacing[4],
  } as const;
}

// ─── Drawer ──────────────────────────────────────────────────────
export function drawerTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      width: 280,
      height: "100%",
      ...t.shadow.xl,
    },
    overlay: {
      backgroundColor: t.color.bg.overlay,
    },
  } as const;
}

// ─── EmptyState ──────────────────────────────────────────────────
export function emptyStateTokens(t: SemanticTokens) {
  return {
    container: {
      padding: t.spacing[8],
      alignItems: "center" as const,
      justifyContent: "center" as const,
      gap: t.spacing[4],
    },
    icon: {
      size: 64,
      color: t.color.text.tertiary,
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      textAlign: "center" as const,
    },
    description: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      textAlign: "center" as const,
    },
  } as const;
}

// ─── FormControl ────────────────────────────────────────────────
export function formControlTokens(t: SemanticTokens) {
  return {
    container: {
      width: "100%",
      gap: t.spacing[1.5],
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.secondary,
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
    },
  } as const;
}

// ─── FormField ──────────────────────────────────────────────────
export function formFieldTokens(t: SemanticTokens) {
  return {
    // Usually a wrapper for FormControl + actual input
    container: {
      marginBottom: t.spacing[4],
    },
  } as const;
}

// ─── Grid ────────────────────────────────────────────────────────
export function gridTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
    },
    gap: {
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6],
    },
  } as const;
}

// ─── Icon ────────────────────────────────────────────────────────
export function iconTokens(t: SemanticTokens) {
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
      large: 24,
    },
    color: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      brand: t.color.brand.default,
      error: t.color.error.icon,
      success: t.color.success.icon,
      warning: t.color.warning.icon,
      info: t.color.info.icon,
    },
  } as const;
}

// ─── Image ───────────────────────────────────────────────────────
export function imageTokens(t: SemanticTokens) {
  return {
    borderRadius: t.radius.md,
    placeholder: {
      backgroundColor: t.color.bg.muted,
    },
  } as const;
}

// ─── ImageList ───────────────────────────────────────────────────
export function imageListTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      gap: t.spacing[1],
    },
    item: {
      borderRadius: t.radius.sm,
      overflow: "hidden" as const,
    },
  } as const;
}

// ─── LinearProgress ──────────────────────────────────────────────
export function linearProgressTokens(t: SemanticTokens) {
  return {
    track: {
      height: 4,
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.full,
      overflow: "hidden" as const,
    },
    indicator: {
      height: "100%",
      backgroundColor: t.color.brand.default,
    },
    variant: {
      brand: { indicator: { backgroundColor: t.color.brand.default } },
      accent: { indicator: { backgroundColor: t.color.accent.default } },
      success: { indicator: { backgroundColor: t.color.success.icon } },
      error: { indicator: { backgroundColor: t.color.error.icon } },
    },
  } as const;
}

// ─── Link ────────────────────────────────────────────────────────
export function linkTokens(t: SemanticTokens) {
  return {
    text: {
      color: t.color.text.link,
      fontSize: t.fontSize.md,
      textDecorationLine: "none" as const,
    },
    hover: {
      textDecorationLine: "underline" as const,
    },
    pressed: {
      opacity: t.opacity[70],
    },
  } as const;
}

// ─── List ────────────────────────────────────────────────────────
export function listTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
    },
    item: {
      padding: t.spacing[4],
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[3],
      pressed: { backgroundColor: t.color.bg.hover },
    },
    itemText: {
      fontSize: t.fontSize.md,
      color: t.color.text.primary,
    },
    subheader: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[2],
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.tertiary,
    },
  } as const;
}

// ─── Menu ────────────────────────────────────────────────────────
export function menuTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[1],
      minWidth: 160,
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle,
    },
    item: {
      paddingHorizontal: t.spacing[3],
      paddingVertical: t.spacing[2],
      borderRadius: t.radius.sm,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[2],
      pressed: { backgroundColor: t.color.bg.hover },
    },
    itemText: {
      fontSize: t.fontSize.sm,
      color: t.color.text.primary,
    },
  } as const;
}

// ─── Modal ───────────────────────────────────────────────────────
export function modalTokens(t: SemanticTokens) {
  return {
    overlay: {
      backgroundColor: t.color.bg.overlay,
      flex: 1,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      padding: t.spacing[4],
    },
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.xl,
      width: "100%",
      maxWidth: 500,
      ...t.shadow.xl,
      overflow: "hidden" as const,
    },
  } as const;
}

// ─── OTPInput ────────────────────────────────────────────────────
export function otpInputTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      gap: t.spacing[2],
      justifyContent: "center" as const,
    },
    cell: {
      width: 48,
      height: 56,
      borderWidth: 1.5,
      borderColor: t.color.border.input,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      focused: { borderColor: t.color.brand.default },
      error: { borderColor: t.color.error.border },
    },
  } as const;
}

// ─── Paper ───────────────────────────────────────────────────────
export function paperTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.md,
      borderWidth: 0,
      borderColor: t.color.border.default,
    },
    elevation: {
      none: { ...t.shadow.none },
      sm: { ...t.shadow.sm },
      md: { ...t.shadow.md },
      lg: { ...t.shadow.lg },
    },
    variant: {
      outlined: { borderWidth: 1 },
      flat: { borderWidth: 0, ...t.shadow.none },
    },
  } as const;
}

// ─── Popover ─────────────────────────────────────────────────────
export function popoverTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[4],
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle,
    },
    arrow: {
      backgroundColor: t.color.surface.overlay,
    },
  } as const;
}

// ─── Popper ──────────────────────────────────────────────────────
export function popperTokens(t: SemanticTokens) {
  return {
    // Popper is mostly positioning logic, but can have some basic tokens
    container: {
      zIndex: t.zIndex.dropdown,
    },
  } as const;
}

// ─── Pressable ───────────────────────────────────────────────────
export function pressableTokens(t: SemanticTokens) {
  return {
    container: {
      opacity: t.opacity[70],
      backgroundColor: "transparent" as const,
    },
    opacity: t.opacity[70],
    backgroundColor: "transparent",
    hover: { backgroundColor: t.color.bg.hover },
  } as const;
}

// ─── SegmentedControl ───────────────────────────────────────────
export function segmentedControlTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.lg,
      padding: 2,
    },
    item: {
      flex: 1,
      paddingVertical: t.spacing[1.5],
      alignItems: "center" as const,
      justifyContent: "center" as const,
      borderRadius: t.radius.md,
      active: { backgroundColor: t.color.surface.default, ...t.shadow.sm },
      text: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.medium, color: t.color.text.primary },
      activeText: { color: t.color.brand.default },
    },
  } as const;
}

// ─── Skeleton ────────────────────────────────────────────────────
export function skeletonTokens(t: SemanticTokens) {
  return {
    backgroundColor: t.color.bg.emphasis,
    borderRadius: t.radius.sm,
    opacity: {
      start: 0.3,
      end: 0.6,
    },
  } as const;
}

// ─── Snackbar ────────────────────────────────────────────────────
export function snackbarTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      ...t.shadow.lg,
      minWidth: 280,
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.sm,
    },
    action: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.bold,
      marginLeft: t.spacing[4],
    },
  } as const;
}

// ─── SpeedDial ──────────────────────────────────────────────────
export function speedDialTokens(t: SemanticTokens) {
  return {
    container: {
      alignItems: "center" as const,
      gap: t.spacing[3],
    },
    action: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: t.color.surface.raised,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      ...t.shadow.md,
    },
  } as const;
}

// ─── Stack ───────────────────────────────────────────────────────
export function stackTokens(t: SemanticTokens) {
  return {
    gap: {
      xs: t.spacing[1],
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6],
      xl: t.spacing[8],
    },
  } as const;
}

// ─── Stepper ─────────────────────────────────────────────────────
export function stepperTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[4],
    },
    step: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[2],
      active: { color: t.color.brand.default },
      completed: { color: t.color.success.icon },
      pending: { color: t.color.text.tertiary },
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: t.color.border.default,
      active: { backgroundColor: t.color.brand.default },
    },
  } as const;
}

// ─── Table ───────────────────────────────────────────────────────
export function tableTokens(t: SemanticTokens) {
  return {
    container: {
      width: "100%",
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      overflow: "hidden" as const,
    },
    header: {
      backgroundColor: t.color.bg.subtle,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.default,
    },
    row: {
      flexDirection: "row" as const,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.subtle,
      hover: { backgroundColor: t.color.bg.hover },
    },
    cell: {
      padding: t.spacing[3],
      fontSize: t.fontSize.sm,
      color: t.color.text.primary,
    },
  } as const;
}

// ─── TextArea ────────────────────────────────────────────────────
export function textAreaTokens(t: SemanticTokens) {
  return {
    ...inputTokens(t),
    container: {
      ...inputTokens(t).container,
      height: "auto",
      minHeight: 100,
      paddingVertical: t.spacing[2],
      textAlignVertical: "top" as const,
    },
  } as const;
}

// ─── TextField ───────────────────────────────────────────────────
export function textFieldTokens(t: SemanticTokens) {
  return {
    ...inputTokens(t),
    container: {
      ...inputTokens(t).container,
      // Any specific TextField overrides
    },
  } as const;
}

// ─── ToggleButton ───────────────────────────────────────────────
export function toggleButtonTokens(t: SemanticTokens) {
  return {
    container: {
      padding: t.spacing[2],
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.color.border.default,
      backgroundColor: t.color.surface.default,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      selected: {
        backgroundColor: t.color.brand.subtle,
        borderColor: t.color.brand.default,
      },
    },
    size: {
      sm: { height: 32, paddingHorizontal: 12, fontSize: t.fontSize.sm },
      md: { height: 40, paddingHorizontal: 16, fontSize: t.fontSize.md },
      lg: { height: 48, paddingHorizontal: 20, fontSize: t.fontSize.lg },
    },
    icon: {
      color: t.color.text.secondary,
      selected: { color: t.color.brand.default },
    },
  } as const;
}

// ─── Tooltip ─────────────────────────────────────────────────────
export function tooltipTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      paddingHorizontal: t.spacing[2],
      paddingVertical: t.spacing[1],
      borderRadius: t.radius.xs,
      ...t.shadow.sm,
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.xs,
    },
  } as const;
}

// ─── Typography ──────────────────────────────────────────────────
export function typographyTokens(t: SemanticTokens) {
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
      button: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.semibold, textTransform: "uppercase" as const },
      overline: { fontSize: t.fontSize.xs, fontWeight: t.fontWeight.semibold, letterSpacing: 1.2, textTransform: "uppercase" as const },
    },
    colors: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      tertiary: t.color.text.tertiary,
      disabled: t.color.text.disabled,
      brand: t.color.brand.text,
      error: t.color.error.text,
    },
  } as const;
}

// ─── Composite export ────────────────────────────────────────────
export function resolveComponentTokens(t: SemanticTokens) {
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
    typography: typographyTokens(t),
  } as const;
}

export type ComponentTokens = ReturnType<typeof resolveComponentTokens>;
// ─── Tabs ────────────────────────────────────────────────────────
export function tabsTokens(t: SemanticTokens) {
  return {
    indicator: { bg: t.color.brand.default, height: 2 },
    tab: {
      active: { color: t.color.brand.default, fontWeight: "600" },
      inactive: { color: t.color.text.secondary },
      hover: { bg: t.color.bg.hover },
    },
    container: { borderBottomColor: t.color.border.default },
  } as const;
}

// ─── Select ──────────────────────────────────────────────────────
export function selectTokens(t: SemanticTokens) {
  return {
    trigger: {
      bg: t.color.surface.default,
      borderColor: t.color.border.default,
      focusBorderColor: t.color.border.focus,
      borderRadius: t.radius.md,
      padding: { x: t.spacing[3], y: t.spacing[2] },
    },
    menu: {
      bg: t.color.surface.default,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      shadow: t.shadow.md,
    },
    option: {
      selected: { bg: t.color.brand.subtle, color: t.color.brand.default },
      hover: { bg: t.color.bg.hover },
      default: { color: t.color.text.primary },
    },
  } as const;
}

// ─── Rating ──────────────────────────────────────────────────────
export function ratingTokens(t: SemanticTokens) {
  const accent = t.color.accent.default;
  return {
    container: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing[1],
    },
    /** Tighter row for `compact` Rating — same flex as `container`, smaller gap */
    containerCompact: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 2,
    },
    star: {
      filled: { color: accent },
      empty: { color: t.color.border.strong },
      half: { color: accent },
    },
    size: { sm: 16, md: 20, lg: 28 },
  } as const;
}

// ─── Pagination ──────────────────────────────────────────────────
export function paginationTokens(t: SemanticTokens) {
  return {
    item: {
      active: { bg: t.color.brand.default, color: "#fff", borderColor: t.color.brand.default },
      default: { bg: "transparent", color: t.color.text.primary, borderColor: t.color.border.default },
      hover: { bg: t.color.bg.hover },
      disabled: { color: t.color.text.disabled, borderColor: t.color.border.default },
    },
    size: { sm: 28, md: 36, lg: 44 },
    gap: t.spacing[1],
  } as const;
}

// ─── Timeline ────────────────────────────────────────────────────
export function timelineTokens(t: SemanticTokens) {
  return {
    connector: { color: t.color.border.default, width: 2 },
    dot: {
      completed: { bg: t.color.brand.default, borderColor: t.color.brand.default },
      active: { bg: t.color.surface.default, borderColor: t.color.brand.default },
      pending: { bg: t.color.surface.default, borderColor: t.color.border.strong },
      size: 12,
    },
    content: { gap: t.spacing[2] },
  } as const;
}
