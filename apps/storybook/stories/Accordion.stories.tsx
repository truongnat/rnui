import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text } from "react-native";
import {
  ThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
} from "@truongdq01/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24, gap: 16 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Accordion defaultExpanded>
        <AccordionSummary>Account Settings</AccordionSummary>
        <AccordionDetails>
          <Text>Manage profile, security, and connected services.</Text>
        </AccordionDetails>
        <AccordionActions>
          <Button label="Cancel" variant="ghost" onPress={() => { }} accessibilityLabel="Cancel" />
          <Button label="Save" onPress={() => { }} accessibilityLabel="Save" />
        </AccordionActions>
      </Accordion>
      <Accordion>
        <AccordionSummary>Notifications</AccordionSummary>
        <AccordionDetails>
          <Text>Configure email and push preferences.</Text>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary>Disabled Section</AccordionSummary>
        <AccordionDetails>
          <Text>Unavailable while offline.</Text>
        </AccordionDetails>
      </Accordion>
    </View>
  ),
};
