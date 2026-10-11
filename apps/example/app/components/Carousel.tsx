import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type CarouselSlide = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
] as const;

const STORY_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
] as const;

export default function CarouselScreen() {
  const [contentWidth, setContentWidth] = useState(320);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [heroBottom, setHeroBottom] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, [])
  );
  const cardWidth = Math.round(contentWidth * 0.86);

  const heroSlides = useMemo<CarouselSlide[]>(
    () => [
      {
        id: 'hero-1',
        title: 'Mountain lake',
        description: 'Featured landscape photography.',
        imageUrl: HERO_IMAGES[0],
      },
      {
        id: 'hero-2',
        title: 'Forest trail',
        description: 'Swipe through full-width heroes.',
        imageUrl: HERO_IMAGES[1],
      },
      {
        id: 'hero-3',
        title: 'Misty peaks',
        description: 'Tap the dots to jump between slides.',
        imageUrl: HERO_IMAGES[2],
      },
    ],
    []
  );

  const storySlides = useMemo<CarouselSlide[]>(
    () => [
      {
        id: 'story-1',
        title: 'Build faster',
        description: 'Ship polished mobile UI with RNUI primitives.',
        imageUrl: STORY_IMAGES[0],
      },
      {
        id: 'story-2',
        title: 'Design systems',
        description:
          'Theme tokens keep every screen consistent — colors, spacing, radius, and motion all derive from one source of truth, so a long description like this one no longer gets clipped by a fixed height.',
        imageUrl: STORY_IMAGES[1],
      },
      {
        id: 'story-3',
        title: 'Developer flow',
        description: 'Compose cards, typography, and motion together.',
        imageUrl: STORY_IMAGES[2],
      },
      {
        id: 'story-4',
        title: 'Team collaboration',
        description: 'Shared components reduce one-off screen work.',
        imageUrl: STORY_IMAGES[3],
      },
    ],
    []
  );

  return (
    <DemoPage
      title="Carousel"
      description="Swipeable photo strips with snap, pagination, and navigation controls."
      onScroll={(event) => {
        setHeroVisible(event.nativeEvent.contentOffset.y < heroBottom);
      }}
    >
      <View
        onLayout={(event) =>
          setHeroBottom(
            event.nativeEvent.layout.y + event.nativeEvent.layout.height
          )
        }
      >
        <DemoSection
          title="Hero carousel"
          description="Auto-play loops every three seconds. Pause to inspect a slide; dragging restarts the interval. Reduced Motion and screen readers keep it manual."
          bare
        >
          <View
            onLayout={(event) =>
              setContentWidth(event.nativeEvent.layout.width)
            }
            className="w-full"
          >
            <Carousel
              data={heroSlides}
              accessibilityLabel="Featured landscapes"
              onIndexChange={setActiveIndex}
              autoPlay={playing && focused && heroVisible}
              autoPlayInterval={3000}
              loop
              renderItem={(item) => (
                <View className="overflow-hidden rounded-lg bg-card">
                  <Image
                    source={{ uri: item.imageUrl }}
                    rounded="none"
                    aspectRatio={16 / 9}
                    className="w-full"
                    resizeMode="cover"
                    accessibilityLabel={item.title}
                    accessibilityIgnoresInvertColors
                  />
                  <View className="gap-1 p-4">
                    <Text variant="h4">{item.title}</Text>
                    <Text variant="muted">{item.description}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          <Text
            variant="muted"
            className="text-center text-xs"
            accessibilityLiveRegion="polite"
          >
            Slide {activeIndex + 1} of {heroSlides.length}
          </Text>
          <Button
            variant="outline"
            accessibilityLabel={playing ? 'Pause carousel' : 'Resume carousel'}
            onPress={() => setPlaying((value) => !value)}
          >
            {playing ? 'Pause auto-play' : 'Resume auto-play'}
          </Button>
        </DemoSection>
      </View>

      <DemoSection
        title="Card carousel"
        description="Peek-and-snap cards in a padded viewport with circular navigation buttons."
        bare
      >
        <Carousel
          data={storySlides}
          accessibilityLabel="Featured stories"
          itemWidth={cardWidth}
          showArrows
          itemClassName="pr-3"
          className="px-3"
          renderItem={(item) => (
            <Card className="flex-1 overflow-hidden shadow-none">
              <Image
                source={{ uri: item.imageUrl }}
                rounded="none"
                aspectRatio={16 / 9}
                className="w-full"
                resizeMode="cover"
                accessibilityLabel={item.title}
                accessibilityIgnoresInvertColors
              />
              <View className="gap-2 p-4">
                <Text variant="large">{item.title}</Text>
                <Text variant="muted">{item.description}</Text>
              </View>
            </Card>
          )}
        />
      </DemoSection>

      <DemoSection
        title="Continuous strip"
        description="A compact image rail without dots."
        bare
      >
        <Carousel
          data={storySlides}
          accessibilityLabel="Inspiration rail"
          itemWidth={200}
          itemClassName="pr-3"
          showDots={false}
          renderItem={(item) => (
            <Card className="flex-1 overflow-hidden shadow-none">
              <Image
                source={{ uri: item.imageUrl }}
                rounded="none"
                aspectRatio={16 / 9}
                className="w-full"
                accessibilityLabel={item.title}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
              <View className="p-3">
                <Text variant="small">{item.title}</Text>
              </View>
            </Card>
          )}
        />
      </DemoSection>
    </DemoPage>
  );
}
