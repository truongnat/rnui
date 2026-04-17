import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, ToastContainer, Button } from '@truongdq01/ui';
import { useToast } from '@truongdq01/headless';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <SafeAreaProvider>
      <View style={{ flex: 1, padding: 24, gap: 12 }}>{children}</View>
    </SafeAreaProvider>
  </ThemeProvider>
);

const meta = {
  title: 'Components/Toast',
  component: ToastContainer,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
  },
  args: {
    position: 'bottom',
  },
};

export default meta;

type Story = StoryObj<typeof ToastContainer>;

export const Basic: Story = {
  render: (args: any) => {
    const toast = useToast();
    return (
      <View style={{ flex: 1, gap: 12 }}>
        <Button
          label="Success"
          onPress={() => toast.success('Saved successfully')}
          onLongPress={() => {}}
          accessibilityLabel="Success"
          accessibilityHint=""
        />
        <Button
          label="Warning"
          variant="outline"
          onPress={() => toast.warning('Check your input')}
          onLongPress={() => {}}
          accessibilityLabel="Warning"
          accessibilityHint=""
        />
        <Button
          label="Error"
          variant="ghost"
          onPress={() => toast.error('Something went wrong')}
          onLongPress={() => {}}
          accessibilityLabel="Error"
          accessibilityHint=""
        />
        <Button
          label="Persistent"
          onPress={() =>
            toast.show({ message: 'Needs attention', persistent: true })
          }
          onLongPress={() => {}}
          accessibilityLabel="Persistent"
          accessibilityHint=""
        />
        <ToastContainer {...args} position="bottom" />
      </View>
    );
  },
};
