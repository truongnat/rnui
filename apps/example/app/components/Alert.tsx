import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

function AlertSeverityRow() {
  return (
    <Stack spacing="sm">
      <Alert>
        <AlertTitle>Delivery update</AlertTitle>
        <AlertDescription>
          Package out for delivery today before 6 PM.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle className="text-destructive">Charge failed</AlertTitle>
        <AlertDescription>
          Could not process renewal — update payment method.
        </AlertDescription>
      </Alert>
    </Stack>
  );
}

export default function AlertScreen() {
  return (
    <DemoPage
      title="Alert"
      description="Contextual feedback for user actions — default and destructive."
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
        description="Default and destructive variants for feedback."
      >
        <Stack spacing="md">
          <Alert>
            <AlertTitle>Payment received</AlertTitle>
            <AlertDescription>
              Order #4821 is confirmed. You will get a receipt by email.
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTitle>Card expiring soon</AlertTitle>
            <AlertDescription>
              Your Visa ending in 4242 expires in 12 days. Update billing to
              avoid interruption.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertTitle className="text-destructive">
              Could not charge subscription
            </AlertTitle>
            <AlertDescription>
              We could not process your renewal. Check your payment method and
              try again.
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTitle>Delivery update</AlertTitle>
            <AlertDescription>
              Your package is out for delivery and should arrive today before 6
              PM.
            </AlertDescription>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Customizations"
        description="Compose actions as children inside the alert."
      >
        <Stack spacing="md">
          <Alert>
            <AlertDescription>
              The item has been deleted from your library.
            </AlertDescription>
            <View className="mt-2 flex-row justify-end">
              <Button variant="ghost" size="sm" onPress={() => {}}>
                UNDO
              </Button>
            </View>
          </Alert>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
