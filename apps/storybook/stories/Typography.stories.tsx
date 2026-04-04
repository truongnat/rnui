import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider, Typography } from '@truongdq01/ui';
import { View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>{children}</View>
  </ThemeProvider>
);

const TypographyWrapper = (props: any) => (
  <Typography {...props}>{props.children ?? 'Typography text'}</Typography>
);

const meta = {
  title: 'Components/Typography',
  component: TypographyWrapper,
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
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
    },
  },
  args: {
    variant: 'body1',
    children: 'Typography text',
  },
};

export default meta;
type Story = StoryObj<typeof TypographyWrapper>;

export const Headings: Story = {
  render: (args: any) => (
    <View style={{ gap: 8 }}>
      <TypographyWrapper {...args} variant="h1">
        Heading 1
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="h2">
        Heading 2
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="h3">
        Heading 3
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="h4">
        Heading 4
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="h5">
        Heading 5
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="h6">
        Heading 6
      </TypographyWrapper>
    </View>
  ),
};

export const Body: Story = {
  render: (args: any) => (
    <View style={{ gap: 8 }}>
      <TypographyWrapper {...args} variant="subtitle1">
        Subtitle 1
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="subtitle2">
        Subtitle 2
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="body1">
        Body 1 - Primary text content
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="body2">
        Body 2 - Secondary text content
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="caption">
        Caption text
      </TypographyWrapper>
      <TypographyWrapper {...args} variant="overline">
        OVERLINE
      </TypographyWrapper>
    </View>
  ),
};

export const Default: Story = {
  args: { variant: 'body1', children: 'Default body text' },
};
