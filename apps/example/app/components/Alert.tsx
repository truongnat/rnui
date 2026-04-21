import { useTokens } from '@truongdq01/headless';
import { Alert, AlertTitle, Button, Stack, Typography } from '@truongdq01/ui';
import { Info } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function AlertScreen() {
  const t = useTokens();

  return (
    <DemoPage 
      title="Alert" 
      description="Provide contextual feedback messages for typical user actions with various intensities and states."
    >
      <DemoSection title="Standard Alert (Subtle)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Subtle colors provide status updates without interrupting the user flow.
        </Typography>
        <Stack spacing="md">
            <Alert severity="info" onClose={() => {}}>
              <AlertTitle>Information</AlertTitle>
              <Typography variant="body2">
                This is an informational alert for giving slight feedback.
              </Typography>
            </Alert>

            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <Typography variant="body2">
                Your changes have been saved successfully.
              </Typography>
            </Alert>

            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              <Typography variant="body2">
                Please check your connection before proceeding.
              </Typography>
            </Alert>

            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography variant="body2">
                Failed to upload images. Please try again later.
              </Typography>
            </Alert>
        </Stack>
      </DemoSection>

      <DemoSection title="Filled Alert (High Emphasis)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Filled alerts use rich background colors for high visibility.
        </Typography>
        <Stack spacing="md">
            <Alert severity="error" variant="filled">
              <Typography variant="body2" color="inverse">
                This is a critical error message that needs attention.
              </Typography>
            </Alert>

            <Alert severity="success" variant="filled">
              <Typography variant="body2" color="inverse">
                Great! Everything is working as expected.
              </Typography>
            </Alert>
        </Stack>
      </DemoSection>

      <DemoSection title="Outlined Alert">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
           Outlined variant is perfect for secondary feedback and embedded layouts.
        </Typography>
        <Stack spacing="md">
            <Alert severity="info" variant="outlined">
              <Typography variant="body2">
                Outlined variant is perfect for secondary feedback.
              </Typography>
            </Alert>
            
            <Alert severity="warning" variant="outlined">
              <Typography variant="body2">
                Check your account settings to verify security.
              </Typography>
            </Alert>
        </Stack>
      </DemoSection>

      <DemoSection title="Customizations">
        <Stack spacing="md">
            <View>
                <Typography variant="overline" style={{ marginBottom: 4 }}>With Actions</Typography>
                <Alert
                  severity="info"
                  action={
                    <Button 
                      label="UNDO" 
                      variant="ghost" 
                      size="sm" 
                      onPress={() => {}} 
                    />
                  }
                >
                  <Typography variant="body2">
                    The item has been deleted from your library.
                  </Typography>
                </Alert>
            </View>

            <View>
                <Typography variant="overline" style={{ marginBottom: 4 }}>Custom Icon</Typography>
                <Alert 
                  severity="info" 
                  icon={<Info color={t.color.info.icon} size={20} />}
                >
                  <Typography variant="body2">
                    Using a custom Lucide info icon.
                  </Typography>
                </Alert>
            </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
