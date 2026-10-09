import { useMemo, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Card } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

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

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    gap: 4,
    experimental_backgroundImage:
      'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
  },
  card: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  cardImage: {
    width: '100%',
    height: 104,
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  railCard: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  railImage: {
    width: '100%',
    height: 72,
  },
  railBody: {
    padding: 12,
  },
});

export default function CarouselScreen() {
  const { toast } = useToast();
  const { width: windowWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = Math.round(windowWidth * 0.78);

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
    >
      <DemoSection
        title="Hero carousel"
        description="Full-width, snap paging with tappable dots — a clean image hero."
        bare
      >
        <View style={{ borderRadius: 12, overflow: 'hidden', height: 200 }}>
          <Carousel
            data={heroSlides}
            accessibilityLabel="Featured landscapes"
            onIndexChange={setActiveIndex}
            renderItem={(item) => (
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.heroImage}
                  resizeMode="cover"
                  accessibilityIgnoresInvertColors
                />
                <View style={styles.heroOverlay}>
                  <Text variant="h4" style={{ color: '#fafafa' }}>
                    {item.title}
                  </Text>
                  <Text variant="p" style={{ color: '#fafafa', opacity: 0.9 }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <Text variant="muted" style={{ textAlign: 'center' }}>
          Slide {activeIndex + 1} of {heroSlides.length}
        </Text>
      </DemoSection>

      <DemoSection
        title="Card carousel"
        description="Peek-and-snap cards with circular navigation buttons."
        bare
      >
        <Carousel
          data={storySlides}
          accessibilityLabel="Featured stories"
          itemWidth={cardWidth}
          showArrows
          renderItem={(item) => (
            <Card style={styles.card}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
              <View style={styles.cardBody}>
                <Text variant="large">{item.title}</Text>
                <Text variant="muted">{item.description}</Text>
              </View>
            </Card>
          )}
          onIndexChange={(index) => {
            const item = storySlides[index];
            if (item) {
              toast.info(`Viewing ${item.title}`);
            }
          }}
        />
      </DemoSection>

      <DemoSection
        title="Continuous strip"
        description="A compact image rail without dots."
      >
        <DemoPreview>
          <Carousel
            data={storySlides}
            accessibilityLabel="Inspiration rail"
            itemWidth={200}
            showDots={false}
            renderItem={(item) => (
              <Card style={styles.railCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.railImage}
                  resizeMode="cover"
                  accessibilityIgnoresInvertColors
                />
                <View style={styles.railBody}>
                  <Text variant="small">{item.title}</Text>
                </View>
              </Card>
            )}
          />
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
