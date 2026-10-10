import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type LayoutRectangle,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

interface TabsContextValue {
  value: string;
  onValueChange: (v: string) => void;
  registerTrigger?: (val: string, layout: LayoutRectangle) => void;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onValueChange: () => {},
});

export interface TabsProps extends ViewProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  value: controlled,
  defaultValue = '',
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;

  const [triggerLayouts, setTriggerLayouts] = useState<
    Record<string, LayoutRectangle>
  >({});

  const setValue = (v: string) => {
    if (controlled === undefined) {
      setUncontrolled(v);
    }
    onValueChange?.(v);
  };

  const registerTrigger = (val: string, layout: LayoutRectangle) => {
    setTriggerLayouts((prev) => {
      if (
        prev[val] &&
        prev[val].x === layout.x &&
        prev[val].width === layout.width
      ) {
        return prev;
      }
      return { ...prev, [val]: layout };
    });
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: setValue,
        registerTrigger,
      }}
    >
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  style,
  children,
  ...props
}: ViewProps & { className?: string }) {
  const { value } = useContext(TabsContext);
  const colors = useThemeColor();

  const [layouts, setLayouts] = useState<Record<string, LayoutRectangle>>({});

  const translateX = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const registerTrigger = (val: string, layout: LayoutRectangle) => {
    setLayouts((prev) => {
      if (
        prev[val] &&
        prev[val].x === layout.x &&
        prev[val].width === layout.width
      ) {
        return prev;
      }
      return { ...prev, [val]: layout };
    });
  };

  useEffect(() => {
    const activeLayout = layouts[value];
    if (activeLayout && activeLayout.width > 0) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: activeLayout.x,
          damping: 24,
          stiffness: 280,
          mass: 0.8,
          useNativeDriver: false,
        }),
        Animated.spring(widthAnim, {
          toValue: activeLayout.width,
          damping: 24,
          stiffness: 280,
          mass: 0.8,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [value, layouts, translateX, widthAnim, opacityAnim]);

  return (
    <TabsContext.Provider
      value={{
        ...useContext(TabsContext),
        registerTrigger,
      }}
    >
      <View
        className={cn(
          'relative flex-row items-center rounded-xl bg-muted p-1',
          className
        )}
        style={[{ borderCurve: 'continuous' }, style]}
        {...props}
      >
        {/* Animated Shared Sliding Indicator Pill */}
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: colors.card || '#ffffff',
              borderColor: colors.border,
              left: translateX,
              width: widthAnim,
              opacity: opacityAnim,
            },
          ]}
        />
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export interface TabsTriggerProps extends Omit<PressableProps, 'children'> {
  value: string;
  className?: string;
  children?: string;
}

export function TabsTrigger({
  value,
  className,
  children,
  disabled,
  style,
  onLayout,
  ...props
}: TabsTriggerProps) {
  const { value: active, onValueChange, registerTrigger } =
    useContext(TabsContext);
  const colors = useThemeColor();
  const isActive = active === value;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(value)}
      onLayout={(e) => {
        registerTrigger?.(value, e.nativeEvent.layout);
        onLayout?.(e);
      }}
      className={cn(
        'relative flex-1 items-center justify-center rounded-lg px-3.5 py-2 z-10',
        disabled && 'opacity-50',
        className
      )}
      style={style}
      {...props}
    >
      <Text
        style={[
          styles.labelText,
          {
            color: isActive ? colors.foreground : colors.mutedForeground,
            fontWeight: isActive ? '600' : '500',
          },
        ]}
        numberOfLines={1}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export interface TabsContentProps extends ViewProps {
  value: string;
  className?: string;
  children?: ReactNode;
}

export function TabsContent({
  value,
  className,
  children,
  style,
  ...props
}: TabsContentProps) {
  const { value: active } = useContext(TabsContext);
  const isSelected = active === value;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    if (isSelected) {
      fadeAnim.setValue(0);
      translateY.setValue(4);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 22,
          stiffness: 300,
          mass: 0.7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected, fadeAnim, translateY]);

  if (!isSelected) return null;

  return (
    <Animated.View
      className={cn('mt-3', className)}
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 1.5,
      },
      default: {},
    }),
  },
  labelText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
