import { useTokens } from '@truongdq01/headless';
import { Rating, Typography } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function RatingScreen() {
  const t = useTokens();
  const [val1, setVal1] = useState(3);
  const [val2, setVal2] = useState(3.5);

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

      <DemoSection title="Half Stars" description="Precision 0.5 with value display.">
        <Rating value={val2} onChange={setVal2} precision={0.5} showValue />
      </DemoSection>

      <DemoSection title="Sizes">
        <View style={{ gap: t.spacing[4] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <Rating size="sm" defaultValue={4} readOnly />
            <Typography variant="caption">Small</Typography>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <Rating size="md" defaultValue={4} readOnly />
            <Typography variant="caption">Medium</Typography>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <Rating size="lg" defaultValue={4} readOnly />
            <Typography variant="caption">Large</Typography>
          </View>
        </View>
      </DemoSection>

      <DemoSection title="Custom Icons" description="Hearts instead of stars.">
        <Rating
          precision={0.5}
          defaultValue={4.5}
          iconNames={{
            filled: 'heart',
            empty: 'heart',
            half: 'starHalf',
          }}
          renderIcon={(state, size, color) => (
            <Heart
              size={size}
              color={color}
              fill={state === 'filled' ? color : 'transparent'}
            />
          )}
        />
      </DemoSection>

      <DemoSection title="Read Only & Disabled">
        <View style={{ gap: t.spacing[4] }}>
          <Rating
            defaultValue={3.8}
            precision={0.1}
            readOnly
            ratingCount={1240}
            showValue
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] }}>
            <Rating defaultValue={2} disabled />
            <Typography variant="caption" color="disabled">
              Disabled
            </Typography>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
