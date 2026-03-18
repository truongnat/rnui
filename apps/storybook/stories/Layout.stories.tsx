import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ThemeProvider, Box, Stack, Grid, Typography, Link, Paper, useTheme } from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Layout",
  component: View,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "overline"],
    },
  },
};

export default meta;

export const BoxStory: StoryObj = {
  name: "Box",
  render: () => (
    <Box style={{ padding: 16, borderWidth: 1, borderRadius: 8 }}>
      <Text>Box content</Text>
    </Box>
  ),
};

export const StackStory: StoryObj = {
  name: "Stack",
  render: () => (
    <Stack spacing="md">
      <Box style={{ height: 32, backgroundColor: "#e2e8f0" }} />
      <Box style={{ height: 32, backgroundColor: "#cbd5f5" }} />
      <Box style={{ height: 32, backgroundColor: "#bfdbfe" }} />
    </Stack>
  ),
};

export const GridStory: StoryObj = {
  name: "Grid",
  render: () => (
    <Grid container spacing={2}>
      <Grid size={6}><Box style={{ height: 40, backgroundColor: "#e2e8f0" }} /></Grid>
      <Grid size={6}><Box style={{ height: 40, backgroundColor: "#cbd5f5" }} /></Grid>
      <Grid size={4}><Box style={{ height: 40, backgroundColor: "#bfdbfe" }} /></Grid>
      <Grid size={4}><Box style={{ height: 40, backgroundColor: "#bae6fd" }} /></Grid>
      <Grid size={4}><Box style={{ height: 40, backgroundColor: "#c7d2fe" }} /></Grid>
    </Grid>
  ),
};

export const TypographyStory: StoryObj = {
  name: "Typography",
  render: () => (
    <View style={{ gap: 8 }}>
      <Typography variant="h4">Heading</Typography>
      <Typography variant="subtitle1">Subtitle</Typography>
      <Typography variant="body1">Body text example.</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline</Typography>
    </View>
  ),
};

export const LinkStory: StoryObj = {
  name: "Link",
  render: () => (
    <Link href="https://example.com">Open example.com</Link>
  ),
};

export const PaperStory: StoryObj = {
  name: "Paper",
  render: () => (
    <Paper elevation={2} style={{ padding: 16 }}>
      <Text>Paper with elevation</Text>
    </Paper>
  ),
};
