import type { SemanticTokens } from '../semantic';

export function checkboxTokens(t: SemanticTokens) {
  return {
    size: {
      sm: {
        width: 20,
        height: 20,
        borderRadius: t.radius.sm,
        borderWidth: 1.5,
        iconSize: 12,
      },
      md: {
        width: 24,
        height: 24,
        borderRadius: t.radius.sm,
        borderWidth: 2,
        iconSize: 14,
      },
      lg: {
        width: 28,
        height: 28,
        borderRadius: t.radius.sm,
        borderWidth: 2,
        iconSize: 16,
      },
    },
    container: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minWidth: 44,
      minHeight: 44,
    },
    focusRing: {
      borderColor: t.color.border.focus,
      borderWidth: 2,
      outlineOffset: t.focusRing.offset,
    },
    state: {
      default: {
        borderColor: t.color.border.default,
        backgroundColor: t.color.surface.default,
      },
      checked: {
        borderColor: t.color.brand.default,
        backgroundColor: t.color.brand.default,
      },
      disabled: { opacity: t.opacity[40] },
    },
  };
}
