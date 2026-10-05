import { createContext, useContext, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
  children,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(TooltipContext);
  const ref = useRef<View>(null);
  const show = () =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      onLongPress={show}
      onPress={show}
      className={className}
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
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1" onPress={() => setOpen(false)}>
        {anchor && (
          <View
            style={{
              position: 'absolute',
              left: anchor.x,
              top: Math.max(anchor.y - 40 - sideOffset, 0),
            }}
          >
            <View
              className={cn(
                'rounded-md bg-primary px-3 py-1.5 shadow-md',
                className
              )}
              style={style}
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
