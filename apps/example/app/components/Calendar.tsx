import { useToast } from '@truongdq01/headless';
import { Calendar, Card, Stack, Typography } from '@truongdq01/ui';
import { useMemo, useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const today = new Date();
const nextQuarterEnd = new Date(today.getFullYear(), today.getMonth() + 3, 0);

export default function CalendarScreen() {
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [travelRange, setTravelRange] = useState({
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
  });

  const weekendConstraint = useMemo(
    () => (date: Date) =>
      date.getDay() === 0 || date.getDay() === 6
        ? {
            disabled: true,
            reason: 'Weekends are blocked for delivery scheduling.',
          }
        : false,
    []
  );

  return (
    <DemoPage
      title="Calendar"
      description="Standalone month-grid selection for schedules, bookings, and date filters."
    >
      <DemoSection
        title="Single date"
        description="Choose one appointment date with the surrounding month visible."
      >
        <Card>
          <Stack spacing="md">
            <Typography variant="subtitle2">Book an onboarding call</Typography>
            <Calendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                if (date) {
                  toast.info(`Selected ${date.toDateString()}`);
                }
              }}
              minimumDate={today}
              maximumDate={nextQuarterEnd}
            />
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Range selection"
        description="Use range mode when the user needs a start and end date together."
      >
        <Card>
          <Stack spacing="md">
            <Typography variant="subtitle2">Plan your stay</Typography>
            <Calendar
              selectionMode="range"
              range={travelRange}
              onRangeChange={setTravelRange}
              numberOfMonths={2}
              minimumDate={today}
            />
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Constraints"
        description="Disable invalid days and explain why they are unavailable."
      >
        <Card>
          <Stack spacing="md">
            <Typography variant="subtitle2">
              Delivery slots on business days only
            </Typography>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              dateConstraints={weekendConstraint}
              onUnavailableDatePress={(_, reason) => {
                if (reason) {
                  toast.warning(reason);
                }
              }}
            />
            <Typography variant="caption" color="tertiary">
              Weekends are intentionally blocked because the support team is
              offline.
            </Typography>
          </Stack>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
