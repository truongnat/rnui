import { useState } from 'react';
import { Checkbox, Stack, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function CheckboxScreen() {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>(
    'indeterminate',
  );

  return (
    <DemoPage
      title="Checkbox"
      description="Consent, filters, and bulk selection — 44dp touch targets with clear checked states."
    >
      <DemoSection
        title="Checkout consent"
        description="Legal and marketing preferences during payment."
      >
        <Stack spacing="md">
          <Checkbox
            label="I agree to the Terms of Service"
            description="Required to complete your purchase"
            checked={terms}
            onChange={setTerms}
          />
          <Checkbox
            label="Email me about order updates"
            description="Shipping, delivery, and refund notifications only"
            checked={marketing}
            onChange={setMarketing}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Bulk select">
        <Checkbox
          label="Select all items"
          description="3 of 5 order lines selected"
          checked={selectAll === true}
          indeterminate={selectAll === 'indeterminate'}
          onChange={(v) => setSelectAll(v ? true : false)}
        />
      </DemoSection>

      <DemoSection title="Disabled">
        <Stack spacing="md">
          <Checkbox label="Required by organization policy" disabled checked onChange={() => {}} />
          <Checkbox label="Unavailable in your region" disabled checked={false} onChange={() => {}} />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
