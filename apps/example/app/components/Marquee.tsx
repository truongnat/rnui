import { View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Marquee } from '@/components/ui/marquee';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function MarqueeScreen() {
  return (
    <DemoPage
      title="Marquee"
      description="Smoothly scrolling content for headlines and tickers."
    >
      <DemoSection title="Text" bare>
        <DemoPreview>
          <View className="h-16 justify-center overflow-hidden rounded-lg border border-border">
            <Marquee speed={60}>
              <Text variant="large" className="mr-10">
                BREAKING NEWS: The new component library is out now! • Explore
                78+ components • built with Reanimated 3 • performance optimized
                •
              </Text>
            </Marquee>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Custom Content"
        description="Marquee accepts any views — badges, icons, rows."
      >
        <View className="h-16 justify-center overflow-hidden rounded-lg border border-border bg-muted">
          <Marquee speed={40}>
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

      <DemoSection title="Fast" description="High speed for ticker feeds.">
        <View className="h-16 justify-center overflow-hidden rounded-lg border border-border">
          <Marquee speed={150}>
            <Text variant="h4" className="mr-14 font-bold text-primary">
              FAST • FAST • FAST • FAST • FAST • FAST • FAST • FAST •
            </Text>
          </Marquee>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
