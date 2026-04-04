import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Grid, Box } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const GridWrapper = (props: any) => (
  <Grid container spacing={props.spacing ?? 2}>
    <Grid size={6}>
      <Box
        style={{ height: 40, backgroundColor: '#e2e8f0', borderRadius: 4 }}
      />
    </Grid>
    <Grid size={6}>
      <Box
        style={{ height: 40, backgroundColor: '#cbd5f5', borderRadius: 4 }}
      />
    </Grid>
    <Grid size={4}>
      <Box
        style={{ height: 40, backgroundColor: '#bfdbfe', borderRadius: 4 }}
      />
    </Grid>
    <Grid size={4}>
      <Box
        style={{ height: 40, backgroundColor: '#bae6fd', borderRadius: 4 }}
      />
    </Grid>
    <Grid size={4}>
      <Box
        style={{ height: 40, backgroundColor: '#c7d2fe', borderRadius: 4 }}
      />
    </Grid>
  </Grid>
);

const meta = {
  title: 'Components/Grid',
  component: GridWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    spacing: { control: 'number' },
  },
  args: {
    spacing: 2,
  },
};

export default meta;
type Story = StoryObj<typeof GridWrapper>;

export const Default: Story = {};

export const TightSpacing: Story = {
  args: { spacing: 1 },
};

export const WideSpacing: Story = {
  args: { spacing: 4 },
};

export const FullWidth: Story = {
  render: (args: any) => (
    <Grid container spacing={args.spacing}>
      <Grid size={12}>
        <Box
          style={{ height: 40, backgroundColor: '#e2e8f0', borderRadius: 4 }}
        />
      </Grid>
      <Grid size={8}>
        <Box
          style={{ height: 40, backgroundColor: '#cbd5f5', borderRadius: 4 }}
        />
      </Grid>
      <Grid size={4}>
        <Box
          style={{ height: 40, backgroundColor: '#bfdbfe', borderRadius: 4 }}
        />
      </Grid>
    </Grid>
  ),
};
