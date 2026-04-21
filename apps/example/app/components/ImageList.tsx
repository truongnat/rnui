import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Typography, Icon } from '@truongdq01/ui';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

const IMAGES = [
  { id: 1, title: 'Mountain Lake', author: 'nature_lover', rows: 2, cols: 2 },
  { id: 2, title: 'City Lights', author: 'urban_explorer' },
  { id: 3, title: 'Desert Sands', author: 'wanderlust' },
  { id: 4, title: 'Forest Trail', author: 'hiker_joe', rows: 2 },
  { id: 5, title: 'Ocean Waves', author: 'surfer_girl' },
  { id: 6, title: 'Snowy Peak', author: 'alpha_ski' },
];

export default function ImageListScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="ImageList"
      description="Display a collection of images in an optimized grid layout."
    >
      <DemoSection title="Standard Layout">
        <ImageList cols={2} gap={8} rowHeight={160}>
          {IMAGES.map((item) => (
            <ImageListItem key={item.id}>
              <Image
                source={{ uri: `https://picsum.photos/400/400?random=${item.id}` }}
                style={styles.image}
              />
              <ImageListItemBar
                title={item.title}
                subtitle={`by @${item.author}`}
                actionIcon={
                  <Icon name="heart" size={20} color="#fff" style={{ marginRight: 8 }} />
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>

      <DemoSection title="Quilted (Masonry-like)">
        <ImageList variant="quilted" cols={3} gap={4} rowHeight={100}>
          {IMAGES.map((item) => (
            <ImageListItem 
              key={item.id} 
              cols={item.cols || 1} 
              rows={item.rows || 1}
            >
              <Image
                source={{ uri: `https://picsum.photos/400/400?random=${item.id + 10}` }}
                style={styles.image}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>

      <DemoSection title="Woven Layout">
        <ImageList variant="woven" cols={2} gap={12}>
          {IMAGES.slice(0, 4).map((item) => (
            <ImageListItem key={item.id}>
              <Image
                source={{ uri: `https://picsum.photos/400/600?random=${item.id + 20}` }}
                style={[styles.image, { borderRadius: 16 }]}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
