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
}>({ open: false, setOpen: () => {}, anchor: null, setAnchor: () => {} });

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  return (
    <PopoverContext.Provider value={{ open, setOpen, anchor, setAnchor }}>
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
  const { setOpen, setAnchor } = useContext(PopoverContext);
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
      accessibilityRole="button"
      onPress={handlePress}
      className={className}
      collapsable={false}
      {...props}
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
  style,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, anchor } = useContext(PopoverContext);
  const { width: screenW, height: screenH } = useWindowDimensions();
  const [measured, setMeasured] = useState({ w: 0, h: 0 });
  const left = anchor
    ? Math.max(8, Math.min(anchor.x, screenW - (measured.w || 256) - 8))
    : 0;
  const below = anchor ? anchor.y + anchor.height + sideOffset : 0;
  // Flip above the trigger when the content would overflow the bottom edge.
  const top =
    anchor && measured.h > 0 && below + measured.h > screenH - 8
      ? Math.max(8, anchor.y - measured.h - sideOffset)
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
                'w-64 rounded-md border border-border bg-popover p-4 shadow-md',
                className
              )}
              style={style}
              {...props}
            >
              {children}
            </View>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}
