import { useTokens } from '@truongdq01/headless';
import { Alert, AlertTitle, Button, Stack, Typography } from '@truongdq01/ui';
import { Info } from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

function AlertSeverityRow() {
  return (
    <Stack spacing="sm">
      <Alert severity="info">
        <AlertTitle>Delivery update</AlertTitle>
        <Typography variant="body2">
          Package out for delivery today before 6 PM.
        </Typography>
      </Alert>
      <Alert severity="success">
        <AlertTitle>Payment received</AlertTitle>
        <Typography variant="body2">
          Order #4821 confirmed — receipt sent by email.
        </Typography>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Card expiring soon</AlertTitle>
        <Typography variant="body2">
          Visa ending in 4242 expires in 12 days.
        </Typography>
      </Alert>
      <Alert severity="error">
        <AlertTitle>Charge failed</AlertTitle>
        <Typography variant="body2">
          Could not process renewal — update payment method.
        </Typography>
      </Alert>
    </Stack>
  );
}

export default function AlertScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Alert"
      description="Contextual feedback for user actions — info, success, warning, and error."
    >
      <DemoSection
        title="Surface visibility"
        description="Standard alerts on common backgrounds — readable without shadow."
      >
        <Stack spacing="md">
          <DemoSurfacePanel label="App background" surface="app">
            <AlertSeverityRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="White surface" surface="white">
            <AlertSeverityRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Card surface" surface="card">
            <AlertSeverityRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Glass surface" surface="glass">
            <AlertSeverityRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Dark surface" surface="dark">
            <AlertSeverityRow />
          </DemoSurfacePanel>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Order & account status"
        description="Severity colors apply to title and body automatically."
      >
        <Stack spacing="md">
          <Alert severity="success" onClose={() => {}}>
            <AlertTitle>Payment received</AlertTitle>
            <Typography variant="body2">
              Order #4821 is confirmed. You will get a receipt by email.
            </Typography>
          </Alert>

          <Alert severity="warning">
            <AlertTitle>Card expiring soon</AlertTitle>
            <Typography variant="body2">
              Your Visa ending in 4242 expires in 12 days. Update billing to avoid interruption.
            </Typography>
          </Alert>

          <Alert severity="error">
            <AlertTitle>Could not charge subscription</AlertTitle>
            <Typography variant="body2">
              We could not process your renewal. Check your payment method and try again.
            </Typography>
          </Alert>

          <Alert severity="info">
            <AlertTitle>Delivery update</AlertTitle>
            <Typography variant="body2">
              Your package is out for delivery and should arrive today before 6 PM.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Filled"
        description="Rich background colors for high visibility."
      >
        <Stack spacing="md">
          <Alert severity="error" variant="filled">
            <Typography variant="body2" color="inverse">
              Critical error that needs immediate attention.
            </Typography>
          </Alert>

          <Alert severity="success" variant="filled">
            <Typography variant="body2" color="inverse">
              Everything is working as expected.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Outlined"
        description="Secondary feedback and embedded layouts."
      >
        <Stack spacing="md">
          <Alert severity="info" variant="outlined">
            <Typography variant="body2">
              Outlined variant for secondary feedback.
            </Typography>
          </Alert>

          <Alert severity="warning" variant="outlined">
            <Typography variant="body2">
              Verify security in your account settings.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection title="Customizations" description="Actions and custom icons.">
        <Stack spacing="md">
          <Alert
            severity="info"
            action={
              <Button
                label="UNDO"
                variant="ghost"
                size="sm"
                onPress={() => {}}
              />
            }
          >
            <Typography variant="body2">
              The item has been deleted from your library.
            </Typography>
          </Alert>

          <Alert
            severity="info"
            icon={<Info color={t.color.info.icon} size={20} />}
          >
            <Typography variant="body2">
              Custom Lucide info icon.
            </Typography>
          </Alert>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
