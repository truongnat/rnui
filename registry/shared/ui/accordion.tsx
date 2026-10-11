import { ChevronDown } from 'lucide-react-native';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn, useIconColor } from '@/lib/utils';

interface AccordionContextValue {
  open: Set<string>;
  toggle: (value: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue>({
  open: new Set(),
  toggle: () => {},
  multiple: false,
});

export interface AccordionProps extends ViewProps {
  /** Open item values. Uncontrolled by default. */
  defaultValue?: string | string[];
  multiple?: boolean;
  className?: string;
}

export function Accordion({
  defaultValue,
  multiple = false,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(
    () =>
      new Set(
        Array.isArray(defaultValue)
          ? defaultValue
          : defaultValue
            ? [defaultValue]
            : []
      )
  );
  const toggle = (value: string) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });

  return (
    <AccordionContext.Provider value={{ open, toggle, multiple }}>
      <View className={cn('w-full', className)} {...props} />
    </AccordionContext.Provider>
  );
}

interface ItemContextValue {
  value: string;
  open: boolean;
}
const ItemContext = createContext<ItemContextValue>({ value: '', open: false });

export interface AccordionItemProps extends ViewProps {
  value: string;
  className?: string;
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { open } = useContext(AccordionContext);
  return (
    <ItemContext.Provider value={{ value, open: open.has(value) }}>
      <View className={cn('border-b border-border', className)} {...props}>
        {children}
      </View>
    </ItemContext.Provider>
  );
}

export interface AccordionTriggerProps
  extends Omit<PressableProps, 'children'> {
  className?: string;
  children?: TextProps['children'];
}

export function AccordionTrigger({
  className,
  children,
  disabled,
  style,
  accessibilityState,
  onPress,
  ...props
}: AccordionTriggerProps) {
  const { toggle } = useContext(AccordionContext);
  const { value, open } = useContext(ItemContext);
  const iconColor = useIconColor();
  const reducedMotion = useReducedMotion();
  const rotation = useSharedValue(open ? 180 : 0);
  useEffect(() => {
    rotation.value = withTiming(open ? 180 : 0, {
      duration: reducedMotion ? 0 : 200,
    });
  }, [open, reducedMotion, rotation]);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      accessibilityState={{ ...accessibilityState, expanded: open, disabled }}
      onPress={(event) => {
        toggle(value);
        onPress?.(event);
      }}
      className={cn(
        'min-h-14 flex-row items-center justify-between gap-3 py-4',
        className
      )}
      style={(state) => [
        { opacity: disabled ? 0.5 : state.pressed ? 0.7 : 1 },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <Text className="min-w-0 flex-1 text-base font-medium leading-6 text-foreground">
        {children}
      </Text>
      <Animated.View style={iconStyle}>
        <ChevronDown size={16} color={iconColor} />
      </Animated.View>
    </Pressable>
  );
}

export interface AccordionContentProps extends ViewProps {
  className?: string;
}

export function AccordionContent({
  className,
  children,
  style,
  ...props
}: AccordionContentProps) {
  const { open } = useContext(ItemContext);
  const reducedMotion = useReducedMotion();
  const [contentHeight, setContentHeight] = useState(0);
  const height = useSharedValue(0);
  useEffect(() => {
    height.value = withTiming(open ? contentHeight : 0, {
      duration: reducedMotion ? 0 : 220,
    });
  }, [open, contentHeight, height, reducedMotion]);
  const contentStyle = useAnimatedStyle(() => ({ height: height.value }));
  return (
    <Animated.View
      {...props}
      pointerEvents={open ? 'auto' : 'none'}
      accessibilityElementsHidden={!open}
      importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
      style={[{ overflow: 'hidden' }, style, contentStyle]}
    >
      <View
        className={cn('absolute left-0 right-0 top-0 pb-4', className)}
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        {typeof children === 'string' ? (
          <Text className="text-sm leading-6 text-muted-foreground">
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Animated.View>
  );
}
