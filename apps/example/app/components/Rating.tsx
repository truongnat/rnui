import { useTokens } from '@truongdq01/headless';
import { Rating, Typography, Box } from '@truongdq01/ui';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { Heart } from 'lucide-react-native';

export default function RatingScreen() {
  const t = useTokens();
  const [val1, setVal1] = useState(3);
  const [val2, setVal2] = useState(3.5);
  
  return (
    <DemoPage
      title="Rating"
      description="Ratings provide insight into others' opinions and experiences with a product or service."
    >
      <DemoSection title="Controlled Rating">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Interactive rating with default precision (1.0). Current value: {val1}
        </Typography>
        <Rating 
            value={val1} 
            onChange={setVal1} 
        />
      </DemoSection>

      <DemoSection title="Precision & Value Display">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Precision can be set to 0.5 for half-star values.
        </Typography>
        <Rating 
            value={val2} 
            onChange={setVal2} 
            precision={0.5} 
            showValue
        />
      </DemoSection>

      <DemoSection title="Sizes">
        <Box sx={{ gap: 'md' }}>
          <Box sx={{ flexDirection: 'row', alignItems: 'center', gap: 'sm' }}>
            <Rating size="sm" defaultValue={4} readOnly />
            <Typography variant="caption">Small</Typography>
          </Box>
          <Box sx={{ flexDirection: 'row', alignItems: 'center', gap: 'sm' }}>
            <Rating size="md" defaultValue={4} readOnly />
            <Typography variant="caption">Medium</Typography>
          </Box>
          <Box sx={{ flexDirection: 'row', alignItems: 'center', gap: 'sm' }}>
            <Rating size="lg" defaultValue={4} readOnly />
            <Typography variant="caption">Large</Typography>
          </Box>
        </Box>
      </DemoSection>

      <DemoSection title="Custom Icons">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Custom glyphs like hearts for a different vibe.
        </Typography>
        <Rating 
            precision={0.5}
            defaultValue={4.5}
            iconNames={{
                filled: 'heart',
                empty: 'heart',
                half: 'starHalf', // Half heart not available in default icons yet
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
        <Box sx={{ gap: 'md' }}>
          <Box sx={{ flexDirection: 'row', alignItems: 'center', gap: 'sm' }}>
            <Rating defaultValue={3.8} precision={0.1} readOnly ratingCount={1240} showValue />
          </Box>
          <Box sx={{ flexDirection: 'row', alignItems: 'center', gap: 'sm' }}>
            <Rating defaultValue={2} disabled />
            <Typography variant="caption" color="disabled">Disabled</Typography>
          </Box>
        </Box>
      </DemoSection>
    </DemoPage>
  );
}
