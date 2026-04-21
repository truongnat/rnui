import React, { useState } from 'react';
import { View } from 'react-native';
import { Slider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { Star } from 'lucide-react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function SliderScreen() {
  const { tokens } = useTheme();
  const [volume, setVolume] = useState(50);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]);
  const [vertVol, setVertVol] = useState(35);
  const [starSlider, setStarSlider] = useState(50);

  return (
    <DemoPage
      title="Slider"
      description="Sliders allow users to make selections from a range of values, with support for single values, intervals, and custom thumb rendering."
    >
      <DemoSection title="Basic Slider">
        <Slider
          label="Volume"
          showValue
          showMinMaxLabels
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={setVolume}
          formatValue={(v) => `${v}%`}
        />
      </DemoSection>

      <DemoSection title="Range Selection">
        <Slider
          range
          label="Price Range"
          showValue
          showMinMaxLabels
          min={0}
          max={500}
          step={5}
          value={priceRange}
          onChange={(v) => setPriceRange(v as [number, number])}
          formatValue={(v) => `$${v}`}
        />
      </DemoSection>

      <DemoSection title="Vertical Orientation">
        <View style={{ height: 220, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
          <Slider
            orientation="vertical"
            sliderHeight={180}
            label="Brightness"
            showValue
            min={0}
            max={100}
            value={vertVol}
            onChange={setVertVol}
            formatValue={(v) => `${v}%`}
          />
        </View>
      </DemoSection>

      <DemoSection title="Custom Thumb">
        <Slider
          label="Star Level"
          showValue
          min={0}
          max={100}
          value={starSlider}
          onChange={setStarSlider}
          thumbRenderer={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Star
                size={16}
                color={tokens.color.brand.default}
                fill={tokens.color.brand.subtle}
              />
            </View>
          )}
        />
      </DemoSection>
    </DemoPage>
  );
}

