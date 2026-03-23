import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import type { Brand } from "@truongnat/tokens";
import {
  semanticTokens,
  buildSemanticTokens,
  resolveComponentTokens,
  type SemanticTokens,
  type ComponentTokens,
  type ColorScheme,
} from "@truongnat/tokens";

// ─── Types ────────────────────────────────────────────────────────

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
   * import { loveBrand } from "@truongnat/themes"
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
 * For full brand swaps, use defineBrand() from @truongnat/tokens instead.
 */
export function createTheme(override: ThemeOverride): ThemeOverride {
  return override;
}

// Re-export Brand type for convenience
export type { Brand } from "@truongnat/tokens";

// ─── Context ──────────────────────────────────────────────────────

const ThemeContext = createContext<Theme | null>(null);

// ─── Provider ─────────────────────────────────────────────────────

export function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  brand: initialBrand,
  override,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [manualScheme, setManualScheme] = React.useState<ColorScheme | "system">(forcedScheme);
  const [activeBrand, setActiveBrand] = React.useState<Brand | undefined>(initialBrand);

  const activeScheme: ColorScheme =
    manualScheme === "system" ? (systemScheme === "dark" ? "dark" : "light") : manualScheme;

  const theme = useMemo<Theme>(() => {
    // 1. Build base tokens:
    //    - If brand provided → build full SemanticTokens from brand's color group for this scheme
    //    - Otherwise → use default tokens for this scheme
    let tokens: SemanticTokens = activeBrand
      ? buildSemanticTokens(activeBrand, activeScheme)
      : semanticTokens[activeScheme];

    // 2. Apply fine-grained override on top (deep merge)
    if (override?.[activeScheme]) {
      tokens = deepMerge(tokens, override[activeScheme]!);
    }

    // 3. Derive component tokens from the resolved semantic tokens
    const components = resolveComponentTokens(tokens);

    return {
      tokens,
      components,
      colorScheme: activeScheme,
      brand: activeBrand,
      setColorScheme: setManualScheme,
      setBrand: setActiveBrand,
    };
  }, [activeScheme, activeBrand, override]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────

/**
 * Access the full theme (tokens + components + colorScheme + brand).
 * Throws if used outside ThemeProvider.
 */
export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "[RNUI] useTheme must be used inside <ThemeProvider>. " +
        "Wrap your app root with <ThemeProvider>."
    );
  }
  return ctx;
}

/**
 * Returns only semantic tokens. Slightly cheaper when you don't need
 * components, colorScheme, or brand.
 */
export function useTokens(): SemanticTokens {
  return useTheme().tokens;
}

/**
 * Returns only component tokens.
 */
export function useComponentTokens(): ComponentTokens {
  return useTheme().components;
}

/**
 * Returns true when the active color scheme is dark.
 */
export function useIsDark(): boolean {
  return useTheme().colorScheme === "dark";
}

/**
 * Returns the active brand (or undefined if using default tokens).
 */
export function useActiveBrand(): Brand | undefined {
  return useTheme().brand;
}

/**
 * Returns a function to swap the brand at runtime.
 * Triggers a full re-render of all components consuming tokens.
 *
 * @example
 * const switchBrand = useBrandSwitch();
 * switchBrand(oceanBrand);
 */
export function useBrandSwitch(): (brand: Brand | undefined) => void {
  return useTheme().setBrand;
}

// ─── Utilities ────────────────────────────────────────────────────

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
  const result = { ...base };
  for (const key in override) {
    const overrideVal = override[key as keyof typeof override];
    const baseVal = base[key as unknown as keyof T];
    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === "object"
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        baseVal as object,
        overrideVal as DeepPartial<object>
      );
    } else if (overrideVal !== undefined) {
      (result as Record<string, unknown>)[key] = overrideVal;
    }
  }
  return result;
}
