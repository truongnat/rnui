import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function CircularProgressScreen() {
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((v) => (v >= 100 ? 0 : v + 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoPage
      title="Circular Progress"
      description="Circular track for process length or indeterminate waits."
    >
      <DemoSection
        title="Animated"
        description={`Value transitions on a 0–100 scale. Current: ${Math.round(progress)}%`}
      >
        <DemoPreview>
          <View className="items-center gap-4">
            <CircularProgress
              value={progress}
              size={120}
              strokeWidth={12}
              showLabel
            />
            <View className="flex-row gap-3">
              <Button
                size="sm"
                variant="outline"
                onPress={() => setProgress((v) => Math.max(0, v - 10))}
              >
                Decrease
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() => setProgress((v) => Math.min(100, v + 10))}
              >
                Increase
              </Button>
            </View>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Values" description="Determinate progress snapshots.">
        <View className="flex-row items-center justify-around">
          <CircularProgress value={25} size={60} />
          <CircularProgress value={50} size={60} />
          <CircularProgress value={75} size={60} />
          <CircularProgress value={100} size={60} />
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <View className="flex-row items-center justify-between">
          <CircularProgress value={40} size={32} strokeWidth={4} />
          <CircularProgress value={50} size={48} strokeWidth={6} />
          <CircularProgress value={70} size={64} strokeWidth={8} />
          <CircularProgress value={80} size={96} strokeWidth={10} />
        </View>
      </DemoSection>

      <DemoSection
        title="Indeterminate"
        description="Omit value to render the indeterminate arc for unknown durations."
      >
        <View className="items-center">
          <CircularProgress size={60} strokeWidth={6} />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
