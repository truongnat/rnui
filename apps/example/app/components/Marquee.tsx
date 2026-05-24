import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Icon, Marquee, Typography } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function MarqueeScreen() {
  const t = useTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        marqueeContainer: {
          height: 60,
          justifyContent: 'center',
          borderRadius: t.radius.md,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: t.color.border.subtle,
          overflow: 'hidden',
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: t.spacing[4],
          paddingVertical: t.spacing[2],
          backgroundColor: t.color.surface.raised,
          borderRadius: t.radius.full,
          marginRight: t.spacing[4],
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: t.color.border.default,
        },
        verticalContainer: {
          height: 120,
          borderRadius: t.radius.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: t.color.border.default,
          paddingHorizontal: t.spacing[4],
          overflow: 'hidden',
        },
        verticalItem: {
          marginBottom: t.spacing[4],
          textAlign: 'center',
        },
      }),
    [t],
  );

  return (
    <DemoPage
      title="Marquee"
      description="Smoothly scrolling content for headlines and tickers."
    >
      <DemoSection title="Text" bare>
        <DemoPreview>
          <View style={styles.marqueeContainer}>
            <Marquee speed={60}>
              <Typography variant="h6" style={{ marginRight: t.spacing[10] }}>
                BREAKING NEWS: The new component library is out now! • Explore 78+
                components • built with Reanimated 3 • performance optimized •
              </Typography>
            </Marquee>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Pause on Press" description="Tap to pause scrolling.">
        <View
          style={[
            styles.marqueeContainer,
            { backgroundColor: t.color.bg.subtle },
          ]}
        >
          <Marquee speed={40} pauseOnPress>
            <View style={styles.row}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.badge}>
                  <Icon name="star" size={16} color={t.color.brand.primary} />
                  <Typography variant="body2" style={{ marginLeft: t.spacing[2] }}>
                    Feature Item #{i}
                  </Typography>
                </View>
              ))}
            </View>
          </Marquee>
        </View>
      </DemoSection>

      <DemoSection title="Vertical" bare>
        <DemoPreview>
          <View style={styles.verticalContainer}>
            <Marquee speed={30} direction="up">
              <View style={{ paddingVertical: t.spacing[2.5] }}>
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
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Fast & No Fade" description="High speed without edge fade.">
        <View style={styles.marqueeContainer}>
          <Marquee speed={150} fadeEdges={false}>
            <Typography
              variant="h4"
              color="brand"
              style={{ marginRight: t.spacing[14], fontWeight: '700' }}
            >
              FAST • FAST • FAST • FAST • FAST • FAST • FAST • FAST •
            </Typography>
          </Marquee>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
