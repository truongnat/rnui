import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Progress } from '@/components/ui/progress';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ProgressScreen() {
  const [progress, setProgress] = useState(10);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) return 0;
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => {
      clearInterval(timer);
      pulse.stop();
    };
  }, [opacity]);

  return (
    <DemoPage
      title="Progress"
      description="Horizontal bar for loading, uploading, or processing."
    >
      <DemoSection
        title="Indeterminate"
        description="Unknown wait time — pulse a bar with no measured value."
      >
        <Animated.View style={{ opacity }}>
          <Progress value={100} />
        </Animated.View>
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
