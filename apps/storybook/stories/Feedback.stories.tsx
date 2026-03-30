import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Alert,
  Dialog,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Button,
} from "@truongdq01/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Feedback",
  component: View,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    severity: {
      control: { type: "select" },
      options: ["success", "warning", "error", "info"],
    },
  },
};

export default meta;

export const AlertStory: StoryObj = {
  name: "Alert",
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert severity="success">Saved successfully</Alert>
      <Alert severity="warning">Warning message</Alert>
      <Alert severity="error">Error occurred</Alert>
      <Alert severity="info">Information message</Alert>
    </View>
  ),
};

export const ProgressStory: StoryObj = {
  name: "Progress",
  render: () => (
    <View style={{ gap: 12 }}>
      <CircularProgress />
      <LinearProgress value={40} variant="determinate" />
      <LinearProgress value={30} valueBuffer={70} variant="buffer" />
    </View>
  ),
};

export const DialogStory: StoryObj = {
  name: "Dialog",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button
          label="Open Dialog"
          onPress={() => setOpen(true)}
          onLongPress={() => { }}
          accessibilityLabel="Open dialog"
          accessibilityHint=""
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          actions={(
            <>
              <Button
                label="Cancel"
                variant="outline"
                onPress={() => setOpen(false)}
                onLongPress={() => { }}
                accessibilityLabel="Cancel"
                accessibilityHint=""
              />
              <Button
                label="Confirm"
                onPress={() => setOpen(false)}
                onLongPress={() => { }}
                accessibilityLabel="Confirm"
                accessibilityHint=""
              />
            </>
          )}
        >
          <Text>
            Are you sure you want to proceed with this action? This cannot be undone.
          </Text>
        </Dialog>
      </View>
    );
  },
};

export const SnackbarStory: StoryObj = {
  name: "Snackbar",
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <View>
        <Button label="Show Snackbar" onPress={() => setOpen(true)} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Show snackbar" accessibilityHint="" />
        <Snackbar open={open} message="Saved" onClose={() => setOpen(false)} />
      </View>
    );
  },
};
