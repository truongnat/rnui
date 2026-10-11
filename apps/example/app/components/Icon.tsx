import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const NAVIGATION_ICONS: IconName[] = [
  'home',
  'search',
  'bell',
  'user',
  'settings',
];

function NavigationIcon({
  name,
  active,
  onPress,
}: {
  name: IconName;
  active: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColor();
  const progress = useSharedValue(active ? 1 : 0);
  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: 180 });
    return () => cancelAnimation(progress);
  }, [active, progress]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.6 + progress.value * 0.4,
    transform: [{ scale: 0.9 + progress.value * 0.1 }],
  }));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="min-h-16 min-w-12 flex-1 items-center justify-center gap-2 rounded-md py-3"
      style={({ pressed }) => ({
        backgroundColor: active ? colors.muted : colors.card,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Animated.View style={animatedStyle}>
        <Icon name={name} size="lg" tone="foreground" />
      </Animated.View>
      <Text variant="muted" className="text-xs capitalize">
        {name}
      </Text>
    </Pressable>
  );
}

export default function IconScreen() {
  const [selected, setSelected] = useState<IconName>('home');
  const [saved, setSaved] = useState(false);
  const savedProgress = useSharedValue(0);
  useEffect(() => {
    savedProgress.value = withTiming(saved ? 1 : 0, { duration: 180 });
    return () => cancelAnimation(savedProgress);
  }, [saved, savedProgress]);
  const savedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + savedProgress.value * 0.15 }],
  }));
  return (
    <DemoPage
      title="Icons"
      description="Lucide icons for navigation, actions, and status feedback."
    >
      <DemoSection
        title="Navigation"
        description="Common tab and header icons."
      >
        <View className="flex-row flex-wrap gap-1">
          {NAVIGATION_ICONS.map((name) => (
            <NavigationIcon
              key={name}
              name={name}
              active={name === selected}
              onPress={() => setSelected(name)}
            />
          ))}
        </View>
      </DemoSection>
      <DemoSection title="Status" description="Semantic colors for feedback.">
        <Stack spacing="lg">
          <Stack direction="row" spacing="md" alignItems="center">
            <Icon name="checkCircle" size="lg" tone="success" />
            <Text>Success</Text>
          </Stack>
          <Stack direction="row" spacing="md" alignItems="center">
            <Icon name="error" size="lg" tone="destructive" />
            <Text>Error</Text>
          </Stack>
          <Stack direction="row" spacing="md" alignItems="center">
            <Icon name="info" size="lg" tone="primary" />
            <Text>Information</Text>
          </Stack>
        </Stack>
      </DemoSection>
      <DemoSection
        title="Sizing & Colors"
        description="Preset sizes; brand and semantic tones."
      >
        <Stack spacing="lg">
          <Stack direction="row" spacing="lg" alignItems="center" wrap>
            {(['sm', 'lg', 'xl', '2xl'] as const).map((size) => (
              <View key={size} className="min-w-12 items-center gap-3">
                <Icon name="heart" size={size} tone="destructive" />
                <Text variant="muted" className="text-xs">
                  {size}
                </Text>
              </View>
            ))}
          </Stack>
          <Stack direction="row" spacing="lg" alignItems="center">
            <Icon name="share" size="lg" tone="muted" />
            <Icon name="trash" size="lg" tone="destructive" />
            <Icon name="edit" size="lg" tone="warning" />
          </Stack>
          <Stack direction="row" spacing="md" alignItems="center">
            <IconButton
              size="lg"
              variant="outline"
              accessibilityLabel={saved ? 'Remove from saved' : 'Save'}
              accessibilityState={{ selected: saved }}
              onPress={() => setSaved((value) => !value)}
              icon={
                <Animated.View style={savedStyle}>
                  <Icon
                    name={saved ? 'check' : 'heart'}
                    size="lg"
                    tone={saved ? 'success' : 'foreground'}
                  />
                </Animated.View>
              }
            />
            <Text accessibilityLiveRegion="polite">
              {saved ? 'Saved' : 'Save'}
            </Text>
          </Stack>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
