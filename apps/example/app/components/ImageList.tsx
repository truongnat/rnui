import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@/components/ui/image-list';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const IMAGES: { id: number; title: string; author: string; span?: number }[] = [
  { id: 1, title: 'Mountain Lake', author: 'nature_lover', span: 2 },
  { id: 2, title: 'City Lights', author: 'urban_explorer' },
  { id: 3, title: 'Desert Sands', author: 'wanderlust' },
  { id: 4, title: 'Forest Trail', author: 'hiker_joe', span: 2 },
  { id: 5, title: 'Ocean Waves', author: 'surfer_girl' },
  { id: 6, title: 'Snowy Peak', author: 'alpha_ski' },
];

const PHOTO_URLS = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
  'https://images.unsplash.com/photo-1448375240586-882707db888b',
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
];
const photoSource = (id: number) => ({
  uri: `${PHOTO_URLS[id - 1]}?auto=format&fit=crop&w=600&q=80`,
});

function SaveImageButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(saved ? 1 : 0, { duration: 180 });
    return () => cancelAnimation(progress);
  }, [progress, saved]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 0.12 }],
  }));
  return (
    <IconButton
      size="lg"
      accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${title}`}
      accessibilityState={{ selected: saved }}
      onPress={() => setSaved((value) => !value)}
      icon={
        <Animated.View style={animatedStyle}>
          <Icon
            name={saved ? 'check' : 'heart'}
            size="md"
            tone={saved ? 'success' : 'foreground'}
          />
        </Animated.View>
      }
    />
  );
}

export default function ImageListScreen() {
  return (
    <DemoPage
      title="ImageList"
      description="Optimized image grids — standard, wide, and staggered layouts."
    >
      <DemoSection
        title="Standard"
        description="Two columns with title bars."
        bare
      >
        <ImageList cols={2} gap={12}>
          {IMAGES.map((item) => (
            <ImageListItem
              key={item.id}
              aspectRatio={3 / 4}
              source={photoSource(item.id)}
              imageProps={{ accessibilityLabel: item.title }}
            >
              <ImageListItemBar
                title={item.title}
                subtitle={`by @${item.author}`}
                actionIcon={<SaveImageButton title={item.title} />}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>
      <DemoSection
        title="Wide spans"
        description="Feature tiles spanning multiple columns."
        bare
      >
        <ImageList cols={3} gap={8}>
          {IMAGES.map((item) => (
            <ImageListItem
              key={item.id}
              span={item.span ?? 1}
              aspectRatio={item.span === 2 ? 16 / 9 : 1}
              source={photoSource(item.id)}
              imageProps={{ accessibilityLabel: item.title }}
            />
          ))}
        </ImageList>
      </DemoSection>
      <DemoSection
        title="Portrait"
        description="Staggered portrait tiles."
        bare
      >
        <View className="flex-row gap-3">
          {[0, 1].map((column) => (
            <View
              key={column}
              className="flex-1"
              style={{ paddingTop: column === 1 ? 24 : 0 }}
            >
              <ImageList cols={1} gap={12}>
                {IMAGES.slice(0, 4)
                  .filter((_, index) => index % 2 === column)
                  .map((item) => (
                    <ImageListItem
                      key={item.id}
                      aspectRatio={3 / 4}
                      source={photoSource(item.id)}
                      imageProps={{ accessibilityLabel: item.title }}
                    />
                  ))}
              </ImageList>
            </View>
          ))}
        </View>
      </DemoSection>
    </DemoPage>
  );
}
