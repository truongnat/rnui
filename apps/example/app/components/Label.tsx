import { useRef } from 'react';
import { type TextInput, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function LabelScreen() {
  const { toast } = useToast();
  const inputRef = useRef<TextInput>(null);

  return (
    <DemoPage
      title="Label"
      description="Accessible form labels with required indicators, optional hints, and tap-to-focus bindings."
    >
      <DemoSection
        title="Form Inputs with Labels"
        description="Labels paired with inputs including required (*) and optional indicators."
        bare
      >
        <Card className="p-5">
          <Stack spacing="lg">
            <View className="gap-2">
              <Label required>Full Name</Label>
              <Input placeholder="Jane Doe" />
            </View>

            <View className="gap-2">
              <Label required>Work Email Address</Label>
              <Input
                placeholder="jane@company.com"
                keyboardType="email-address"
              />
            </View>

            <View className="gap-2">
              <Label optional>Company Website</Label>
              <Input placeholder="https://example.com" />
            </View>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Tap Label to Focus"
        description="Tapping on the label focuses the corresponding input directly."
        bare
      >
        <Card className="p-5">
          <View className="gap-2">
            <Label
              onPress={() => {
                inputRef.current?.focus();
                toast.info('Focused input via Label tap!');
              }}
            >
              Click this label to focus 👉
            </Label>
            <Input ref={inputRef} placeholder="I received focus from the label" />
          </View>
        </Card>
      </DemoSection>

      <DemoSection
        title="States & Hierarchy"
        description="Validation error and disabled states."
        bare
      >
        <Card className="p-5">
          <Stack spacing="md">
            <View className="gap-1">
              <Label className="text-destructive">Payment Method (Error)</Label>
              <Text variant="muted">
                Highlighted with destructive color when error occurs.
              </Text>
            </View>

            <View className="gap-1">
              <Label disabled>SSN / Tax ID (Disabled)</Label>
              <Text variant="muted">
                Dims label to 50% opacity when the field is locked.
              </Text>
            </View>
          </Stack>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
