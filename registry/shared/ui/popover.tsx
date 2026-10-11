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
  type View,
  useWindowDimensions,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Popper } from '@/components/ui/popper';
import { cn, composeRefs } from '@/lib/utils';

interface Anchor {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PopoverContext = createContext<{
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

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const activeTrigger = useRef<View>(null);
  return (
    <PopoverContext.Provider
      value={{ open, setOpen, anchor, setAnchor, activeTrigger }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
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
  const { open, setOpen, setAnchor, activeTrigger } =
    useContext(PopoverContext);
  const ref = useRef<View>(null);
  const child =
    asChild &&
    isValidElement<
      PressableProps & { className?: string; ref?: React.Ref<View> }
    >(children)
      ? children
      : null;
  const childProps = child?.props;
  const disabled = !!(props.disabled || childProps?.disabled);
  const hitSlop = props.hitSlop ?? childProps?.hitSlop ?? 8;
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
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    childProps?.onPress?.(event);
    onPress?.(event);
    if (event.defaultPrevented) return;
    if (open) {
      request.current += 1;
      setOpen(false);
    } else {
      measure(true);
    }
  };
  const handleLayout: NonNullable<PressableProps['onLayout']> = (event) => {
    childProps?.onLayout?.(event);
    props.onLayout?.(event);
    measure(false);
  };
  const accessibilityState = {
    ...childProps?.accessibilityState,
    ...props.accessibilityState,
    disabled,
    expanded: open,
  };
  if (child) {
    return cloneElement(child, {
      ...props,
      ref: composeRefs(ref, childProps?.ref),
      disabled,
      hitSlop,
      accessibilityRole:
        props.accessibilityRole ?? childProps?.accessibilityRole ?? 'button',
      accessibilityState,
      collapsable: false,
      className: cn(className, childProps?.className),
      style: (state) => [
        typeof childProps?.style === 'function'
          ? childProps.style(state)
          : childProps?.style,
        typeof props.style === 'function' ? props.style(state) : props.style,
      ],
      onPress: handlePress,
      onLayout: handleLayout,
      onLongPress: (event) => {
        if (disabled) return;
        childProps?.onLongPress?.(event);
        props.onLongPress?.(event);
      },
      onPressIn: (event) => {
        childProps?.onPressIn?.(event);
        props.onPressIn?.(event);
      },
      onPressOut: (event) => {
        childProps?.onPressOut?.(event);
        props.onPressOut?.(event);
      },
    });
  }
  return (
    <Pressable
      {...props}
      ref={ref}
      disabled={disabled}
      hitSlop={hitSlop}
      accessibilityRole={props.accessibilityRole ?? 'button'}
      accessibilityState={accessibilityState}
      onPress={handlePress}
      onLayout={handleLayout}
      className={className}
      collapsable={false}
    >
      {children}
    </Pressable>
  );
}

export interface PopoverContentProps extends ViewProps {
  className?: string;
  /** Offset below the trigger in px. */
  sideOffset?: number;
}

export function PopoverContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, anchor } = useContext(PopoverContext);
  return (
    <Popper
      {...props}
      open={open}
      anchor={anchor}
      placement="bottom-start"
      sideOffset={sideOffset}
      onClose={() => setOpen(false)}
      className={cn('w-64 p-4 shadow-md', className)}
    >
      {children}
    </Popper>
  );
}
