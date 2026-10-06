import { ChevronDown } from 'lucide-react-native';
import { createContext, useContext, useState } from 'react';
import {
  Animated,
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
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
  ...props
}: AccordionTriggerProps) {
  const { toggle } = useContext(AccordionContext);
  const { value, open } = useContext(ItemContext);
  const iconColor = useIconColor();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      onPress={() => toggle(value)}
      className={cn('flex-row items-center justify-between py-4', className)}
      {...props}
    >
      <Text className="text-sm font-medium text-foreground">{children}</Text>
      <Animated.View
        style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
      >
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
  ...props
}: AccordionContentProps) {
  const { open } = useContext(ItemContext);
  if (!open) return null;
  return (
    <View className={cn('pb-4', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
