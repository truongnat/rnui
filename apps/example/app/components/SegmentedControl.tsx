import { useTokens } from '@truongdq01/headless';
import { SegmentedControl, Typography } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function SegmentedControlScreen() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(0);

  const t = useTokens();

  return (
    <DemoPage
      title="Segmented Control"
      description="Mutually exclusive segments for switching views or filters."
    >
      <DemoSection title="Basic" description={`Selected: ${['Daily', 'Weekly', 'Monthly'][index1]}`}>
        <SegmentedControl
          options={['Daily', 'Weekly', 'Monthly']}
          selectedIndex={index1}
          onChange={setIndex1}
        />
      </DemoSection>

      <DemoSection title="Many Options" description="Five segments for status filtering.">
        <SegmentedControl
          options={['All', 'Active', 'Pending', 'Completed', 'Archived']}
          selectedIndex={index2}
          onChange={setIndex2}
        />
      </DemoSection>

      <DemoSection title="In Context" description="Segmented control driving a preview area.">
        <DemoPreview>
          <Typography variant="h6" style={{ marginBottom: t.spacing[3] }}>
            View Preferences
          </Typography>
          <SegmentedControl
            options={['List', 'Grid', 'Gallery']}
            selectedIndex={index3}
            onChange={setIndex3}
          />
          <View
            style={{
              height: t.spacing[20],
              marginTop: t.spacing[3],
              backgroundColor: t.color.surface.sunken,
              borderRadius: t.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: t.color.border.default,
            }}
          >
            <Typography color="secondary">
              {index3 === 0 ? 'List View Content' : null}
              {index3 === 1 ? 'Grid View Content' : null}
              {index3 === 2 ? 'Gallery View Content' : null}
            </Typography>
          </View>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
