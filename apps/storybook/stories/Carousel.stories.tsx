import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Carousel } from '@truongdq01/ui';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 0, gap: 12 }}>{children}</View>
  </ThemeProvider>
);

/**
 * Perceived luminance (sRGB). Returns true for light backgrounds
 * where dark text is more readable.
 */
function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5;
}

interface SlideData {
  bg: string;
  label: string;
}

const slides: SlideData[] = [
  { bg: '#f87171', label: 'Slide' },
  { bg: '#34d399', label: 'Slide' },
  { bg: '#60a5fa', label: 'Slide' },
  { bg: '#fbbf24', label: 'Slide' },
];

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  decorators: [
    (Story: any) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Carousel> = {
  render: () => (
    <View style={{ height: 250 }}>
      <Carousel
        data={slides}
        renderItem={(item: SlideData, index: number) => {
          const textColor = isLightColor(item.bg) ? '#1C1917' : '#FFFFFF';
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: item.bg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ color: textColor, fontSize: 24, fontWeight: 'bold' }}
              >
                {item.label} {index + 1}
              </Text>
            </View>
          );
        }}
      />
    </View>
  ),
};

export const Loop: StoryObj<typeof Carousel> = {
  render: () => (
    <View style={{ height: 250 }}>
      <Carousel
        loop={true}
        data={slides}
        renderItem={(item: SlideData, index: number) => {
          const textColor = isLightColor(item.bg) ? '#1C1917' : '#FFFFFF';
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: item.bg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ color: textColor, fontSize: 24, fontWeight: 'bold' }}
              >
                Looped {item.label} {index + 1}
              </Text>
              <Text style={{ color: textColor, fontSize: 14, opacity: 0.8 }}>
                Swipe past end to wrap around
              </Text>
            </View>
          );
        }}
      />
    </View>
  ),
};
