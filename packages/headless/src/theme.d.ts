import React, { type ReactNode } from "react";
import { type SemanticTokens, type ComponentTokens, type ColorScheme } from "@rnui/tokens";
export interface Theme {
    /** Resolved semantic tokens for current color scheme */
    tokens: SemanticTokens;
    /** Resolved component tokens for current color scheme */
    components: ComponentTokens;
    /** Current color scheme */
    colorScheme: ColorScheme;
    /** Toggle or force a color scheme */
    setColorScheme: (scheme: ColorScheme | "system") => void;
}
export type ThemeOverride = Partial<Record<ColorScheme, DeepPartial<SemanticTokens>>>;
export interface ThemeProviderProps {
    children: ReactNode;
    /** Force a color scheme, ignoring system preference */
    colorScheme?: ColorScheme | "system";
    /** Token overrides for brand customization */
    override?: ThemeOverride;
}
/**
 * Utility to define a theme override with TypeScript autocomplete support.
 */
export declare function createTheme(override: ThemeOverride): ThemeOverride;
export declare function ThemeProvider({ children, colorScheme: forcedScheme, override, }: ThemeProviderProps): React.JSX.Element;
/**
 * Access the full theme (tokens + components + colorScheme).
 * Throws if used outside ThemeProvider.
 */
export declare function useTheme(): Theme;
/**
 * Convenience hook — returns only semantic tokens.
 * Slightly cheaper than useTheme() when you don't need components or colorScheme.
 */
export declare function useTokens(): SemanticTokens;
/**
 * Convenience hook — returns only component tokens.
 */
export declare function useComponentTokens(): ComponentTokens;
/**
 * Returns true when the active color scheme is dark.
 */
export declare function useIsDark(): boolean;
type DeepPartial<T> = T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;
export {};
//# sourceMappingURL=theme.d.ts.map