import React from "react";
import type { ColorScheme } from "@truongdq01/tokens";

/**
 * Minimal async storage contract — implement with `@react-native-async-storage/async-storage`
 * or any key/value backend. Headless does not ship a concrete storage dependency.
 */
export interface PersistedColorSchemeStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

export interface UsePersistedColorSchemeOptions {
  storage: PersistedColorSchemeStorage;
  storageKey: string;
  /** Used until storage is read and when stored value is missing or invalid */
  defaultScheme?: ColorScheme | "system";
}

/**
 * Loads and persists `light` | `dark` | `system` for use with {@link ThemeProvider}.
 * Pair with `colorScheme` + `onColorSchemeChange` on `ThemeProvider` for controlled theme state.
 */
export function usePersistedColorScheme(options: UsePersistedColorSchemeOptions) {
  const { storage, storageKey, defaultScheme = "system" } = options;
  const [colorScheme, setColorSchemeState] = React.useState<ColorScheme | "system">(defaultScheme);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const raw = await storage.getItem(storageKey);
        if (cancelled) return;
        if (raw === "light" || raw === "dark" || raw === "system") {
          setColorSchemeState(raw);
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storage, storageKey]);

  const setColorScheme = React.useCallback(
    (scheme: ColorScheme | "system") => {
      setColorSchemeState(scheme);
      void storage.setItem(storageKey, scheme);
    },
    [storage, storageKey]
  );

  return { colorScheme, setColorScheme, hydrated };
}
