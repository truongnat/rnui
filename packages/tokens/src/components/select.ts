import type { SemanticTokens } from '../semantic';

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
