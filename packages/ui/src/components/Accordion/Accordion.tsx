import React, { createContext, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useDisclosure, useTokens } from "@rnui/headless";

export interface AccordionProps {
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onChange?: (expanded: boolean) => void;
  children?: React.ReactNode;
}

export interface AccordionSummaryProps {
  children?: React.ReactNode;
  expandIcon?: React.ReactNode;
}

export interface AccordionDetailsProps {
  children?: React.ReactNode;
}

export interface AccordionActionsProps {
  children?: React.ReactNode;
}

interface AccordionContextValue {
  expanded: boolean;
  toggle: () => void;
  disabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  children,
}: AccordionProps) {
  const disclosure = useDisclosure({
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpen: () => onChange?.(true),
    onClose: () => onChange?.(false),
  });

  const tokens = useTokens();

  return (
    <AccordionContext.Provider value={{ expanded: disclosure.isOpen, toggle: disclosure.toggle, disabled }}>
      <View style={{ borderWidth: 1, borderColor: tokens.color.border.default, borderRadius: tokens.radius.md, overflow: "hidden" }}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

export function AccordionSummary({ children, expandIcon }: AccordionSummaryProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;

  // Rotate icon 180° when expanded
  const rotation = useSharedValue(ctx.expanded ? 1 : 0);
  React.useEffect(() => {
    rotation.value = withTiming(ctx.expanded ? 1 : 0, { duration: 200 });
  }, [ctx.expanded]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg` }],
  }));

  return (
    <Pressable
      onPress={ctx.toggle}
      disabled={ctx.disabled}
      style={{
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: tokens.color.surface.default,
      }}
    >
      <Text style={{ fontWeight: tokens.fontWeight.medium, color: tokens.color.text.primary, flex: 1 }}>
        {children}
      </Text>
      <Animated.View style={iconStyle}>
        {expandIcon ?? (
          <Text style={{ color: tokens.color.text.tertiary, fontSize: 16 }}>▼</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

export function AccordionDetails({ children }: AccordionDetailsProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  const [contentHeight, setContentHeight] = React.useState(0);
  const animHeight = useSharedValue(0);

  React.useEffect(() => {
    if (!ctx) return;
    animHeight.value = withTiming(ctx.expanded ? contentHeight : 0, { duration: 250 });
  }, [ctx?.expanded, contentHeight]);

  const animStyle = useAnimatedStyle(() => ({
    height: animHeight.value,
    overflow: "hidden",
  }));

  return (
    <Animated.View style={animStyle}>
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={{
          paddingHorizontal: tokens.spacing[4],
          paddingVertical: tokens.spacing[3],
          backgroundColor: tokens.color.bg.subtle,
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
}

export function AccordionActions({ children }: AccordionActionsProps) {
  const tokens = useTokens();
  const ctx = useContext(AccordionContext);
  if (!ctx?.expanded) return null;

  return (
    <View style={{
      paddingHorizontal: tokens.spacing[4],
      paddingVertical: tokens.spacing[3],
      backgroundColor: tokens.color.bg.subtle,
      flexDirection: "row",
      gap: tokens.spacing[2],
    }}>
      {children}
    </View>
  );
}
