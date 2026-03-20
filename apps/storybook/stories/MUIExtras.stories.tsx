import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Box,
  Stack,
  Grid,
  Typography,
  Link,
  Paper,
  Button,
  ButtonGroup,
  Fab,
  TextField,
  Autocomplete,
  Rating,
  ToggleButtonGroup,
  ToggleButton,
  AppBar,
  Toolbar,
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
  SpeedDial,
  SpeedDialAction,
  Chip,
  Tooltip,
  Icon,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ImageList,
  ImageListItem,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Modal,
  Popover,
  Popper,
} from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/MUIExtras",
  component: View,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};

export default meta;

type Story = StoryObj<typeof View>;

export const Layout: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Typography variant="h5">Box, Stack, Grid</Typography>
      <Box style={{ padding: 16, borderWidth: 1 }}>
        <Text>Box content</Text>
      </Box>
      <Stack spacing={4}>
        <Box style={{ height: 32, backgroundColor: "#e2e8f0" }} />
        <Box style={{ height: 32, backgroundColor: "#cbd5f5" }} />
      </Stack>
      <Grid container spacing={2}>
        <Grid size={6}><Box style={{ height: 40, backgroundColor: "#e2e8f0" }} /></Grid>
        <Grid size={6}><Box style={{ height: 40, backgroundColor: "#cbd5f5" }} /></Grid>
      </Grid>
      <Paper elevation={2} style={{ padding: 16 }}>
        <Typography>Paper surface</Typography>
      </Paper>
      <Link href="https://example.com">Example link</Link>
    </View>
  ),
};

export const Inputs: Story = {
  render: () => {
    const [rating, setRating] = useState(3);
    const [toggle, setToggle] = useState("left");

    return (
      <View style={{ gap: 20 }}>
        <Typography variant="h5">Inputs</Typography>
        <TextField label="Email" placeholder="name@example.com" />
        <Autocomplete options={["React", "Vue", "Svelte"]} />
        <Rating value={rating} onChange={setRating} />
        <ToggleButtonGroup value={toggle} exclusive onChange={(val: any) => setToggle(val as string)}>
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
        <ButtonGroup variant="outlined">
          <Button label="Left" />
          <Button label="Center" />
          <Button label="Right" />
        </ButtonGroup>
        <Fab label="Create" onPress={() => { }} />
      </View>
    );
  },
};

export const Navigation: Story = {
  render: () => {
    const [tab, setTab] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [page, setPage] = useState(1);

    return (
      <View style={{ gap: 20 }}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">App Bar</Typography>
          </Toolbar>
        </AppBar>
        <Tabs value={tab} onChange={setTab}>
          <Tab value={0} label="Home" />
          <Tab value={1} label="Settings" />
        </Tabs>
        <Button label="Open Drawer" onPress={() => setDrawerOpen(true)} />
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Text style={{ padding: 16 }}>Drawer content</Text>
        </Drawer>
        <Button label="Open Menu" onPress={() => setMenuOpen(true)} />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
        <Stepper activeStep={1}>
          <Step index={0} label="Account" />
          <Step index={1} label="Billing" />
          <Step index={2} label="Review" />
        </Stepper>
        <Pagination count={10} page={page} onChange={setPage} />
        <BottomNavigation defaultValue="home" showLabels>
          <BottomNavigationAction value="home" label="Home" />
          <BottomNavigationAction value="profile" label="Profile" />
        </BottomNavigation>
        <Breadcrumbs>
          <Link href="https://example.com">Home</Link>
          <Link href="https://example.com">Library</Link>
          <Typography>Data</Typography>
        </Breadcrumbs>
        <SpeedDial ariaLabel="Actions" icon={<Icon>+</Icon>}>
          <SpeedDialAction tooltipTitle="Share" icon={<Icon>share</Icon>} />
          <SpeedDialAction tooltipTitle="Save" icon={<Icon>save</Icon>} />
        </SpeedDial>
      </View>
    );
  },
};

export const DataDisplay: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <Typography variant="h5">Data display</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip label="Design" />
        <Chip label="Dev" variant="outlined" />
      </View>
      <Tooltip title="Helpful info">
        <Button>Hover</Button>
      </Tooltip>
      <Icon>star</Icon>
      <ImageList cols={2}>
        <ImageListItem><Box style={{ height: 120, backgroundColor: "#e2e8f0" }} /></ImageListItem>
        <ImageListItem><Box style={{ height: 120, backgroundColor: "#cbd5f5" }} /></ImageListItem>
      </ImageList>
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
    </View>
  ),
};

export const Feedback: Story = {
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(true);

    return (
      <View style={{ gap: 20 }}>
        <Alert severity="success">Saved successfully</Alert>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <CircularProgress />
          <LinearProgress value={40} variant="determinate" style={{ flex: 1 }} />
        </View>
        <Button onPress={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>Are you sure?</DialogContent>
          <DialogActions>
            <Button onPress={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained">OK</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackOpen} message="Saved" onClose={() => setSnackOpen(false)} />
      </View>
    );
  },
};

export const Overlays: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(true);
    const [popperOpen, setPopperOpen] = useState(true);

    return (
      <View style={{ gap: 16 }}>
        <Button onPress={() => setModalOpen(true)}>Open Modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Text>Modal content</Text>
        </Modal>
        <Popover
          open={popoverOpen}
          anchorPosition={{ top: 180, left: 120 }}
          onClose={() => setPopoverOpen(false)}
        >
          <Text>Popover content</Text>
        </Popover>
        <Popper
          open={popperOpen}
          anchorEl={{ x: 140, y: 260, width: 40, height: 20 }}
          onClose={() => setPopperOpen(false)}
        >
          <Text>Popper content</Text>
        </Popper>
      </View>
    );
  },
};
