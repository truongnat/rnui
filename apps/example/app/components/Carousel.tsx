import React from 'react';
import { View } from 'react-native';
import { Carousel, Typography, Card } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

const ITEMS = [
  { id: '1', title: 'Modern UI Design', color: '#7C3AED', description: 'Explore the latest trends in interface design.' },
  { id: '2', title: 'React Native Expert', color: '#0EA5E9', description: 'Build native apps with ease using RNUI library.' },
  { id: '3', title: 'Premium Aesthetics', color: '#10B981', description: 'WOW your users with stunning visual effects.' },
  { id: '4', title: 'Dynamic Layouts', color: '#F59E0B', description: 'Create responsive and adaptive screen content.' },
];

export default function CarouselScreen() {
  const { tokens } = useTheme();

  const renderBasicItem = (color: string) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" style={{ color: tokens.color.text.onBrand }}>
        Slide
      </Typography>
    </View>
  );

  const renderCardItem = (item: typeof ITEMS[0]) => (
    <Card style={{ margin: 8, height: '90%', justifyContent: 'center', backgroundColor: item.color }}>
        <Typography variant="h4" style={{ color: 'white' }}>{item.title}</Typography>
        <Typography variant="body2" style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
            {item.description}
        </Typography>
    </Card>
  );

  return (
    <DemoPage 
      title="Carousel" 
      description="A smooth, touch-enabled horizontal scrolling container with pagination."
    >
      <DemoSection title="Standard Carousel">
        <View style={{ height: 200, borderRadius: tokens.radius.lg, overflow: 'hidden' }}>
          <Carousel
            data={['#7C3AED', '#0EA5E9', '#10B981']}
            renderItem={renderBasicItem}
          />
        </View>
      </DemoSection>

      <DemoSection title="Card Carousel">
        <Typography variant="body2" gutterBottom>
            Carousel can be used to display a series of featured cards.
        </Typography>
        <View style={{ height: 180 }}>
          <Carousel
            data={ITEMS}
            renderItem={renderCardItem}
          />
        </View>
      </DemoSection>

      <DemoSection title="States">
          <Typography variant="body2">
              Carousels update pagination indicators automatically as the user scrolls.
          </Typography>
      </DemoSection>
    </DemoPage>
  );
}


