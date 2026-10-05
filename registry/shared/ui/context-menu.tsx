import { createContext, useContext, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
  children,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(ContextMenuContext);
  const ref = useRef<View>(null);
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      onLongPress={() =>
        ref.current?.measureInWindow((x, y, width, height) => {
          setAnchor({ x, y, width, height });
          setOpen(true);
        })
      }
      className={className}
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
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1 bg-black/20" onPress={() => setOpen(false)}>
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

export function ContextMenuItem({
  className,
  disabled,
  children,
  ...props
}: PressableProps & { className?: string }) {
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
        'flex-row items-center rounded-sm px-2 py-2 active:bg-accent',
        disabled && 'opacity-50',
        className
      )}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm text-popover-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
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
