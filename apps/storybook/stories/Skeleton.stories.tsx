import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Skeleton, SkeletonText, SkeletonCard, SkeletonProfile, SkeletonMedia, SkeletonGroup } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const SkeletonWrapper = (props: any) => (
  <Skeleton {...props} />
);

const meta = {
  title: "Components/Skeleton",
  component: SkeletonWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    width: { control: "text" },
    height: { control: "number" },
    variant: {
      control: { type: "select" },
      options: ["rect", "circular", "rounded"],
    },
    animation: {
      control: { type: "select" },
      options: ["pulse", "wave", "none"],
    },
  },
  args: {
    width: "100%",
    height: 20,
    variant: "rect",
    animation: "wave",
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonWrapper>;

export const Default: Story = {
  args: { width: "80%" },
};

export const Circular: Story = {
  args: { width: 48, height: 48, variant: "circular" },
};

export const Rounded: Story = {
  args: { width: "60%", height: 40, variant: "rounded" },
};

export const TextLines: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <SkeletonText lines={3} />
    </View>
  ),
};

export const Card: Story = {
  render: () => <SkeletonCard />,
};

export const Profile: Story = {
  render: () => <SkeletonProfile />,
};

export const Media: Story = {
  render: () => <SkeletonMedia />,
};

export const Group: Story = {
  render: () => (
    <SkeletonGroup stagger={100}>
      <View style={{ gap: 8 }}>
        <SkeletonWrapper width="90%" height={18} />
        <SkeletonWrapper width="70%" height={14} />
        <SkeletonWrapper width="50%" height={14} />
      </View>
    </SkeletonGroup>
  ),
};
