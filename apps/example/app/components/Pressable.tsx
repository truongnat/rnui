import { useMemo } from 'react';
import { View } from 'react-native';
import { Pressable, Typography, Card } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup, DemoPreview } from '@/demo/DemoPage';

export default function PressableScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  const boxStyle = useMemo(
    () => ({
      paddingVertical: tokens.spacing[4],
      paddingHorizontal: tokens.spacing[6],
      borderRadius: tokens.radius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: 1,
      borderColor: 'transparent' as const,
    }),
    [tokens.spacing, tokens.radius.lg],
  );

  return (
    <DemoPage
      title="Pressable"
      description="Touch handling with scale, opacity feedback, and haptics."
    >
      <DemoSection title="Feedback Modes" description="Customize press animations.">
        <DemoPreview>
          <DemoGroup>
            <Pressable
              onPress={() => toast.info('Scale feedback')}
              feedbackMode="scale"
              style={[boxStyle, { backgroundColor: tokens.color.brand.subtle }]}
            >
              <Typography variant="button" style={{ color: tokens.color.brand.text }}>
                SCALE
              </Typography>
            </Pressable>

            <Pressable
              onPress={() => toast.info('Scale Subtle feedback')}
              feedbackMode="scaleSubtle"
              style={[boxStyle, { backgroundColor: tokens.color.brand.subtle }]}
            >
              <Typography variant="button" style={{ color: tokens.color.brand.text }}>
                SCALE SUBTLE
              </Typography>
            </Pressable>

            <Pressable
              onPress={() => toast.info('Opacity feedback')}
              feedbackMode="opacity"
              style={[boxStyle, { backgroundColor: tokens.color.brand.subtle }]}
            >
              <Typography variant="button" style={{ color: tokens.color.brand.text }}>
                OPACITY
              </Typography>
            </Pressable>

            <Pressable
              onPress={() => toast.info('None feedback')}
              feedbackMode="none"
              style={[boxStyle, { backgroundColor: tokens.color.bg.muted }]}
            >
              <Typography variant="button">NONE</Typography>
            </Pressable>
          </DemoGroup>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Complex Layouts" description="Feedback applies to the entire container.">
        <Pressable
          onPress={() => toast.success('Card action triggered')}
          feedbackMode="scaleSubtle"
        >
          <Card
            padding="md"
            style={{ borderLeftWidth: 4, borderLeftColor: tokens.color.brand.default }}
          >
            <View style={{ gap: tokens.spacing[1] }}>
              <Typography variant="h4">Actionable Card</Typography>
              <Typography variant="body2" color="secondary">
                Tap for a subtle scale animation on the whole container.
              </Typography>
            </View>
          </Card>
        </Pressable>
      </DemoSection>

      <DemoSection title="Disabled">
        <DemoGroup direction="row">
          <Pressable
            disabled
            style={[
              boxStyle,
              { backgroundColor: tokens.color.bg.disabled, opacity: 0.5 },
            ]}
          >
            <Typography variant="button" color="disabled">
              DISABLED
            </Typography>
          </Pressable>
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}
