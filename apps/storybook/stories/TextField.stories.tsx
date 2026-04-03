import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, TextField } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const TextFieldWrapper = (props: any) => (
  <TextField
    {...props}
    onChange={props.onChange ?? (() => {})}
    accessibilityLabel={props.accessibilityLabel ?? props.label}
  />
);

const meta = {
  title: "Components/TextField",
  component: TextFieldWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    multiline: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    label: "TextField",
    placeholder: "Enter text...",
    variant: "outlined",
    type: "text",
    multiline: false,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextFieldWrapper>;

export const Default: Story = {
  args: { label: "Name", placeholder: "John Doe" },
};

export const Password: Story = {
  args: { label: "Password", type: "password", placeholder: "Enter password" },
};

export const Multiline: Story = {
  args: { label: "Message", multiline: true, minRows: 3, placeholder: "Type your message..." },
};

export const WithError: Story = {
  args: { label: "Email", error: "Invalid email", helperText: "Please enter a valid email" },
};

export const Required: Story = {
  args: { label: "Username", required: true, placeholder: "Required field" },
};

export const AllVariants: Story = {
  render: (args: any) => (
    <View style={{ gap: 12 }}>
      <TextFieldWrapper {...args} label="Outlined" variant="outlined" placeholder="Outlined" />
      <TextFieldWrapper {...args} label="Password" type="password" placeholder="••••••••" />
      <TextFieldWrapper {...args} label="Multiline" multiline minRows={3} placeholder="Multiple lines" />
      <TextFieldWrapper {...args} label="Required" required placeholder="Required" />
    </View>
  ),
};
