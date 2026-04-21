import React from 'react';
import { View, Image as RNImage } from 'react-native';
import { Typography, Card } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600';
const DEMO_IMAGE_2 = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600';

export default function ImageScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Image" 
      description="Display images with support for various aspect ratios, border radii, and background styles."
    >
      <DemoSection title="Basic Images">
        <DemoGroup direction="row">
          <RNImage
            source={{ uri: DEMO_IMAGE }}
            style={{ width: 100, height: 100, borderRadius: tokens.radius.md }}
          />
          <RNImage
            source={{ uri: DEMO_IMAGE_2 }}
            style={{ width: 100, height: 100, borderRadius: tokens.radius.full }}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Aspect Ratios">
        <Card padding="none" style={{ overflow: 'hidden' }}>
          <RNImage
            source={{ uri: DEMO_IMAGE }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
          <View style={{ padding: tokens.spacing[3] }}>
            <Typography variant="body2" color="secondary">
              Aspect Ratio 16:9 (Cover)
            </Typography>
          </View>
        </Card>

        <View style={{ height: tokens.spacing[4] }} />

        <Card padding="none" style={{ overflow: 'hidden' }}>
          <RNImage
            source={{ uri: DEMO_IMAGE_2 }}
            style={{ width: '100%', aspectRatio: 1 }}
            resizeMode="cover"
          />
          <View style={{ padding: tokens.spacing[3] }}>
            <Typography variant="body2" color="secondary">
              Square Aspect Ratio (1:1)
            </Typography>
          </View>
        </Card>
      </DemoSection>

      <DemoSection title="Image List Style">
         <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[2] }}>
            {[1, 2, 3, 4].map((i) => (
               <RNImage 
                  key={i}
                  source={{ uri: `https://picsum.photos/seed/${i + 20}/200` }}
                  style={{ 
                    width: '48%', 
                    aspectRatio: 1, 
                    borderRadius: tokens.radius.lg,
                    backgroundColor: tokens.color.bg.muted
                  }}
               />
            ))}
         </View>
      </DemoSection>
    </DemoPage>
  );
}

