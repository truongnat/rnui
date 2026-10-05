import { createContext, useContext, useState } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { cn } from '@/lib/utils';

const CollapsibleContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => {} });

export interface CollapsibleProps extends ViewProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Collapsible({
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: CollapsibleProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlled ?? uncontrolled;
  const setOpen = (v: boolean) => {
    setUncontrolled(v);
    onOpenChange?.(v);
  };
  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <View className={className} {...props} />
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({
  className,
  ...props
}: Omit<PressableProps, 'children'> & {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open, setOpen } = useContext(CollapsibleContext);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      onPress={() => setOpen(!open)}
      className={className}
      {...props}
    />
  );
}

export function CollapsibleContent({
  className,
  ...props
}: ViewProps & { className?: string }) {
  const { open } = useContext(CollapsibleContext);
  if (!open) return null;
  return <View className={cn('overflow-hidden', className)} {...props} />;
}
