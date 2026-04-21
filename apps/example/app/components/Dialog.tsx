import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function DialogScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);

  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Dialog"
      description="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple steps."
    >
      <DemoSection title="Basic Examples">
        <Typography variant="body2" gutterBottom>
            Simple dialogs provide information and a single dismissal action.
        </Typography>
        <Button 
          label="Open Basic Dialog" 
          onPress={() => setBasicOpen(true)} 
        />
        
        <Dialog
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Update Available"
        >
          <Typography variant="body1" color="secondary">
            A new version of the application is ready to install. This update includes performance improvements and bug fixes.
          </Typography>
          <Button 
            label="Understand" 
            style={{ marginTop: 24 }} 
            onPress={() => setBasicOpen(false)} 
            fullWidth
          />
        </Dialog>
      </DemoSection>

      <DemoSection title="With Actions">
        <Typography variant="body2" gutterBottom>
            The actions prop allows you to provide a consistent set of buttons at the base of the dialog.
        </Typography>
        <Button 
          label="Open Action Dialog" 
          variant="outline"
          onPress={() => setActionOpen(true)} 
        />
        
        <Dialog
          open={actionOpen}
          onClose={() => setActionOpen(false)}
          title="Notification Settings"
          actions={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button 
                label="Cancel" 
                variant="ghost" 
                onPress={() => setActionOpen(false)} 
              />
              <Button 
                label="Save" 
                onPress={() => setActionOpen(false)} 
              />
            </View>
          }
        >
          <Typography variant="body1" color="secondary">
            Configure how you would like to receive messages from our platform.
          </Typography>
        </Dialog>
      </DemoSection>

      <DemoSection title="Long Content">
        <Typography variant="body2" gutterBottom>
          Dialogs handle long content gracefully with internal scrolling.
        </Typography>
        <Button 
          label="Open Terms Dialog" 
          variant="ghost" 
          onPress={() => setScrollOpen(true)} 
        />
        
        <Dialog
          open={scrollOpen}
          onClose={() => setScrollOpen(false)}
          title="Terms of Service"
        >
          <View style={{ gap: tokens.spacing[4] }}>
            <Typography variant="h4">1. Introduction</Typography>
            <Typography variant="body2" color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography variant="h4">2. Usage Rules</Typography>
            <Typography variant="body2" color="secondary">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="h4">3. Terminations</Typography>
            <Typography variant="body2" color="secondary">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Typography>
            <Typography variant="h4">4. Limitations</Typography>
            <Typography variant="body2" color="secondary">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Button label="I Agree" style={{ marginTop: 12 }} onPress={() => setScrollOpen(false)} />
          </View>
        </Dialog>
      </DemoSection>
    </DemoPage>
  );
}

