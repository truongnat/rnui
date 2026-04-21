import React, { useState } from 'react';
import { View } from 'react-native';
import { Drawer, Button, Typography, List, Divider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function DrawerScreen() {
  const [open, setOpen] = useState(false);
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Drawer" 
      description="Side-scrolling navigation patterns or content containers that provide quick access to secondary information."
    >
      <DemoSection title="Side Drawer">
        <Typography variant="body2" gutterBottom>
            Drawers can slide in from any direction (default is left on mobile) to provide navigation or focused tasks.
        </Typography>
        <Button 
          label="Open Navigation Drawer" 
          onPress={() => setOpen(true)} 
        />
        
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="RNUI Settings"
        >
          <View style={{ flex: 1, paddingVertical: tokens.spacing[2] }}>
            <List.Item title="Profile" icon="person-outline" />
            <List.Item title="Account Security" icon="lock-closed-outline" />
            <List.Item title="Privacy & Data" icon="eye-outline" />
            <Divider spacing="md" />
            <List.Item title="App Appearance" icon="color-palette-outline" />
            <List.Item title="Notifications" icon="notifications-outline" />
            <List.Item title="Help & Support" icon="help-circle-outline" />
            
            <View style={{ marginTop: 'auto', padding: tokens.spacing[4] }}>
                <Button 
                    label="Log Out" 
                    variant="outline" 
                    color="error" 
                    fullWidth 
                    onPress={() => setOpen(false)}
                />
            </View>
          </View>
        </Drawer>
      </DemoSection>

      <DemoSection title="Usage Notes">
          <Typography variant="body2" color="secondary">
              Use Drawers for main navigation in your app, especially when there are many top-level sections that don't fit in a TabBar.
          </Typography>
      </DemoSection>
    </DemoPage>
  );
}

