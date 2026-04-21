import React, { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Alert, Button, Modal, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ModalScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [customStyleOpen, setCustomStyleOpen] = useState(false);

  const t = useTokens();

  return (
    <DemoPage
      title="Modal"
      description="Modals provide a focused way to present content or request information, overlaying the main application content with various styles and behaviors."
    >
      <DemoSection title="Basic Modal">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The standard modal type, suitable for simple confirmations or small forms. 
          It supports standard backdrop dismissal and safe area management.
        </Typography>
        
        <Button 
          label="Launch Basic Modal" 
          variant="solid"
          onPress={() => setBasicOpen(true)} 
        />
        
        <Modal open={basicOpen} onClose={() => setBasicOpen(false)}>
          <View style={{ gap: t.spacing[5], paddingVertical: t.spacing[2] }}>
            <Typography variant="h3">Information Dialog</Typography>
            <Typography variant="body1">
              This is a standard modal component. It uses a Portal to ensure it always renders 
              above other application components.
            </Typography>
            
            <Alert severity="info" variant="standard">
              Modals can contain any UI elements, including alerts and other interactive components.
            </Alert>
            
            <View style={{ gap: t.spacing[3] }}>
              <Button label="Close Dialog" variant="ghost" onPress={() => setBasicOpen(false)} />
            </View>
          </View>
        </Modal>
      </DemoSection>

      <DemoSection title="Full Screen Appearance">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Useful for complex configurations or primary tasks that require total user focus.
        </Typography>
        
        <Button 
          label="Launch Workspace" 
          variant="outline" 
          onPress={() => setFullscreenOpen(true)} 
        />
        
        <Modal 
          open={fullscreenOpen} 
          onClose={() => setFullscreenOpen(false)}
          fullScreen
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: t.spacing[6], padding: t.spacing[6] }}>
            <View style={{ alignItems: 'center', gap: t.spacing[2] }}>
              <Typography variant="h2">Focused View</Typography>
              <Typography variant="body1" style={{ textAlign: 'center', color: t.color.text.secondary }}>
                In full-screen mode, the modal becomes the primary interface, 
                minimizing external distractions.
              </Typography>
            </View>
            <Button label="Finish Task" variant="solid" onPress={() => setFullscreenOpen(false)} />
          </View>
        </Modal>
      </DemoSection>

      <DemoSection title="Custom Thematic Styling">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Extend the base modal with custom themes and visual tokens to create 
          distinct brand experiences.
        </Typography>
        
        <Button 
          label="Launch Premium UI" 
          variant="ghost" 
          onPress={() => setCustomStyleOpen(true)} 
        />
        
        <Modal 
          open={customStyleOpen} 
          onClose={() => setCustomStyleOpen(false)}
          contentContainerStyle={{
            backgroundColor: t.color.brand.default,
            borderRadius: t.radius[6],
            padding: t.spacing[8],
          }}
        >
          <View style={{ gap: t.spacing[6] }}>
            <View style={{ gap: t.spacing[2] }}>
              <Typography variant="h3" style={{ color: '#FFFFFF' }}>Surface Customization</Typography>
              <Typography variant="body1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                You can override contentContainerStyle to implement unique designs, 
                high-contrast modes, or specialized branding.
              </Typography>
            </View>
            
            <Button 
              label="Acknowledged" 
              variant="solid" 
              style={{ backgroundColor: '#FFFFFF' }}
              labelStyle={{ color: t.color.brand.default }}
              onPress={() => setCustomStyleOpen(false)} 
            />
          </View>
        </Modal>
      </DemoSection>
    </DemoPage>
  );
}

