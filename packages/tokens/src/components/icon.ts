import type { SemanticTokens } from '../semantic';

export function iconTokens(t: SemanticTokens) {
  return {
    size: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 48,
      // Aliases for compatibility
      small: 16,
      medium: 20,
      large: 24,
    },
    color: {
      primary: t.color.text.primary,
      secondary: t.color.text.secondary,
      brand: t.color.brand.default,
      error: t.color.error.icon,
      success: t.color.success.icon,
      warning: t.color.warning.icon,
      info: t.color.info.icon,
    },
  } as const;
}
