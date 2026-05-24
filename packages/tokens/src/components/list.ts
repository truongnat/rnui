import type { SemanticTokens } from '../semantic';

export function listTokens(t: SemanticTokens) {
  const itemPaddingX = t.spacing[4];
  const leadingGap = t.spacing[3];
  const avatarMd = 40;

  return {
    container: {
      backgroundColor: t.color.bg.default,
    },
    inset: {
      borderRadius: t.radius.lg,
      overflow: 'hidden' as const,
      backgroundColor: t.color.surface.raised,
      borderWidth: 1,
      borderColor: t.color.border.default,
    },
    item: {
      padding: t.spacing[4],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: leadingGap,
      minHeight: 48,
      backgroundColor: t.color.surface.default,
      pressed: { backgroundColor: t.color.bg.hover },
    },
    separator: {
      color: t.color.border.subtle,
      insetLeft: t.spacing[4],
      /** Align divider with text after a medium avatar + gap */
      insetLeading: itemPaddingX + avatarMd + leadingGap,
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
