import { useMemo } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineOppositeContent,
  Typography,
  Card,
  Icon,
} from '@truongdq01/ui';
import { View, StyleSheet } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function TimelineScreen() {
  const t = useTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          padding: t.spacing[3],
        },
        customDot: {
          width: t.spacing[6],
          height: t.spacing[6],
          borderRadius: t.radius.full,
          backgroundColor: t.color.success.icon,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [t],
  );

  return (
    <DemoPage
      title="Timeline"
      description="Events in chronological order with status indicators."
    >
      <DemoSection title="Basic" description="completed, active, and pending states.">
        <Timeline>
          <TimelineItem status="completed">
            <TimelineContent>
              <Typography variant="subtitle1">Order Placed</Typography>
              <Typography variant="body2" color="secondary">
                Your order has been received
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="completed">
            <TimelineContent>
              <Typography variant="subtitle1">Payment Confirmed</Typography>
              <Typography variant="body2" color="secondary">
                Transaction successful
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="active">
            <TimelineContent>
              <Typography variant="subtitle1">Processing</Typography>
              <Typography variant="body2" color="secondary">
                Preparing your items
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="pending">
            <TimelineContent>
              <Typography variant="subtitle1">Shipped</Typography>
              <Typography variant="body2" color="secondary">
                Pending pickup
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection title="Opposite Content" description="Timestamps on the left.">
        <Timeline position="left">
          <TimelineItem status="completed">
            <TimelineOppositeContent>
              <Typography variant="caption">09:30 AM</Typography>
            </TimelineOppositeContent>
            <TimelineContent>
              <Typography variant="subtitle2">Login</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="active">
            <TimelineOppositeContent>
              <Typography variant="caption">10:45 AM</Typography>
            </TimelineOppositeContent>
            <TimelineContent>
              <Typography variant="subtitle2">Meeting</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection title="Alternate" description="Zigzag layout with cards.">
        <Timeline position="alternate">
          <TimelineItem status="completed">
            <TimelineOppositeContent>
              <Typography variant="caption">Step 1</Typography>
            </TimelineOppositeContent>
            <TimelineContent>
              <Card style={styles.card}>
                <Typography variant="body2">Initial Setup</Typography>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="completed">
            <TimelineOppositeContent>
              <Typography variant="caption">Step 2</Typography>
            </TimelineOppositeContent>
            <TimelineContent>
              <Card style={styles.card}>
                <Typography variant="body2">Configuration</Typography>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="active">
            <TimelineOppositeContent>
              <Typography variant="caption">Step 3</Typography>
            </TimelineOppositeContent>
            <TimelineContent>
              <Card style={styles.card}>
                <Typography variant="body2">Deployment</Typography>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection title="Custom Dots" description="Outlined and custom icon dots.">
        <Timeline>
          <TimelineItem status="error">
            <TimelineSeparator>
              <TimelineDot variant="outlined" status="error" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="subtitle2"
                style={{ color: t.color.status.error }}
              >
                System Failure
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="completed">
            <TimelineSeparator>
              <View style={styles.customDot}>
                <Icon name="check" size={12} color={t.color.text.inverse} />
              </View>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2">Recovered</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </DemoSection>
    </DemoPage>
  );
}
