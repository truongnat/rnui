import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Box } from "@truongdq01/ui";
import { View, Text } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const BoxWrapper = (props: any) => (
  <Box {...props}>
    {props.children ?? <Text>Box content</Text>}
  </Box>
);

const meta = {
  title: "Components/Box",
  component: BoxWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    p: { control: "number" },
    m: { control: "number" },
    bgColor: { control: "text" },
    borderRadius: { control: "number" },
  },
  args: {
    p: 16,
    bgColor: "#f1f5f9",
    borderRadius: 8,
  },
};

export default meta;
type Story = StoryObj<typeof BoxWrapper>;

export const Default: Story = {};

export const Colored: Story = {
  args: { bgColor: "#dbeafe", p: 20, borderRadius: 12 },
};

export const Nested: Story = {
  render: (args: any) => (
    <BoxWrapper {...args} bgColor="#e2e8f0">
      <Text style={{ marginBottom: 8 }}>Outer Box</Text>
      <BoxWrapper {...args} bgColor="#bfdbfe" p={12}>
        <Text>Inner Box</Text>
      </BoxWrapper>
    </BoxWrapper>
  ),
};
