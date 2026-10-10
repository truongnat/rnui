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
        title="Standard Variants"
        description="Clean default and destructive alert banners with solid surface and high contrast."
        bare
      >
        <Stack spacing="md">
          {/* Default */}
          <Alert variant="default">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can install components directly into your project using npx shadcn add.
            </AlertDescription>
          </Alert>

          {/* Destructive */}
          <Alert variant="destructive">
            <AlertTitle>Error: Session Expired</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again to verify your identity.
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
