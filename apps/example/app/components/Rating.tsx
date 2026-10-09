import { useState } from 'react';
import { View } from 'react-native';
import { Rating } from '@/components/ui/rating';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function RatingScreen() {
  const [val1, setVal1] = useState(3);
  const [val2, setVal2] = useState(4);

  return (
    <DemoPage
      title="Rating"
      description="Star ratings for products, content, and feedback."
    >
      <DemoSection
        title="Controlled"
        description={`Interactive rating. Current value: ${val1}`}
      >
        <Rating value={val1} onChange={setVal1} />
      </DemoSection>

      <DemoSection
        title="Value Display"
        description="Pair the control with a numeric readout."
      >
        <View className="flex-row items-center gap-2">
          <Rating value={val2} onChange={setVal2} />
          <Text variant="muted">{val2}/5</Text>
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            <Rating value={4} size={16} readonly />
            <Text variant="small">Small</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Rating value={4} size={24} readonly />
            <Text variant="small">Medium</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Rating value={4} size={32} readonly />
            <Text variant="small">Large</Text>
          </View>
        </View>
      </DemoSection>

      <DemoSection
        title="Custom Max & Colors"
        description="Ten hearts-worth of stars with a destructive tint."
      >
        <Rating value={6} max={10} readonly color="#ef4444" />
      </DemoSection>

      <DemoSection title="Read Only & Disabled">
        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            <Rating value={4} readonly />
            <Text variant="muted">1,240 ratings</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Rating value={2} disabled />
            <Text variant="muted">Disabled</Text>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
