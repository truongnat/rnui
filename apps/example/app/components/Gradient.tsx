import React from 'react';
import { Gradient, Typography, Divider } from '@truongdq01/ui';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function GradientScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Gradient"
      description="Linear gradient component with support for presets and custom color stops."
    >
      <DemoSection title="Presets">
        <View style={styles.grid}>
          <View style={styles.item}>
            <Gradient preset="brand" style={styles.gradientBox}>
              <Typography variant="subtitle2" style={styles.label}>Brand</Typography>
            </Gradient>
          </View>
          <View style={styles.item}>
            <Gradient preset="ocean" style={styles.gradientBox}>
              <Typography variant="subtitle2" style={styles.label}>Ocean</Typography>
            </Gradient>
          </View>
          <View style={styles.item}>
            <Gradient preset="sunset" style={styles.gradientBox}>
              <Typography variant="subtitle2" style={styles.label}>Sunset</Typography>
            </Gradient>
          </View>
          <View style={styles.item}>
            <Gradient preset="forest" style={styles.gradientBox}>
              <Typography variant="subtitle2" style={styles.label}>Forest</Typography>
            </Gradient>
          </View>
        </View>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <Gradient 
          colors={['#FF0080', '#FF8C00', '#40E0D0']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <Typography variant="h6" style={styles.label}>
            Three Color Stop Gradient
          </Typography>
          <Typography variant="body2" style={[styles.label, { opacity: 0.8 }]}>
            Custom angle and color palette
          </Typography>
        </Gradient>
      </DemoSection>

      <DemoSection title="Directional Examples">
        <View style={styles.grid}>
          <View style={styles.item}>
            <Gradient 
              preset="brand" 
              start={{ x: 0.5, y: 0 }} 
              end={{ x: 0.5, y: 1 }}
              style={styles.gradientBox}
            >
              <Typography variant="caption" style={styles.label}>Vertical</Typography>
            </Gradient>
          </View>
          <View style={styles.item}>
            <Gradient 
              preset="brand" 
              start={{ x: 0, y: 0.5 }} 
              end={{ x: 1, y: 0.5 }}
              style={styles.gradientBox}
            >
              <Typography variant="caption" style={styles.label}>Horizontal</Typography>
            </Gradient>
          </View>
          <View style={styles.item}>
            <Gradient 
              preset="brand" 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 1 }}
              style={styles.gradientBox}
            >
              <Typography variant="caption" style={styles.label}>Diagonal</Typography>
            </Gradient>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  item: {
    width: '48%',
    aspectRatio: 1,
  },
  gradientBox: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  heroGradient: {
    height: 120,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
