import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';

export interface CommandItemData {
  label: string;
  value: string;
  group?: string;
}

export interface CommandProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandItemData[];
  onSelect?: (item: CommandItemData) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function Command({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = 'Search…',
  emptyText = 'No results.',
  className,
}: CommandProps) {
  const [query, setQuery] = useState('');
  const muted = useIconColor();
  const filtered = query
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <Pressable
        className="flex-1 items-center bg-black/50 pt-24"
        onPress={() => onOpenChange?.(false)}
      >
        <Pressable
          className={`w-11/12 max-w-md rounded-xl border border-border bg-popover ${className ?? ''}`}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row items-center gap-2 border-b border-border px-3">
            <Search size={16} color={muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={placeholder}
              autoFocus
              className="h-11 flex-1 text-sm text-foreground"
            />
          </View>
          <ScrollView style={{ maxHeight: 300 }}>
            {filtered.length === 0 ? (
              <Text className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </Text>
            ) : (
              filtered.map((item, i) => (
                <View key={item.value}>
                  {item.group && item.group !== filtered[i - 1]?.group && (
                    <Text className="px-3 pb-1 pt-2.5 text-xs font-medium text-muted-foreground">
                      {item.group}
                    </Text>
                  )}
                  <Pressable
                    onPress={() => {
                      onSelect?.(item);
                      onOpenChange?.(false);
                      setQuery('');
                    }}
                    className="rounded-md px-3 py-2.5 active:bg-accent"
                  >
                    <Text className="text-sm text-foreground">
                      {item.label}
                    </Text>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
