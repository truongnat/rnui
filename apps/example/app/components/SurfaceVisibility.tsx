import { useState } from 'react';
import { useToast, useTokens } from '@truongdq01/headless';
import {
  Alert,
  AlertTitle,
  Badge,
  Button,
  Card,
  Chip,
  Input,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

function NoShadowRow() {
  const t = useTokens();

  return (
    <Stack spacing="sm">
      <Card style={t.shadow.none} padding="sm">
        <Typography variant="body2">Card · shadow none</Typography>
      </Card>
      <Paper elevation="none" style={{ padding: t.spacing[3] }}>
        <Typography variant="body2">Paper · elevation none</Typography>
      </Paper>
      <Paper variant="flat" style={{ padding: t.spacing[3] }}>
        <Typography variant="body2">Paper · flat (sunken inset)</Typography>
      </Paper>
      <Stack direction="row" spacing="sm" wrap>
        <Badge label="Default" variant="default" />
        <Badge label="Success" variant="success" />
        <Chip label="Solid" variant="solid" />
        <Chip label="Outlined" variant="outlined" />
      </Stack>
      <Stack spacing="xs">
        <Alert severity="info">
          <AlertTitle>Standard info</AlertTitle>
          <Typography variant="body2">Visible without shadow.</Typography>
        </Alert>
        <Alert severity="warning" variant="outlined">
          <Typography variant="body2">Outlined warning on this surface.</Typography>
        </Alert>
        <Alert severity="error" variant="filled">
          <Typography variant="body2" color="inverse">
            Filled error — high contrast block.
          </Typography>
        </Alert>
      </Stack>
      <Input label="Email" placeholder="you@example.com" />
      <Stack direction="row" spacing="sm" wrap>
        <Button label="Outline" variant="outline" size="sm" />
        <Button label="Ghost" variant="ghost" size="sm" />
        <Button label="Disabled" variant="solid" size="sm" disabled />
      </Stack>
    </Stack>
  );
}

function OverlayTriggerSection() {
  const toast = useToast();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState<
    'default' | 'action'
  >('default');

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
        Toast and Snackbar render at the app root — use triggers below, then
        verify border, fill, and action contrast on the live overlay (not
        inline).
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
            label="Info"
            variant="outline"
            size="sm"
            onPress={() => toast.info('New version available.')}
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
      title="Surface visibility"
      description="QA matrix — components must read clearly without shadow, blur, or glass tricks."
    >
      <DemoSection
        title="No-shadow section"
        description="Real defaults with shadow/elevation stripped via props or style override."
      >
        <DemoSurfacePanel label="App background" surface="app">
          <NoShadowRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="On card surface"
        description="Neutral surfaces must not collapse into raised card backgrounds."
      >
        <DemoSurfacePanel label="Card surface" surface="card">
          <NoShadowRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection title="On white" bare>
        <DemoSurfacePanel label="White surface" surface="white">
          <NoShadowRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection title="On glass-like panel" bare>
        <DemoSurfacePanel label="Glass surface" surface="glass">
          <NoShadowRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="Dark panel"
        description="Full component stack on inverse background — toggle system dark mode for theme-aware tokens."
        bare
      >
        <DemoSurfacePanel label="Dark surface" surface="dark">
          <NoShadowRow />
        </DemoSurfacePanel>
      </DemoSection>

      <DemoSection
        title="Toast & Snackbar (overlay QA)"
        description="Triggers global overlays — verify on device: border, fill, action contrast, safe area."
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
            Overlays: Modal (basic, form, fullscreen), Dialog (confirmation,
            form), AlertDialog (destructive) — iOS + Android.
          </Typography>
          <Typography variant="body2" color="secondary">
            Toast/Snackbar: trigger all variants above; check light + dark mode.
          </Typography>
          <Typography variant="body2" color="secondary">
            Surfaces: this screen + Alert matrix + FormField grouped section.
          </Typography>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
