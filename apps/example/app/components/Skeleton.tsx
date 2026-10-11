import { useState } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const PRESETS = ['Card', 'Profile', 'Media', 'Form'] as const;

function SkeletonCard() {
  return (
    <View className="flex-row items-center gap-3 py-3">
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

function LoadedPreset({ preset }: { preset: (typeof PRESETS)[number] }) {
  if (preset === 'Profile') {
    return (
      <View className="items-center gap-3 py-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <Text variant="large">Jordan Lee</Text>
        <Text variant="muted">Product designer</Text>
      </View>
    );
  }
  if (preset === 'Media') {
    return (
      <View className="gap-2">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
          }}
          className="h-32 w-full rounded-lg"
          accessibilityLabel="Mountain lake"
        />
        <Text variant="large">A quiet morning</Text>
        <Text variant="muted">Photo collection</Text>
      </View>
    );
  }
  if (preset === 'Form') {
    return (
      <View className="gap-4">
        {(['Name', 'Email', 'Team'] as const).map((label) => (
          <View key={label} className="gap-1.5">
            <Text variant="small">{label}</Text>
            <Input accessibilityLabel={label} placeholder={label} />
          </View>
        ))}
      </View>
    );
  }
  return (
    <View className="gap-3">
      {['Jordan Lee', 'Alex Morgan'].map((name) => (
        <View key={name} className="flex-row items-center gap-3 py-3">
          <Avatar>
            <AvatarFallback>
              {name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 gap-1">
            <Text className="font-semibold">{name}</Text>
            <Text variant="muted">Product team</Text>
          </View>
        </View>
      ))}
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
          {showSkeleton ? 'Show content' : 'Show skeleton'}
        </Button>

        <Animated.View
          className="mt-4"
          layout={LinearTransition.duration(200).reduceMotion(
            ReduceMotion.System
          )}
        >
          {showSkeleton ? (
            <Animated.View
              key={`loading-${preset}`}
              className="gap-3"
              entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
              exiting={FadeOut.duration(120).reduceMotion(ReduceMotion.System)}
            >
              {preset === 'Card' ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : null}
              {preset === 'Profile' ? <SkeletonProfile /> : null}
              {preset === 'Media' ? <SkeletonMedia /> : null}
              {preset === 'Form' ? <SkeletonForm /> : null}
            </Animated.View>
          ) : (
            <Animated.View
              key={`loaded-${preset}`}
              entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
              exiting={FadeOut.duration(120).reduceMotion(ReduceMotion.System)}
            >
              <LoadedPreset preset={preset} />
            </Animated.View>
          )}
        </Animated.View>
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
