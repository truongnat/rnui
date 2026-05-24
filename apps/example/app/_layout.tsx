import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, usePersistedColorScheme } from '@truongdq01/headless';
import { ToastContainer } from '@truongdq01/ui';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Wait for persisted scheme before painting routes to avoid a one-frame wrong-theme flash.
 */
export default function RootLayout() {
  const { colorScheme, setColorScheme, hydrated } = usePersistedColorScheme({
    storage: AsyncStorage,
    storageKey: '@rnui-example/color-scheme',
    defaultScheme: 'system',
  });

  if (!hydrated) {
    return null;
  }

  return (
    <ThemeProvider
      colorScheme={colorScheme}
      onColorSchemeChange={setColorScheme}
    >
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <ToastContainer position="bottom" />
          </View>
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
