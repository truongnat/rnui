import { createContext, useContext, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import { Toggle, type ToggleProps } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

interface GroupContextValue {
  value: string[];
  toggle: (v: string) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
}
const GroupContext = createContext<GroupContextValue>({
  value: [],
  toggle: () => {},
});

export interface ToggleGroupProps extends ViewProps {
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  className?: string;
}

export function ToggleGroup({
  type = 'single',
  value: controlled,
  onValueChange,
  variant,
  size,
  className,
  ...props
}: ToggleGroupProps) {
  const toArr = (v?: string | string[]) =>
    Array.isArray(v) ? v : v ? [v] : [];
  const [uncontrolled, setUncontrolled] = useState<string[]>(toArr(controlled));
  const value = controlled !== undefined ? toArr(controlled) : uncontrolled;

  const toggle = (v: string) => {
    const next =
      type === 'single'
        ? value.includes(v)
          ? []
          : [v]
        : value.includes(v)
          ? value.filter((x) => x !== v)
          : [...value, v];
    if (controlled === undefined) setUncontrolled(next);
    onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
  };

  return (
    <GroupContext.Provider value={{ value, toggle, variant, size }}>
      <View
        className={cn('flex-row items-center gap-1', className)}
        {...props}
      />
    </GroupContext.Provider>
  );
}

export interface ToggleGroupItemProps extends Omit<ToggleProps, 'pressed'> {
  value: string;
}

export function ToggleGroupItem({
  value,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const group = useContext(GroupContext);
  return (
    <Toggle
      pressed={group.value.includes(value)}
      onPressedChange={() => group.toggle(value)}
      variant={variant ?? group.variant}
      size={size ?? group.size}
      {...props}
    />
  );
}
