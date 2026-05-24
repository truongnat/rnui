import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Gradient, Typography } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function GradientScreen() {
  const t = useTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: t.spacing[3],
        },
        item: {
          width: '48%',
          aspectRatio: 1,
        },
        gradientBox: {
          flex: 1,
          borderRadius: t.radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          padding: t.spacing[3],
        },
        heroGradient: {
          height: 120,
          borderRadius: t.radius.lg,
          padding: t.spacing[6],
          justifyContent: 'center',
        },
      }),
    [t],
  );

  const labelShadow = useMemo(
    () => ({
      textShadowColor: t.color.bg.overlay,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    }),
    [t.color.bg.overlay],
  );

  return (
    <DemoPage
      title="Gradient"
      description="Linear gradients with presets and custom color stops."
    >
      <DemoSection title="Presets" description="brand, ocean, sunrise, and success.">
        <DemoPreview>
          <View style={styles.grid}>
            {(['brand', 'ocean', 'sunrise', 'success'] as const).map((preset) => (
              <View key={preset} style={styles.item}>
                <Gradient preset={preset} style={styles.gradientBox}>
                  <Typography
                    variant="subtitle2"
                    color="inverse"
                    align="center"
                    style={labelShadow}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </Typography>
                </Gradient>
              </View>
            ))}
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Custom Colors" description="Three-stop diagonal gradient.">
        <Gradient
          colors={[
            t.color.brand.default,
            t.color.warning.border,
            t.color.info.icon,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <Typography variant="h6" color="inverse" align="center" style={labelShadow}>
            Three Color Stop Gradient
          </Typography>
          <Typography
            variant="body2"
            color="inverse"
            align="center"
            style={[labelShadow, { opacity: 0.85 }]}
          >
            Custom angle and color palette
          </Typography>
        </Gradient>
      </DemoSection>

      <DemoSection title="Direction" description="Vertical, horizontal, and diagonal.">
        <View style={styles.grid}>
          {(
            [
              { label: 'Vertical', start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
              { label: 'Horizontal', start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
              { label: 'Diagonal', start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
            ] as const
          ).map(({ label, start, end }) => (
            <View key={label} style={styles.item}>
              <Gradient preset="brand" start={start} end={end} style={styles.gradientBox}>
                <Typography
                  variant="caption"
                  color="inverse"
                  align="center"
                  style={labelShadow}
                >
                  {label}
                </Typography>
              </Gradient>
            </View>
          ))}
        </View>
      </DemoSection>
    </DemoPage>
  );
}
