import type { Meta, StoryObj } from "@storybook/react-native";
import { ThemeProvider, Button } from "@rnui/ui";
import { View } from "react-native";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 24 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "outline", "ghost", "destructive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: { label: "Solid button", variant: "solid", size: "md" },
};

export const Outline: Story = {
  args: { label: "Outline button", variant: "outline", size: "md" },
};

export const Ghost: Story = {
  args: { label: "Ghost button", variant: "ghost", size: "md" },
};

export const Destructive: Story = {
  args: { label: "Delete item", variant: "destructive", size: "md" },
};

export const Loading: Story = {
  args: { label: "Saving...", variant: "solid", loading: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable", variant: "solid", disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Button label="Small" size="sm" onPress={() => {}} />
      <Button label="Medium" size="md" onPress={() => {}} />
      <Button label="Large" size="lg" onPress={() => {}} />
    </View>
  ),
};