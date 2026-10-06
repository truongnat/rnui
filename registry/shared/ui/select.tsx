import { Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  View,
  type PressableProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<PressableProps, 'children'> {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

/** Modal-based select (wave 1). Anchor-positioned popover is a wave-2 upgrade. */
export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  className,
  triggerClassName,
  disabled,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const iconColor = useIconColor();
  const selected = options.find((o) => o.value === value);

  return (
    <View className={className}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={cn(
          'h-10 flex-row items-center justify-between rounded-md border border-input bg-background px-3',
          disabled && 'opacity-50',
          triggerClassName
        )}
        {...props}
      >
        <Text
          className={cn(
            'text-sm',
            selected ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {selected?.label ?? placeholder}
        </Text>
        <ChevronDown size={16} color={iconColor} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => setOpen(false)}
          accessibilityLabel="Close"
        >
          <Pressable
            className="rounded-t-2xl bg-background p-2"
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView style={{ maxHeight: 320 }}>
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <Pressable
                    key={opt.value}
                    accessibilityRole="button"
                    onPress={() => {
                      onValueChange?.(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex-row items-center justify-between rounded-md px-3 py-3',
                      active && 'bg-accent'
                    )}
                  >
                    <Text
                      className={cn(
                        'text-base',
                        active ? 'text-accent-foreground' : 'text-foreground'
                      )}
                    >
                      {opt.label}
                    </Text>
                    {active && <Check size={16} color={iconColor} />}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
