import type { SemanticTokens } from '../semantic';

export function typographyTokens(t: SemanticTokens) {
  const ramp = t.typography;
  return {
    variants: {
      display: ramp.display,
      h1: ramp.h1,
      h2: ramp.h2,
      h3: ramp.h3,
      h4: ramp.h4,
      h5: ramp.h5,
      h6: ramp.h6,
      body1: ramp.body1,
      body2: ramp.body2,
      caption: ramp.caption,
      overline: ramp.overline,
      label: ramp.label,
      code: ramp.code,
      subtitle1: {
        fontSize: t.fontSize.md,
        fontWeight: t.fontWeight.medium,
        lineHeight: t.fontSize.md * 1.4,
      },
      subtitle2: {
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.medium,
        lineHeight: t.fontSize.sm * 1.4,
      },
      button: {
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.semibold,
        textTransform: 'uppercase' as const,
      },
    },
    colors: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      tertiary: t.color.text.tertiary,
      disabled: t.color.text.disabled,
      brand: t.color.brand.text,
      error: t.color.error.text,
    },
  } as const;
}
