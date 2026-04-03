import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, SpeedDial, SpeedDialAction, Icon } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, flex: 1 }}>
      {children}
    </View>
  </ThemeProvider>
);

const SpeedDialWrapper = (props: any) => (
  <SpeedDial
    ariaLabel={props.ariaLabel ?? "Actions"}
    icon={<Icon>add</Icon>}
  >
    <SpeedDialAction tooltipTitle="Share" icon={<Icon>share</Icon>} />
    <SpeedDialAction tooltipTitle="Save" icon={<Icon>save</Icon>} />
    <SpeedDialAction tooltipTitle="Delete" icon={<Icon>delete</Icon>} />
  </SpeedDial>
);

const meta = {
  title: "Components/SpeedDial",
  component: SpeedDialWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
    },
    ariaLabel: { control: "text" },
  },
  args: {
    direction: "up",
    ariaLabel: "Actions",
  },
};

export default meta;
type Story = StoryObj<typeof SpeedDialWrapper>;

export const Default: Story = {};

export const Down: Story = {
  args: { direction: "down" },
};

export const Right: Story = {
  args: { direction: "right" },
};
