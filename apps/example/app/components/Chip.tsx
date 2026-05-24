import { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Chip, Stack } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';
import { CreditCard, Filter, Tag } from 'lucide-react-native';

export default function ChipScreen() {
  const t = useTokens();
  const [selected, setSelected] = useState(['paid']);

  const toggleSelection = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <DemoPage
      title="Chip"
      description="Filters, payment status, and tags — visible raised surfaces on any canvas."
    >
      <DemoSection title="Payment & order filters" description="Product copy for status chips.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          <Chip label="Paid" color="success" icon={<CreditCard size={12} />} />
          <Chip label="Pending" color="warning" />
          <Chip label="Declined" color="error" />
          <Chip label="Subscription" color="primary" icon={<Tag size={12} />} />
        </View>
      </DemoSection>

      <DemoSection title="Variants" description="Solid, outlined, and subtle styles.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          <Chip label="All orders" variant="solid" />
          <Chip label="In transit" variant="outlined" />
          <Chip label="Saved filter" variant="subtle" color="primary" />
        </View>
      </DemoSection>

      <DemoSection
        title="Visible surfaces"
        description="Solid default uses raised surface + border — not a flat gray slab."
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
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
                <Chip label="Paid" color="success" />
                <Chip label="Filter" variant="outlined" icon={<Filter size={12} />} />
                <Chip label="Draft" variant="solid" />
              </View>
            </DemoSurfacePanel>
          ))}
        </Stack>
      </DemoSection>

      <DemoSection title="Selection" description="Filter chips for order status.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          {[
            { key: 'paid', label: 'Paid' },
            { key: 'pending', label: 'Pending' },
            { key: 'refunded', label: 'Refunded' },
          ].map(({ key, label }) => (
            <Chip
              key={key}
              label={label}
              variant={selected.includes(key) ? 'solid' : 'outlined'}
              color={selected.includes(key) ? 'primary' : 'default'}
              onClick={() => toggleSelection(key)}
            />
          ))}
        </View>
      </DemoSection>

      <DemoSection title="Disabled & deletable">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing[2] }}>
          <Chip label="Archived" disabled />
          <Chip label="Remove tag" onDelete={() => {}} />
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: t.spacing[2],
          }}
        >
          <Chip label="Small" size="sm" color="primary" />
          <Chip label="Medium" size="md" color="primary" />
          <Chip label="Large" size="lg" color="primary" />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
