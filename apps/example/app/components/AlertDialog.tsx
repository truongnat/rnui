import { useTokens } from '@truongdq01/headless';
import { AlertDialog, Button, Stack, Typography } from '@truongdq01/ui';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function AlertDialogScreen() {
  const t = useTokens();
  
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
      description="A modal dialog that interrupts the user with urgent information, details, or required actions."
    >
      <DemoSection title="Standard Actions">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Standard modal for simple confirmations.
        </Typography>
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

      <DemoSection title="Destructive Variant">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Highlight irreversible or dangerous actions with the destructive variant.
        </Typography>
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

      <DemoSection title="Advanced Configuration">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Customize button labels and variants for more specific outcomes.
        </Typography>
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
          description="A new version of the app is available with critical security updates."
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
