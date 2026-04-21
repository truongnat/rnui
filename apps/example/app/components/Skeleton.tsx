/**
 * RN `TextStyle.fontWeight` typings expect string literals (e.g. "600", "700") — keep consistent to avoid TS noise.
 */

import {
  useTheme,
  useTokens,
} from '@truongdq01/headless';
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
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function SkeletonScreen() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [skelPreset, setSkelPreset] = useState(0);

  const t = useTokens();
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Skeleton" 
      description="Placeholder components used to indicate that content is loading, providing a smoother perceived performance."
    >
      <DemoSection title="Skeleton Presets">
        <View style={{ gap: tokens.spacing[4] }}>
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
          />

          {showSkeleton ? (
            <View style={{ gap: 12 }}>
              {skelPreset === 0 && (
                <>
                  <SkeletonCard />
                  <View style={{ height: 12 }} />
                  <SkeletonCard />
                </>
              )}
              {skelPreset === 1 && <SkeletonProfile />}
              {skelPreset === 2 && <SkeletonMedia />}
              {skelPreset === 3 && <SkeletonForm rows={3} />}
              {skelPreset === 4 && (
                <SkeletonGrid columns={4} rows={2} cell={40} />
              )}
              {skelPreset === 5 && <SkeletonTable columns={3} dataRows={2} />}
              {skelPreset === 6 && (
                <SkeletonGroup stagger={100}>
                  <SkeletonText lines={1} />
                  <View style={{ height: 8 }} />
                  <SkeletonText lines={1} />
                  <View style={{ height: 8 }} />
                  <SkeletonText lines={1} />
                </SkeletonGroup>
              )}
            </View>
          ) : (
            <View 
              style={{ 
                height: 200, 
                backgroundColor: t.color.surface.subtle, 
                borderRadius: t.radius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: t.color.border.default,
                borderStyle: 'dashed'
              }}
            >
              <SkeletonText lines={1} style={{ width: '60%' }} />
            </View>
          )}
        </View>
      </DemoSection>

      <DemoSection title="Custom Text Skeleton">
        <View style={{ gap: tokens.spacing[3] }}>
          <SkeletonText lines={1} style={{ width: '40%' }} />
          <SkeletonText lines={3} />
        </View>
      </DemoSection>

      <DemoSection title="Skeleton Group (Staggered)">
        <SkeletonGroup stagger={150}>
          <SkeletonCard />
          <View style={{ height: 12 }} />
          <SkeletonCard />
          <View style={{ height: 12 }} />
          <SkeletonCard />
        </SkeletonGroup>
      </DemoSection>
    </DemoPage>
  );
}

