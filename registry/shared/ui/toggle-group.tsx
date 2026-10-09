import { createContext, useContext, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import { Toggle, type ToggleProps } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

interface GroupContextValue {
  value: string[];
  toggle: (v: string) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  disabled?: boolean;
}
const GroupContext = createContext<GroupContextValue>({
  value: [],
  toggle: () => {},
});

export interface ToggleGroupProps extends ViewProps {
  type?: 'single' | 'multiple';
  value?: string | string[];
  /** Initial selection for uncontrolled usage. */
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  /** Disables every item in the group. */
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ToggleGroup({
  type = 'single',
  value: controlled,
  defaultValue,
  onValueChange,
  variant,
  size,
  disabled = false,
  orientation = 'horizontal',
  className,
  ...props
}: ToggleGroupProps) {
  const toArr = (v?: string | string[]) =>
    Array.isArray(v) ? v : v ? [v] : [];
  const [uncontrolled, setUncontrolled] = useState<string[]>(
    toArr(controlled ?? defaultValue)
  );
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
    <GroupContext.Provider
      value={{ value, toggle, variant, size, disabled }}
    >
      <View
        className={cn(
          'items-center gap-1',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col items-stretch',
          className
        )}
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
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const group = useContext(GroupContext);
  return (
    <Toggle
      pressed={group.value.includes(value)}
      onPressedChange={() => group.toggle(value)}
      variant={variant ?? group.variant}
      size={size ?? group.size}
      disabled={disabled ?? group.disabled}
      {...props}
    />
  );
}
