import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DrawerContentProps } from './types';

/**
 * Animated slide-in panel that holds the drawer's children.
 * Translation and positioning are provided by the parent Drawer orchestrator.
 */
export function DrawerContent({
  children,
  animatedStyle,
  containerStyle,
  accessibilityLabel = 'Drawer',
}: DrawerContentProps) {
  const {
    components: { drawer },
  } = useTheme();
  const insets = useSafeAreaInsets();

  const safeAreaStyle = useMemo(
    () => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }),
    [insets.top, insets.bottom]
  );

  return (
    <Animated.View
      accessibilityViewIsModal
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
      style={[drawer.container, containerStyle, safeAreaStyle, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}
