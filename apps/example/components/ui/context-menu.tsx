import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Popper } from '@/components/ui/popper';
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
  activeTrigger: React.RefObject<View | null>;
}>({
  open: false,
  setOpen: () => {},
  anchor: null,
  setAnchor: () => {},
  activeTrigger: { current: null },
});

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const activeTrigger = useRef<View>(null);
  return (
    <ContextMenuContext.Provider
      value={{ open, setOpen, anchor, setAnchor, activeTrigger }}
    >
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
  const { open, setOpen, setAnchor, activeTrigger } =
    useContext(ContextMenuContext);
  const ref = useRef<View>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const child =
    asChild &&
    isValidElement<
      PressableProps & { className?: string; ref?: React.Ref<View> }
    >(children)
      ? children
      : null;
  const childProps = child?.props;
  const disabled = !!(props.disabled || childProps?.disabled);
  const latest = useRef({ disabled, open });
  latest.current = { disabled, open };
  const request = useRef(0);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const measure = useCallback(
    (opening: boolean) => {
      const wasOpen = latest.current.open;
      if (latest.current.disabled || (!opening && !wasOpen)) return;
      const target = ref.current;
      if (!target || (!opening && activeTrigger.current !== target)) return;
      if (opening) activeTrigger.current = target;
      const current = ++request.current;
      target.measureInWindow((x, y, width, height) => {
        if (
          current !== request.current ||
          activeTrigger.current !== target ||
          ref.current !== target ||
          latest.current.disabled ||
          (wasOpen && !latest.current.open) ||
          width <= 0 ||
          height <= 0
        ) {
          return;
        }
        setAnchor({ x, y, width, height });
        if (opening) setOpen(true);
      });
    },
    [setAnchor, setOpen, activeTrigger]
  );
  useEffect(
    () => () => {
      request.current += 1;
    },
    []
  );
  useEffect(() => {
    if (windowWidth > 0 && windowHeight > 0) measure(false);
  }, [windowWidth, windowHeight, measure]);
  const handleLongPress = (event: GestureResponderEvent) => {
    if (disabled) return;
    childProps?.onLongPress?.(event);
    onLongPress?.(event);
    if (!event.defaultPrevented) measure(true);
  };
  const handleAccessibilityAction: NonNullable<
    PressableProps['onAccessibilityAction']
  > = (event) => {
    if (disabled) return;
    childProps?.onAccessibilityAction?.(event);
    props.onAccessibilityAction?.(event);
    if (
      !event.defaultPrevented &&
      event.nativeEvent.actionName === 'showActions'
    ) {
      measure(true);
    }
  };
  const accessibilityActions = [
    ...(childProps?.accessibilityActions ?? []),
    ...(props.accessibilityActions ?? []),
  ];
  if (!accessibilityActions.some((action) => action.name === 'showActions')) {
    accessibilityActions.push({ name: 'showActions', label: 'Open actions' });
  }
  const triggerProps: PressableProps = {
    ...props,
    disabled,
    style: [
      typeof childProps?.style === 'function'
        ? childProps.style({ pressed: isPressed, hovered: isHovered })
        : childProps?.style,
      typeof props.style === 'function'
        ? props.style({ pressed: isPressed, hovered: isHovered })
        : props.style,
    ],
    accessibilityRole:
      props.accessibilityRole ?? childProps?.accessibilityRole ?? 'button',
    accessibilityHint:
      props.accessibilityHint ??
      childProps?.accessibilityHint ??
      'Long press to open actions',
    accessibilityState: {
      ...childProps?.accessibilityState,
      ...props.accessibilityState,
      disabled,
      expanded: open,
    },
    accessibilityActions,
    onAccessibilityAction: handleAccessibilityAction,
    collapsable: false,
    onLayout: (event) => {
      childProps?.onLayout?.(event);
      props.onLayout?.(event);
      measure(false);
    },
    onPress: (event) => {
      if (disabled) return;
      childProps?.onPress?.(event);
      onPress?.(event);
    },
    onLongPress: handleLongPress,
    onPressIn: (event) => {
      setIsPressed(true);
      childProps?.onPressIn?.(event);
      props.onPressIn?.(event);
    },
    onPressOut: (event) => {
      setIsPressed(false);
      childProps?.onPressOut?.(event);
      props.onPressOut?.(event);
    },
    onHoverIn: (event) => {
      setIsHovered(true);
      childProps?.onHoverIn?.(event);
      props.onHoverIn?.(event);
    },
    onHoverOut: (event) => {
      setIsHovered(false);
      childProps?.onHoverOut?.(event);
      props.onHoverOut?.(event);
    },
  };
  if (child) {
    return cloneElement(child, {
      ...triggerProps,
      ref: composeRefs(ref, childProps?.ref),
      className: cn(className, childProps?.className),
    });
  }
  return (
    <Pressable {...triggerProps} ref={ref} className={className}>
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
  return (
    <Popper
      {...props}
      open={open}
      anchor={anchor}
      placement="bottom-start"
      sideOffset={sideOffset}
      onClose={() => setOpen(false)}
      onAccessibilityEscape={
        props.onAccessibilityEscape ?? (() => setOpen(false))
      }
      className={cn('w-56 p-1 shadow-md', className)}
    >
      <ScrollView className="max-h-72" keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </Popper>
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
  onPress,
  accessibilityState,
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useContext(ContextMenuContext);
  const destructiveColor = useIconColor('destructive');
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      disabled={disabled}
      onPress={(e) => {
        if (disabled) return;
        onPress?.(e);
        setOpen(false);
      }}
      className={cn(
        'min-h-14 flex-row items-center gap-2 rounded-md px-3 py-2 active:bg-accent',
        inset && 'pl-8',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          className="text-sm text-popover-foreground"
          style={destructive ? { color: destructiveColor } : undefined}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export interface ContextMenuCheckboxItemProps extends Omit<
  PressableProps,
  'children'
> {
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
  onPress,
  accessibilityState,
  ...props
}: ContextMenuCheckboxItemProps) {
  const { setOpen } = useContext(ContextMenuContext);
  const checkColor = useIconColor('foreground');
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{
        ...accessibilityState,
        checked: !!checked,
        disabled: !!disabled,
      }}
      disabled={disabled}
      onPress={(event) => {
        if (disabled) return;
        onPress?.(event);
        onCheckedChange?.(!checked);
        if (closeOnPress) setOpen(false);
      }}
      className={cn(
        'min-h-14 flex-row items-center gap-2 rounded-md py-2 pl-9 pr-3 active:bg-accent',
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
        'px-2 py-1.5 text-sm font-semibold text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
