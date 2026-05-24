import {
  Alert,
  Badge,
  Button,
  Card,
  Chip,
  Input,
  Paper,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { useTokens } from '@truongdq01/headless';
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
      <Stack direction="row" spacing="sm" wrap>
        <Badge label="Default" variant="default" />
        <Badge label="Success" variant="success" />
        <Chip label="Solid" variant="solid" />
        <Chip label="Outlined" variant="outlined" />
      </Stack>
      <Alert severity="info">Visible without shadow.</Alert>
      <Input label="Email" placeholder="you@example.com" />
      <Stack direction="row" spacing="sm" wrap>
        <Button label="Outline" variant="outline" size="sm" />
        <Button label="Ghost" variant="ghost" size="sm" />
        <Button label="Disabled" variant="solid" size="sm" disabled />
      </Stack>
    </Stack>
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

      <DemoSection title="Dark panel" bare>
        <DemoSurfacePanel label="Dark surface" surface="dark">
          <Stack spacing="sm">
            <Badge label="Default" variant="default" />
            <Badge label="Error" variant="error" />
            <Chip label="Outlined" variant="outlined" color="default" />
          </Stack>
        </DemoSurfacePanel>
      </DemoSection>
    </DemoPage>
  );
}
