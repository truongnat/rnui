import type { SemanticTokens } from '../semantic';

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
      alignSelf: 'center' as const,
      marginVertical: t.spacing[3],
    },
    backdrop: {
      backgroundColor: t.color.bg.overlay,
    },
  } as const;
}
