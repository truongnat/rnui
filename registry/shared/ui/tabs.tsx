import { createContext, useContext, useState } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-center rounded-md bg-muted p-1',
        className
      )}
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
  ...props
}: TabsTriggerProps) {
  const { value: active, onValueChange } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange?.(value)}
      className={cn(
        'flex-1 items-center rounded-sm px-3 py-1.5',
        isActive && 'bg-background shadow-sm',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
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
  return <View className={cn('mt-2', className)} {...props} />;
}
