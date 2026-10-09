import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AlertDialogScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <DemoPage
      title="AlertDialog"
      description="Modal dialog for urgent information or required actions."
    >
      <DemoSection
        title="Standard"
        description="Simple confirmation with OK and Cancel."
      >
        <Button variant="outline" onPress={() => setBasicOpen(true)}>
          Show Standard Alert
        </Button>

        <AlertDialog open={basicOpen} onOpenChange={setBasicOpen}>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed with this task?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </DemoSection>

      <DemoSection
        title="Destructive"
        description="Highlight irreversible actions."
      >
        <Button variant="destructive" onPress={() => setDestructiveOpen(true)}>
          Show Destructive Alert
        </Button>

        <AlertDialog open={destructiveOpen} onOpenChange={setDestructiveOpen}>
          <AlertDialogTitle>Delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this item. This action cannot be
            undone.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive">
              <Text className="text-sm font-medium text-destructive-foreground">
                Delete
              </Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </DemoSection>

      <DemoSection
        title="Advanced"
        description="Custom button labels and variants."
      >
        <Stack spacing="md">
          <Button variant="outline" onPress={() => setLongOpen(true)}>
            Long Action Labels
          </Button>
          <Button onPress={() => setCustomOpen(true)}>
            Custom Button Styling
          </Button>
        </Stack>

        <AlertDialog open={longOpen} onOpenChange={setLongOpen}>
          <AlertDialogTitle>Subscription Upgrade</AlertDialogTitle>
          <AlertDialogDescription>
            Upgrade your plan to get unlimited projects and priority support.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>
              I&apos;ll Keep My Current Plan
            </AlertDialogCancel>
            <AlertDialogAction>Yes, Upgrade My Plan Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>

        <AlertDialog open={customOpen} onOpenChange={setCustomOpen}>
          <AlertDialogTitle>Update Available</AlertDialogTitle>
          <AlertDialogDescription>
            A new version with critical security updates is available.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-transparent">
              Later
            </AlertDialogCancel>
            <AlertDialogAction>Update Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </DemoSection>
    </DemoPage>
  );
}
