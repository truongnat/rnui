import { useState } from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';
import { useIconColor, useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const STEPS = [
  {
    title: 'Order received',
    detail: 'Your order is confirmed.',
    time: '09:30',
  },
  {
    title: 'Packed for delivery',
    detail: 'Your items are ready for collection.',
    time: '10:45',
  },
  {
    title: 'On the way',
    detail: 'The courier has collected your parcel.',
    time: '12:15',
  },
  { title: 'Delivered', detail: 'Your parcel has arrived.', time: '14:20' },
];
export default function TimelineScreen() {
  const [current, setCurrent] = useState(1);
  const colors = useThemeColor();
  const onPrimary = useIconColor('onPrimary');
  return (
    <DemoPage
      title="Timeline"
      description="Follow an event sequence with aligned markers, readable details, and status expressed in words as well as color."
    >
      <DemoSection
        title="Delivery progress"
        description="Advance the sample order to see the status update in place."
      >
        <Timeline>
          {STEPS.map((step, index) => {
            const complete = index < current;
            const active = index === current;
            return (
              <TimelineItem
                key={step.title}
                line={index < STEPS.length - 1}
                dot={
                  <View
                    className="h-6 w-6 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: complete ? colors.primary : colors.muted,
                      borderWidth: active ? 1 : 0,
                      borderColor: colors.primary,
                    }}
                  >
                    {complete ? (
                      <Check size={14} color={onPrimary} />
                    ) : (
                      <View
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: active
                            ? colors.primary
                            : colors.mutedForeground,
                        }}
                      />
                    )}
                  </View>
                }
              >
                <TimelineTitle>{step.title}</TimelineTitle>
                <Animated.View
                  key={complete ? 'complete' : active ? 'active' : 'pending'}
                  entering={FadeIn.duration(160).reduceMotion(
                    ReduceMotion.System
                  )}
                  layout={LinearTransition.duration(200).reduceMotion(
                    ReduceMotion.System
                  )}
                >
                  <TimelineDescription>
                    {complete
                      ? `${step.time} · Completed`
                      : active
                        ? 'In progress'
                        : 'Upcoming'}
                  </TimelineDescription>
                  {complete || active ? (
                    <Text variant="muted" className="mt-1">
                      {step.detail}
                    </Text>
                  ) : null}
                </Animated.View>
              </TimelineItem>
            );
          })}
        </Timeline>
        <View className="mt-5 items-start">
          <Button
            variant="outline"
            onPress={() =>
              setCurrent((step) => (step >= STEPS.length ? 1 : step + 1))
            }
          >
            {current >= STEPS.length ? 'Replay delivery' : 'Advance delivery'}
          </Button>
        </View>
        <Text variant="muted" accessibilityLiveRegion="polite" className="mt-3">
          {current >= STEPS.length
            ? 'Delivery complete.'
            : `${STEPS[current].title} is in progress.`}
        </Text>
      </DemoSection>
      <DemoSection
        title="Activity history"
        description="Past events stay static. Motion is reserved for changes."
      >
        <Timeline>
          <TimelineItem>
            <TimelineTitle>Review approved</TimelineTitle>
            <TimelineDescription>
              Today, 10:45 · Maya approved the mobile layouts.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>Prototype shared</TimelineTitle>
            <TimelineDescription>
              Today, 09:30 · Alex shared the updated calendar flow.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem line={false}>
            <TimelineTitle>Project created</TimelineTitle>
            <TimelineDescription>
              Yesterday, 16:00 · The team started the design review.
            </TimelineDescription>
          </TimelineItem>
        </Timeline>
      </DemoSection>
    </DemoPage>
  );
}
