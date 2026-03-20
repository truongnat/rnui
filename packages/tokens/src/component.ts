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
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[2],
      alignSelf: "flex-start" as const,
    },
    variant: {
      default: { bg: t.color.bg.emphasis, text: t.color.text.secondary },
      brand: { bg: t.color.brand.subtle, text: t.color.brand.text },
      success: { bg: t.color.success.bg, text: t.color.success.text },
      warning: { bg: t.color.warning.bg, text: t.color.warning.text },
      error: { bg: t.color.error.bg, text: t.color.error.text },
      info: { bg: t.color.info.bg, text: t.color.info.text },
    },
    text: {
      fontSize: t.fontSize.xs,
      fontWeight: t.fontWeight.semibold,
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
    container: {
      width: 20,
      height: 20,
      borderRadius: t.radius.xs,
      borderWidth: 2,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
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
      paddingHorizontal: t.spacing[3],
      height: 32,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      gap: t.spacing[1],
    },
    text: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
    },
    variant: {
      solid: { bg: t.color.bg.emphasis, text: t.color.text.inverse, border: "transparent" },
      outlined: { bg: "transparent", text: t.color.text.primary, border: t.color.border.default },
      subtle: { bg: t.color.bg.subtle, text: t.color.text.primary, border: "transparent" },
    },
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
      bg: t.color.bg.surface,
      borderColor: t.color.border.default,
      focusBorderColor: t.color.brand.default,
      borderRadius: t.radius.md,
      padding: { x: t.spacing[3], y: t.spacing[2] },
    },
    menu: {
      bg: t.color.bg.surface,
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
  return {
    star: {
      filled: { color: "#F59E0B" },
      empty: { color: t.color.border.strong },
      half: { color: "#F59E0B" },
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
      active: { bg: t.color.bg.surface, borderColor: t.color.brand.default },
      pending: { bg: t.color.bg.surface, borderColor: t.color.border.strong },
      size: 12,
    },
    content: { gap: t.spacing[2] },
  } as const;
}
