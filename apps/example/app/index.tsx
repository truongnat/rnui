import { useTokens, useTheme } from '@truongdq01/headless';
import { Typography } from '@truongdq01/ui';
import { useRouter, type Href } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ListSectionHeader,
  PillSearchBar,
  ScreenHeader,
} from '@/demo/ExampleChrome';

const COMPONENTS = [
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
  'BottomNavigation',
  'BottomSheet',
  'Box',
  'Breadcrumbs',
  'Button',
  'ButtonGroup',
  'Card',
  'Carousel',
  'ChatListItem',
  'Checkbox',
  'Chip',
  'CircularProgress',
  'ContextMenu',
  'DatePicker',
  'Dialog',
  'Divider',
  'Drawer',
  'EmptyState',
  'Fab',
  'Form',
  'FormControl',
  'FormField',
  'GlassCard',
  'Gradient',
  'Grid',
  'Icon',
  'Image',
  'ImageList',
  'Input',
  'Label',
  'LinearProgress',
  'Link',
  'List',
  'Marquee',
  'Menu',
  'MessageInput',
  'Modal',
  'OTPInput',
  'Pagination',
  'Paper',
  'Popover',
  'Popper',
  'Popup',
  'Pressable',
  'Radio',
  'Rating',
  'ScrollArea',
  'SegmentedControl',
  'Select',
  'SettingsMenu',
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
  'TextArea',
  'TextField',
  'Timeline',
  'Toast',
  'ToggleButton',
  'Tooltip',
  'Typography',
] as const;

function componentHref(name: string): Href {
  return `/components/${name}` as Href;
}

function groupComponents(items: readonly string[]) {
  const map = new Map<string, string[]>();
  for (const name of items) {
    const letter = name[0]?.toUpperCase() ?? '#';
    const bucket = map.get(letter) ?? [];
    bucket.push(name);
    map.set(letter, bucket);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, data]) => ({ title: letter, data }));
}

export default function ComponentsListScreen() {
  const t = useTokens();
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      COMPONENTS.filter((c) =>
        c.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  const sections = useMemo(() => groupComponents(filtered), [filtered]);

  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      <ScreenHeader
        title="RNUI"
        subtitle={`${COMPONENTS.length} components`}
      />
      <View
        style={{
          paddingHorizontal: t.spacing[4],
          paddingTop: t.spacing[3],
          paddingBottom: t.spacing[2],
          backgroundColor: t.color.bg.subtle,
        }}
      >
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
          paddingHorizontal: t.spacing[4],
          paddingBottom: insets.bottom + t.spacing[8],
        }}
        ListEmptyComponent={
          <View
            style={{
              padding: t.spacing[8],
              alignItems: 'center',
              gap: t.spacing[2],
            }}
          >
            <Typography variant="subtitle2">No matches</Typography>
            <Typography variant="body2" color="secondary" align="center">
              Try a different search term
            </Typography>
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <ListSectionHeader title={title} />
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(componentHref(item))}
            style={({ pressed }) => ({
              paddingVertical: t.spacing[3.5],
              paddingHorizontal: t.spacing[4],
              marginBottom: t.spacing[2],
              backgroundColor: pressed
                ? t.color.surface.sunken
                : t.color.surface.default,
              borderRadius: t.radius.lg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: t.color.border.subtle,
              minHeight: 52,
            })}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item} demo`}
          >
            <Typography
              variant="body1"
              style={{ fontWeight: tokens.fontWeight.medium }}
            >
              {item}
            </Typography>
            <ChevronRight size={18} color={t.color.text.tertiary} />
          </Pressable>
        )}
      />
    </View>
  );
}
