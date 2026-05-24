import { useTheme, useTokens } from '@truongdq01/headless';
import {
  Button,
  SegmentedControl,
  SkeletonCard,
  SkeletonForm,
  SkeletonGrid,
  SkeletonGroup,
  SkeletonMedia,
  SkeletonProfile,
  SkeletonTable,
  SkeletonText,
} from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function SkeletonScreen() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [skelPreset, setSkelPreset] = useState(0);

  const t = useTokens();
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Skeleton"
      description="Placeholder UI while content loads — smoother perceived performance."
    >
      <DemoSection
        title="Presets"
        description="Switch between card, profile, media, form, grid, table, and group layouts."
      >
        <SegmentedControl
          options={[
            'Card',
            'Profile',
            'Media',
            'Form',
            'Grid',
            'Table',
            'Group',
          ]}
          selectedIndex={skelPreset}
          onChange={setSkelPreset}
        />

        <Button
          label={showSkeleton ? 'Hide Content' : 'Show Content'}
          variant="outline"
          size="sm"
          onPress={() => setShowSkeleton((p) => !p)}
          style={{ alignSelf: 'flex-start', marginTop: tokens.spacing[3] }}
        />

        <DemoPreview>
          {showSkeleton ? (
            <View style={{ gap: t.spacing[3] }}>
              {skelPreset === 0 ? (
                <>
                  <SkeletonCard />
                  <View style={{ height: t.spacing[3] }} />
                  <SkeletonCard />
                </>
              ) : null}
              {skelPreset === 1 ? <SkeletonProfile /> : null}
              {skelPreset === 2 ? <SkeletonMedia /> : null}
              {skelPreset === 3 ? <SkeletonForm rows={3} /> : null}
              {skelPreset === 4 ? (
                <SkeletonGrid columns={4} rows={2} cell={40} />
              ) : null}
              {skelPreset === 5 ? (
                <SkeletonTable columns={3} dataRows={2} />
              ) : null}
              {skelPreset === 6 ? (
                <SkeletonGroup stagger={100}>
                  <SkeletonText lines={1} />
                  <View style={{ height: t.spacing[2] }} />
                  <SkeletonText lines={1} />
                  <View style={{ height: t.spacing[2] }} />
                  <SkeletonText lines={1} />
                </SkeletonGroup>
              ) : null}
            </View>
          ) : (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SkeletonText lines={1} lastLineWidth="60%" />
            </View>
          )}
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Text Lines" description="Single and multi-line placeholders.">
        <SkeletonText lines={1} lastLineWidth="40%" />
        <View style={{ height: tokens.spacing[3] }} />
        <SkeletonText lines={3} />
      </DemoSection>

      <DemoSection
        title="Staggered Group"
        description="Sequential reveal animation across children."
      >
        <SkeletonGroup stagger={150}>
          <SkeletonCard />
          <View style={{ height: t.spacing[3] }} />
          <SkeletonCard />
          <View style={{ height: t.spacing[3] }} />
          <SkeletonCard />
        </SkeletonGroup>
      </DemoSection>
    </DemoPage>
  );
}
