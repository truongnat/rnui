import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { DemoThemeControls } from '@/demo/DemoThemeControls';
import { usePersistedColorScheme } from '@/demo/usePersistedColorScheme';
import { useThemeColor } from '@/lib/utils';
import { useRouter, type Href } from 'expo-router';
import {
  Bell,
  Boxes,
  ChevronRight,
  Compass,
  Layers,
  LayoutGrid,
  Moon,
  Palette,
  Search,
  Sliders,
  Sparkles,
  Sun,
  X,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface CategoryInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  accentColor: string;
  items: readonly string[];
}

export const CATEGORIES: readonly CategoryInfo[] = [
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Autonomous screen generation & schema rendering',
    icon: Sparkles,
    accentColor: '#8b5cf6',
    items: ['AIRenderer'],
  },
  {
    id: 'inputs',
    title: 'Inputs & Forms',
    description: 'Buttons, fields, pickers, toggles & form controls',
    icon: Sliders,
    accentColor: '#3b82f6',
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
    id: 'layout',
    title: 'Layout & Structure',
    description: 'Stacks, responsive grids, cards, surfaces & glass',
    icon: LayoutGrid,
    accentColor: '#10b981',
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
    id: 'navigation',
    title: 'Navigation',
    description: 'Tabs, breadcrumbs, app bars, steppers & pagination',
    icon: Compass,
    accentColor: '#f59e0b',
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
    id: 'feedback',
    title: 'Feedback & Status',
    description: 'Alerts, toasts, progress bars, chips & skeletons',
    icon: Bell,
    accentColor: '#ec4899',
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
    id: 'overlays',
    title: 'Overlays & Dialogs',
    description: 'Modals, bottom sheets, drawers, popovers & menus',
    icon: Layers,
    accentColor: '#06b6d4',
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
    id: 'media',
    title: 'Data Display & Media',
    description: 'Avatars, carousels, charts, tables, lists & calendars',
    icon: Boxes,
    accentColor: '#6366f1',
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

export default function ComponentsShowcaseScreen() {
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { schemePreference, setSchemePreference } = usePersistedColorScheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isDark = schemePreference === 'dark';

  const toggleTheme = () => {
    setSchemePreference(isDark ? 'light' : 'dark');
  };

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CATEGORIES.map((cat) => {
      let items = cat.items;
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        items = [];
      } else if (q) {
        items = cat.items.filter((item) => item.toLowerCase().includes(q));
      }
      return {
        ...cat,
        items,
      };
    }).filter((cat) => cat.items.length > 0);
  }, [search, selectedCategory]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Sticky Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View style={styles.brandRow}>
            <View
              style={[
                styles.brandLogo,
                { backgroundColor: colors.primary },
              ]}
            >
              <Boxes size={20} color={colors.primaryForeground} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <RNText style={[styles.brandTitle, { color: colors.foreground }]}>
                  RNUI
                </RNText>
                <View
                  style={[
                    styles.versionBadge,
                    { backgroundColor: colors.muted },
                  ]}
                >
                  <RNText
                    style={[
                      styles.versionText,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    Registry
                  </RNText>
                </View>
              </View>
              <RNText style={[styles.brandSub, { color: colors.mutedForeground }]}>
                shadcn/ui for React Native
              </RNText>
            </View>
          </View>

          {/* Quick Action Button (Theme Switcher) */}
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.themeToggle,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun size={18} color="#f59e0b" />
            ) : (
              <Moon size={18} color={colors.foreground} />
            )}
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Search size={17} color={colors.mutedForeground} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search 78 components..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
            returnKeyType="search"
            clearButtonMode="never"
          />
          {search ? (
            <Pressable
              onPress={() => setSearch('')}
              hitSlop={8}
              style={styles.clearBtn}
            >
              <X size={14} color={colors.mutedForeground} />
            </Pressable>
          ) : null}
        </View>

        {/* Category Filter Pills (Horizontal) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          <Pressable
            onPress={() => setSelectedCategory('all')}
            style={[
              styles.pill,
              {
                backgroundColor:
                  selectedCategory === 'all'
                    ? colors.primary
                    : colors.card,
                borderColor:
                  selectedCategory === 'all'
                    ? colors.primary
                    : colors.border,
              },
            ]}
          >
            <RNText
              style={[
                styles.pillText,
                {
                  color:
                    selectedCategory === 'all'
                      ? colors.primaryForeground
                      : colors.foreground,
                },
              ]}
            >
              All (78)
            </RNText>
          </Pressable>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComp = cat.icon;
            return (
              <Pressable
                key={cat.id}
                onPress={() =>
                  setSelectedCategory(isSelected ? 'all' : cat.id)
                }
                style={[
                  styles.pill,
                  {
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.card,
                    borderColor: isSelected
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              >
                <IconComp
                  size={14}
                  color={
                    isSelected
                      ? colors.primaryForeground
                      : cat.accentColor
                  }
                />
                <RNText
                  style={[
                    styles.pillText,
                    {
                      color: isSelected
                        ? colors.primaryForeground
                        : colors.foreground,
                    },
                  ]}
                >
                  {cat.title} ({cat.items.length})
                </RNText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <ScrollView
        contentContainerStyle={[
          styles.mainScroll,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Quick Stats Bento */}
        {selectedCategory === 'all' && !search ? (
          <View style={styles.statsRow}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <RNText
                style={[styles.statNumber, { color: colors.foreground }]}
              >
                83
              </RNText>
              <RNText
                style={[styles.statLabel, { color: colors.mutedForeground }]}
              >
                Components
              </RNText>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <RNText
                style={[styles.statNumber, { color: colors.foreground }]}
              >
                2
              </RNText>
              <RNText
                style={[styles.statLabel, { color: colors.mutedForeground }]}
              >
                Engines (NW/UW)
              </RNText>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <RNText
                style={[styles.statNumber, { color: colors.foreground }]}
              >
                7
              </RNText>
              <RNText
                style={[styles.statLabel, { color: colors.mutedForeground }]}
              >
                Themes
              </RNText>
            </View>
          </View>
        ) : null}

        {/* Empty Search Result */}
        {filteredCategories.length === 0 ? (
          <View
            style={[
              styles.emptyBox,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Search size={32} color={colors.mutedForeground} />
            <RNText style={[styles.emptyTitle, { color: colors.foreground }]}>
              No components found
            </RNText>
            <RNText
              style={[
                styles.emptySubtitle,
                { color: colors.mutedForeground },
              ]}
            >
              No match for "{search}". Try searching for button, dialog, tabs...
            </RNText>
          </View>
        ) : null}

        {/* Category Inset Grouped Cards */}
        {filteredCategories.map((cat) => {
          const IconComp = cat.icon;
          return (
            <View
              key={cat.id}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* Category Header */}
              <View style={styles.categoryHeader}>
                <View style={styles.categoryHeaderLeft}>
                  <View
                    style={[
                      styles.categoryIconWrap,
                      { backgroundColor: `${cat.accentColor}18` },
                    ]}
                  >
                    <IconComp size={20} color={cat.accentColor} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RNText
                      style={[
                        styles.categoryTitle,
                        { color: colors.foreground },
                      ]}
                    >
                      {cat.title}
                    </RNText>
                    <RNText
                      style={[
                        styles.categoryDesc,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {cat.description}
                    </RNText>
                  </View>
                </View>
                <View
                  style={[
                    styles.countPill,
                    { backgroundColor: colors.muted },
                  ]}
                >
                  <RNText
                    style={[
                      styles.countText,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {cat.items.length}
                  </RNText>
                </View>
              </View>

              {/* Clean Rows List (No heavy item background, elegant dividers) */}
              <View
                style={[
                  styles.listWrapper,
                  {
                    borderTopColor: colors.border,
                  },
                ]}
              >
                {cat.items.map((comp, idx) => {
                  const isLast = idx === cat.items.length - 1;
                  return (
                    <Pressable
                      key={comp}
                      onPress={() =>
                        router.push(`/components/${comp}` as Href)
                      }
                      style={({ pressed }) => ({
                        backgroundColor: pressed
                          ? colors.accent
                          : 'transparent',
                      })}
                      accessibilityRole="button"
                      accessibilityLabel={`Open ${comp} demo`}
                    >
                      <View
                        style={[
                          styles.itemRow,
                          !isLast && {
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: colors.border,
                          },
                        ]}
                      >
                        <View style={styles.itemLeft}>
                          <View
                            style={[
                              styles.itemDot,
                              { backgroundColor: cat.accentColor },
                            ]}
                          />
                          <RNText
                            style={[
                              styles.itemTitle,
                              { color: colors.foreground },
                            ]}
                          >
                            {comp}
                          </RNText>
                        </View>
                        <ChevronRight
                          size={16}
                          color={colors.mutedForeground}
                        />
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Theme Palette Dialog Overlay */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <DemoThemeControls />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  versionBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  pillsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mainScroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  emptyBox: {
    padding: 36,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  categoryCard: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  categoryDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  itemDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
});
