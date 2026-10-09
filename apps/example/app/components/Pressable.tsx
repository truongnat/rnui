import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoGroup, DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function PressableScreen() {
  const { toast } = useToast();

  const boxClass =
    'items-center justify-center rounded-lg border border-transparent px-6 py-4';

  return (
    <DemoPage
      title="Pressable"
      description="Touch handling with opacity, highlight, and custom pressed-state feedback."
    >
      <DemoSection
        title="Feedback Modes"
        description="Built-in variants plus render-prop children for scale."
      >
        <DemoPreview>
          <DemoGroup direction="row">
            <Pressable
              onPress={() => toast.info('Scale feedback')}
              className="rounded-lg"
            >
              {({ pressed }) => (
                <Card
                  className={`${boxClass} bg-accent`}
                  style={{ transform: [{ scale: pressed ? 0.92 : 1 }] }}
                >
                  <Text variant="small" className="uppercase">
                    Scale
                  </Text>
                </Card>
              )}
            </Pressable>

            <Pressable
              onPress={() => toast.info('Opacity feedback')}
              variant="opacity"
              className={`${boxClass} bg-accent`}
            >
              <Text variant="small" className="uppercase">
                Opacity
              </Text>
            </Pressable>

            <Pressable
              onPress={() => toast.info('Highlight feedback')}
              variant="highlight"
              className={`${boxClass} rounded-lg`}
            >
              <Text variant="small" className="uppercase">
                Highlight
              </Text>
            </Pressable>

            <Pressable
              onPress={() => toast.info('No feedback')}
              variant="plain"
              className={`${boxClass} bg-muted`}
            >
              <Text variant="small" className="uppercase">
                Plain
              </Text>
            </Pressable>
          </DemoGroup>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Complex Layouts"
        description="Feedback applies to the entire container."
      >
        <Pressable
          onPress={() => toast.success('Card action triggered')}
          variant="highlight"
          className="rounded-lg"
        >
          <Card className="border-l-4 border-l-primary">
            <CardContent className="gap-1 p-4">
              <CardTitle className="text-xl">Actionable Card</CardTitle>
              <Text variant="muted">
                Tap for a highlight on the whole container.
              </Text>
            </CardContent>
          </Card>
        </Pressable>
      </DemoSection>

      <DemoSection title="Disabled">
        <DemoGroup direction="row">
          <Pressable disabled className={`${boxClass} bg-muted opacity-50`}>
            <Text variant="small" className="uppercase text-muted-foreground">
              Disabled
            </Text>
          </Pressable>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
