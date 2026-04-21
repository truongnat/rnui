import { useTokens } from '@truongdq01/headless';
import { Button, Typography } from '@truongdq01/ui';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { PillSearchBar, ScreenHeader } from './kitchen/ui';

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
];

export default function ComponentsListScreen() {
  const t = useTokens();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = COMPONENTS.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      <ScreenHeader title="Components" />
      <View style={{ padding: t.spacing[4], paddingBottom: 0 }}>
        <PillSearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components..."
        />
        <View style={{ marginTop: 10 }}>
          <Button
            label="View Legacy Kitchen Sink"
            size="sm"
            variant="outline"
            onPress={() => router.push('/kitchen-sink' as any)}
          />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: t.spacing[4],
          gap: t.spacing[2],
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/components/${item}` as any)}
            style={({ pressed }) => ({
              padding: t.spacing[4],
              backgroundColor: pressed ? t.color.bg.muted : t.color.bg.default,
              borderRadius: t.radius.lg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: t.color.border.subtle,
            })}
          >
            <Typography variant="h4">{item}</Typography>
            <ChevronRight size={20} color={t.color.text.tertiary} />
          </Pressable>
        )}
      />
    </View>
  );
}
