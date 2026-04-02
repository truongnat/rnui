import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, usePersistedColorScheme } from "@truongdq01/headless";
import { Stack } from "expo-router";

/**
 * Wait for persisted scheme before painting routes to avoid a one-frame wrong-theme flash.
 */
export default function RootLayout() {
  const { colorScheme, setColorScheme, hydrated } = usePersistedColorScheme({
    storage: AsyncStorage,
    storageKey: "@rnui-example/color-scheme",
    defaultScheme: "system",
  });

  if (!hydrated) {
    return null;
  }

  return (
    <ThemeProvider colorScheme={colorScheme} onColorSchemeChange={setColorScheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
