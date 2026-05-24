import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { CircularProgress, Button } from '@truongdq01/ui';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function CircularProgressScreen() {
  const t = useTokens();
  const [progress, setProgress] = useState(0.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((v) => (v >= 1 ? 0 : v + 0.1));
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
        description={`Smooth value transitions. Current: ${Math.round(progress * 100)}%`}
      >
        <DemoPreview>
          <View style={{ alignItems: 'center', gap: t.spacing[4] }}>
            <CircularProgress value={progress} size={120} strokeWidth={12} showValue />
            <View style={{ flexDirection: 'row', gap: t.spacing[3] }}>
              <Button
                size="sm"
                label="Decrease"
                variant="outline"
                onPress={() => setProgress((v) => Math.max(0, v - 0.1))}
              />
              <Button
                size="sm"
                label="Increase"
                variant="outline"
                onPress={() => setProgress((v) => Math.min(1, v + 0.1))}
              />
            </View>
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Colors" description="Semantic track and indicator colors.">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <CircularProgress value={0.75} color={t.color.brand.default} size={60} />
          <CircularProgress value={0.6} color={t.color.status.success} size={60} />
          <CircularProgress value={0.4} color={t.color.status.danger} size={60} />
          <CircularProgress value={0.9} color={t.color.status.warning} size={60} />
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CircularProgress value={0.4} size={32} strokeWidth={4} />
          <CircularProgress value={0.5} size={48} strokeWidth={6} />
          <CircularProgress value={0.7} size={64} strokeWidth={8} />
          <CircularProgress value={0.8} size={96} strokeWidth={10} />
        </View>
      </DemoSection>

      <DemoSection title="Indeterminate" description="Unknown duration processes.">
        <View style={{ alignItems: 'center' }}>
          <CircularProgress indeterminate size={60} strokeWidth={6} />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
