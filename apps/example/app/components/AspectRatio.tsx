import React from 'react';
import { View, Image } from 'react-native';
import { AspectRatio, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function AspectRatioScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="AspectRatio" 
      description="Maintains a consistent aspect ratio for its children, useful for images, videos, and cards."
    >
      <DemoSection title="16:9 (Widescreen)">
        <AspectRatio ratio={16 / 9}>
          <View style={{ flex: 1, backgroundColor: tokens.color.surface.raised, alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">16:9</Typography>
          </View>
        </AspectRatio>
      </DemoSection>

      <DemoSection title="4:3 (Classic)">
        <AspectRatio ratio={4 / 3}>
          <View style={{ flex: 1, backgroundColor: tokens.color.brand.muted, alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">4:3</Typography>
          </View>
        </AspectRatio>
      </DemoSection>

      <DemoSection title="1:1 (Square)">
        <View style={{ width: 150 }}>
          <AspectRatio ratio={1}>
            <View style={{ flex: 1, backgroundColor: tokens.color.success.muted, alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">Square</Typography>
            </View>
          </AspectRatio>
        </View>
      </DemoSection>
      
      <DemoSection title="With Image">
        <AspectRatio ratio={21 / 9}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' }} 
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          />
        </AspectRatio>
      </DemoSection>
    </DemoPage>
  );
}

