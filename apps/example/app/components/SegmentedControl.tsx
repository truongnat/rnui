import { useTokens } from '@truongdq01/headless';
import { SegmentedControl, Typography } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function SegmentedControlScreen() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(0);

  const t = useTokens();

  return (
    <DemoPage 
      title="Segmented Control" 
      description="Linear set of two or more segments with mutually exclusive selection, primarily used for switching views or filtering content."
    >
      <DemoSection title="Basic Example">
        <SegmentedControl
          options={['Daily', 'Weekly', 'Monthly']}
          selectedIndex={index1}
          onChange={setIndex1}
        />
        <View style={{ marginTop: t.spacing[3], alignItems: 'center' }}>
          <Typography variant="body2" color="secondary">
            Selected: {['Daily', 'Weekly', 'Monthly'][index1]}
          </Typography>
        </View>
      </DemoSection>

      <DemoSection title="Many Options">
        <SegmentedControl
          options={['All', 'Active', 'Pending', 'Completed', 'Archived']}
          selectedIndex={index2}
          onChange={setIndex2}
        />
      </DemoSection>

      <DemoSection title="Usage in Context">
        <View style={{ padding: t.spacing[4], backgroundColor: t.color.surface.raised, borderRadius: t.radius.lg, borderWeight: 1, borderColor: t.color.border.subtle }}>
           <Typography variant="h6" style={{ marginBottom: t.spacing[3] }}>View Preferences</Typography>
           <SegmentedControl
            options={['List', 'Grid', 'Gallery']}
            selectedIndex={index3}
            onChange={setIndex3}
          />
          <View style={{ height: 100, marginTop: t.spacing[3], backgroundColor: t.color.surface.subtle, borderRadius: t.radius.md, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: t.color.border.default }}>
            <Typography color="secondary">
              {index3 === 0 && 'List View Content'}
              {index3 === 1 && 'Grid View Content'}
              {index3 === 2 && 'Gallery View Content'}
            </Typography>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}

