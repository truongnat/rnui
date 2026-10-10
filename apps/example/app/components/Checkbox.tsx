import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Checkbox } from '@/components/ui/checkbox';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function CheckboxScreen() {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [delivery, setDelivery] = useState(false);

  return (
    <DemoPage
      title="Checkbox"
      description="Consent, filters, and bulk selection — clear checked states with hit-slop targets."
    >
      <DemoSection
        title="Checkout consent"
        description="Legal and marketing preferences during payment."
      >
        <Stack spacing="md">
          <Pressable
            onPress={() => setTerms((prev) => !prev)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: terms }}
          >
            <Checkbox
              checked={terms}
              onCheckedChange={setTerms}
              style={{ marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text variant="small">I agree to the Terms of Service</Text>
              <Text variant="muted">Required to complete your purchase</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setMarketing((prev) => !prev)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: marketing }}
          >
            <Checkbox
              checked={marketing}
              onCheckedChange={setMarketing}
              style={{ marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text variant="small">Email me about order updates</Text>
              <Text variant="muted">
                Shipping, delivery, and refund notifications only
              </Text>
            </View>
          </Pressable>
        </Stack>
      </DemoSection>

      <DemoSection title="Bulk select">
        <Pressable
          onPress={() => setDelivery((prev) => !prev)}
          style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: delivery }}
        >
          <Checkbox
            checked={delivery}
            onCheckedChange={setDelivery}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text variant="small">Select all items</Text>
            <Text variant="muted">3 of 5 order lines selected</Text>
          </View>
        </Pressable>
      </DemoSection>

      <DemoSection title="Disabled">
        <Stack spacing="md">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Checkbox disabled checked />
            <Text variant="small">Required by organization policy</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Checkbox disabled checked={false} />
            <Text variant="small">Unavailable in your region</Text>
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
