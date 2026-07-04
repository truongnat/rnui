import type { SemanticTokens } from '../semantic';

export function codeBlockTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.lg,
      borderWidth: 1,
      borderColor: t.color.border.default,
      overflow: 'hidden' as const,
    },
    header: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.surface.sunken,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.default,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    title: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.secondary,
    },
    langBadge: {
      fontSize: t.fontSize.xs,
      fontWeight: t.fontWeight.semibold,
      color: t.color.brand.text,
      backgroundColor: t.color.brand.subtle,
      paddingHorizontal: t.spacing[2],
      paddingVertical: t.spacing[0.5],
      borderRadius: t.radius.sm,
      letterSpacing: 0.3,
      overflow: 'hidden' as const,
    },
    body: {
      padding: t.spacing[4],
      backgroundColor: t.color.surface.default,
    },
    lineNumber: {
      fontSize: t.fontSize.sm,
      fontFamily: t.fontFamily.mono,
      color: t.color.text.tertiary,
      minWidth: t.spacing[8],
      textAlign: 'right' as const,
      paddingRight: t.spacing[3],
    },
    code: {
      fontSize: t.fontSize.sm,
      fontFamily: t.fontFamily.mono,
      lineHeight: t.fontSize.sm * 1.6,
      color: t.color.text.primary,
    },
    highlightLine: {
      backgroundColor: t.color.brand.subtle,
      borderLeftWidth: 3,
      borderLeftColor: t.color.brand.default,
    },
    copyButton: {
      backgroundColor: t.color.surface.raised,
      borderRadius: t.radius.sm,
      padding: t.spacing[1.5],
    },
    copyButtonPressed: {
      backgroundColor: t.color.brand.subtle,
    },
    syntax: {
      keyword: t.color.brand.default,
      string: t.color.success.text,
      number: t.color.warning.text,
      comment: t.color.text.tertiary,
      function: t.color.accent.text,
      operator: t.color.text.secondary,
      punctuation: t.color.text.secondary,
      tag: t.color.error.text,
      attr: t.color.warning.text,
      plain: t.color.text.primary,
    },
  } as const;
}
