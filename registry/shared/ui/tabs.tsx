import { createContext, useContext, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

const TabsContext = createContext<{
  value: string;
  onValueChange?: (v: string) => void;
}>({ value: '' });

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
  ...props
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;
  const setValue = (v: string) => {
    setUncontrolled(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <View className={cn('w-full', className)} {...props} />
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  style,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-center rounded-xl bg-muted p-1',
        className
      )}
      style={[{ borderCurve: 'continuous' }, style]}
      {...props}
    />
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
  ...props
}: TabsTriggerProps) {
  const { value: active, onValueChange } = useContext(TabsContext);
  const colors = useThemeColor();
  const isActive = active === value;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange?.(value)}
      className={cn(
        'relative flex-1 items-center justify-center rounded-lg px-3.5 py-2',
        disabled && 'opacity-50',
        className
      )}
      style={style}
      {...props}
    >
      {isActive && (
        <View
          style={[
            styles.activeIndicator,
            {
              backgroundColor: colors.card || '#ffffff',
              borderColor: colors.border,
            },
          ]}
        />
      )}
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
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return <View className={cn('mt-3', className)} {...props} />;
}

const styles = StyleSheet.create({
  activeIndicator: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
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
    zIndex: 1,
  },
});
