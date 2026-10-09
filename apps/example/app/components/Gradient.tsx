import { StyleSheet, View } from 'react-native';
import { Gradient } from '@/components/ui/gradient';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

type Preset = 'brand' | 'ocean' | 'sunrise' | 'success';

export default function GradientScreen() {
  const colors = useThemeColor();

  const PRESETS: Record<Preset, string[]> = {
    brand: [colors.primary, colors.ring],
    ocean: ['#0ea5e9', '#6366f1'],
    sunrise: ['#f59e0b', '#ef4444'],
    success: ['#22c55e', '#84cc16'],
  };

  const labelShadow = {
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  };

  return (
    <DemoPage
      title="Gradient"
      description="Linear gradients with presets and custom color stops."
    >
      <DemoSection
        title="Presets"
        description="brand, ocean, sunrise, and success."
      >
        <DemoPreview>
          <View style={styles.grid}>
            {(Object.keys(PRESETS) as Preset[]).map((preset) => (
              <View key={preset} style={styles.item}>
                <Gradient colors={PRESETS[preset]} style={styles.gradientBox}>
                  <Text
                    variant="large"
                    className="text-white"
                    style={[labelShadow, { textAlign: 'center' }]}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </Text>
                </Gradient>
              </View>
            ))}
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Custom Colors"
        description="Three-stop diagonal gradient."
      >
        <Gradient
          colors={[colors.primary, '#f59e0b', '#0ea5e9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <Text
            variant="large"
            className="text-white"
            style={[labelShadow, { textAlign: 'center' }]}
          >
            Three Color Stop Gradient
          </Text>
          <Text
            className="text-white"
            style={[labelShadow, { textAlign: 'center', opacity: 0.85 }]}
          >
            Custom angle and color palette
          </Text>
        </Gradient>
      </DemoSection>

      <DemoSection
        title="Direction"
        description="Vertical, horizontal, and diagonal."
      >
        <View style={styles.grid}>
          {(
            [
              {
                label: 'Vertical',
                start: { x: 0.5, y: 0 },
                end: { x: 0.5, y: 1 },
              },
              {
                label: 'Horizontal',
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              },
              { label: 'Diagonal', start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
            ] as const
          ).map(({ label, start, end }) => (
            <View key={label} style={styles.item}>
              <Gradient
                colors={PRESETS.brand}
                start={start}
                end={end}
                style={styles.gradientBox}
              >
                <Text
                  variant="small"
                  className="text-white"
                  style={[labelShadow, { textAlign: 'center' }]}
                >
                  {label}
                </Text>
              </Gradient>
            </View>
          ))}
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
    borderRadius: 12,
    padding: 24,
    justifyContent: 'center',
  },
});
