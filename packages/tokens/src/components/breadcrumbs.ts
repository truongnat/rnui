import type { SemanticTokens } from '../semantic';
import { typeScale } from '../typescale';

export function breadcrumbsTokens(t: SemanticTokens) {
  const body = typeScale.body;

  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      flexWrap: 'wrap' as const,
    },
    separator: {
      container: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        alignSelf: 'center' as const,
        paddingHorizontal: t.spacing[1.5],
        paddingVertical: t.spacing[0.5],
      },
      text: {
        color: t.color.text.secondary,
        fontSize: body.fontSize,
        lineHeight: body.lineHeight,
        textAlignVertical: 'center' as const,
      },
    },
    item: {
      row: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        alignSelf: 'center' as const,
      },
      content: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: t.spacing[1],
        paddingVertical: t.spacing[1],
      },
      icon: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      },
      link: {
        fontSize: body.fontSize,
        lineHeight: body.lineHeight,
        color: t.color.text.link,
      },
      current: {
        fontSize: body.fontSize,
        lineHeight: body.lineHeight,
        color: t.color.text.secondary,
        fontWeight: t.fontWeight.regular,
      },
    },
  } as const;
}
