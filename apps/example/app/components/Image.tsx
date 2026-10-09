import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection, DemoGroup, DemoPreview } from '@/demo/DemoPage';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600';
const DEMO_IMAGE_2 =
  'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600';

export default function ImageScreen() {
  return (
    <DemoPage
      title="Image"
      description="Display images with aspect ratios, radii, and cover modes."
    >
      <DemoSection title="Basic" description="Rounded and circular crops.">
        <DemoGroup direction="row">
          <Image
            source={{ uri: DEMO_IMAGE }}
            rounded="md"
            style={{ width: 96, height: 96 }}
          />
          <Image
            source={{ uri: DEMO_IMAGE_2 }}
            rounded="full"
            style={{ width: 96, height: 96 }}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Aspect Ratios"
        description="Cover mode inside cards."
        bare
      >
        <Card className="overflow-hidden">
          <Image
            source={{ uri: DEMO_IMAGE }}
            rounded="none"
            aspectRatio={16 / 9}
            className="w-full"
            resizeMode="cover"
          />
          <View style={{ padding: 12 }}>
            <Text variant="muted">16:9 Cover</Text>
          </View>
        </Card>

        <View style={{ height: 16 }} />

        <Card className="overflow-hidden">
          <Image
            source={{ uri: DEMO_IMAGE_2 }}
            rounded="none"
            aspectRatio={1}
            className="w-full"
            resizeMode="cover"
          />
          <View style={{ padding: 12 }}>
            <Text variant="muted">1:1 Square</Text>
          </View>
        </Card>
      </DemoSection>

      <DemoSection title="Grid" description="Two-column image gallery.">
        <DemoPreview>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                source={{ uri: `https://picsum.photos/seed/${i + 20}/200` }}
                rounded="lg"
                aspectRatio={1}
                style={{ width: '48%' }}
              />
            ))}
          </View>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
