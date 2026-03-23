import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Drawer,
  Menu,
  MenuItem,
  Stepper,
  Step,
  Pagination,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumbs,
  Link,
  SpeedDial,
  SpeedDialAction,
  Icon,
  Button,
} from "@truongnat/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Navigation",
  component: View,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

export const AppBarStory: StoryObj = {
  name: "AppBar",
  render: () => (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">App Bar</Typography>
      </Toolbar>
    </AppBar>
  ),
};

export const TabsStory: StoryObj = {
  name: "Tabs",
  render: () => {
    const [tab, setTab] = useState(0);
    return (
      <Tabs value={tab} onChange={setTab}>
        <Tab value={0} label="Home" />
        <Tab value={1} label="Settings" />
      </Tabs>
    );
  },
};

export const DrawerStory: StoryObj = {
  name: "Drawer",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button label="Open Drawer" onPress={() => setOpen(true)} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Open drawer" accessibilityHint="" />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Text style={{ padding: 16 }}>Drawer content</Text>
        </Drawer>
      </View>
    );
  },
};

export const MenuStory: StoryObj = {
  name: "Menu",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button label="Open Menu" onPress={() => setOpen(true)} onLongPress={() => { }} leadingIcon={undefined} trailingIcon={undefined} accessibilityLabel="Open menu" accessibilityHint="" />
        <Menu open={open} onClose={() => setOpen(false)}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </View>
    );
  },
};

export const StepperStory: StoryObj = {
  name: "Stepper",
  render: () => (
    <Stepper activeStep={1}>
      {/* @ts-ignore */}
      <Step index={0} label="Account" />
      {/* @ts-ignore */}
      <Step index={1} label="Billing" />
      {/* @ts-ignore */}
      <Step index={2} label="Review" />
    </Stepper>
  ),
};

export const PaginationStory: StoryObj = {
  name: "Pagination",
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination count={10} page={page} onChange={setPage} />;
  },
};

export const BottomNavigationStory: StoryObj = {
  name: "BottomNavigation",
  render: () => (
    <BottomNavigation defaultValue="home" showLabels>
      <BottomNavigationAction value="home" label="Home" />
      <BottomNavigationAction value="profile" label="Profile" />
    </BottomNavigation>
  ),
};

export const BreadcrumbsStory: StoryObj = {
  name: "Breadcrumbs",
  render: () => (
    <Breadcrumbs>
      <Link href="https://example.com">Home</Link>
      <Link href="https://example.com">Library</Link>
      <Typography>Data</Typography>
    </Breadcrumbs>
  ),
};

export const SpeedDialStory: StoryObj = {
  name: "SpeedDial",
  render: () => (
    <SpeedDial ariaLabel="Actions" icon={<Icon>+</Icon>}>
      <SpeedDialAction tooltipTitle="Share" icon={<Icon>share</Icon>} />
      <SpeedDialAction tooltipTitle="Save" icon={<Icon>save</Icon>} />
    </SpeedDial>
  ),
};
