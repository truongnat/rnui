import React, { type ReactNode } from "react";
import type { Brand } from "@rnui/tokens";
import { type SemanticTokens, type ComponentTokens, type ColorScheme } from "@rnui/tokens";
export interface Theme {
    /** Resolved semantic tokens for current color scheme */
    tokens: SemanticTokens;
    /** Resolved component tokens for current color scheme */
    components: ComponentTokens;
    /** Current color scheme */
    colorScheme: ColorScheme;
    /** Active brand (if any) */
    brand?: Brand;
    /** Toggle or force a color scheme */
    setColorScheme: (scheme: ColorScheme | "system") => void;
    /** Swap brand at runtime */
    setBrand: (brand: Brand | undefined) => void;
}
/**
 * Partial token overrides — for one-off tweaks on top of a brand.
 * Use a Brand for full color identity changes; use override for minor adjustments.
 */
export type ThemeOverride = Partial<Record<ColorScheme, DeepPartial<SemanticTokens>>>;
export interface ThemeProviderProps {
    children: ReactNode;
    /**
     * Force a color scheme, ignoring system preference.
     * "system" (default) follows the device setting.
     */
    colorScheme?: ColorScheme | "system";
    /**
     * Brand preset — defines the full color identity (bg, brand, accent, text…).
     * Each brand carries its own light + dark token sets.
     * Switch brands at runtime via the setBrand() method returned by useTheme().
     *
     * @example
     * import { loveBrand } from "@rnui/themes"
     * <ThemeProvider brand={loveBrand}>...</ThemeProvider>
     */
    brand?: Brand;
    /**
     * Fine-grained token overrides applied on top of the active brand.
     * Use for one-off tweaks; prefer Brand for full color swaps.
     */
    override?: ThemeOverride;
}
/**
 * Utility to define a fine-grained theme override with TypeScript autocomplete.
 * For full brand swaps, use defineBrand() from @rnui/tokens instead.
 */
export declare function createTheme(override: ThemeOverride): ThemeOverride;
export type { Brand } from "@rnui/tokens";
export declare function ThemeProvider({ children, colorScheme: forcedScheme, brand: initialBrand, override, }: ThemeProviderProps): React.JSX.Element;
/**
 * Access the full theme (tokens + components + colorScheme + brand).
 * Throws if used outside ThemeProvider.
 */
export declare function useTheme(): Theme;
/**
 * Returns only semantic tokens. Slightly cheaper when you don't need
 * components, colorScheme, or brand.
 */
export declare function useTokens(): SemanticTokens;
/**
 * Returns only component tokens.
 */
export declare function useComponentTokens(): ComponentTokens;
/**
 * Returns true when the active color scheme is dark.
 */
export declare function useIsDark(): boolean;
/**
 * Returns the active brand (or undefined if using default tokens).
 */
export declare function useActiveBrand(): Brand | undefined;
/**
 * Returns a function to swap the brand at runtime.
 * Triggers a full re-render of all components consuming tokens.
 *
 * @example
 * const switchBrand = useBrandSwitch();
 * switchBrand(oceanBrand);
 */
export declare function useBrandSwitch(): (brand: Brand | undefined) => void;
type DeepPartial<T> = T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;
//# sourceMappingURL=theme.d.ts.map