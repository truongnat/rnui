import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const PRESETS = ['Card', 'Profile', 'Media', 'Form'] as const;

function SkeletonCard() {
  return (
    <View className="flex-row items-center gap-3 rounded-lg border border-border p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <View className="flex-1 gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </View>
    </View>
  );
}

function SkeletonProfile() {
  return (
    <View className="items-center gap-3 py-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-48" />
    </View>
  );
}

function SkeletonMedia() {
  return (
    <View className="gap-2">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </View>
  );
}

function SkeletonForm() {
  return (
    <View className="gap-4">
      <View className="gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </View>
      <View className="gap-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </View>
      <View className="gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </View>
    </View>
  );
}

export default function SkeletonScreen() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>('Card');

  return (
    <DemoPage
      title="Skeleton"
      description="Placeholder UI while content loads — smoother perceived performance."
    >
      <DemoSection
        title="Composed Presets"
        description="Card, profile, media, and form layouts built from Skeleton blocks."
      >
        <SegmentedControl
          options={PRESETS}
          value={preset}
          onValueChange={(v) => setPreset(v)}
        />

        <Button
          variant="outline"
          size="sm"
          className="mt-3 self-start"
          onPress={() => setShowSkeleton((p) => !p)}
        >
          {showSkeleton ? 'Hide Content' : 'Show Content'}
        </Button>

        <DemoPreview>
          {showSkeleton ? (
            <View className="gap-3">
              {preset === 'Card' ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : null}
              {preset === 'Profile' ? <SkeletonProfile /> : null}
              {preset === 'Media' ? <SkeletonMedia /> : null}
              {preset === 'Form' ? <SkeletonForm /> : null}
            </View>
          ) : (
            <View className="h-40 items-center justify-center">
              <Text variant="muted">Content loaded</Text>
            </View>
          )}
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Text Lines"
        description="Single and multi-line placeholders."
      >
        <Skeleton className="h-3 w-2/5" />
        <View className="h-3" />
        <View className="gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/5" />
        </View>
      </DemoSection>

      <DemoSection
        title="Stacked Cards"
        description="Repeating placeholders for list content."
      >
        <View className="gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
