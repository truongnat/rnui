import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useToast, useTokens } from '@truongdq01/headless';
import { Button, Card, GlassCard, Stack, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function CardScreen() {
  const t = useTokens();
  const toast = useToast();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        glassContainer: {
          overflow: 'hidden',
          height: t.spacing[18] * 2 + t.spacing[6],
          justifyContent: 'center',
        },
        backgroundImage: {
          position: 'absolute',
          width: '120%',
          height: '120%',
          opacity: 0.6,
        },
        articleImage: {
          width: '100%',
          height: t.spacing[18] * 2 + t.spacing[6],
        },
      }),
    [t.spacing],
  );

  return (
    <DemoPage
      title="Card"
      description="Flexible containers used to group related content and actions with support for shadows, glassmorphism, and interactivity."
    >
      <DemoSection title="Paddings" bare>
        <Stack spacing="md">
          <Card padding="sm">
            <Typography variant="subtitle2">Small Padding</Typography>
            <Typography variant="body2" color="secondary">
              Compact layout for dense information.
            </Typography>
          </Card>
          <Card padding="md">
            <Typography variant="subtitle2">Medium (Default)</Typography>
            <Typography variant="body2" color="secondary">
              Standard spacing for most card contents.
            </Typography>
          </Card>
          <Card padding="lg">
            <Typography variant="subtitle2">Large Padding</Typography>
            <Typography variant="body2" color="secondary">
              Generous spacing for atmospheric layouts.
            </Typography>
          </Card>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Interactive"
        description="Built-in scale feedback on touch — ideal for tappable rows or navigation blocks."
        bare
      >
        <Card
          onPress={() => toast.success('Card pressed!')}
          accessibilityLabel="Pressable card"
        >
          <Typography variant="subtitle2">Pressable Card</Typography>
          <Typography variant="body2" color="secondary">
            Touch me to see the press animation.
          </Typography>
        </Card>
      </DemoSection>

      <DemoSection
        title="Glassmorphism"
        description="Blurred overlay for layered, premium surfaces."
        bare
      >
        <View
          style={[
            styles.glassContainer,
            {
              borderRadius: t.radius['2xl'],
              padding: t.spacing[5],
              backgroundColor: t.color.bg.inverse,
            },
          ]}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600',
            }}
            style={styles.backgroundImage}
          />
          <GlassCard intensity={60} style={{ borderRadius: t.radius.lg }}>
            <Typography variant="h4" color="inverse">
              Glass Card
            </Typography>
            <Typography
              variant="body2"
              color="inverse"
              style={{ marginTop: t.spacing[1], opacity: 0.85 }}
            >
              Elegant transparency with depth.
            </Typography>
          </GlassCard>
        </View>
      </DemoSection>

      <DemoSection title="Article Layout" bare>
        <Card padding="none" style={{ overflow: 'hidden' }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
            }}
            style={styles.articleImage}
          />
          <View style={{ padding: t.spacing[5], gap: t.spacing[3] }}>
            <Typography variant="h3">Mastering Interface Design</Typography>
            <Typography variant="body2" color="secondary" numberOfLines={2}>
              Learn how to create stunning user interfaces using modern design
              principles and tools.
            </Typography>
            <Button
              label="Read More"
              size="sm"
              variant="outline"
              style={{ alignSelf: 'flex-start' }}
              onPress={() => toast.info('Navigating to blog post...')}
            />
          </View>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
