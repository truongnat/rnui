import { ImageBackground, StyleSheet, View } from 'react-native';
import { GlassCard } from '@/components/ui/glass-card';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function GlassCardScreen() {
  return (
    <DemoPage
      title="GlassCard"
      description="Glassmorphism card with background blur and tint."
    >
      <DemoSection
        title="Default"
        description="Standard blur with automatic tint."
        bare
      >
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=1' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard>
              <Text variant="large" className="text-white">
                Default Glass
              </Text>
              <Text
                className="text-white"
                style={{ marginTop: 4, opacity: 0.9 }}
              >
                Standard intensity blur with automatic tint.
              </Text>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection
        title="Tints & Intensity"
        description="Light and dark blur strengths."
        bare
      >
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=2' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.grid}>
            <GlassCard tint="light" intensity={20} style={styles.smallCard}>
              <Text variant="small" className="text-zinc-900">
                Light 20%
              </Text>
            </GlassCard>
            <GlassCard tint="dark" intensity={60} style={styles.smallCard}>
              <Text variant="small" className="text-white">
                Dark 60%
              </Text>
            </GlassCard>
          </View>
        </ImageBackground>
      </DemoSection>

      <DemoSection
        title="Custom Styling"
        description="Border radius and glass border."
        bare
      >
        <ImageBackground
          source={{ uri: 'https://picsum.photos/800/400?random=3' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.content}>
            <GlassCard
              className="rounded-3xl"
              style={{
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.45)',
              }}
            >
              <Text variant="large" className="text-white">
                Custom Border & Radius
              </Text>
              <Text
                className="text-white"
                style={{ marginTop: 4, opacity: 0.9 }}
              >
                Customizable via props and styles.
              </Text>
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 12,
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
  smallCard: {
    flex: 1,
    alignItems: 'center',
  },
});
