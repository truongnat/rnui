import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useState } from 'react';
import type { SchemePreference } from './DemoThemeContext';

export const COLOR_SCHEME_STORAGE_KEY = '@rnui-example/color-scheme';

/**
 * Load the persisted scheme once, then drive NativeWind's global color scheme.
 * Returns `hydrated: false` until the stored preference has been applied so the
 * root layout can wait and avoid a one-frame wrong-theme flash.
 */
export function usePersistedColorScheme() {
  const { setColorScheme } = useColorScheme();
  const [preference, setPreference] = useState<SchemePreference>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
        const next: SchemePreference =
          stored === 'light' || stored === 'dark' || stored === 'system'
            ? stored
            : 'system';
        if (!cancelled) {
          setPreference(next);
          setColorScheme(next);
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setColorScheme]);

  const setSchemePreference = useCallback(
    (scheme: SchemePreference) => {
      setPreference(scheme);
      setColorScheme(scheme);
      void AsyncStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme);
    },
    [setColorScheme]
  );

  return { schemePreference: preference, setSchemePreference, hydrated };
}
