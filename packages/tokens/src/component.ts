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
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: t.spacing[3],
      gap: t.spacing[2],
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
  };
}

export type ComponentTokens = ReturnType<typeof resolveComponentTokens>;