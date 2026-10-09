import { View, Image } from 'react-native';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function AspectRatioScreen() {
  return (
    <DemoPage
      title="AspectRatio"
      description="Maintain consistent proportions for images, video, and cards."
    >
      <DemoSection
        title="16:9"
        description="Widescreen video and hero banners."
      >
        <DemoPreview>
          <AspectRatio ratio={16 / 9}>
            <View className="flex-1 items-center justify-center bg-muted">
              <Text variant="large">16:9</Text>
            </View>
          </AspectRatio>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="4:3" description="Classic photo ratio.">
        <AspectRatio ratio={4 / 3}>
          <View className="flex-1 items-center justify-center bg-accent">
            <Text variant="large">4:3</Text>
          </View>
        </AspectRatio>
      </DemoSection>

      <DemoSection title="1:1" description="Square thumbnails and avatars.">
        <View style={{ width: 120 }}>
          <AspectRatio ratio={1}>
            <View className="flex-1 items-center justify-center bg-secondary">
              <Text variant="large">Square</Text>
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
            className="rounded-md"
            style={{ flex: 1 }}
          />
        </AspectRatio>
      </DemoSection>
    </DemoPage>
  );
}
