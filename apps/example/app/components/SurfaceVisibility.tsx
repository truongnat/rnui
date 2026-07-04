import { useState } from 'react';
import { useToast, useTokens } from '@truongdq01/headless';
import {
  Alert,
  AlertTitle,
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  EmptyState,
  FormField,
  FormGroup,
  Input,
  List,
  ListItem,
  ListItemContent,
  ListItemLeading,
  Pagination,
  Paper,
  SegmentedControl,
  Skeleton,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Toolbar,
} from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography variant="caption" color="tertiary">
      {children}
    </Typography>
  );
}

function NeutralSurfacesSection() {
  const t = useTokens();

  return (
    <Stack spacing="sm">
      <SectionLabel>1 · Neutral surfaces (no shadow)</SectionLabel>
      <Card style={t.shadow.none} padding="sm">
        <Typography variant="body2">Card · shadow none</Typography>
      </Card>
      <Card style={t.shadow.none} padding="sm">
        <Typography variant="body2" style={{ marginBottom: t.spacing[2] }}>
          Outer card · nested inner
        </Typography>
        <Card
          style={[
            t.shadow.none,
            {
              backgroundColor: t.color.surface.raised,
              padding: t.spacing[3],
            },
          ]}
        >
          <Typography variant="body2">Nested card · surface.raised</Typography>
        </Card>
      </Card>
      <Paper elevation="none" style={{ padding: t.spacing[3] }}>
        <Typography variant="body2">Paper · elevation none</Typography>
      </Paper>
      <Paper style={{ padding: t.spacing[3] }}>
        <Typography variant="body2">Paper · default (raised)</Typography>
      </Paper>
      <Paper variant="flat" style={{ padding: t.spacing[3] }}>
        <Typography variant="body2">Paper · flat (sunken inset)</Typography>
      </Paper>
      <Divider spacing="sm" />
      <Typography variant="caption" color="tertiary">
        Divider above — subtle border token
      </Typography>
    </Stack>
  );
}

function FormSurfacesSection() {
  const [checked, setChecked] = useState(false);
  const [on, setOn] = useState(true);

  return (
    <Stack spacing="sm">
      <SectionLabel>2 · Forms</SectionLabel>
      <Input label="On parent bg" placeholder="you@example.com" />
      <Input label="Disabled" placeholder="Disabled field" disabled />
      <Input label="Error state" placeholder="Invalid" error="Required field" />
      <FormField label="TextField">
        <TextField placeholder="Inside card context" />
      </FormField>
      <FormGroup variant="grouped" footer="Grouped container border must read on card.">
        <FormField label="Phone">
          <Input placeholder="+1 (555) 000-0000" />
        </FormField>
        <FormField label="Email">
          <Input placeholder="user@example.com" />
        </FormField>
      </FormGroup>
      <Checkbox
        label="Checkbox on surface"
        checked={checked}
        onChange={setChecked}
      />
      <Switch label="Switch on surface" on={on} onChange={setOn} />
    </Stack>
  );
}

function StatusSurfacesSection() {
  return (
    <Stack spacing="sm">
      <SectionLabel>4 · Status & feedback</SectionLabel>
      <Stack direction="row" spacing="sm" wrap>
        <Badge label="Default" variant="default" />
        <Badge label="Brand" variant="brand" />
        <Badge label="Success" variant="success" />
        <Badge label="Warning" variant="warning" />
        <Badge label="Error" variant="error" />
        <Badge label="Info" variant="info" />
      </Stack>
      <Stack direction="row" spacing="sm" wrap>
        <Chip label="Solid" variant="solid" />
        <Chip label="Outlined" variant="outlined" />
        <Chip label="Subtle" variant="subtle" />
      </Stack>
      <Alert severity="info">
        <AlertTitle>Standard info</AlertTitle>
        <Typography variant="body2">Fill + border — no shadow required.</Typography>
      </Alert>
      <Alert severity="success" variant="outlined">
        <Typography variant="body2">Outlined success on this surface.</Typography>
      </Alert>
      <Alert severity="error" variant="filled">
        <Typography variant="body2" color="inverse">
          Filled error — high contrast block.
        </Typography>
      </Alert>
      <Stack spacing="xs">
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
        <Skeleton width="60%" height={12} />
      </Stack>
      <EmptyState
        variant="empty"
        title="Empty state"
        description="Icon wrap uses sunken fill + border."
        size="sm"
      />
    </Stack>
  );
}

