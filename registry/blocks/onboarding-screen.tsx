import { useState } from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    key: 'one',
    title: 'Copy-paste components',
    body: 'Own the code. Every component lands in your project as source.',
  },
  {
    key: 'two',
    title: 'Two styling engines',
    body: 'NativeWind or Uniwind — pick once, everything adapts.',
  },
  {
    key: 'three',
    title: 'Multi-brand themes',
    body: 'Seven brand presets out of the box, switchable at any time.',
  },
];

export function OnboardingScreen({ onDone }: { onDone?: () => void }) {
  const [index, setIndex] = useState(0);
  const mutedColor = useColorScheme() === 'dark' ? '#a8a29e' : '#78716c';
  const last = index === SLIDES.length - 1;

  return (
    <View className="flex-1 bg-background">
      <View className="items-end px-4 pt-4">
        <Pressable accessibilityRole="button" onPress={onDone}>
          <Text style={{ color: mutedColor }} className="text-sm">
            Skip
          </Text>
        </Pressable>
      </View>
      <Carousel
        data={SLIDES}
        onIndexChange={setIndex}
        renderItem={(s) => (
          <View className="flex-1 items-center justify-center gap-3 px-10">
            <Text className="text-center text-2xl font-bold text-foreground">
              {s.title}
            </Text>
            <Text className="text-center text-base text-muted-foreground">
              {s.body}
            </Text>
          </View>
        )}
        className="flex-1"
      />
      <View className="items-center gap-4 pb-10">
        <View className="flex-row gap-1.5">
          {SLIDES.map((s, i) => (
            <View
              key={s.key}
              className={cn(
                'h-1.5 rounded-full',
                i === index ? 'w-6 bg-primary' : 'w-1.5 bg-border'
              )}
            />
          ))}
        </View>
        <Button className="w-4/5" onPress={last ? onDone : undefined}>
          {last ? 'Get started' : 'Swipe to continue'}
        </Button>
      </View>
    </View>
  );
}
