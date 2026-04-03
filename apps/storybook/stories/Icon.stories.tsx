import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Icon } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const IconWrapper = (props: any) => (
  <Icon {...props}>{props.name ?? "star"}</Icon>
);

const meta = {
  title: "Components/Icon",
  component: IconWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    name: { control: "text" },
    size: { control: "number" },
    color: { control: "text" },
  },
  args: {
    name: "star",
    size: 24,
    color: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof IconWrapper>;

export const Default: Story = {
  args: { name: "star" },
};

export const Colored: Story = {
  args: { name: "heart", color: "#ef4444" },
};

export const AllSizes: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <IconWrapper {...args} name="star" size={16} />
      <IconWrapper {...args} name="star" size={24} />
      <IconWrapper {...args} name="star" size={32} />
      <IconWrapper {...args} name="star" size={48} />
    </View>
  ),
};

export const IconSet: Story = {
  render: (args: any) => (
    <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
      <IconWrapper {...args} name="star" />
      <IconWrapper {...args} name="heart" />
      <IconWrapper {...args} name="check" />
      <IconWrapper {...args} name="settings" />
      <IconWrapper {...args} name="bell" />
      <IconWrapper {...args} name="search" />
      <IconWrapper {...args} name="home" />
      <IconWrapper {...args} name="user" />
    </View>
  ),
};
