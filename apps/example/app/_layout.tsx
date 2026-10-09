import '../global.css';

import { ToastProvider } from '@/components/ui/toast';
import { DemoThemeContext } from '@/demo/DemoThemeContext';
import { usePersistedColorScheme } from '@/demo/usePersistedColorScheme';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Wait for the persisted scheme before painting routes to avoid a one-frame
 * wrong-theme flash.
 */
export default function RootLayout() {
  const { schemePreference, setSchemePreference, hydrated } =
    usePersistedColorScheme();

  if (!hydrated) {
    return null;
  }

  return (
    <DemoThemeContext.Provider
      value={{ schemePreference, setSchemePreference }}
    >
      <SafeAreaProvider>
        <ToastProvider position="bottom">
          <View style={StyleSheet.absoluteFill}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </ToastProvider>
      </SafeAreaProvider>
    </DemoThemeContext.Provider>
  );
}
