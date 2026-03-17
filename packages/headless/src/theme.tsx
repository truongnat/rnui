import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  semanticTokens,
  resolveComponentTokens,
  type SemanticTokens,
  type ComponentTokens,
  type ColorScheme,
} from "@rnui/tokens";

// ─── Types ────────────────────────────────────────────────────────

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

export interface ThemeOverride {
  /** Deep partial override applied on top of default tokens */
  light?: DeepPartial<SemanticTokens>;
  dark?: DeepPartial<SemanticTokens>;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Force a color scheme, ignoring system preference */
  colorScheme?: ColorScheme | "system";
  /** Token overrides for brand customization */
  override?: ThemeOverride;
}

// ─── Context ──────────────────────────────────────────────────────

const ThemeContext = createContext<Theme | null>(null);

// ─── Provider ─────────────────────────────────────────────────────

export function ThemeProvider({
  children,
  colorScheme: forcedScheme = "system",
  override,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [manualScheme, setManualScheme] = React.useState<ColorScheme | "system">(forcedScheme);

  const activeScheme: ColorScheme =
    manualScheme === "system" ? (systemScheme === "dark" ? "dark" : "light") : manualScheme;

  const theme = useMemo<Theme>(() => {
    // Base semantic tokens for the active scheme
    const baseTokens = semanticTokens[activeScheme];

    // Apply override if provided (deep merge)
    const tokens = override?.[activeScheme]
      ? deepMerge(baseTokens, override[activeScheme]!)
      : baseTokens;

    // Derive component tokens from (possibly overridden) semantic tokens
    const components = resolveComponentTokens(tokens as SemanticTokens);

    return {
      tokens: tokens as SemanticTokens,
      components,
      colorScheme: activeScheme,
      setColorScheme: setManualScheme,
    };
  }, [activeScheme, override]);

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
 * Access the full theme (tokens + components + colorScheme).
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
 * Convenience hook — returns only semantic tokens.
 * Slightly cheaper than useTheme() when you don't need components or colorScheme.
 */
export function useTokens(): SemanticTokens {
  return useTheme().tokens;
}

/**
 * Convenience hook — returns only component tokens.
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