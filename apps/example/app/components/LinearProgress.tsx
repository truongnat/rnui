import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { LinearProgress, Typography, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function LinearProgressScreen() {
  const { tokens } = useTheme();
  const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 1) return 0;
        const diff = Math.random() * 0.1;
        return Math.min(oldProgress + diff, 1);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <DemoPage
      title="Linear Progress"
      description="Horizontal bar for loading, uploading, or processing."
    >
      <DemoSection title="Indeterminate" description="Unknown wait time or no granular updates.">
        <LinearProgress variant="indeterminate" />
      </DemoSection>

      <DemoSection title="Determinate" description="Measured progress such as file uploads.">
        <Stack spacing="lg">
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: tokens.spacing[2],
              }}
            >
              <Typography variant="caption">Simulated Progress</Typography>
              <Typography variant="caption" fontWeight="bold">
                {Math.round(progress * 100)}%
              </Typography>
            </View>
            <LinearProgress value={progress} />
          </View>

          <View>
            <Typography variant="caption" gutterBottom>
              Static 45%
            </Typography>
            <LinearProgress value={0.45} color="brand" />
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Semantic Colors">
        <Stack spacing="lg">
          <View>
            <Typography variant="caption" gutterBottom>
              Success
            </Typography>
            <LinearProgress value={1} color="success" />
          </View>
          <View>
            <Typography variant="caption" gutterBottom>
              Warning
            </Typography>
            <LinearProgress value={0.7} color="warning" />
          </View>
          <View>
            <Typography variant="caption" gutterBottom>
              Error
            </Typography>
            <LinearProgress value={0.3} color="error" />
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
