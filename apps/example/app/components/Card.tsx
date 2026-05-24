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
      description="Payment, profile, and content blocks — raised surface with soft border and shadow."
    >
      <DemoSection
        title="Payment method"
        description="Hero card — billing summary with primary action."
      >
        <Card>
          <Stack spacing="md">
            <Typography variant="overline" color="brand">
              Primary card
            </Typography>
            <Typography variant="h4">Visa ending in 4242</Typography>
            <Typography variant="body2" color="secondary">
              Expires 08/27 · Used for subscription and one-click checkout.
            </Typography>
            <Button
              label="Update billing"
              variant="outline"
              size="sm"
              style={{ alignSelf: 'flex-start' }}
              onPress={() => toast.info('Opening billing')}
            />
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Interactive" bare>
        <Card
          onPress={() => toast.success('Opening order details')}
          accessibilityLabel="View order details"
        >
          <Typography variant="subtitle2">Order #4821</Typography>
          <Typography variant="body2" color="secondary">
            Shipped · Tap for tracking and invoice.
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
