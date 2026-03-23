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
  TimelineOppositeContent,
  RnImage,
} from "@truongdq01/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/DataDisplay",
  component: View,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

// ... (Table and Chip stories remain same)

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
  render: () => {
    const placements = [
      "top", "top-left", "top-right",
      "bottom", "bottom-left", "bottom-right",
      "left", "left-top", "left-bottom",
      "right", "right-top", "right-bottom"
    ] as const;

    return (
      <View style={{ gap: 40, padding: 40, alignItems: "center" }}>
        <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 20 }}>Tooltip Placements</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
          {placements.map((p) => (
            <Tooltip key={p} title={`Placement: ${p}`} placement={p}>
              <View style={{ width: 100, height: 40, backgroundColor: "#f1f5f9", borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#cbd5e1" }}>
                <Text style={{ fontSize: 12 }}>{p}</Text>
              </View>
            </Tooltip>
          ))}
        </View>
      </View>
    );
  },
};

export const IconStory: StoryObj = {
  name: "Icon",
  render: () => (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <Icon size="medium">star</Icon>
      <Icon color="#ef4444">heart</Icon>
      <Icon color="#22c55e">check</Icon>
      <Icon>settings</Icon>
      <Icon>bell</Icon>
    </View>
  ),
};

export const ImageListStory: StoryObj = {
  name: "ImageList",
  render: () => (
    <ImageList cols={2} gap={8}>
      <ImageListItem>
        <RnImage
          source={{ uri: "https://picsum.photos/400/400?random=1" }}
          style={{ width: "100%", height: 120, borderRadius: 8 }}
        />
      </ImageListItem>
      <ImageListItem>
        <RnImage
          source={{ uri: "https://picsum.photos/400/400?random=2" }}
          style={{ width: "100%", height: 120, borderRadius: 8 }}
        />
      </ImageListItem>
      <ImageListItem>
        <RnImage
          source={{ uri: "https://picsum.photos/400/400?random=3" }}
          style={{ width: "100%", height: 120, borderRadius: 8 }}
        />
      </ImageListItem>
      <ImageListItem>
        <RnImage
          source={{ uri: "https://picsum.photos/400/400?random=4" }}
          style={{ width: "100%", height: 120, borderRadius: 8 }}
        />
      </ImageListItem>
    </ImageList>
  ),
};

export const TimelineStory: StoryObj = {
  name: "Timeline",
  render: () => (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Text style={{ color: "#64748b" }}>09:00 AM</Text>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Text style={{ fontWeight: "600" }}>Check-in</Text>
          <Text style={{ color: "#64748b" }}>Arrival at the venue</Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Text style={{ color: "#64748b" }}>10:30 AM</Text>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Text style={{ fontWeight: "600" }}>Keynote Speech</Text>
          <Text style={{ color: "#64748b" }}>Main auditorium</Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Text style={{ color: "#64748b" }}>12:00 PM</Text>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="warning" />
        </TimelineSeparator>
        <TimelineContent>
          <Text style={{ fontWeight: "600" }}>Lunch Break</Text>
          <Text style={{ color: "#64748b" }}>Food court</Text>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
