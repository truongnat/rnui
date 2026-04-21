import type { SemanticTokens } from '../semantic';

export function timelineTokens(t: SemanticTokens) {
  return {
    connector: { color: t.color.border.default, width: 2 },
    dot: {
      completed: {
        bg: t.color.brand.default,
        borderColor: t.color.brand.default,
      },
      active: {
        bg: t.color.surface.default,
        borderColor: t.color.brand.default,
      },
      pending: {
        bg: t.color.surface.default,
        borderColor: t.color.border.strong,
      },
      error: {
        bg: t.color.error.text,
        borderColor: t.color.error.text,
      },
      size: 12,
    },
    content: { gap: t.spacing[2] },
  } as const;
}
