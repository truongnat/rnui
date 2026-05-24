import { View, Image } from 'react-native';
import { AspectRatio, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function AspectRatioScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="AspectRatio"
      description="Maintain consistent proportions for images, video, and cards."
    >
      <DemoSection title="16:9" description="Widescreen video and hero banners.">
        <DemoPreview>
          <AspectRatio ratio={16 / 9}>
            <View
              style={{
                flex: 1,
                backgroundColor: tokens.color.surface.raised,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6">16:9</Typography>
            </View>
          </AspectRatio>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="4:3" description="Classic photo ratio.">
        <AspectRatio ratio={4 / 3}>
          <View
            style={{
              flex: 1,
              backgroundColor: tokens.color.brand.muted,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">4:3</Typography>
          </View>
        </AspectRatio>
      </DemoSection>

      <DemoSection title="1:1" description="Square thumbnails and avatars.">
        <View style={{ width: tokens.spacing[24] + tokens.spacing[6] }}>
          <AspectRatio ratio={1}>
            <View
              style={{
                flex: 1,
                backgroundColor: tokens.color.success.bg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6">Square</Typography>
            </View>
          </AspectRatio>
        </View>
      </DemoSection>

      <DemoSection title="With Image" description="Ultrawide 21:9 crop.">
        <AspectRatio ratio={21 / 9}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
            }}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          />
        </AspectRatio>
      </DemoSection>
    </DemoPage>
  );
}
