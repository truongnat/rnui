import React from 'react';
import { View, Text } from 'react-native';
import { Pressable, Typography, Card } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

export default function PressableScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  return (
    <DemoPage 
      title="Pressable" 
      description="Advanced touch handling with built-in feedback animations (scale, opacity) and haptics support."
    >
      <DemoSection title="Feedback Modes">
        <Typography variant="body2" color="secondary" style={{ marginBottom: tokens.spacing[3] }}>
          Customizable feedback animations when the user interacts with the element.
        </Typography>
        
        <DemoGroup>
          <Pressable
            onPress={() => toast.info('Scale feedback')}
            feedbackMode="scale"
            style={[styles.box, { backgroundColor: tokens.color.brand.subtle }]}
          >
            <Typography variant="button" style={{ color: tokens.color.brand.text }}>SCALE</Typography>
          </Pressable>

          <Pressable
            onPress={() => toast.info('Scale Subtle feedback')}
            feedbackMode="scaleSubtle"
            style={[styles.box, { backgroundColor: tokens.color.brand.subtle }]}
          >
            <Typography variant="button" style={{ color: tokens.color.brand.text }}>SCALE SUBTLE</Typography>
          </Pressable>

          <Pressable
            onPress={() => toast.info('Opacity feedback')}
            feedbackMode="opacity"
            style={[styles.box, { backgroundColor: tokens.color.brand.subtle }]}
          >
            <Typography variant="button" style={{ color: tokens.color.brand.text }}>OPACITY</Typography>
          </Pressable>

          <Pressable
            onPress={() => toast.info('None feedback')}
            feedbackMode="none"
            style={[styles.box, { backgroundColor: tokens.color.bg.muted }]}
          >
            <Typography variant="button">NONE</Typography>
          </Pressable>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Complex Layouts">
        <Typography variant="body2" color="secondary" style={{ marginBottom: tokens.spacing[3] }}>
          Pressable can wrap any content and will apply the feedback to the entire container.
        </Typography>

        <Pressable
          onPress={() => toast.success('Card action triggered')}
          feedbackMode="scaleSubtle"
        >
          <Card padding="md" style={{ borderLeftWidth: 4, borderLeftColor: tokens.color.brand.default }}>
            <View style={{ gap: 4 }}>
              <Typography variant="h4">Actionable Card</Typography>
              <Typography variant="body2" color="secondary">
                Tap this card to see a subtle scale animation on the whole container.
              </Typography>
            </View>
          </Card>
        </Pressable>
      </DemoSection>

      <DemoSection title="States">
        <DemoGroup direction="row">
          <Pressable
            disabled
            style={[styles.box, { backgroundColor: tokens.color.bg.disabled, opacity: 0.5 }]}
          >
            <Typography variant="button" color="disabled">DISABLED</Typography>
          </Pressable>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}

const styles = {
  box: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: 'transparent',
  }
};

