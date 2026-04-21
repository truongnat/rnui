import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { LinearProgress, Typography, Stack, Button } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

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
      description="Visual indicators for the status of an ongoing process, such as loading or downloading."
    >
      <DemoSection title="Indeterminate Progress">
        <Typography variant="body2" gutterBottom>
            Used when the wait time is unknown or the process doesn't provide granular updates.
        </Typography>
        <LinearProgress variant="indeterminate" />
      </DemoSection>

      <DemoSection title="Determinate Progress">
        <Typography variant="body2" gutterBottom>
            Used when progress can be measured (e.g., file upload).
        </Typography>
        <Stack spacing="lg">
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Typography variant="caption">Simulated Progress</Typography>
                    <Typography variant="caption" fontWeight="bold">
                        {Math.round(progress * 100)}%
                    </Typography>
                </View>
                <LinearProgress value={progress} />
            </View>
            
            <View>
                <Typography variant="caption" gutterBottom>Static 45%</Typography>
                <LinearProgress value={0.45} color="brand" />
            </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Colors & Styles">
          <Typography variant="body2" gutterBottom>
              Customizable colors and thickness for different contexts.
          </Typography>
          <Stack spacing="lg">
              <View>
                <Typography variant="caption" gutterBottom>Success State</Typography>
                <LinearProgress value={1} color="success" />
              </View>
              <View>
                <Typography variant="caption" gutterBottom>Warning State</Typography>
                <LinearProgress value={0.7} color="warning" />
              </View>
              <View>
                <Typography variant="caption" gutterBottom>Error State</Typography>
                <LinearProgress value={0.3} color="error" />
              </View>
          </Stack>
      </DemoSection>
    </DemoPage>
  );
}

