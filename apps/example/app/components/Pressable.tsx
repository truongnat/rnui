import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PressableScreen() {
  const { toast } = useToast();

  return (
    <DemoPage
      title="Pressable"
      description="Touch surface with tactile feedback variants (scale, bounce, opacity, highlight) and haptics."
    >
      <DemoSection
        title="Tactile Feedback Variants"
        description="Try pressing each tile to feel the tactile visual and haptic response."
        bare
      >
        <Card className="p-5">
          <Stack spacing="md">
            {/* Scale */}
            <Pressable
              variant="scale"
              haptic="light"
              onPress={() => toast.info('Scale feedback (0.97x)')}
              className="p-4 rounded-xl border border-border bg-background items-center justify-center"
            >
              <Text className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Scale Feedback (0.97x)
              </Text>
              <Text variant="muted">Subtle shrink on press with light haptic</Text>
            </Pressable>

            {/* Bounce (Scale + Opacity) */}
            <Pressable
              variant="bounce"
              haptic="medium"
              onPress={() => toast.info('Bounce feedback')}
              className="p-4 rounded-xl border border-border bg-background items-center justify-center"
            >
              <Text className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Bounce (Scale + Opacity)
              </Text>
              <Text variant="muted">Combined tactile bounce with medium haptic</Text>
            </Pressable>

            {/* Opacity */}
            <Pressable
              variant="opacity"
              haptic="selection"
              onPress={() => toast.info('Opacity feedback')}
              className="p-4 rounded-xl border border-border bg-background items-center justify-center"
            >
              <Text className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Opacity Feedback
              </Text>
              <Text variant="muted">Classic dimming to 72% opacity</Text>
            </Pressable>

            {/* Highlight */}
            <Pressable
              variant="highlight"
              onPress={() => toast.info('Highlight feedback')}
              className="p-4 rounded-xl border border-border bg-card items-center justify-center"
            >
              <Text className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Highlight Feedback
              </Text>
              <Text variant="muted">Accent background flash for list rows</Text>
            </Pressable>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Interactive Card Action"
        description="Full container touch area with scale animation."
        bare
      >
        <Pressable
          variant="scale"
          haptic="selection"
          onPress={() => toast.success('Card action executed!')}
        >
          <Card className="border-l-4 border-l-primary p-5">
            <CardContent className="gap-1 p-0">
              <CardTitle className="text-lg">Tappable Card Action</CardTitle>
              <Text variant="muted">
                Press anywhere on this card to feel the spring scale response and trigger an action.
              </Text>
            </CardContent>
          </Card>
        </Pressable>
      </DemoSection>

      <DemoSection title="Disabled State" bare>
        <Card className="p-5">
          <Pressable
            disabled
            className="p-4 rounded-xl border border-border bg-muted items-center justify-center"
          >
            <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Disabled (No Touch Response)
            </Text>
          </Pressable>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
