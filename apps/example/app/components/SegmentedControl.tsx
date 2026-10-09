import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const PERIODS = ['Daily', 'Weekly', 'Monthly'] as const;
const STATUSES = ['All', 'Active', 'Pending', 'Completed', 'Archived'] as const;
const VIEWS = ['List', 'Grid', 'Gallery'] as const;

export default function SegmentedControlScreen() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('Daily');
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('Active');
  const [view, setView] = useState<(typeof VIEWS)[number]>('List');

  return (
    <DemoPage
      title="Segmented Control"
      description="Mutually exclusive segments for switching views or filters."
    >
      <DemoSection title="Basic" description={`Selected: ${period}`}>
        <SegmentedControl
          options={PERIODS}
          value={period}
          onValueChange={(v) => setPeriod(v)}
        />
      </DemoSection>

      <DemoSection
        title="Many Options"
        description="Five segments for status filtering."
      >
        <SegmentedControl
          options={STATUSES}
          value={status}
          onValueChange={(v) => setStatus(v)}
        />
      </DemoSection>

      <DemoSection
        title="In Context"
        description="Segmented control driving a preview area."
      >
        <DemoPreview>
          <Text variant="h4" className="mb-3">
            View Preferences
          </Text>
          <SegmentedControl
            options={VIEWS}
            value={view}
            onValueChange={(v) => setView(v)}
          />
          <View className="mt-3 h-20 items-center justify-center rounded-md border border-dashed border-border bg-muted">
            <Text variant="muted">{view} View Content</Text>
          </View>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
