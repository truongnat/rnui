import { useState } from 'react';
import { View } from 'react-native';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SliderScreen() {
  const [volume, setVolume] = useState(50);
  const [price, setPrice] = useState(120);
  const [brightness, setBrightness] = useState(35);

  return (
    <DemoPage
      title="Slider"
      description="Select a value from a continuous range."
    >
      <DemoSection
        title="Basic"
        description="Single value with min/max labels."
      >
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text variant="small">Volume</Text>
            <Text variant="small" className="text-muted-foreground">
              {volume}%
            </Text>
          </View>
          <Slider
            min={0}
            max={100}
            step={1}
            value={volume}
            onValueChange={setVolume}
          />
          <View className="flex-row justify-between">
            <Text variant="muted">0</Text>
            <Text variant="muted">100</Text>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        title="Stepped"
        description="Snaps to increments of 5 across a custom range."
      >
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text variant="small">Price Cap</Text>
            <Text variant="small" className="text-muted-foreground">
              ${price}
            </Text>
          </View>
          <Slider
            min={0}
            max={500}
            step={5}
            value={price}
            onValueChange={setPrice}
          />
          <View className="flex-row justify-between">
            <Text variant="muted">$0</Text>
            <Text variant="muted">$500</Text>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        title="Callbacks"
        description="onSlidingStart / onSlidingComplete fire around drags."
      >
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text variant="small">Brightness</Text>
            <Text variant="small" className="text-muted-foreground">
              {brightness}%
            </Text>
          </View>
          <Slider
            min={0}
            max={100}
            value={brightness}
            onValueChange={setBrightness}
            onSlidingComplete={(v) => setBrightness(v)}
          />
        </View>
      </DemoSection>

      <DemoSection title="Disabled" description="Non-interactive track.">
        <Slider min={0} max={100} value={60} disabled />
      </DemoSection>
    </DemoPage>
  );
}
