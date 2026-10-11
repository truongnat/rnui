import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Chip } from '@/components/ui/chip';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

export default function ChipScreen() {
  const [selected, setSelected] = useState(['paid']);
  const [tagVisible, setTagVisible] = useState(true);
  const [tagSelected, setTagSelected] = useState(false);

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
        description="Filled and outlined chips share the same semantic theme tokens."
        bare
      >
        <Stack spacing="md">
          {(['app', 'card'] as const).map((surface) => (
            <DemoSurfacePanel
              key={surface}
              label={surface === 'app' ? 'App background' : 'Card surface'}
              surface={surface}
            >
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
        <Text variant="muted" className="mt-3">
          {selected.length === 0
            ? 'No filters selected'
            : `${selected.length} filters selected`}
        </Text>
      </DemoSection>

      <DemoSection title="Disabled & removable">
        <Stack direction="row" spacing="sm" wrap>
          <Chip
            label="Archived"
            disabled
            selected
            onPress={() => setTagSelected((value) => !value)}
            onRemove={() => setTagVisible(false)}
          />
          {tagVisible ? (
            <Animated.View
              entering={FadeIn.duration(160).reduceMotion(ReduceMotion.System)}
              exiting={FadeOut.duration(120).reduceMotion(ReduceMotion.System)}
              layout={LinearTransition.duration(180).reduceMotion(
                ReduceMotion.System
              )}
            >
              <Chip
                label="Remove tag"
                selected={tagSelected}
                onPress={() => setTagSelected((value) => !value)}
                onRemove={() => setTagVisible(false)}
              />
            </Animated.View>
          ) : (
            <Button variant="outline" onPress={() => setTagVisible(true)}>
              Restore tag
            </Button>
          )}
        </Stack>
        <Text variant="muted" className="mt-3">
          Tap the tag label to select; its remove action does not change
          selection.
          {tagSelected ? ' Tag selected.' : ' Tag not selected.'}
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
