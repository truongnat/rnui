import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  type ScrollViewProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useTokens, useComponentTokens } from '@truongdq01/headless';

/**
 * Scroll indicator style options
 */
export type ScrollIndicatorStyle = 'default' | 'black' | 'white';

/**
 * Props for the ScrollArea component
 */
export interface ScrollAreaProps extends Omit<ScrollViewProps, 'style'> {
  /** Children to render inside the scroll area */
  children: React.ReactNode;
  /** Custom styles for the scroll view */
  style?: StyleProp<ViewStyle>;
  /** Whether to show horizontal scroll indicator */
  showHorizontalScrollIndicator?: boolean;
  /** Whether to show vertical scroll indicator */
  showVerticalScrollIndicator?: boolean;
  /** Scroll direction */
  direction?: 'vertical' | 'horizontal' | 'both';
  /** Scroll indicator style (iOS only) */
  indicatorStyle?: ScrollIndicatorStyle;
  /** Custom indicator color (Android only) */
  indicatorColor?: string;
  /** Whether to add fade edges to indicate scrollability */
  fadeEdges?: boolean;
  /** Fade edge color */
  fadeColor?: string;
  /** Fade edge size in points */
  fadeSize?: number;
  /** Whether to enable paging behavior */
  pagingEnabled?: boolean;
  /** Whether to snap to intervals */
  snapToInterval?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Enhanced ScrollArea component with design system integration.
 * Provides customizable scrollable containers with token-based styling,
 * fade edges, and platform-specific optimizations.
 *
 * @param props - ScrollArea configuration props
 * @returns React scrollable container component with design system features
 *
 * @example
 * ```tsx
 * <ScrollArea
 *   style={{ height: 200 }}
 *   fadeEdges={true}
 *   indicatorStyle="black"
 *   showsVerticalScrollIndicator={true}
 * >
 *   <Text>Scrollable content with fade edges...</Text>
 * </ScrollArea>
 * ```
 *
 * @example With paging
 * ```tsx
 * <ScrollArea
 *   horizontal
 *   pagingEnabled
 *   snapToInterval={300}
 *   showsHorizontalScrollIndicator={false}
 * >
 *   {items.map(item => <View key={item.id} style={{width: 300}}>...</View>)}
 * </ScrollArea>
 * ```
 */
export function ScrollArea({
  children,
  style,
  showHorizontalScrollIndicator = true,
  showVerticalScrollIndicator = true,
  direction = 'vertical',
  indicatorStyle = 'default',
  indicatorColor,
  fadeEdges = false,
  fadeColor,
  fadeSize = 20,
  pagingEnabled = false,
  snapToInterval,
  testID = 'scroll-area',
  ...scrollViewProps
}: ScrollAreaProps) {
  const tokens = useTokens();

  // Determine scroll directions based on direction prop
  const horizontal = direction === 'horizontal' || direction === 'both';
  const vertical = direction === 'vertical' || direction === 'both';

  // Indicator styling (iOS supports different styles, Android uses default)
  const platformIndicatorStyle =
    Platform.OS === 'ios' ? indicatorStyle : 'default';

  // Default fade color from tokens
  const resolvedFadeColor = fadeColor || tokens.color.surface.default;

  const scrollView = (
    <ScrollView
      style={[styles.container, style]}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={
        horizontal ? showHorizontalScrollIndicator : false
      }
      showsVerticalScrollIndicator={
        vertical ? showVerticalScrollIndicator : false
      }
      indicatorStyle={platformIndicatorStyle as any}
      pagingEnabled={pagingEnabled}
      snapToInterval={snapToInterval}
      testID={testID}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );

  // Add fade edges if requested
  if (fadeEdges) {
    return (
      <View style={styles.fadeContainer} testID={`${testID}-container`}>
        {scrollView}
        {/* Top/Left fade */}
        <View
          style={[
            styles.fadeTop,
            horizontal ? styles.fadeLeft : styles.fadeTop,
            {
              backgroundColor: resolvedFadeColor,
              width: fadeSize,
              height: fadeSize,
            },
          ]}
          pointerEvents="none"
        />
        {/* Bottom/Right fade */}
        <View
          style={[
            styles.fadeBottom,
            horizontal ? styles.fadeRight : styles.fadeBottom,
            {
              backgroundColor: resolvedFadeColor,
              width: fadeSize,
              height: fadeSize,
            },
          ]}
          pointerEvents="none"
        />
      </View>
    );
  }

  return scrollView;
}

const styles = StyleSheet.create({
  container: {},
  fadeContainer: {
    position: 'relative',
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fadeLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  fadeRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
});
