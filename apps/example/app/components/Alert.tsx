import { useState } from 'react';
import { View } from 'react-native';
import { CircleCheck } from 'lucide-react-native';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function AlertScreen() {
  const { toast } = useToast();
  const successColor = useIconColor('success');
  const [visible, setVisible] = useState(true);
  const [deleted, setDeleted] = useState(true);

  return (
    <DemoPage
      title="Alert"
      description="Contextual feedback banners with solid surface backgrounds, status tints, and icons."
    >
      <DemoSection
        title="Standard Variants"
        description="A clear title, readable detail, and a status icon. Color reinforces the message without carrying it alone."
        bare
      >
        <Stack spacing="md">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can install components directly into your project using npx
              shadcn add.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error: Session Expired</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again to verify your
              identity.
            </AlertDescription>
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Alert with Interactive Action"
        description="Undo updates the banner in place. Dismiss and show it again to see the entrance and exit."
        bare
      >
        <View collapsable={false} className="gap-4">
          {visible ? (
            <Alert
              key={deleted ? 'deleted' : 'restored'}
              icon={
                deleted ? undefined : (
                  <CircleCheck size={20} color={successColor} />
                )
              }
            >
              <AlertTitle>
                {deleted ? 'File Deleted' : 'Action undone!'}
              </AlertTitle>
              <AlertDescription>
                {deleted
                  ? '"project-roadmap-2026.pdf" was moved to the trash folder.'
                  : '"project-roadmap-2026.pdf" was restored from the trash folder.'}
              </AlertDescription>
              <View className="mt-3 flex-row flex-wrap gap-2">
                {deleted ? (
                  <Button
                    variant="outline"
                    onPress={() => {
                      setDeleted(false);
                      toast.success('Action undone!');
                    }}
                  >
                    Undo Delete
                  </Button>
                ) : null}
                <Button variant="ghost" onPress={() => setVisible(false)}>
                  Dismiss notice
                </Button>
              </View>
            </Alert>
          ) : (
            <Text variant="muted">Notice dismissed.</Text>
          )}
          <Button
            variant="outline"
            onPress={() => {
              setDeleted(true);
              setVisible(true);
            }}
          >
            Show file notice again
          </Button>
        </View>
      </DemoSection>

      <DemoSection
        title="Minimal Text-only Alert"
        description="A quiet notice when no immediate action is needed."
        bare
      >
        <Alert hideIcon>
          <AlertTitle>Maintenance Window</AlertTitle>
          <AlertDescription>
            Scheduled database maintenance tonight from 2:00 AM to 3:00 AM UTC.
          </AlertDescription>
        </Alert>
      </DemoSection>
    </DemoPage>
  );
}
