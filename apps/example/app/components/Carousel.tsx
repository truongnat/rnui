import { useMemo, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Carousel, Typography, Card } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
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

export default function CarouselScreen() {
  const toast = useToast();
  const { tokens: t } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = Math.round(windowWidth * 0.78);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        heroImage: {
          width: '100%',
          height: '100%',
        },
        heroOverlay: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: t.spacing[4],
          gap: t.spacing[1],
          experimental_backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
        },
        card: {
          flex: 1,
          overflow: 'hidden',
          marginHorizontal: t.spacing[1.5],
        },
        cardImage: {
          width: '100%',
          height: t.spacing[18] + t.spacing[8],
        },
        cardBody: {
          padding: t.spacing[3],
          gap: t.spacing[1],
        },
        railCard: {
          flex: 1,
          overflow: 'hidden',
        },
        railImage: {
          width: '100%',
          height: t.spacing[18],
        },
        railBody: {
          padding: t.spacing[3],
        },
      }),
    [t.spacing]
  );

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

  const renderHeroItem = (item: CarouselSlide) => (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.heroImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.heroOverlay}>
        <Typography variant="h4" color="inverse">
          {item.title}
        </Typography>
        <Typography variant="body2" color="inverse" style={{ opacity: 0.9 }}>
          {item.description}
        </Typography>
      </View>
    </View>
  );

  const renderStoryCard = (item: CarouselSlide) => (
    <Card style={styles.card} padding="none">
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.cardBody}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="body2" color="secondary">
          {item.description}
        </Typography>
      </View>
    </Card>
  );

  const renderRailCard = (item: CarouselSlide) => (
    <Card style={styles.railCard} padding="none">
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.railImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.railBody}>
        <Typography variant="subtitle2">{item.title}</Typography>
      </View>
    </Card>
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
        <View
          style={{
            borderRadius: t.radius.lg,
            overflow: 'hidden',
          }}
        >
          <Carousel
            data={heroSlides}
            accessibilityLabel="Featured landscapes"
            height={200}
            showNavigation={false}
            fadeEdges={false}
            onIndexChange={setActiveIndex}
            keyExtractor={(item) => item.id}
            renderItem={renderHeroItem}
          />
        </View>
        <Typography variant="caption" color="secondary" align="center">
          Slide {activeIndex + 1} of {heroSlides.length}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Card carousel"
        description="Peek-and-snap cards with fade edges and circular navigation buttons."
        bare
      >
        <Carousel
          data={storySlides}
          accessibilityLabel="Featured stories"
          autoHeight
          itemWidth={cardWidth}
          gap={t.spacing[2]}
          edgeColor={t.color.bg.subtle}
          keyExtractor={(item) => item.id}
          renderItem={renderStoryCard}
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
        description="Snap off — a free-scrolling image rail that fades at the edges."
      >
        <DemoPreview>
          <Carousel
            data={storySlides}
            accessibilityLabel="Inspiration rail"
            height={t.spacing[18] + t.spacing[10]}
            itemWidth={200}
            gap={t.spacing[3]}
            snap={false}
            showPagination={false}
            edgeColor={t.color.surface.sunken}
            keyExtractor={(item) => item.id}
            renderItem={renderRailCard}
          />
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
