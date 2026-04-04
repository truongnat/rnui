import React, { useState, createContext, useContext, useCallback } from "react";
import { View, Pressable, StyleProp, ViewStyle, StyleSheet, type LayoutChangeEvent } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

/**
 * Collapsible context value
 */
interface CollapsibleContextValue {
  isOpen: SharedValue<boolean>;
  currentOpen: boolean;
  toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

/**
 * Hook to access collapsible context
 */
export function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible component");
  }
  return context;
}

/**
 * Props for the Collapsible component
 */
export interface CollapsibleProps {
  /** Whether the collapsible is initially open */
  defaultOpen?: boolean;
  /** @experimental Controlled pattern not yet tested */
  open?: boolean;
  /** @experimental Controlled pattern not yet tested */
  onOpenChange?: (open: boolean) => void;
  /** Whether to disable the collapsible */
  disabled?: boolean;
  /** Children containing trigger and content */
  children: React.ReactNode;
  /** Custom styles for the container */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Props for the CollapsibleTrigger component
 */
export interface CollapsibleTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Props for the CollapsibleContent component
 */
export interface CollapsibleContentProps {
  /** Content to show/hide */
  children: React.ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Collapsible component for expandable/collapsible content.
 * Provides context for trigger and content components.
 *
 * @param props - Collapsible configuration props
 * @returns React collapsible container component
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <Text>Toggle Content</Text>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <Text>This content can be expanded/collapsed</Text>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  children,
  style,
  testID = "collapsible",
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const currentOpen = isControlled ? controlledOpen! : internalOpen;
  const isOpen = useSharedValue(currentOpen);

  // Single sync point: React state -> SharedValue
  React.useEffect(() => {
    isOpen.value = currentOpen;
  }, [currentOpen, isOpen]);

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !currentOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [disabled, isControlled, currentOpen, onOpenChange]);

  const contextValue: CollapsibleContextValue = {
    isOpen,
    currentOpen,
    toggle,
  };

  return (
    <View style={style} testID={testID}>
      <CollapsibleContext.Provider value={contextValue}>
        {children}
      </CollapsibleContext.Provider>
    </View>
  );
}

/**
 * CollapsibleTrigger component that toggles the collapsible state.
 *
 * @param props - Trigger configuration props
 * @returns React pressable trigger component
 */
export function CollapsibleTrigger({
  children,
  style,
  testID = "collapsible-trigger",
}: CollapsibleTriggerProps) {
  const { toggle, currentOpen } = useCollapsible();

  return (
    <Pressable
      onPress={toggle}
      style={style}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ expanded: currentOpen }}
    >
      {children}
    </Pressable>
  );
}

/**
 * CollapsibleContent component that shows/hides with animation.
 *
 * @param props - Content configuration props
 * @returns React animated content component
 */
export function CollapsibleContent({
  children,
  duration = 300,
  style,
  testID = "collapsible-content",
}: CollapsibleContentProps) {
  const { isOpen } = useCollapsible();
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isOpen.value ? measuredHeight : 0, { duration }),
      opacity: withTiming(isOpen.value ? 1 : 0, { duration }),
    };
  });

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setMeasuredHeight(height);
  }, []);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          overflow: "hidden",
        },
        style,
      ]}
      testID={testID}
    >
      <View
        onLayout={handleLayout}
        style={styles.innerContent}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  innerContent: { paddingVertical: 8 },
});