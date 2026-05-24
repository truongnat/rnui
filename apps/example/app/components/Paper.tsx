import { useTokens } from '@truongdq01/headless';
import { Paper, Typography } from '@truongdq01/ui';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PaperScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="Paper"
      description="Surface definition through elevation, outlines, and shape."
    >
      <DemoSection
        title="Elevation"
        description="Express distance between surfaces with shadow depth."
        bare
      >
        <View style={{ gap: t.spacing[4] }}>
          <Paper elevation="none" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">None (0dp)</Typography>
          </Paper>
          <Paper elevation="sm" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">Small (2dp)</Typography>
          </Paper>
          <Paper elevation="md" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">Medium (4dp)</Typography>
          </Paper>
          <Paper elevation="lg" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">Large (8dp)</Typography>
          </Paper>
        </View>
      </DemoSection>

      <DemoSection
        title="Outlined & Flat"
        description="Low-emphasis cards and subtle backgrounds."
        bare
      >
        <View style={{ gap: t.spacing[4] }}>
          <Paper variant="outlined" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">Outlined</Typography>
          </Paper>
          <Paper
            variant="flat"
            style={{
              padding: t.spacing[4],
              backgroundColor: t.color.bg.subtle,
              alignItems: 'center',
            }}
          >
            <Typography variant="button">Flat (Subtle BG)</Typography>
          </Paper>
        </View>
      </DemoSection>

      <DemoSection
        title="Shape"
        description="The square prop removes border radius."
        bare
      >
        <View style={{ flexDirection: 'row', gap: t.spacing[4] }}>
          <Paper
            elevation="sm"
            style={{
              flex: 1,
              padding: t.spacing[4],
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption">Default (MD)</Typography>
          </Paper>
          <Paper
            square
            elevation="sm"
            style={{
              flex: 1,
              padding: t.spacing[4],
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption">Square</Typography>
          </Paper>
        </View>
      </DemoSection>

      <DemoSection title="Practical Example" bare>
        <Paper elevation="md" style={{ padding: t.spacing[4] }}>
          <Typography variant="h6" gutterBottom>
            Surface Application
          </Typography>
          <Typography variant="body2" color="secondary">
            Use Paper for distinct UI blocks on top of the background. It
            inherits the correct surface color from the theme.
          </Typography>
        </Paper>
      </DemoSection>
    </DemoPage>
  );
}
