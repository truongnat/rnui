import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Progress } from '@/components/ui/progress';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ProgressScreen() {
  const [progress, setProgress] = useState(10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      const next = Math.min(progress + 15, 100);
      setProgress(next);
      if (next === 100) setRunning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress, running]);

  return (
    <DemoPage
      title="Progress"
      description="Horizontal bar for loading, uploading, or processing."
    >
      <DemoSection
        title="Indeterminate"
        description="Unknown wait time — use a rotating indicator until a measurement is available."
      >
        <Stack direction="row" spacing="md" alignItems="center">
          <CircularProgress
            size={32}
            strokeWidth={3}
            accessibilityLabel="Preparing upload"
          />
          <Text variant="muted">Preparing upload…</Text>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Determinate"
        description="Measured progress such as file uploads — value is 0–100."
      >
        <Stack spacing="lg">
          <View>
            <View className="mb-2 flex-row justify-between">
              <Text variant="small">Simulated Progress</Text>
              <Text variant="small" className="font-bold">
                {Math.round(progress)}%
              </Text>
            </View>
            <Progress value={progress} />
            <View className="mt-4 flex-row flex-wrap gap-3">
              <Button
                onPress={() => {
                  if (progress === 100) setProgress(0);
                  setRunning((value) => !value);
                }}
              >
                {running
                  ? 'Pause upload'
                  : progress === 100
                    ? 'Upload again'
                    : 'Start upload'}
              </Button>
              <Button
                variant="outline"
                onPress={() => {
                  setRunning(false);
                  setProgress(0);
                }}
              >
                Reset
              </Button>
            </View>
          </View>

          <View>
            <Text variant="small" className="mb-1">
              Static 45%
            </Text>
            <Progress value={45} />
          </View>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Styling"
        description="Tune the track and indicator with className / indicatorClassName."
      >
        <Stack spacing="lg">
          <View>
            <Text variant="small" className="mb-1">
              Slim (h-1)
            </Text>
            <Progress value={70} className="h-1" />
          </View>
          <View>
            <Text variant="small" className="mb-1">
              Destructive indicator
            </Text>
            <Progress value={30} indicatorClassName="bg-destructive" />
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
