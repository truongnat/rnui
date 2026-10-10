import { useState } from 'react';
import { View } from 'react-native';
import { Rating } from '@/components/ui/rating';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function RatingScreen() {
  const [valControlled, setValControlled] = useState(3);
  const [valDisplay, setValDisplay] = useState(4);
  const [valSm, setValSm] = useState(3);
  const [valMd, setValMd] = useState(4);
  const [valLg, setValLg] = useState(5);
  const [valCustom, setValCustom] = useState(7);

  return (
    <DemoPage
      title="Rating"
      description="Star ratings for products, content, and feedback — tap any star to rate or tap again to clear."
    >
      <DemoSection
        title="Interactive Rating"
        description={`Tap a star to rate, tap the same star again to clear. Value: ${valControlled}/5`}
      >
        <Rating value={valControlled} onChange={setValControlled} />
      </DemoSection>

      <DemoSection
        title="Value Display Readout"
        description="Pair the control with a numeric readout that updates in real-time."
      >
        <View className="flex-row items-center gap-3">
          <Rating value={valDisplay} onChange={setValDisplay} />
          <Text variant="small" className="font-semibold text-foreground">
            {valDisplay} / 5 stars
          </Text>
        </View>
      </DemoSection>

      <DemoSection
        title="Sizes (All Interactive)"
        description="Small (16px), Medium (24px), Large (32px) — test tapping across different scales."
      >
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Rating value={valSm} onChange={setValSm} size={16} />
            <Text variant="small" className="text-muted-foreground">
              Small ({valSm}/5)
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Rating value={valMd} onChange={setValMd} size={24} />
            <Text variant="small" className="text-muted-foreground">
              Medium ({valMd}/5)
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Rating value={valLg} onChange={setValLg} size={32} />
            <Text variant="small" className="text-muted-foreground">
              Large ({valLg}/5)
            </Text>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        title="Custom Scale & Colors"
        description={`10 stars scale with custom red tint. Value: ${valCustom}/10`}
      >
        <View className="gap-2">
          <Rating
            value={valCustom}
            onChange={setValCustom}
            max={10}
            size={22}
            color="#ef4444"
          />
          <Text variant="muted">Score: {valCustom} out of 10 points</Text>
        </View>
      </DemoSection>

      <DemoSection
        title="Read Only & Disabled"
        description="Static display mode for reviews and locked accounts."
      >
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Rating value={4} readonly />
            <Text variant="muted">4.8 (1,240 verified reviews)</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Rating value={2} disabled />
            <Text variant="muted">Disabled (locked state)</Text>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
