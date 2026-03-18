import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Tooltip,
  Icon,
  ImageList,
  ImageListItem,
  Box,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/DataDisplay",
  component: View,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "solid"],
    },
  },
};

export default meta;

export const TableStory: StoryObj = {
  name: "Table",
  render: () => (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Role</TableCell>
            <TableCell variant="head" align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>Engineer</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Grace</TableCell>
            <TableCell>Architect</TableCell>
            <TableCell align="right">Invited</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const ChipStory: StoryObj = {
  name: "Chip",
  render: () => (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Chip label="Design" />
      <Chip label="Dev" variant="outlined" />
      <Chip label="Done" variant="solid" color="success" />
    </View>
  ),
};

export const TooltipStory: StoryObj = {
  name: "Tooltip",
  render: () => (
    <Tooltip title="Helpful info">
      <Text>Press me</Text>
    </Tooltip>
  ),
};

export const IconStory: StoryObj = {
  name: "Icon",
  render: () => (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Icon>star</Icon>
      <Icon>heart</Icon>
      <Icon>check</Icon>
    </View>
  ),
};

export const ImageListStory: StoryObj = {
  name: "ImageList",
  render: () => (
    <ImageList cols={2} gap={8}>
      <ImageListItem><Box style={{ height: 120, backgroundColor: "#e2e8f0" }} /></ImageListItem>
      <ImageListItem><Box style={{ height: 120, backgroundColor: "#cbd5f5" }} /></ImageListItem>
      <ImageListItem><Box style={{ height: 120, backgroundColor: "#bfdbfe" }} /></ImageListItem>
      <ImageListItem><Box style={{ height: 120, backgroundColor: "#bae6fd" }} /></ImageListItem>
    </ImageList>
  ),
};

export const TimelineStory: StoryObj = {
  name: "Timeline",
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Step one</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Step two</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
