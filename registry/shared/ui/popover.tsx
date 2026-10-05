import { createContext, useContext, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { cn } from '@/lib/utils';

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
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(PopoverContext);
  const ref = useRef<View>(null);
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      onPress={() =>
        ref.current?.measureInWindow((x, y, width, height) => {
          setAnchor({ x, y, width, height });
          setOpen(true);
        })
      }
      className={className}
      {...props}
    />
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
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1" onPress={() => setOpen(false)}>
        {anchor && (
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: anchor.x,
              top: anchor.y + anchor.height + sideOffset,
            }}
          >
            <View
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