function ActionSurfacesSection() {
  return (
    <Stack spacing="sm">
      <SectionLabel>3 · Actions</SectionLabel>
      <Stack direction="row" spacing="sm" wrap>
        <Button label="Solid" variant="solid" size="sm" />
        <Button label="Outline" variant="outline" size="sm" />
        <Button label="Ghost" variant="ghost" size="sm" />
        <Button label="Destructive" variant="destructive" size="sm" />
        <Button label="Disabled" variant="solid" size="sm" disabled />
        <Button label="Loading" variant="solid" size="sm" loading />
      </Stack>
      <ToggleButtonGroup value="left" exclusive>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
      <SegmentedControl
        options={['Day', 'Week', 'Month']}
        selectedIndex={0}
        onChange={() => {}}
      />
    </Stack>
  );
}

function DataSurfacesSection() {
  const [tab, setTab] = useState('one');
  const [page, setPage] = useState(0);

  return (
    <Stack spacing="sm">
      <SectionLabel>6 · Data display</SectionLabel>
      <List variant="inset">
        <ListItem divider>
          <ListItemLeading>
            <Avatar initials="JD" size="sm" />
          </ListItemLeading>
          <ListItemContent primary="List row" secondary="Inset + avatar" />
        </ListItem>
        <ListItem>
          <ListItemContent primary="Second row" secondary="Border-separated rows" />
        </ListItem>
      </List>
      <Pagination count={5} page={page} onChange={setPage} variant="outlined" />
      <Tabs value={tab} onChange={(v) => setTab(v as string)}>
        <Tab value="one" label="Active" />
        <Tab value="two" label="Tab two" />
      </Tabs>
    </Stack>
  );
}

function NavigationSurfacesSection() {
  return (
    <Stack spacing="sm">
      <SectionLabel>5 · Navigation</SectionLabel>
      <AppBar color="default" variant="outlined" elevation={0}>
        <Toolbar>
          <AppBarTitle>AppBar · outlined</AppBarTitle>
        </Toolbar>
      </AppBar>
      <Typography variant="body2" color="secondary">
        Menu, Select, Popover — verify on Modal, Dialog, Select, Menu example
        screens (overlay fill + border on device).
      </Typography>
    </Stack>
  );
}

function DarkPanelSection() {
  const t = useTokens();

  return (
    <Stack spacing="sm">
      <SectionLabel>7 · Dark panel</SectionLabel>
      <Card style={t.shadow.none} padding="sm">
        <Typography variant="body2" color="inverse">
          Card on dark
        </Typography>
      </Card>
      <Stack direction="row" spacing="sm" wrap>
        <Badge label="Default" variant="default" />
        <Badge label="Success" variant="success" />
        <Chip label="Solid" variant="solid" />
      </Stack>
      <Input label="Email" placeholder="you@example.com" />
      <Stack direction="row" spacing="sm" wrap>
        <Button label="Outline" variant="outline" size="sm" />
        <Button label="Ghost" variant="ghost" size="sm" />
      </Stack>
      <Alert severity="warning">
        <Typography variant="body2">Alert on dark panel</Typography>
      </Alert>
    </Stack>
  );
}

function FullMatrixRow() {
  return (
    <Stack spacing="md">
      <NeutralSurfacesSection />
      <FormSurfacesSection />
      <ActionSurfacesSection />
      <StatusSurfacesSection />
      <NavigationSurfacesSection />
      <DataSurfacesSection />
    </Stack>
  );
}

