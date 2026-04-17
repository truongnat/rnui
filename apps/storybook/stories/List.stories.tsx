import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import {
  ThemeProvider,
  ListData,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Typography,
} from '@truongdq01/ui';
import {
  Mail as LucideMail,
  Star as LucideStar,
  Archive as LucideArchive,
  Trash2 as LucideTrash2,
} from 'lucide-react-native';

const Mail = LucideMail as any;
const Star = LucideStar as any;
const Archive = LucideArchive as any;
const Trash2 = LucideTrash2 as any;

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ flex: 1, paddingVertical: 12 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/List',
  component: ListData,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ListData>;

const items = [
  {
    id: '1',
    title: 'Inbox',
    subtitle: '3 new messages',
    icon: <Mail size={20} color="#666" />,
    badge: '3',
  },
  {
    id: '2',
    title: 'Starred',
    subtitle: 'Pinned items',
    icon: <Star size={20} color="#666" />,
  },
  {
    id: '3',
    title: 'Archived',
    subtitle: 'Last updated yesterday',
    icon: <Archive size={20} color="#666" />,
  },
];

export const Basic: Story = {
  render: () => (
    <View style={{ flex: 1 }}>
      <ListData
        subheader="Folders"
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <ListItem
            divider
            onPress={() => {}}
            secondaryAction={
              item.badge ? (
                <Badge label={item.badge} variant="brand" />
              ) : undefined
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} secondary={item.subtitle} />
          </ListItem>
        )}
        estimatedItemSize={64}
      />
      <ListData
        subheader={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2">Actions</Typography>
            <Trash2 size={14} color="#666" />
          </View>
        }
        data={[
          {
            id: '4',
            title: 'Trash',
            subtitle: '12 items',
            icon: <Trash2 size={20} color="#666" />,
          },
        ]}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <ListItem divider onPress={() => {}}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} secondary={item.subtitle} />
          </ListItem>
        )}
        estimatedItemSize={64}
      />
    </View>
  ),
};
