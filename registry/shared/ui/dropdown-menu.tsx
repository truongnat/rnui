import {
  cloneElement,
  createContext,
  isValidElement,
  type ReactElement,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  type GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, composeRefs, useIconColor } from '@/lib/utils';

interface Anchor {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MenuContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  anchor: Anchor | null;
  setAnchor: (a: Anchor | null) => void;
}>({ open: false, setOpen: () => {}, anchor: null, setAnchor: () => {} });

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  return (
    <MenuContext.Provider value={{ open, setOpen, anchor, setAnchor }}>
      {children}
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  className,
  asChild,
  children,
  onPress,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  /** Clone the child instead of wrapping it — avoids a nested Pressable
   *  swallowing the press (shadcn/radix Slot pattern). */
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(MenuContext);
  const ref = useRef<View>(null);
  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props as {
      onPress?: (e: GestureResponderEvent) => void;
      className?: string;
      ref?: React.Ref<View>;
    };
    return cloneElement(child, {
      ...props,
      ref: composeRefs(ref, childProps.ref),
      collapsable: false,
      className: cn(className, childProps.className),
      onPress: (e: GestureResponderEvent) => {
        childProps.onPress?.(e);
        handlePress(e);
      },
    });
  }
  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      className={className}
      collapsable={false}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export function DropdownMenuContent({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open, setOpen, anchor } = useContext(MenuContext);
  const { width: screenW, height: screenH } = useWindowDimensions();
  const [menuH, setMenuH] = useState(0);
  const left = anchor ? Math.max(8, Math.min(anchor.x, screenW - 192 - 8)) : 0;
  const below = anchor ? anchor.y + anchor.height + 4 : 0;
  // Flip above the trigger when the menu would overflow the bottom edge.
  const top =
    anchor && menuH > 0 && below + menuH > screenH - 8
      ? Math.max(8, anchor.y - menuH - 4)
      : below;
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1" onPress={() => setOpen(false)}>
        {anchor && (
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left,
              top,
              opacity: menuH ? 1 : 0,
            }}
          >
            <ScrollView
              onLayout={(e) => setMenuH(e.nativeEvent.layout.height)}
              className={cn(
                'max-h-72 w-48 rounded-md border border-border bg-popover p-1 shadow-md',
                className
              )}
            >
              {children}
            </ScrollView>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}

export interface DropdownMenuItemProps
  extends Omit<PressableProps, 'children'> {
  className?: string;
  /** Indent to align with checkbox/radio items. */
  inset?: boolean;
  /** Red destructive action styling. */
  destructive?: boolean;
  children?: React.ReactNode;
}

export function DropdownMenuItem({
  className,
  children,
  onPress,
  disabled,
  inset,
  destructive,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useContext(MenuContext);
  return (
    <Pressable
      disabled={disabled}
      onPress={(e) => {
        onPress?.(e);
        setOpen(false);
      }}
      className={cn(
        'flex-row items-center gap-2 rounded-sm px-2 py-2 active:bg-accent',
        inset && 'pl-8',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          className={cn(
            'text-sm',
            destructive ? 'text-destructive' : 'text-foreground'
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export interface DropdownMenuCheckboxItemProps
  extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Keep the menu open after toggling. */
  closeOnPress?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  closeOnPress = true,
  disabled,
  ...props
}: DropdownMenuCheckboxItemProps) {
  const { setOpen } = useContext(MenuContext);
  const checkColor = useIconColor('foreground');
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        onCheckedChange?.(!checked);
        if (closeOnPress) setOpen(false);
      }}
      className={cn(
        'flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 active:bg-accent',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View className="absolute left-2">
        {checked && <Check size={14} color={checkColor} />}
      </View>
      {typeof children === 'string' ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function DropdownMenuRadioGroup({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}

export interface DropdownMenuRadioItemProps
  extends Omit<PressableProps, 'children'> {
  value: string;
  /** Value currently selected in the group — controls the dot indicator. */
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  closeOnPress?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function DropdownMenuRadioItem({
  className,
  children,
  value,
  selectedValue,
  onValueChange,
  closeOnPress = true,
  disabled,
  ...props
}: DropdownMenuRadioItemProps) {
  const { setOpen } = useContext(MenuContext);
  const colors = useIconColor('foreground');
  const selected = value === selectedValue;
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        onValueChange?.(value);
        if (closeOnPress) setOpen(false);
      }}
      className={cn(
        'flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 active:bg-accent',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View className="absolute left-2">
        {selected && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors,
            }}
          />
        )}
      </View>
      {typeof children === 'string' ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function DropdownMenuShortcut({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('my-1 h-px bg-border', className)} {...props} />;
}
