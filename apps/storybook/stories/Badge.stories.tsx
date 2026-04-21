import type { StoryObj } from '@storybook/react-native';
import { Badge, ThemeProvider } from '@truongdq01/ui';
import { AlertCircle, AlertTriangle, Check, Info } from 'lucide-react-native';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/Badge',
  component: Badge,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'brand', 'success', 'warning', 'error', 'info'],
    },
  },
  args: {
    label: 'Badge',
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: (args: any) => (
    <View style={{ gap: 10 }}>
      <Badge {...args} label="Default" variant="default" />
      <Badge {...args} label="Brand" variant="brand" />
      <Badge {...args} label="Success" variant="success" />
      <Badge {...args} label="Warning" variant="warning" />
      <Badge {...args} label="Error" variant="error" />
      <Badge {...args} label="Info" variant="info" />
    </View>
  ),
};

export const WithIcons: Story = {
  render: (args: any) => {
    const CheckIcon = Check as any;
    const WarningIcon = AlertTriangle as any;
    const ErrorIcon = AlertCircle as any;
    const InfoIcon = Info as any;
    return (
      <View style={{ gap: 10 }}>
        <Badge
          {...args}
          label="Success"
          variant="success"
          icon={<CheckIcon />}
        />
        <Badge
          {...args}
          label="Warning"
          variant="warning"
          icon={<WarningIcon />}
        />
        <Badge {...args} label="Error" variant="error" icon={<ErrorIcon />} />
        <Badge {...args} label="Info" variant="info" icon={<InfoIcon />} />
      </View>
    );
  },
};
