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
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Popper } from '@/components/ui/popper';
import { Text } from '@/components/ui/text';
import { cn, composeRefs } from '@/lib/utils';

interface Anchor {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TooltipContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  anchor: Anchor | null;
  setAnchor: (a: Anchor | null) => void;
}>({ open: false, setOpen: () => {}, anchor: null, setAnchor: () => {} });

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  return (
    <TooltipContext.Provider value={{ open, setOpen, anchor, setAnchor }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  className,
  asChild,
  children,
  onPress,
  onLongPress,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  /** Clone the child instead of wrapping it — avoids a nested Pressable
   *  swallowing the press (shadcn/radix Slot pattern). */
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const { open, setOpen, setAnchor } = useContext(TooltipContext);
  const ref = useRef<View>(null);
  const show = () =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
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
      accessibilityState: { expanded: open },
      collapsable: false,
      className: cn(className, childProps.className),
      onPress: (e: GestureResponderEvent) => {
        childProps.onPress?.(e);
        onPress?.(e);
        show();
      },
      onLongPress: (e: GestureResponderEvent) => {
        childProps.onLongPress?.(e);
        onLongPress?.(e);
        show();
      },
    });
  }
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      onLongPress={(event) => {
        onLongPress?.(event);
        show();
      }}
      onPress={(event) => {
        onPress?.(event);
        show();
      }}
      className={className}
      collapsable={false}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface TooltipContentProps extends ViewProps {
  className?: string;
  sideOffset?: number;
}

export function TooltipContent({
  className,
  sideOffset = 6,
  children,
  style,
  ...props
}: TooltipContentProps) {
  const { open, setOpen, anchor } = useContext(TooltipContext);
  return (
    <Popper
      open={open}
      anchor={anchor}
      placement="top"
      sideOffset={sideOffset}
      onClose={() => setOpen(false)}
      className={cn('border-0 bg-primary px-3 py-2', className)}
    >
      <View style={style} {...props}>
        {typeof children === 'string' ? (
          <Text className="text-sm text-primary-foreground">{children}</Text>
        ) : (
          children
        )}
      </View>
    </Popper>
  );
}
