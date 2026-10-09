import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import {
  ListSectionHeader,
  PillSearchBar,
  ScreenHeader,
} from '@/demo/ExampleChrome';
import { DemoThemeControls } from '@/demo/DemoThemeControls';
import { useRouter, type Href } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COMPONENTS = [
  'AIRenderer',
  'Accordion',
  'Alert',
  'AlertDialog',
  'AnimatedList',
  'AnimatedOverlay',
  'AppBar',
  'AspectRatio',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Blockquote',
  'BottomNavigation',
  'Breadcrumb',
  'Button',
  'ButtonGroup',
  'Calendar',
  'Card',
  'Carousel',
  'ChatListItem',
  'Checkbox',
  'Chip',
  'CircularProgress',
  'CodeBlock',
  'ContextMenu',
  'DatePicker',
  'Dialog',
  'Drawer',
  'DropdownMenu',
  'EmptyState',
  'Fab',
  'Form',
  'GlassCard',
  'Gradient',
  'Grid',
  'Icon',
  'IconButton',
  'Image',
  'ImageList',
  'Input',
  'InputOtp',
  'Label',
  'Link',
  'List',
  'Marquee',
  'MessageInput',
  'Modal',
  'Pagination',
  'Paper',
  'Popover',
  'Popper',
  'Pressable',
  'Progress',
  'RadioGroup',
  'Rating',
  'ScrollArea',
  'SegmentedControl',
  'Select',
  'Separator',
  'SettingsMenu',
  'Sheet',
  'Skeleton',
  'Slider',
  'Snackbar',
  'SpeedDial',
  'Stack',
  'Stepper',
  'Switch',
  'TabBar',
  'Table',
  'Tabs',
  'Text',
  'Textarea',
  'TextField',
  'Timeline',
  'Toast',
  'Toggle',
  'Tooltip',
] as const;

function groupComponents(items: readonly string[]) {
  const map: Record<string, string[]> = {};
  for (const name of items) {
    const letter = name[0]?.toUpperCase() ?? '#';
    (map[letter] ??= []).push(name);
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([title, data]) => ({ title, data }));
}

export default function ComponentsListScreen() {
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      COMPONENTS.filter((c) =>
        c.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const sections = useMemo(() => groupComponents(filtered), [filtered]);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="RNUI" subtitle={`${COMPONENTS.length} components`} />
      <View className="bg-background px-4 pb-2 pt-3">
        <PillSearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components…"
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 32,
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text variant="large">No matches</Text>
            <Text variant="muted" style={styles.centered}>
              Try a different search term
            </Text>
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <ListSectionHeader title={title} />
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/components/${item}` as Href)}
            style={({ pressed }) => [
              styles.row,
              {
                backgroundColor: pressed ? colors.accent : colors.background,
                borderColor: colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item} examples`}
          >
            <Text>{item}</Text>
            <ChevronRight size={18} color={colors.mutedForeground} />
          </Pressable>
        )}
      />
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <DemoThemeControls />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 52,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  centered: {
    textAlign: 'center',
  },
});
