import React from 'react';
import { GlassCard, Typography, Divider } from '@truongdq01/ui';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function GlassCardScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="GlassCard"
      description="A card component with glassmorphism effect, using background blur."
    >
      <DemoSection title="Basic Glass Cards">
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=1' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard style={styles.card}>
              <Typography variant="h6" style={{ color: '#fff' }}>
                Default Glass
              </Typography>
              <Typography variant="body2" style={{ color: '#fff', marginTop: 4 }}>
                Standard intensity blur with automatic tint.
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection title="Tints & Intensity">
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=2' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.grid}>
            <GlassCard tint="light" intensity={20} style={styles.smallCard}>
              <Typography variant="subtitle2" style={{ color: '#000' }}>
                Light 20%
              </Typography>
            </GlassCard>

            <GlassCard tint="dark" intensity={60} style={styles.smallCard}>
              <Typography variant="subtitle2" style={{ color: '#fff' }}>
                Dark 60%
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection title="Custom Styling">
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=3' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard
              borderRadius={40}
              style={[
                styles.card,
                {
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              ]}
            >
              <Typography variant="h6" style={{ color: '#fff' }}>
                Custom Border & Radius
              </Typography>
              <Typography variant="body2" style={{ color: '#fff', marginTop: 4 }}>
                Fully customizable through props and styles.
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 200,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
  },
  smallCard: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
});
