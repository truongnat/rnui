import type { StoryObj } from '@storybook/react-native';
import {
  AnimatedList,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/AnimatedList',
  component: AnimatedList,
  decorators: [
    (Story: any) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

const CONTACTS = [
  { id: '1', name: 'An Nguyen', role: 'Designer', initials: 'AN' },
  { id: '2', name: 'Binh Tran', role: 'Engineer', initials: 'BT' },
  { id: '3', name: 'Chi Le', role: 'Product', initials: 'CL' },
];

export const Default: StoryObj<typeof AnimatedList> = {
  render: () => {
    type Contact = (typeof CONTACTS)[number];
    return (
      <View
        style={{
          height: 300,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <AnimatedList<Contact>
          data={CONTACTS}
          estimatedItemSize={60}
          renderItem={({ item, index }) => (
            <ListItem divider={index < CONTACTS.length - 1}>
              <ListItemIcon>
                <Avatar
                  initials={item.initials}
                  size="sm"
                  accessibilityLabel={item.name}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} secondary={item.role} />
            </ListItem>
          )}
        />
      </View>
    );
  },
};
