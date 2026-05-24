import { useMemo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { GlassCard, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function GlassCardScreen() {
  const t = useTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        background: {
          height: 200,
          width: '100%',
          borderRadius: t.radius.lg,
          overflow: 'hidden',
        },
        backgroundImage: {
          borderRadius: t.radius.lg,
        },
        content: {
          flex: 1,
          padding: t.spacing[5],
          justifyContent: 'center',
        },
        grid: {
          flex: 1,
          padding: t.spacing[5],
          flexDirection: 'row',
          gap: t.spacing[3],
          alignItems: 'center',
          justifyContent: 'center',
        },
        smallCard: {
          flex: 1,
          alignItems: 'center',
        },
      }),
    [t],
  );

  return (
    <DemoPage
      title="GlassCard"
      description="Glassmorphism card with background blur and tint."
    >
      <DemoSection title="Default" description="Standard blur with automatic tint." bare>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=1' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard>
              <Typography variant="h6" color="inverse">
                Default Glass
              </Typography>
              <Typography
                variant="body2"
                color="inverse"
                style={{ marginTop: t.spacing[1], opacity: 0.9 }}
              >
                Standard intensity blur with automatic tint.
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection title="Tints & Intensity" description="Light and dark blur strengths." bare>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=2' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.grid}>
            <GlassCard tint="light" intensity={20} style={styles.smallCard}>
              <Typography variant="subtitle2" color="primary">
                Light 20%
              </Typography>
            </GlassCard>
            <GlassCard tint="dark" intensity={60} style={styles.smallCard}>
              <Typography variant="subtitle2" color="inverse">
                Dark 60%
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection title="Custom Styling" description="Border radius and glass border." bare>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=3' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard
              borderRadius={t.radius['2xl']}
              style={{
                borderWidth: 2,
                borderColor: t.color.surface.glassBorder,
              }}
            >
              <Typography variant="h6" color="inverse">
                Custom Border & Radius
              </Typography>
              <Typography
                variant="body2"
                color="inverse"
                style={{ marginTop: t.spacing[1], opacity: 0.9 }}
              >
                Customizable via props and styles.
              </Typography>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>
    </DemoPage>
  );
}
