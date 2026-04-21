import type {
  Brand,
  ColorScheme,
  ComponentTokens,
  SemanticTokens,
} from '@truongdq01/tokens';
import type { ReactNode } from 'react';

export type { Brand } from '@truongdq01/tokens';

export interface Theme {
  /** Resolved semantic tokens for current color scheme */
  tokens: SemanticTokens;
  /** Resolved component tokens for current color scheme */
  components: ComponentTokens;
  /** Current color scheme */
  colorScheme: ColorScheme;
  /** Active brand when configured */
  brand?: Brand;
  /** Toggle or force a color scheme */
  setColorScheme: (scheme: ColorScheme | 'system') => void;
  /** Swap brand at runtime */
  setBrand: (brand: Brand | undefined) => void;
}

export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

/**
 * Partial token overrides — for one-off tweaks on top of a brand.
 * Use a Brand for full color identity changes; use override for minor adjustments.
 */
export type ThemeOverride = Partial<
  Record<ColorScheme, DeepPartial<SemanticTokens>>
>;

export interface ThemeProviderProps {
  children?: ReactNode;
  /**
   * Force a color scheme, ignoring system preference.
   * "system" (default) follows the device setting.
   */
  colorScheme?: ColorScheme | 'system';
  /**
   * If provided, `ThemeProvider` runs in controlled mode.
   */
  onColorSchemeChange?: (scheme: ColorScheme | 'system') => void;
  /**
   * Brand preset — defines the full color identity.
   */
  brand?: Brand;
  /**
   * Fine-grained token overrides applied on top of the active brand.
   */
  override?: ThemeOverride;
  /** Animate opacity when color scheme or brand changes. Default false. */
  animateTransition?: boolean;
}
