import { useMemo } from 'react';
import { View } from 'react-native';
import { Carousel, Typography, Card } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

type CarouselItem = {
  id: string;
  title: string;
  color: string;
  description: string;
};

export default function CarouselScreen() {
  const { tokens: t } = useTheme();

  const items = useMemo<CarouselItem[]>(
    () => [
      {
        id: '1',
        title: 'Modern UI Design',
        color: t.color.brand.default,
        description: 'Explore the latest trends in interface design.',
      },
      {
        id: '2',
        title: 'React Native Expert',
        color: t.color.info.border,
        description: 'Build native apps with ease using RNUI library.',
      },
      {
        id: '3',
        title: 'Premium Aesthetics',
        color: t.color.success.border,
        description: 'WOW your users with stunning visual effects.',
      },
      {
        id: '4',
        title: 'Dynamic Layouts',
        color: t.color.warning.border,
        description: 'Create responsive and adaptive screen content.',
      },
    ],
    [t],
  );

  const basicSlideColors = useMemo(
    () => [t.color.brand.default, t.color.info.border, t.color.success.border],
    [t],
  );

  const renderBasicItem = (color: string) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" color="inverse">
        Slide
      </Typography>
    </View>
  );

  const renderCardItem = (item: CarouselItem) => (
    <Card
      style={{
        margin: t.spacing[2],
        height: '90%',
        justifyContent: 'center',
        backgroundColor: item.color,
      }}
    >
      <Typography variant="h4" color="inverse">
        {item.title}
      </Typography>
      <Typography
        variant="body2"
        color="inverse"
        style={{ marginTop: t.spacing[2], opacity: 0.85 }}
      >
        {item.description}
      </Typography>
    </Card>
  );

  return (
    <DemoPage
      title="Carousel"
      description="Touch-enabled horizontal scrolling with pagination."
    >
      <DemoSection title="Standard" bare>
        <DemoPreview>
          <View style={{ height: 200, borderRadius: t.radius.lg, overflow: 'hidden' }}>
            <Carousel data={basicSlideColors} renderItem={renderBasicItem} />
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Card Carousel" description="Featured cards with pagination dots." bare>
        <View style={{ height: 180 }}>
          <Carousel data={items} renderItem={renderCardItem} />
        </View>
      </DemoSection>

      <DemoSection
        title="Pagination"
        description="Indicators update automatically as the user scrolls."
      />
    </DemoPage>
  );
}
