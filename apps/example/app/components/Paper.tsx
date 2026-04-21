import { useTokens } from '@truongdq01/headless';
import { Paper, Typography, Box } from '@truongdq01/ui';
import React from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function PaperScreen() {
  const t = useTokens();
  
  return (
    <DemoPage
      title="Paper"
       description="The physical properties of paper are translated to the screen. Highlighting and surface definition through elevation and shadows."
    >
      <DemoSection title="Elevation Variants">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Elevation is used to express distance between surfaces.
        </Typography>
        <Box sx={{ gap: 'lg' }}>
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
        </Box>
      </DemoSection>

      <DemoSection title="Outlined & Flat">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Variants for different UI needs. Outlined is good for low-emphasis cards.
        </Typography>
        <Box sx={{ gap: 'lg' }}>
          <Paper variant="outlined" style={{ padding: t.spacing[4], alignItems: 'center' }}>
            <Typography variant="button">Outlined</Typography>
          </Paper>
          <Paper variant="flat" style={{ padding: t.spacing[4], backgroundColor: t.color.bg.subtle, alignItems: 'center' }}>
            <Typography variant="button">Flat (Subtle BG)</Typography>
          </Paper>
        </Box>
      </DemoSection>

      <DemoSection title="Shape Options">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The square prop removes border radius.
        </Typography>
        <Box sx={{ flexDirection: 'row', gap: 'lg' }}>
          <Paper elevation="sm" style={{ flex: 1, padding: t.spacing[4], aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption">Default (MD)</Typography>
          </Paper>
          <Paper square elevation="sm" style={{ flex: 1, padding: t.spacing[4], aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption">Square</Typography>
          </Paper>
        </Box>
      </DemoSection>

      <DemoSection title="Practical Example">
        <Paper elevation="md" style={{ padding: t.spacing[4] }}>
          <Typography variant="h6" gutterBottom>Surface Application</Typography>
          <Typography variant="body2" color="secondary">
            Use Paper to create distinct UI blocks on top of the background. 
            It automatically inherits the correct surface color from the theme.
          </Typography>
        </Paper>
      </DemoSection>
    </DemoPage>
  );
}
