import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Link } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const LinkWrapper = (props: any) => (
  <Link {...props}>{props.children ?? "Open link"}</Link>
);

const meta = {
  title: "Components/Link",
  component: LinkWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    href: { control: "text" },
    underline: {
      control: { type: "select" },
      options: ["always", "hover", "none"],
    },
  },
  args: {
    href: "https://example.com",
    underline: "always",
    children: "Visit example.com",
  },
};

export default meta;
type Story = StoryObj<typeof LinkWrapper>;

export const Default: Story = {};

export const NoUnderline: Story = {
  args: { underline: "none" },
};

export const Inline: Story = {
  render: () => (
    <View>
      <LinkWrapper>Click here</LinkWrapper>
      <LinkWrapper>Another link</LinkWrapper>
    </View>
  ),
};
