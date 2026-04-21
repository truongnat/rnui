import type { StoryObj } from '@storybook/react-native';
import { Alert, AlertTitle, ThemeProvider } from '@truongdq01/ui';
import type React from 'react';
import { Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const AlertWrapper = (props: any) => (
  <Alert {...props} onClose={props.onClose ?? (() => {})}>
    <Text>{props.children ?? 'Alert message'}</Text>
  </Alert>
);

const meta = {
  title: 'Components/Alert',
  component: AlertWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'filled', 'outlined'],
    },
  },
  args: {
    severity: 'info',
    variant: 'standard',
    children: 'This is an alert message',
  },
};

export default meta;
type Story = StoryObj<typeof AlertWrapper>;

export const Info: Story = {
  args: { severity: 'info', children: 'Information message' },
};

export const Success: Story = {
  args: { severity: 'success', children: 'Saved successfully' },
};

export const Warning: Story = {
  args: { severity: 'warning', children: 'Warning: please review' },
};

export const Error: Story = {
  args: { severity: 'error', children: 'An error occurred' },
};

export const Filled: Story = {
  args: { severity: 'info', variant: 'filled', children: 'Filled alert' },
};

export const AllSeverities: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <AlertWrapper {...args} severity="success" variant="standard">
        Success message
      </AlertWrapper>
      <AlertWrapper {...args} severity="warning" variant="outlined">
        Warning message
      </AlertWrapper>
      <AlertWrapper {...args} severity="error" variant="filled">
        Error message
      </AlertWrapper>
      <AlertWrapper {...args} severity="info" variant="standard">
        Info message
      </AlertWrapper>
    </View>
  ),
};
