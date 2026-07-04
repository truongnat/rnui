import { openSafeUrl, usePressable, useTheme } from '@truongdq01/headless';
import { memo, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useBreadcrumbContext } from './BreadcrumbContext';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import type { BreadcrumbItemInternalProps } from './types';

function BreadcrumbItemInner({
  children,
  href,
  onPress,
  isCurrent = false,
  startIcon,
  showSeparator = false,
}: BreadcrumbItemInternalProps) {
  const { separator } = useBreadcrumbContext();
  const {
    components: { breadcrumbs },
  } = useTheme();

  const isInteractive = !isCurrent && (href != null || onPress != null);

  const handlePress = useCallback(() => {
    onPress?.();
    if (href != null) {
      void openSafeUrl(href);
    }
  }, [href, onPress]);

  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: handlePress,
    disabled: !isInteractive,
    feedbackMode: 'opacity',
    accessibilityRole: 'link',
  });

  const labelStyle = useMemo(
    () => (isCurrent ? breadcrumbs.item.current : breadcrumbs.item.link),
    [breadcrumbs.item, isCurrent]
  );

  const content = (
    <>
      {startIcon ? (
        <View style={breadcrumbs.item.icon}>{startIcon}</View>
      ) : null}
      <Text style={labelStyle}>{children}</Text>
    </>
  );

  return (
    <View style={breadcrumbs.item.row}>
      {showSeparator ? <BreadcrumbSeparator separator={separator} /> : null}
      {isInteractive ? (
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[breadcrumbs.item.content, animatedStyle]}
            {...accessibilityProps}
          >
            {content}
          </Animated.View>
        </GestureDetector>
      ) : (
        <View style={breadcrumbs.item.content}>{content}</View>
      )}
    </View>
  );
}

export const BreadcrumbItem = memo(BreadcrumbItemInner);
BreadcrumbItem.displayName = 'BreadcrumbItem';
