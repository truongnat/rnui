import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Stepper, Step } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const StepperWrapper = (props: any) => (
  <Stepper activeStep={props.activeStep ?? 1}>
    <Step index={0} label={props.firstLabel ?? "Account"} />
    <Step index={1} label={props.secondLabel ?? "Billing"} />
    <Step index={2} label={props.thirdLabel ?? "Review"} />
  </Stepper>
);

const meta = {
  title: "Components/Stepper",
  component: StepperWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    activeStep: { control: "number" },
    firstLabel: { control: "text" },
    secondLabel: { control: "text" },
    thirdLabel: { control: "text" },
  },
  args: {
    activeStep: 1,
    firstLabel: "Account",
    secondLabel: "Billing",
    thirdLabel: "Review",
  },
};

export default meta;
type Story = StoryObj<typeof StepperWrapper>;

export const StepOne: Story = {
  args: { activeStep: 0 },
};

export const StepTwo: Story = {
  args: { activeStep: 1 },
};

export const StepThree: Story = {
  args: { activeStep: 2 },
};

export const CustomLabels: Story = {
  args: {
    activeStep: 1,
    firstLabel: "Select Plan",
    secondLabel: "Payment",
    thirdLabel: "Confirmation",
  },
};
