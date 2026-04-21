import { useToast, useTokens } from '@truongdq01/headless';
import { Button, Card, GlassCard, Stack, Typography } from '@truongdq01/ui';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function CardScreen() {
  const t = useTokens();
  const toast = useToast();

  return (
    <DemoPage 
      title="Card" 
      description="Flexible containers used to group related content and actions with support for shadows, glassmorphism, and interactivity."
    >
      <DemoSection title="Paddings">
        <Stack spacing="md">
            <Card padding="sm">
                <Typography variant="subtitle2">Small Padding</Typography>
                <Typography variant="body2" color="secondary">Compact layout for dense information.</Typography>
            </Card>

            <Card padding="md">
                <Typography variant="subtitle2">Medium Padding (Default)</Typography>
                <Typography variant="body2" color="secondary">The standard spacing for most card contents.</Typography>
            </Card>

            <Card padding="lg">
                <Typography variant="subtitle2">Large Padding</Typography>
                <Typography variant="body2" color="secondary">Generous spacing for high atmospheric density.</Typography>
            </Card>
        </Stack>
      </DemoSection>

      <DemoSection title="Interactive">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Built-in scale feedback on touch. Perfect for list items or navigation blocks.
        </Typography>
        <Card onPress={() => toast.success('Card pressed!')} accessibilityLabel="Pressable card">
          <Typography variant="subtitle2">Pressable Card</Typography>
          <Typography variant="body2" color="secondary">
            Touch me to see the press animation.
          </Typography>
        </Card>
      </DemoSection>

      <DemoSection title="Glassmorphism">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
           Blurred background overlay for premium, multi-layered interfaces.
        </Typography>
        <View style={styles.glassContainer}>
           <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600' }}
              style={styles.backgroundImage}
           />
           <GlassCard intensity={60} style={{ borderRadius: 16 }}>
              <View style={{ padding: 20 }}>
                  <Typography variant="h4" style={{ color: '#fff' }}>Glass Card</Typography>
                  <Typography variant="body2" style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
                      Elegant transparency with depth.
                  </Typography>
              </View>
           </GlassCard>
        </View>
      </DemoSection>

      <DemoSection title="Example: Article Card">
          <Card padding="none" style={{ overflow: 'hidden' }}>
              <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600' }}
                  style={{ width: '100%', height: 180 }}
              />
              <View style={{ padding: 20, gap: 12 }}>
                  <Typography variant="h3">Mastering Interface Design</Typography>
                  <Typography variant="body2" color="secondary" numberOfLines={2}>
                      Learn how to create stunning user interfaces using modern design principles and tools.
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

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 180,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    opacity: 0.6,
  },
});
