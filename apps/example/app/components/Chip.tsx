import { useState } from 'react';
import { Chip } from '@/components/ui/chip';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

export default function ChipScreen() {
  const [selected, setSelected] = useState(['paid']);

  return (
    <DemoPage
      title="Chip"
      description="Filters, payment status, and tags — visible raised surfaces on any canvas."
    >
      <DemoSection
        title="Payment & order filters"
        description="Product copy for status chips."
      >
        <Stack direction="row" spacing="sm" wrap>
          <Chip label="Paid" selected />
          <Chip label="Pending" />
          <Chip label="Declined" />
          <Chip label="Subscription" variant="outlined" />
        </Stack>
      </DemoSection>

      <DemoSection title="Variants" description="Filled and outlined styles.">
        <Stack direction="row" spacing="sm" wrap>
          <Chip label="All orders" variant="filled" />
          <Chip label="In transit" variant="outlined" />
          <Chip label="Saved filter" variant="filled" selected />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Visible surfaces"
        description="Filled default uses raised surface + border — not a flat gray slab."
      >
        <Stack spacing="md">
          {(
            [
              ['White surface', 'white'],
              ['App background', 'app'],
              ['Card surface', 'card'],
              ['Glass surface', 'glass'],
              ['Dark surface', 'dark'],
            ] as const
          ).map(([label, surface]) => (
            <DemoSurfacePanel key={surface} label={label} surface={surface}>
              <Stack direction="row" spacing="sm" wrap>
                <Chip label="Paid" />
                <Chip label="Filter" variant="outlined" />
                <Chip label="Draft" selected />
              </Stack>
            </DemoSurfacePanel>
          ))}
        </Stack>
      </DemoSection>

      <DemoSection
        title="Selection"
        description="Filter chips for order status."
      >
        <Stack direction="row" spacing="sm" wrap>
          {[
            { key: 'paid', label: 'Paid' },
            { key: 'pending', label: 'Pending' },
            { key: 'refunded', label: 'Refunded' },
          ].map(({ key, label }) => (
            <Chip
              key={key}
              label={label}
              selected={selected.includes(key)}
              onPress={() =>
                setSelected((prev) =>
                  prev.includes(key)
                    ? prev.filter((k) => k !== key)
                    : [...prev, key]
                )
              }
            />
          ))}
        </Stack>
      </DemoSection>

      <DemoSection title="Disabled & removable">
        <Stack direction="row" spacing="sm" wrap>
          <Chip label="Archived" disabled />
          <Chip label="Remove tag" onRemove={() => {}} />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
