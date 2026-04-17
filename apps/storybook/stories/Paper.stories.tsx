import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Paper } from '@truongdq01/ui';
import { View, Text } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const PaperWrapper = (props: any) => (
  <Paper {...props}>
    <View style={{ padding: 16 }}>
      <Text>{props.children ?? 'Paper content'}</Text>
    </View>
  </Paper>
);

const meta = {
  title: 'Components/Paper',
  component: PaperWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevation', 'outlined', 'flat'],
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    square: { control: 'boolean' },
  },
  args: {
    variant: 'elevation',
    elevation: 'sm',
    square: false,
    children: 'Paper content',
  },
};

export default meta;
type Story = StoryObj<typeof PaperWrapper>;

export const Default: Story = {};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Flat: Story = {
  args: { variant: 'flat' },
};

export const AllElevations: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <PaperWrapper {...args} elevation="none">
        No elevation
      </PaperWrapper>
      <PaperWrapper {...args} elevation="sm">
        Small elevation
      </PaperWrapper>
      <PaperWrapper {...args} elevation="md">
        Medium elevation
      </PaperWrapper>
      <PaperWrapper {...args} elevation="lg">
        Large elevation
      </PaperWrapper>
    </View>
  ),
};

export const Square: Story = {
  args: { square: true },
};
