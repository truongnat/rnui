import { useTokens } from '@truongdq01/headless';
import { ScrollArea, Typography, Paper, Box } from '@truongdq01/ui';
import React from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ScrollAreaScreen() {
  const t = useTokens();
  
  return (
    <DemoPage
      title="ScrollArea"
      description="Customizable scrollable containers with token-based styling, fade edges, and platform-specific optimizations."
    >
      <DemoSection title="Vertical Scroll">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Standard vertical scrolling container with fixed height.
        </Typography>
        <Paper variant="outlined" style={{ height: 160, overflow: 'hidden' }}>
            <ScrollArea showVerticalScrollIndicator={true}>
                <Box sx={{ padding: 'md', gap: 'md' }}>
                    {[...Array(10)].map((_, i) => (
                        <Paper key={i} elevation="sm" style={{ padding: t.spacing[3] }}>
                            <Typography variant="body2">Scrollable Item {i + 1}</Typography>
                        </Paper>
                    ))}
                </Box>
            </ScrollArea>
        </Paper>
      </DemoSection>

      <DemoSection title="Horizontal Scroll">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Scrolling content horizontally.
        </Typography>
        <ScrollArea direction="horizontal" showHorizontalScrollIndicator={false}>
            <Box sx={{ flexDirection: 'row', gap: 'md' }}>
                {[...Array(6)].map((_, i) => (
                    <Paper key={i} elevation="sm" style={{ width: 140, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                         <Typography variant="h6">#{i + 1}</Typography>
                    </Paper>
                ))}
            </Box>
        </ScrollArea>
      </DemoSection>

      <DemoSection title="Fade Edges">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Adds subtle fade effects at the edges to indicate that content is scrollable.
        </Typography>
        <Paper variant="outlined" style={{ height: 120, overflow: 'hidden' }}>
             <ScrollArea fadeEdges fadeSize={40}>
                <Box sx={{ padding: 'md', gap: 'sm' }}>
                    {[...Array(10)].map((_, i) => (
                        <Typography key={i} variant="body2">Line of text number {i + 1} for scrolling demo</Typography>
                    ))}
                </Box>
            </ScrollArea>
        </Paper>
      </DemoSection>

      <DemoSection title="Paging Behavior">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Snap to content intervals, useful for carousels or page-like layouts.
        </Typography>
        <ScrollArea 
            direction="horizontal" 
            pagingEnabled 
            showHorizontalScrollIndicator={false}
        >
            <Box sx={{ flexDirection: 'row' }}>
                {[...Array(3)].map((_, i) => (
                    <Box key={i} sx={{ width: 300, height: 150, backgroundColor: i % 2 === 0 ? 'brand.subtle' : 'surface.subtle', justifyContent: 'center', alignItems: 'center', borderRadius: 'md', marginHorizontal: 'sm' }}>
                         <Typography variant="h5">Page {i + 1}</Typography>
                    </Box>
                ))}
            </Box>
        </ScrollArea>
      </DemoSection>
    </DemoPage>
  );
}
