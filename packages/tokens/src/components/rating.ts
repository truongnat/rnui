import type { SemanticTokens } from '../semantic';

export function ratingTokens(t: SemanticTokens) {
  const accent = t.color.accent.default;
  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[1],
    },
    /** Tighter row for `compact` Rating — same flex as `container`, smaller gap */
    containerCompact: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
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
