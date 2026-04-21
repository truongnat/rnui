import {
  type Brand,
  buildSemanticTokens,
  type ColorScheme,
  resolveComponentTokens,
  type SemanticTokens,
  semanticTokens,
} from '@truongdq01/tokens';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ThemeContext } from './context';
import type { Theme, ThemeProviderProps } from './types';
import { deepMerge } from './utils';

const ROOT_STYLE = { flex: 1 } as const;

export function ThemeProvider({
  children,
  colorScheme: forcedScheme = 'system',
  brand: initialBrand,
  override,
  onColorSchemeChange,
  animateTransition = false,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const isControlled = typeof onColorSchemeChange === 'function';
  const [manualScheme, setManualScheme] = useState<ColorScheme | 'system'>(
    forcedScheme
  );
  const [activeBrand, setActiveBrand] = useState<Brand | undefined>(
    initialBrand
  );

  useEffect(() => {
    if (!isControlled) {
      setManualScheme(forcedScheme);
    }
  }, [forcedScheme, isControlled]);

  const schemePreference: ColorScheme | 'system' = isControlled
    ? forcedScheme
    : manualScheme;

  const setColorScheme = useCallback(
    (scheme: ColorScheme | 'system') => {
      if (isControlled) {
        onColorSchemeChange?.(scheme);
      } else {
        setManualScheme(scheme);
      }
    },
    [isControlled, onColorSchemeChange]
  );

  const activeScheme: ColorScheme =
    schemePreference === 'system'
      ? systemScheme === 'dark'
        ? 'dark'
        : 'light'
      : schemePreference;

  const transitionOpacity = useSharedValue(1);
  const prevSchemeRef = useRef(activeScheme);
  const prevBrandRef = useRef(activeBrand?.id);

  useEffect(() => {
    if (!animateTransition) return;
    if (
      prevSchemeRef.current !== activeScheme ||
      prevBrandRef.current !== activeBrand?.id
    ) {
      transitionOpacity.value = 0.88;
      transitionOpacity.value = withTiming(1, { duration: 280 });
    }
    prevSchemeRef.current = activeScheme;
    prevBrandRef.current = activeBrand?.id;
  }, [activeScheme, activeBrand?.id, animateTransition]);

  const transitionStyle = useAnimatedStyle(() => ({
    opacity: transitionOpacity.value,
    flex: 1,
  }));

  const theme = useMemo<Theme>(() => {
    let tokens: SemanticTokens = activeBrand
      ? buildSemanticTokens(activeBrand, activeScheme)
      : semanticTokens[activeScheme];

    if (override?.[activeScheme]) {
      tokens = deepMerge(tokens, override[activeScheme]!);
    }

    const components = resolveComponentTokens(tokens);

    return {
      tokens,
      components,
      colorScheme: activeScheme,
      brand: activeBrand,
      setColorScheme,
      setBrand: setActiveBrand,
    };
  }, [activeScheme, activeBrand, override, setColorScheme]);

  const content = animateTransition ? (
    <Animated.View style={transitionStyle}>{children}</Animated.View>
  ) : (
    children
  );

  return (
    <GestureHandlerRootView style={ROOT_STYLE}>
      <ThemeContext.Provider value={theme}>{content}</ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
