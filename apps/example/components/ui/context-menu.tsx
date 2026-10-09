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

const ContextMenuContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  anchor: Anchor | null;
  setAnchor: (a: Anchor | null) => void;
}>({ open: false, setOpen: () => {}, anchor: null, setAnchor: () => {} });

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  return (
    <ContextMenuContext.Provider value={{ open, setOpen, anchor, setAnchor }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuTrigger({
  className,
  asChild,
  children,
  onPress,
  onLongPress,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  /** Clone the child instead of wrapping it — avoids a nested Pressable
   *  swallowing the long-press (shadcn/radix Slot pattern). */
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(ContextMenuContext);
  const ref = useRef<View>(null);
  const handleLongPress = (e: GestureResponderEvent) => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
    onLongPress?.(e);
  };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props as {
      onPress?: (e: GestureResponderEvent) => void;
      onLongPress?: (e: GestureResponderEvent) => void;
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
        onPress?.(e);
      },
      onLongPress: (e: GestureResponderEvent) => {
        childProps.onLongPress?.(e);
        handleLongPress(e);
      },
    });
  }
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      onLongPress={handleLongPress}
      className={className}
      collapsable={false}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export function ContextMenuContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: ViewProps & { className?: string; sideOffset?: number }) {
  const { open, setOpen, anchor } = useContext(ContextMenuContext);
  const { width: screenW, height: screenH } = useWindowDimensions();
  const [menuH, setMenuH] = useState(0);
  const left = anchor ? Math.max(8, Math.min(anchor.x, screenW - 224 - 8)) : 0;
  const below = anchor ? anchor.y + anchor.height + sideOffset : 0;
  // Flip above the trigger when the menu would overflow the bottom edge.
  const top =
    anchor && menuH > 0 && below + menuH > screenH - 8
      ? Math.max(8, anchor.y - menuH - sideOffset)
      : below;
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1 bg-black/20" onPress={() => setOpen(false)}>
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
            <View
              onLayout={(e) => setMenuH(e.nativeEvent.layout.height)}
              className={cn(
                'w-56 rounded-md border border-border bg-popover p-1 shadow-md',
                className
              )}
              {...props}
            >
              <ScrollView className="max-h-72">{children}</ScrollView>
            </View>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}

export interface ContextMenuItemProps extends Omit<PressableProps, 'children'> {
  className?: string;
  /** Indent to align with checkbox items. */
  inset?: boolean;
  /** Red destructive action styling. */
  destructive?: boolean;
  children?: React.ReactNode;
}

export function ContextMenuItem({
  className,
  disabled,
  inset,
  destructive,
  children,
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useContext(ContextMenuContext);
  return (
    <Pressable
      accessibilityRole="menuitem"
      disabled={disabled}
      onPress={(e) => {
        props.onPress?.(e);
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
            destructive ? 'text-destructive' : 'text-popover-foreground'
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

export interface ContextMenuCheckboxItemProps
  extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Keep the menu open after toggling. */
  closeOnPress?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  closeOnPress = true,
  disabled,
  ...props
}: ContextMenuCheckboxItemProps) {
  const { setOpen } = useContext(ContextMenuContext);
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
        <Text className="text-sm text-popover-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function ContextMenuShortcut({ className, ...props }: TextProps) {
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

export function ContextMenuSeparator({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('my-1 h-px bg-border', className)} {...props} />;
}

export function ContextMenuLabel({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
