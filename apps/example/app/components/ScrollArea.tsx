import { useMemo } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { ScrollArea, Typography, Paper } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function ScrollAreaScreen() {
  const t = useTokens();

  const preview = useMemo(
    () => ({
      verticalHeight: t.spacing[16] + t.spacing[16],
      horizontalCard: {
        width: t.spacing[24] + t.spacing[5],
        height: t.spacing[20] + t.spacing[5],
      },
      fadeHeight: t.spacing[20] + t.spacing[10],
      page: {
        width: t.spacing[24] * 3 + t.spacing[4],
        height: t.spacing[18] + t.spacing[6],
      },
    }),
    [t.spacing],
  );

  return (
    <DemoPage
      title="ScrollArea"
      description="Scrollable containers with fade edges and platform optimizations."
    >
      <DemoSection
        title="Vertical Scroll"
        description="Fixed-height container with vertical overflow."
      >
        <DemoPreview>
          <Paper
            variant="outlined"
            style={{ height: preview.verticalHeight, overflow: 'hidden' }}
          >
            <ScrollArea showVerticalScrollIndicator>
              <View style={{ padding: t.spacing[4], gap: t.spacing[4] }}>
                {[...Array(10)].map((_, i) => (
                  <Paper key={i} elevation="sm" style={{ padding: t.spacing[3] }}>
                    <Typography variant="body2">
                      Scrollable Item {i + 1}
                    </Typography>
                  </Paper>
                ))}
              </View>
            </ScrollArea>
          </Paper>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Horizontal Scroll" description="Row-based scrolling content.">
        <DemoPreview>
          <ScrollArea direction="horizontal" showHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: t.spacing[4] }}>
              {[...Array(6)].map((_, i) => (
                <Paper
                  key={i}
                  elevation="sm"
                  style={{
                    ...preview.horizontalCard,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">#{i + 1}</Typography>
                </Paper>
              ))}
            </View>
          </ScrollArea>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Fade Edges"
        description="Subtle fade at edges to indicate scrollable content."
      >
        <DemoPreview>
          <Paper
            variant="outlined"
            style={{ height: preview.fadeHeight, overflow: 'hidden' }}
          >
            <ScrollArea fadeEdges fadeSize={t.spacing[10]}>
              <View style={{ padding: t.spacing[4], gap: t.spacing[2] }}>
                {[...Array(10)].map((_, i) => (
                  <Typography key={i} variant="body2">
                    Line of text number {i + 1} for scrolling demo
                  </Typography>
                ))}
              </View>
            </ScrollArea>
          </Paper>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Paging"
        description="Snap to intervals — useful for carousels."
      >
        <DemoPreview>
          <ScrollArea
            direction="horizontal"
            pagingEnabled
            showHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: 'row' }}>
              {[...Array(3)].map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: preview.page.width,
                    height: preview.page.height,
                    backgroundColor:
                      i % 2 === 0
                        ? t.color.brand.subtle
                        : t.color.surface.sunken,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: t.radius.md,
                    marginHorizontal: t.spacing[2],
                  }}
                >
                  <Typography variant="h5">Page {i + 1}</Typography>
                </View>
              ))}
            </View>
          </ScrollArea>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
