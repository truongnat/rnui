import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";
import { ThemeProvider, List, ListItem, SectionHeader, Badge } from "@rnui/ui";
import { Mail, Star, Archive, Trash2 } from "lucide-react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <View style={{ flex: 1, paddingVertical: 12 }}>
      {children}
    </View>
  </ThemeProvider>
);

const meta = {
  title: "Components/List",
  component: List,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};

export default meta;

type Story = StoryObj<typeof List>;

const items = [
  { id: "1", title: "Inbox", subtitle: "3 new messages", icon: <Mail size={20} color="#666" />, badge: "3" },
  { id: "2", title: "Starred", subtitle: "Pinned items", icon: <Star size={20} color="#666" /> },
  { id: "3", title: "Archived", subtitle: "Last updated yesterday", icon: <Archive size={20} color="#666" /> },
];

export const Basic: Story = {
  render: () => (
    <View style={{ flex: 1 }}>
      <SectionHeader title="Folders" trailing={undefined} />
      <List
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <ListItem
            title={item.title}
            subtitle={item.subtitle}
            leading={item.icon}
            trailing={item.badge ? <Badge label={item.badge} variant="brand" /> : undefined}
            trailingActions={item.id === "1" ? [{ label: "Delete", color: "#ef4444", onPress: () => {} }] : []}
            onPress={() => {}}
            onLongPress={() => {}}
          />
        )}
        estimatedItemSize={64}
        emptyComponent={undefined}
      />
      <SectionHeader title="Actions" trailing={<Trash2 size={14} color="#666" />} />
      <List
        data={[{ id: "4", title: "Trash", subtitle: "12 items", icon: <Trash2 size={20} color="#666" /> }]}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <ListItem
            title={item.title}
            subtitle={item.subtitle}
            leading={item.icon}
            trailing={undefined}
            onPress={() => {}}
            onLongPress={() => {}}
          />
        )}
        estimatedItemSize={64}
        emptyComponent={undefined}
      />
    </View>
  ),
};
