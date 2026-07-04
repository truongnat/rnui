import type { SemanticTokens } from '../semantic';
import { typeScale } from '../typescale';

export function blockquoteTokens(t: SemanticTokens) {
  const supporting = typeScale.supporting;

  return {
    container: {
      borderLeftWidth: t.spacing[0.5],
      borderLeftColor: t.color.border.emphasis,
      paddingLeft: t.spacing[4],
      marginVertical: 0,
      marginHorizontal: 0,
    },
    cite: {
      marginTop: t.spacing[2],
      fontSize: supporting.fontSize,
      lineHeight: supporting.lineHeight,
      fontWeight: supporting.fontWeight,
      color: t.color.text.secondary,
      fontStyle: 'normal' as const,
    },
  } as const;
}
