import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, FormControl, FormLabel, FormHelperText, Input } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const FormControlWrapper = (props: any) => (
  <FormControl {...props}>
    {props.children ?? (
      <>
        <FormLabel>{props.label ?? "Label"}</FormLabel>
        <Input placeholder="Input inside FormControl" />
        {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
      </>
    )}
  </FormControl>
);

const meta = {
  title: "Components/FormControl",
  component: FormControlWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "standard"],
    },
    margin: {
      control: { type: "select" },
      options: ["dense", "none", "normal"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    variant: "outlined",
    margin: "none",
    error: false,
    disabled: false,
    required: false,
    fullWidth: true,
    label: "Form Label",
    helperText: "",
  },
};

export default meta;
type Story = StoryObj<typeof FormControlWrapper>;

export const Default: Story = {
  args: { label: "Username", helperText: "Enter your username" },
};

export const Error: Story = {
  args: { label: "Email", error: true, helperText: "Invalid email address" },
};

export const Required: Story = {
  args: { label: "Password", required: true },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};

export const FullWidth: Story = {
  args: { label: "Full Width", fullWidth: true },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 16 }}>
      <FormControlWrapper {...args} label="Default" />
      <FormControlWrapper {...args} label="Required" required />
      <FormControlWrapper {...args} label="Error" error helperText="Something went wrong" />
      <FormControlWrapper {...args} label="Disabled" disabled />
    </View>
  ),
};
