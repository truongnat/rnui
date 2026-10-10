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
import { Pressable, SectionList, StyleSheet, Text as RNText, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface FeatureCategory {
  title: string;
  items: readonly string[];
}

export const FEATURE_CATEGORIES: readonly FeatureCategory[] = [
  {
    title: 'AI & Automation',
    items: ['AIRenderer'],
  },
  {
    title: 'Inputs & Forms',
    items: [
      'Button',
      'ButtonGroup',
      'IconButton',
      'Fab',
      'Input',
      'TextField',
      'Textarea',
      'Checkbox',
      'RadioGroup',
      'Select',
      'Switch',
      'Slider',
      'Rating',
      'SegmentedControl',
      'Toggle',
      'DatePicker',
      'InputOtp',
      'Autocomplete',
      'Form',
      'Label',
      'Pressable',
    ],
  },
  {
    title: 'Layout & Structure',
    items: [
      'Stack',
      'Grid',
      'Card',
      'Paper',
      'GlassCard',
      'Gradient',
      'AspectRatio',
      'ScrollArea',
      'Separator',
    ],
  },
  {
    title: 'Navigation',
    items: [
      'Tabs',
      'TabBar',
      'Breadcrumb',
      'Pagination',
      'BottomNavigation',
      'AppBar',
      'Stepper',
      'Link',
      'SpeedDial',
    ],
  },
  {
    title: 'Feedback & Status',
    items: [
      'Alert',
      'AlertDialog',
      'Toast',
      'Snackbar',
      'Progress',
      'CircularProgress',
      'Badge',
      'Chip',
      'Skeleton',
    ],
  },
  {
    title: 'Overlays & Popups',
    items: [
      'Dialog',
      'Sheet',
      'Modal',
      'Drawer',
      'Popover',
      'Popper',
      'DropdownMenu',
      'ContextMenu',
      'Tooltip',
      'SettingsMenu',
      'AnimatedOverlay',
    ],
  },
  {
    title: 'Data Display & Media',
    items: [
      'Text',
      'Avatar',
      'Icon',
      'Image',
      'ImageList',
      'Table',
      'List',
      'ChatListItem',
      'MessageInput',
      'Carousel',
      'Calendar',
      'Accordion',
      'CodeBlock',
      'Blockquote',
      'Timeline',
      'Marquee',
      'EmptyState',
      'AnimatedList',
    ],
  },
];

export default function ComponentsListScreen() {
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const sections = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FEATURE_CATEGORIES.map((cat) => ({
      title: cat.title,
      data: q
        ? cat.items.filter((item) => item.toLowerCase().includes(q))
        : [...cat.items],
    })).filter((section) => section.data.length > 0);
  }, [search]);

  const totalCount = useMemo(
    () => sections.reduce((sum, sec) => sum + sec.data.length, 0),
    [sections]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="RNUI"
        subtitle={`${totalCount} components`}
        rightAction={<View style={{ width: 28 }} />}
      />
      <View style={styles.searchWrapper}>
        <PillSearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components..."
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
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
        renderSectionHeader={({ section: { title, data } }) => (
          <View
            style={[
              styles.sectionHeader,
              { backgroundColor: colors.background },
            ]}
          >
            <Text variant="muted" style={styles.sectionTitle}>
              {title}
            </Text>
            <Text variant="muted" style={styles.sectionCount}>
              {data.length}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/components/${item}` as Href)}
            style={({ pressed }) => [
              styles.row,
              {
                backgroundColor: pressed ? colors.accent : colors.card,
                borderColor: colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item} examples`}
          >
            <RNText
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: '600',
                color: colors.foreground,
              }}
            >
              {item}
            </RNText>
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
  container: {
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionHeader: {
    paddingTop: 18,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '500',
  },
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
  rowText: {
    fontSize: 15,
    fontWeight: '600',
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
