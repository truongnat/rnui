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
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpen, setAnchor } = useContext(MenuContext);
  const ref = useRef<View>(null);
  return (
    <Pressable
      ref={ref}
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

export function DropdownMenuContent({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open, setOpen, anchor } = useContext(MenuContext);
  return (
    <Modal visible={open} transparent animationType="fade">
      <Pressable className="flex-1" onPress={() => setOpen(false)}>
        {anchor && (
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: anchor.x,
              top: anchor.y + anchor.height + 4,
            }}
          >
            <ScrollView
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
  children?: string;
}

export function DropdownMenuItem({
  className,
  children,
  onPress,
  disabled,
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
        'rounded-sm px-2 py-2 active:bg-accent',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text className="text-sm text-foreground">{children}</Text>
    </Pressable>
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
