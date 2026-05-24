import { View } from 'react-native';
import { Label, Typography, TextField, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function LabelScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Label"
      description="Accessible labels for input fields and selection controls."
    >
      <DemoSection title="Standard" description="Semantic context for form fields.">
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
          <Typography variant="label" color="secondary">
            Secondary Label (Optional)
          </Typography>
          <Typography variant="label" color="error">
            Error Label State
          </Typography>
          <Label style={{ opacity: tokens.opacity[50] }}>
            Disabled Label State
          </Label>
        </Stack>
      </DemoSection>

      <DemoSection title="Typography Variants" description="Pair with Typography for hierarchy.">
        <View style={{ gap: tokens.spacing[4] }}>
          <View>
            <Typography variant="overline">Section Title Style</Typography>
            <View
              style={{
                height: 2,
                backgroundColor: tokens.color.border.default,
                marginTop: tokens.spacing[1],
              }}
            />
          </View>
          <View>
            <Typography variant="caption">Small Helper Label</Typography>
            <Typography variant="body2">Supporting text content</Typography>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
