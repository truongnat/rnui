import React from 'react';
import { View } from 'react-native';
import { Label, Typography, TextField, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function LabelScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Label" 
      description="Accessible text labels used to describe the purpose of input fields and selection controls."
    >
      <DemoSection title="Standard Labels">
        <Typography variant="body2" gutterBottom>
            Labels provide semantic context to user interface elements.
        </Typography>
        <Stack spacing="lg">
            <View>
                <Label>Full Name</Label>
                <TextField placeholder="Jane Doe" />
            </View>
            <View>
                <Label required>Email Address</Label>
                <TextField placeholder="jane@example.com" />
            </View>
        </Stack>
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="md">
            <Label color="secondary">Secondary Label (Optional)</Label>
            <Label color="error">Error Label State</Label>
            <Label disabled>Disabled Label State</Label>
        </Stack>
      </DemoSection>

      <DemoSection title="Typography Variants">
          <Typography variant="body2" color="secondary" gutterBottom>
              Labels can be combined with different typography variants for hierarchy.
          </Typography>
          <View style={{ gap: tokens.spacing[4] }}>
              <View>
                <Label variant="overline">Section Title Style</Label>
                <View style={{ height: 2, backgroundColor: tokens.color.border.default, marginTop: 4 }} />
              </View>
              <View>
                <Label variant="caption">Small Helper Label</Label>
                <Typography variant="body2">Supporting text content</Typography>
              </View>
          </View>
      </DemoSection>
    </DemoPage>
  );
}