function OverlayTriggerSection() {
  const toast = useToast();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState<'default' | 'action'>(
    'default'
  );

  const showActionSnackbar = () => {
    setSnackbarVariant('action');
    setSnackbarOpen(true);
  };

  const showDefaultSnackbar = () => {
    setSnackbarVariant('default');
    setSnackbarOpen(true);
  };

  return (
    <>
      <Typography variant="body2" color="secondary">
        Toast and Snackbar render at the app root — trigger below, then verify
        border, fill, and action contrast on the live overlay.
      </Typography>
      <Stack spacing="xs">
        <Typography variant="caption" color="tertiary">
          Toast variants
        </Typography>
        <Stack direction="row" spacing="sm" wrap>
          <Button
            label="Default"
            variant="outline"
            size="sm"
            onPress={() => toast.show({ message: 'Sync complete.' })}
          />
          <Button
            label="Success"
            variant="outline"
            size="sm"
            onPress={() => toast.success('Payment saved.')}
          />
          <Button
            label="Warning"
            variant="outline"
            size="sm"
            onPress={() => toast.warning('Trial ends in 2 days.')}
          />
          <Button
            label="Error"
            variant="outline"
            size="sm"
            onPress={() => toast.error('Could not reach server.')}
          />
          <Button
            label="Undo action"
            variant="outline"
            size="sm"
            onPress={() =>
              toast.show({
                message: 'Item archived.',
                action: {
                  label: 'Undo',
                  onPress: () => toast.info('Restored.'),
                },
              })
            }
          />
        </Stack>
      </Stack>
      <Stack spacing="xs">
        <Typography variant="caption" color="tertiary">
          Snackbar
        </Typography>
        <Stack direction="row" spacing="sm" wrap>
          <Button
            label="Simple"
            variant="outline"
            size="sm"
            onPress={showDefaultSnackbar}
          />
          <Button
            label="With Undo"
            variant="outline"
            size="sm"
            onPress={showActionSnackbar}
          />
        </Stack>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        message={
          snackbarVariant === 'action'
            ? '1 item removed from your list'
            : 'Message archived'
        }
        action={
          snackbarVariant === 'action' ? (
            <Button
              label="UNDO"
              variant="ghost"
              size="sm"
              onPress={() => setSnackbarOpen(false)}
              color="primary"
            />
          ) : undefined
        }
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}

export default function SurfaceVisibilityScreen() {
  return (
    <DemoPage
      title="Surface visibility QA"
      description="Design foundation lab — every component must read without shadow, blur, or wrapper tricks."
    >
      <DemoSection
        title="App background"
        description="Full matrix on color.bg.default — primary regression surface."
      >
        <DemoSurfacePanel label="App background" surface="app">
          <FullMatrixRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="Card surface"
        description="Nested inputs, badges, and grouped forms must not collapse into card fill."
      >
        <DemoSurfacePanel label="Card surface" surface="card">
          <FullMatrixRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection title="White surface" bare>
        <DemoSurfacePanel label="White surface" surface="white">
          <FullMatrixRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection title="Glass-like panel" bare>
        <DemoSurfacePanel label="Glass surface" surface="glass">
          <FullMatrixRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="Dark panel"
        description="Critical stack on inverse background — also toggle system dark mode."
        bare
      >
        <DemoSurfacePanel label="Dark surface" surface="dark">
          <DarkPanelSection />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="Toast & Snackbar overlays"
        description="Global overlays — verify on device: border, fill, action contrast."
      >
        <OverlayTriggerSection />
      </DemoSection>

      <DemoSection
        title="Manual device checklist"
        description="Mark pass/fail in .planning/device-qa-results.md after simulator run."
        bare
      >
        <Stack spacing="xs">
          <Typography variant="body2" color="secondary">
            Light + dark: this screen, Card-in-Card, Badge/Chip on Card, Input in
            Card, FormGroup grouped, Toast/Snackbar triggers.
          </Typography>
          <Typography variant="body2" color="secondary">
            Overlays: Modal, Dialog, AlertDialog, Menu, Select — iOS + Android.
          </Typography>
          <Typography variant="body2" color="secondary">
            Brand themes: neutral, stone, butter, chocolate, matcha, gothic,
            y2k.
          </Typography>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
