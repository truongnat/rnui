import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Marquee } from '@/components/ui/marquee';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function MarqueeScreen() {
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, [])
  );
  const running = playing && focused;
  return (
    <DemoPage
      title="Marquee"
      description="Smoothly scrolling content for headlines and tickers."
    >
      <View className="flex-row items-center gap-4">
        <Text variant="muted" className="flex-1 text-sm">
          Hold to pause. Reduce Motion keeps the content manually scrollable.
        </Text>
        <Button variant="outline" onPress={() => setPlaying((value) => !value)}>
          <Icon
            name={playing ? 'minus' : 'arrowRight'}
            tone="foreground"
            size="sm"
          />
          <Text>{playing ? 'Pause' : 'Resume'}</Text>
        </Button>
      </View>
      <DemoSection title="Text" bare>
        <View className="min-h-20 justify-center overflow-hidden rounded-lg border border-border bg-muted py-4">
          <Marquee speed={running ? 60 : 0}>
            <Text variant="large" className="mr-10">
              BREAKING NEWS: The new component library is out now! • Explore 78+
              components • built with Reanimated 3 • performance optimized •
            </Text>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection
        title="Custom Content"
        description="Marquee accepts any views — badges, icons, rows."
        bare
      >
        <View className="min-h-20 justify-center overflow-hidden rounded-lg border border-border bg-muted py-4">
          <Marquee speed={running ? 40 : 0}>
            <View className="flex-row items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  className="mr-4 flex-row items-center rounded-full border border-border bg-card px-4 py-2"
                >
                  <Icon name="star" size={16} tone="primary" />
                  <Text variant="small" className="ml-2">
                    Feature Item #{i}
                  </Text>
                </View>
              ))}
            </View>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection title="Fast" description="High speed for ticker feeds." bare>
        <View className="min-h-20 justify-center overflow-hidden rounded-lg border border-border bg-muted py-4">
          <Marquee speed={running ? 150 : 0}>
            <Text variant="h4" className="mr-14 font-bold text-primary">
              FAST • FAST • FAST • FAST • FAST • FAST • FAST • FAST •
            </Text>
          </Marquee>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
