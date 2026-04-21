import React from 'react';
import { Box, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function BoxScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Box" 
      description="The Box component serves as a wrapper component for most of the CSS utility needs."
    >
      <DemoSection title="Basic Layout">
        <Box sx={{ padding: 'md', backgroundColor: 'surface.raised', borderRadius: 'lg' }}>
          <Typography variant="body1">
            This is a Box with padding, background color, and border radius from tokens.
          </Typography>
        </Box>
      </DemoSection>

      <DemoSection title="Flexbox Utility">
        <Box sx={{ flexDirection: 'row', gap: 'md', alignItems: 'center' }}>
          <Box sx={{ width: 50, height: 50, backgroundColor: 'brand.default', borderRadius: 'md' }} />
          <Box sx={{ width: 50, height: 50, backgroundColor: 'accent.default', borderRadius: 'md' }} />
          <Box sx={{ width: 50, height: 50, backgroundColor: 'success.default', borderRadius: 'md' }} />
        </Box>
      </DemoSection>

      <DemoSection title="Spacing Hooks">
        <Box sx={{ marginVertical: 'lg', borderLeftWidth: 4, borderLeftColor: 'brand.default', paddingLeft: 'md' }}>
          <Typography variant="body2" color="secondary">
            Box supports semantic spacing tokens for margins and paddings.
          </Typography>
        </Box>
      </DemoSection>
      
      <DemoSection title="Nested Boxes">
        <Box sx={{ padding: 'xl', backgroundColor: 'surface.subtle', borderRadius: 'xl' }}>
          <Box sx={{ padding: 'md', backgroundColor: 'surface.default', borderRadius: 'lg', border: 'subtle' }}>
            <Typography variant="body1">Nested Content</Typography>
          </Box>
        </Box>
      </DemoSection>
    </DemoPage>
  );
}

