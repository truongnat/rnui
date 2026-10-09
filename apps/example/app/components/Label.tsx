import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function LabelScreen() {
  return (
    <DemoPage
      title="Label"
      description="Accessible labels for input fields and selection controls."
    >
      <DemoSection
        title="Standard"
        description="Semantic context for form fields."
      >
        <Stack spacing="lg">
          <View style={{ gap: 6 }}>
            <Label>Full Name</Label>
            <Input placeholder="Jane Doe" />
          </View>
          <View style={{ gap: 6 }}>
            <Label>
              Email Address <Text className="text-destructive">*</Text>
            </Label>
            <Input placeholder="jane@example.com" />
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="md">
          <Text variant="muted">Secondary Label (Optional)</Text>
          <Label className="text-destructive">Error Label State</Label>
          <Label disabled>Disabled Label State</Label>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Typography Variants"
        description="Pair with Text for hierarchy."
      >
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="small" className="tracking-widest uppercase">
              Section Title Style
            </Text>
            <View className="mt-1 h-0.5 bg-border" />
          </View>
          <View>
            <Text variant="muted">Small Helper Label</Text>
            <Text variant="p">Supporting text content</Text>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
