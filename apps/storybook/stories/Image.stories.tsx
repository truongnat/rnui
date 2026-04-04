import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, RnImage } from '@truongdq01/ui';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 12 }}>{children}</View>
  </ThemeProvider>
);

const meta = {
  title: 'Components/Image',
  component: RnImage,
  decorators: [
    (Story: any) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof RnImage> = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>With Placeholder (fast network)</Text>
        <RnImage
          source={{ uri: 'https://picsum.photos/400/300' }}
          style={{ width: 200, height: 150, borderRadius: 12 }}
          onLoad={undefined}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Simulating Slow Network</Text>
        <RnImage
          source={{ uri: 'https://picsum.photos/400/300?random=2' }}
          style={{ width: 200, height: 150, borderRadius: 12 }}
          showPlaceholder
          onLoad={undefined}
        />
      </View>
    </View>
  ),
};
