import type React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * Props for the AspectRatio component
 */
export interface AspectRatioProps {
  /** Aspect ratio as width/height (e.g., 16/9, 4/3, 1/1) */
  ratio?: number;
  /** Custom width-to-height ratio override */
  width?: number;
  /** Custom height-to-width ratio override */
  height?: number;
  /** Children to render inside the aspect ratio container */
  children?: React.ReactNode;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * AspectRatio component that maintains a consistent aspect ratio for its content.
 * Uses paddingBottom percentage to maintain aspect ratio in React Native.
 * In React Native, percentage padding is relative to the element's own width,
 * so paddingBottom: "56.25%" on a full-width element gives 16:9 height.
 *
 * Prop precedence: width/height overrides ratio when both are provided.
 *
 * @param props - AspectRatio configuration props
 * @returns React aspect ratio container component
 *
 * @example
 * ```tsx
 * // 16:9 aspect ratio
 * <AspectRatio ratio={16/9}>
 *   <Image source={{uri: '...' }} style={{width: '100%', height: '100%'}} />
 * </AspectRatio>
 *
 * // Square (1:1)
 * <AspectRatio ratio={1}>
 *   <View style={{backgroundColor: 'red', flex: 1}} />
 * </AspectRatio>
 *
 * // Custom ratio
 * <AspectRatio width={4} height={3}>
 *   <VideoPlayer />
 * </AspectRatio>
 * ```
 */
export function AspectRatio({
  ratio = 1,
  width,
  height,
  children,
  style,
  testID = 'aspect-ratio',
}: AspectRatioProps) {
  // Calculate paddingBottom based on ratio
  // For a container, aspect ratio = width / height
  // So height = width / ratio
  // We use paddingBottom to create the aspect ratio
  const aspectRatio = width != null && height != null ? width / height : ratio;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View
        style={[
          styles.aspectContainer,
          {
            paddingBottom: `${(1 / aspectRatio) * 100}%`,
          },
        ]}
      >
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  aspectContainer: {
    position: 'relative',
    width: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
