import type { StoryObj } from '@storybook/react-native';
import { Breadcrumbs, Link, ThemeProvider, Typography } from '@truongdq01/ui';
import type React from 'react';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const BreadcrumbsWrapper = (props: any) => (
  <Breadcrumbs {...props}>
    <Link href="#">Home</Link>
    <Link href="#">Library</Link>
    <Typography>Data</Typography>
  </Breadcrumbs>
);

const meta = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsWrapper,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
  argTypes: {
    separator: { control: 'text' },
    maxItems: { control: 'number' },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof BreadcrumbsWrapper>;

export const Default: Story = {};

export const LongPath: Story = {
  render: () => (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Catalog</Link>
      <Link href="#">Electronics</Link>
      <Link href="#">Phones</Link>
      <Typography>iPhone 15</Typography>
    </Breadcrumbs>
  ),
};
