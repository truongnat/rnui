import type { StoryObj } from '@storybook/react-native';
import {
  AppBar,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 0 }}>{children}</View>
  </ThemeProvider>
);

const AppBarWrapper = (props: any) => (
  <AppBar {...props}>
    <Toolbar>
      <Typography variant="h6" style={{ flex: 1 }}>
        {props.title ?? 'App Bar'}
      </Typography>
      {props.action && (
        <Button
          label={props.actionLabel ?? 'Action'}
          variant="ghost"
          onPress={props.onAction ?? (() => {})}
          onLongPress={() => {}}
          accessibilityLabel={props.actionLabel ?? 'Action'}
          accessibilityHint=""
        />
      )}
    </Toolbar>
  </AppBar>
);

const meta = {
  title: 'Components/AppBar',
  component: AppBarWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    action: { control: 'boolean' },
    actionLabel: { control: 'text' },
  },
  args: {
    title: 'App Bar',
    action: false,
  },
};

export default meta;
type Story = StoryObj<typeof AppBarWrapper>;

export const Default: Story = {
  args: { title: 'My App' },
};

export const WithAction: Story = {
  args: { title: 'Messages', action: true, actionLabel: 'Compose' },
};

export const LongTitle: Story = {
  args: { title: 'Application Settings and Preferences' },
};
