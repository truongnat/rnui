import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ImageList, ImageListItem } from '@/components/ui/image-list';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection, DemoGroup } from '@/demo/DemoPage';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600';
const DEMO_IMAGE_2 =
  'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600';

export default function ImageScreen() {
  const [failedSource, setFailedSource] = useState(false);
  const [version, setVersion] = useState(0);
  const [status, setStatus] = useState('Loading image');
  const resetImage = (failed: boolean) => {
    setStatus('Loading image');
    setFailedSource(failed);
    setVersion((value) => value + 1);
  };
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
            className="h-24 w-24"
            accessibilityLabel="Workspace, rounded crop"
          />
          <Image
            source={{ uri: DEMO_IMAGE_2 }}
            rounded="full"
            className="h-24 w-24"
            accessibilityLabel="Color study, circular crop"
          />
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="Aspect Ratios"
        description="Cover mode inside cards."
        bare
      >
        <View className="gap-4">
          <Card className="overflow-hidden">
            <Image
              source={{ uri: DEMO_IMAGE }}
              rounded="none"
              aspectRatio={16 / 9}
              className="w-full"
              resizeMode="cover"
              accessibilityLabel="Workspace"
            />
            <View className="p-4">
              <Text variant="muted">16:9 Cover</Text>
            </View>
          </Card>
          <Card className="flex-row overflow-hidden">
            <Image
              source={{ uri: DEMO_IMAGE_2 }}
              rounded="none"
              aspectRatio={1}
              className="w-32"
              resizeMode="cover"
              accessibilityLabel="Color study"
            />
            <View className="flex-1 justify-center p-4">
              <Text variant="muted">1:1 Square</Text>
            </View>
          </Card>
        </View>
      </DemoSection>
      <DemoSection
        title="Loading & fallback"
        description="Reload an image or recover from an unavailable source."
      >
        <Image
          source={{
            uri: failedSource
              ? 'file:///rnui-image-unavailable.png'
              : `${DEMO_IMAGE}&v=${version}`,
          }}
          aspectRatio={16 / 9}
          className="w-full"
          accessibilityLabel="Image state preview"
          onLoad={() => setStatus('Image loaded')}
          onError={() => setStatus('Image unavailable')}
        />
        <Text variant="muted" accessibilityLiveRegion="polite">
          {status}
        </Text>
        <View className="flex-row flex-wrap gap-3">
          <Button variant="outline" onPress={() => resetImage(!failedSource)}>
            <Text>{failedSource ? 'Load image' : 'Show fallback'}</Text>
          </Button>
          <Button variant="outline" onPress={() => resetImage(false)}>
            <Text>Reload image</Text>
          </Button>
        </View>
      </DemoSection>
      <DemoSection title="Grid" description="Two-column image gallery.">
        <ImageList cols={2} gap={8}>
          {[1, 2, 3, 4].map((i) => (
            <ImageListItem
              key={i}
              source={{ uri: `https://picsum.photos/seed/${i + 20}/400` }}
              imageProps={{ accessibilityLabel: `Gallery image ${i}` }}
            />
          ))}
        </ImageList>
      </DemoSection>
    </DemoPage>
  );
}
