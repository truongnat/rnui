import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AlertScreen() {
  const { toast } = useToast();

  return (
    <DemoPage
      title="Alert"
      description="Contextual feedback banners with solid surface backgrounds, status tints, and icons."
    >
      {/* 1. Status Variants */}
      <DemoSection
        title="Status Variants"
        description="Default, destructive, success, and warning alert styles."
        bare
      >
        <Stack spacing="md">
          {/* Default */}
          <Alert variant="default">
            <AlertTitle>System Notice</AlertTitle>
            <AlertDescription>
              A new software update is available for your device.
            </AlertDescription>
          </Alert>

          {/* Destructive */}
          <Alert variant="destructive">
            <AlertTitle>Payment Authorization Failed</AlertTitle>
            <AlertDescription>
              We were unable to charge your card on file. Please update your payment method to avoid suspension.
            </AlertDescription>
          </Alert>

          {/* Success */}
          <Alert variant="success">
            <AlertTitle>Order Placed Successfully</AlertTitle>
            <AlertDescription>
              Your order #8921 has been confirmed. A receipt has been sent to your email.
            </AlertDescription>
          </Alert>

          {/* Warning */}
          <Alert variant="warning">
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription>
              You have used 92% of your monthly storage quota. Consider upgrading your plan.
            </AlertDescription>
          </Alert>
        </Stack>
      </DemoSection>

      {/* 2. Alert with Action Button */}
      <DemoSection
        title="Alert with Interactive Action"
        description="Embed buttons for immediate recovery or dismiss actions."
        bare
      >
        <Card className="p-5 border-border">
          <Alert variant="default">
            <AlertTitle>File Deleted</AlertTitle>
            <AlertDescription>
              "project-roadmap-2026.pdf" was moved to the trash folder.
            </AlertDescription>
            <View className="mt-3 flex-row justify-end">
              <Button
                variant="outline"
                size="sm"
                onPress={() => toast.success('Action undone!')}
              >
                Undo Delete
              </Button>
            </View>
          </Alert>
        </Card>
      </DemoSection>

      {/* 3. Without Icons */}
      <DemoSection
        title="Minimal Text-only Alert"
        description="Clean notice banner without leading icon."
        bare
      >
        <Stack spacing="md">
          <Alert hideIcon variant="default">
            <AlertTitle>Maintenance Window</AlertTitle>
            <AlertDescription>
              Scheduled database maintenance tonight from 2:00 AM to 3:00 AM UTC.
            </AlertDescription>
          </Alert>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
