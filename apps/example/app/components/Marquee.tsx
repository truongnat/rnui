import React from 'react';
import { Marquee, Typography, Divider, Icon, Button } from '@truongdq01/ui';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function MarqueeScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Marquee"
      description="Smoothly scrolling content for headlines, tickers, or decorative elements."
    >
      <DemoSection title="Standard Text Marquee">
        <View style={styles.marqueeContainer}>
          <Marquee speed={60}>
            <Typography variant="h6" style={{ marginRight: 40 }}>
              BREAKING NEWS: The new component library is out now! • Explore 78+ components • built with Reanimated 3 • performance optimized • 
            </Typography>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <Typography variant="caption" style={{ marginBottom: 8, color: t.color.text.secondary }}>
          Pause on press enabled
        </Typography>
        <View style={[styles.marqueeContainer, { backgroundColor: t.color.bg.subtle }]}>
          <Marquee speed={40} pauseOnPress={true}>
            <View style={styles.row}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.badge}>
                  <Icon name="star" size={16} color={t.color.brand.primary} />
                  <Typography variant="body2" style={{ marginLeft: 8 }}>
                    Feature Item #{i}
                  </Typography>
                </View>
              ))}
            </View>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection title="Vertical Direction">
        <View style={[styles.verticalContainer, { borderColor: t.color.border.default }]}>
          <Marquee speed={30} direction="up">
            <View style={{ paddingVertical: 10 }}>
              <Typography variant="subtitle1" style={styles.verticalItem}>
                Top Trending Topics
              </Typography>
              <Typography variant="body2" style={styles.verticalItem}>
                1. React Native Hooks
              </Typography>
              <Typography variant="body2" style={styles.verticalItem}>
                2. Reanimated 3 Guide
              </Typography>
              <Typography variant="body2" style={styles.verticalItem}>
                3. TypeScript Generics
              </Typography>
              <Typography variant="body2" style={styles.verticalItem}>
                4. Native Architecture
              </Typography>
            </View>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection title="Custom Speed & No Fade">
        <View style={styles.marqueeContainer}>
          <Marquee speed={150} fadeEdges={false}>
            <Typography variant="h4" style={{ color: t.color.brand.primary, marginRight: 60, fontWeight: 'bold' }}>
              FAST • FAST • FAST • FAST • FAST • FAST • FAST • FAST • FAST • 
            </Typography>
          </Marquee>
        </View>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  marqueeContainer: {
    height: 60,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  verticalContainer: {
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  verticalItem: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
