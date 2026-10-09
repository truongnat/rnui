import { useState } from 'react';
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
          <Stack direction="row" spacing="sm" alignItems="flex-start">
            <Checkbox
              checked={terms}
              onCheckedChange={setTerms}
              style={{ marginTop: 2 }}
            />
            <Stack spacing="xs" className="flex-1">
              <Text variant="small">I agree to the Terms of Service</Text>
              <Text variant="muted">Required to complete your purchase</Text>
            </Stack>
          </Stack>
          <Stack direction="row" spacing="sm" alignItems="flex-start">
            <Checkbox
              checked={marketing}
              onCheckedChange={setMarketing}
              style={{ marginTop: 2 }}
            />
            <Stack spacing="xs" className="flex-1">
              <Text variant="small">Email me about order updates</Text>
              <Text variant="muted">
                Shipping, delivery, and refund notifications only
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </DemoSection>

      <DemoSection title="Bulk select">
        <Stack direction="row" spacing="sm" alignItems="flex-start">
          <Checkbox
            checked={delivery}
            onCheckedChange={setDelivery}
            style={{ marginTop: 2 }}
          />
          <Stack spacing="xs" className="flex-1">
            <Text variant="small">Select all items</Text>
            <Text variant="muted">3 of 5 order lines selected</Text>
          </Stack>
        </Stack>
      </DemoSection>

      <DemoSection title="Disabled">
        <Stack spacing="md">
          <Stack direction="row" spacing="sm" alignItems="center">
            <Checkbox disabled checked onCheckedChange={() => {}} />
            <Text variant="small">Required by organization policy</Text>
          </Stack>
          <Stack direction="row" spacing="sm" alignItems="center">
            <Checkbox disabled checked={false} onCheckedChange={() => {}} />
            <Text variant="small">Unavailable in your region</Text>
          </Stack>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
