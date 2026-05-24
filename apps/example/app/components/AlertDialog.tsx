import { AlertDialog, Button, Stack } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AlertDialogScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const handleClose = () => {
    setBasicOpen(false);
    setDestructiveOpen(false);
    setLongOpen(false);
    setCustomOpen(false);
  };

  return (
    <DemoPage
      title="AlertDialog"
      description="Modal dialog for urgent information or required actions."
    >
      <DemoSection title="Standard" description="Simple confirmation with OK and Cancel.">
        <Button
          label="Show Standard Alert"
          variant="outline"
          onPress={() => setBasicOpen(true)}
        />

        <AlertDialog
          open={basicOpen}
          title="Confirm Action"
          description="Are you sure you want to proceed with this task?"
          confirmText="OK"
          cancelText="Cancel"
          onConfirm={handleClose}
          onCancel={handleClose}
        />
      </DemoSection>

      <DemoSection title="Destructive" description="Highlight irreversible actions.">
        <Button
          label="Show Destructive Alert"
          variant="destructive"
          onPress={() => setDestructiveOpen(true)}
        />

        <AlertDialog
          open={destructiveOpen}
          title="Delete Item?"
          description="This will permanently delete this item. This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          destructive
          onConfirm={handleClose}
          onCancel={handleClose}
        />
      </DemoSection>

      <DemoSection title="Advanced" description="Custom button labels and variants.">
        <Stack spacing="md">
          <Button
            label="Long Action Labels"
            variant="outline"
            onPress={() => setLongOpen(true)}
          />
          <Button
            label="Custom Button Styling"
            variant="solid"
            onPress={() => setCustomOpen(true)}
          />
        </Stack>

        <AlertDialog
          open={longOpen}
          title="Subscription Upgrade"
          description="Upgrade your plan to get unlimited projects and priority support."
          confirmText="Yes, Upgrade My Plan Now"
          cancelText="I'll Keep My Current Plan"
          onConfirm={handleClose}
          onCancel={handleClose}
        />

        <AlertDialog
          open={customOpen}
          title="Update Available"
          description="A new version with critical security updates is available."
          confirmText="Update Now"
          cancelText="Later"
          confirmVariant="solid"
          cancelVariant="ghost"
          onConfirm={handleClose}
          onCancel={handleClose}
        />
      </DemoSection>
    </DemoPage>
  );
}
