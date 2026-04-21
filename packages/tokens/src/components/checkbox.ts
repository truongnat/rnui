import type { SemanticTokens } from '../semantic';

export function checkboxTokens(t: SemanticTokens) {
  return {
    size: {
      sm: {
        width: 16,
        height: 16,
        borderRadius: t.radius.xs,
        borderWidth: 1.5,
        iconSize: 10,
      },
      md: {
        width: 20,
        height: 20,
        borderRadius: t.radius.xs,
        borderWidth: 2,
        iconSize: 12,
      },
      lg: {
        width: 24,
        height: 24,
        borderRadius: t.radius.sm,
        borderWidth: 2,
        iconSize: 14,
      },
    },
    container: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    focusRing: {
      borderColor: t.color.border.focus,
      borderWidth: 2,
      outlineOffset: t.focusRing.offset,
    },
    state: {
      default: {
        borderColor: t.color.border.strong,
        backgroundColor: 'transparent',
      },
      checked: {
        borderColor: t.color.brand.default,
        backgroundColor: t.color.brand.default,
      },
      disabled: { opacity: t.opacity[40] },
    },
  };
}
