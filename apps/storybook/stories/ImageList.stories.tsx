import type { StoryObj } from '@storybook/react-native';
import {
  ImageList,
  ImageListItem,
  RnImage,
  ThemeProvider,
} from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const ImageListWrapper = (props: any) => (
  <ImageList cols={props.cols ?? 2} gap={props.gap ?? 8}>
    <ImageListItem>
      <RnImage
        source={{ uri: 'https://picsum.photos/400/400?random=1' }}
        style={{ width: '100%', height: 120, borderRadius: 8 }}
      />
    </ImageListItem>
    <ImageListItem>
      <RnImage
        source={{ uri: 'https://picsum.photos/400/400?random=2' }}
        style={{ width: '100%', height: 120, borderRadius: 8 }}
      />
    </ImageListItem>
    <ImageListItem>
      <RnImage
        source={{ uri: 'https://picsum.photos/400/400?random=3' }}
        style={{ width: '100%', height: 120, borderRadius: 8 }}
      />
    </ImageListItem>
    <ImageListItem>
      <RnImage
        source={{ uri: 'https://picsum.photos/400/400?random=4' }}
        style={{ width: '100%', height: 120, borderRadius: 8 }}
      />
    </ImageListItem>
  </ImageList>
);

const meta = {
  title: 'Components/ImageList',
  component: ImageListWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    cols: { control: 'number' },
    gap: { control: 'number' },
  },
  args: {
    cols: 2,
    gap: 8,
  },
};

export default meta;
type Story = StoryObj<typeof ImageListWrapper>;

export const TwoColumns: Story = {
  args: { cols: 2 },
};

export const ThreeColumns: Story = {
  args: { cols: 3 },
};

export const SingleColumn: Story = {
  args: { cols: 1 },
};
