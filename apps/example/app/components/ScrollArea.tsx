import { View } from 'react-native';
import { Paper } from '@/components/ui/paper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function ScrollAreaScreen() {
  return (
    <DemoPage
      title="ScrollArea"
      description="Scrollable containers with platform optimizations."
    >
      <DemoSection
        title="Vertical Scroll"
        description="Fixed-height container with vertical overflow."
      >
        <DemoPreview>
          <Paper
            variant="outlined"
            className="p-0"
            style={{ height: 200, overflow: 'hidden' }}
          >
            <ScrollArea>
              <View className="gap-4 p-4">
                {[...Array(10)].map((_, i) => (
                  <Paper key={i} className="p-3">
                    <Text className="text-sm text-foreground">
                      Scrollable Item {i + 1}
                    </Text>
                  </Paper>
                ))}
              </View>
            </ScrollArea>
          </Paper>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Horizontal Scroll"
        description="Row-based scrolling content."
      >
        <DemoPreview>
          <ScrollArea horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {[...Array(6)].map((_, i) => (
                <Paper
                  key={i}
                  className="items-center justify-center"
                  style={{ width: 116, height: 100 }}
                >
                  <Text variant="h4">#{i + 1}</Text>
                </Paper>
              ))}
            </View>
          </ScrollArea>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Paging"
        description="Snap to intervals — useful for carousels."
      >
        <DemoPreview>
          <ScrollArea
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row">
              {[...Array(3)].map((_, i) => (
                <View
                  key={i}
                  className={`mx-2 items-center justify-center rounded-md ${
                    i % 2 === 0 ? 'bg-accent' : 'bg-muted'
                  }`}
                  style={{ width: 304, height: 96 }}
                >
                  <Text variant="h4">Page {i + 1}</Text>
                </View>
              ))}
            </View>
          </ScrollArea>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
