import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

function Dot({ tone }: { tone: 'primary' | 'muted' }) {
  return (
    <View
      className={
        tone === 'primary'
          ? 'mt-1.5 h-2.5 w-2.5 rounded-full bg-primary'
          : 'mt-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground/40'
      }
    />
  );
}

export default function TimelineScreen() {
  const checkColor = useIconColor('onPrimary');

  return (
    <DemoPage
      title="Timeline"
      description="Events in chronological order with status indicators."
    >
      <DemoSection
        title="Basic"
        description="Completed, active, and pending states."
      >
        <Timeline>
          <TimelineItem>
            <TimelineTitle>Order Placed</TimelineTitle>
            <TimelineDescription>
              Your order has been received
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>Payment Confirmed</TimelineTitle>
            <TimelineDescription>Transaction successful</TimelineDescription>
          </TimelineItem>
          <TimelineItem dot={<Dot tone="primary" />}>
            <TimelineTitle>Processing</TimelineTitle>
            <TimelineDescription>Preparing your items</TimelineDescription>
          </TimelineItem>
          <TimelineItem line={false} dot={<Dot tone="muted" />}>
            <TimelineTitle>Shipped</TimelineTitle>
            <TimelineDescription>Pending pickup</TimelineDescription>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection title="Timestamps" description="Times above each event.">
        <Timeline>
          <TimelineItem>
            <TimelineDescription>09:30 AM</TimelineDescription>
            <TimelineTitle>Login</TimelineTitle>
          </TimelineItem>
          <TimelineItem line={false}>
            <TimelineDescription>10:45 AM</TimelineDescription>
            <TimelineTitle>Meeting</TimelineTitle>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection title="Cards" description="Rich content inside each item.">
        <Timeline>
          {['Initial Setup', 'Configuration', 'Deployment'].map(
            (title, i, arr) => (
              <TimelineItem key={title} line={i < arr.length - 1}>
                <Card className="p-3">
                  <TimelineTitle>{title}</TimelineTitle>
                  <TimelineDescription>Step {i + 1}</TimelineDescription>
                </Card>
              </TimelineItem>
            )
          )}
        </Timeline>
      </DemoSection>

      <DemoSection
        title="Custom Dots"
        description="Outlined and custom icon dots."
      >
        <Timeline>
          <TimelineItem
            dot={
              <View className="mt-1 h-3 w-3 rounded-full border-2 border-destructive bg-background" />
            }
          >
            <TimelineTitle className="text-destructive">
              System Failure
            </TimelineTitle>
          </TimelineItem>
          <TimelineItem
            line={false}
            dot={
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check size={12} color={checkColor} strokeWidth={3} />
              </View>
            }
          >
            <TimelineTitle>Recovered</TimelineTitle>
          </TimelineItem>
        </Timeline>
      </DemoSection>
    </DemoPage>
  );
}
