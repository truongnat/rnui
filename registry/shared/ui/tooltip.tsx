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
  useWindowDimensions,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
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
  const { setOpen, setAnchor } = useContext(TooltipContext);
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
      onLongPress={show}
      onPress={show}
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
  const { width: screenW } = useWindowDimensions();
  const [measured, setMeasured] = useState({ w: 0, h: 0 });
  const left = anchor
    ? Math.max(8, Math.min(anchor.x, screenW - (measured.w || 80) - 8))
    : 0;
  // Above the trigger by default; flip below when it would clip the top edge.
  const above = anchor ? anchor.y - measured.h - sideOffset : 0;
  const top =
    anchor && measured.h > 0 && above < 8
      ? anchor.y + anchor.height + sideOffset
      : Math.max(above, 8);
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1" onPress={() => setOpen(false)}>
        {anchor && (
          <View
            style={{
              position: 'absolute',
              left,
              top,
              opacity: measured.h ? 1 : 0,
            }}
          >
            <View
              onLayout={(e) =>
                setMeasured({
                  w: e.nativeEvent.layout.width,
                  h: e.nativeEvent.layout.height,
                })
              }
              className={cn(
                'rounded-md bg-primary px-3 py-1.5 shadow-md',
                className
              )}
              style={[{ maxWidth: screenW - 16 }, style]}
              {...props}
            >
              {typeof children === 'string' ? (
                <Text className="text-xs text-primary-foreground">
                  {children}
                </Text>
              ) : (
                children
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
}
