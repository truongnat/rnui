import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const today = new Date();

export default function CalendarScreen() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth() + 1, 1)
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
          <CardHeader>
            <CardTitle>Book an onboarding call</CardTitle>
            <CardDescription>
              {selectedDate
                ? `Selected ${selectedDate.toDateString()}`
                : 'Pick a day to continue.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                toast.info(`Selected ${date.toDateString()}`);
              }}
            />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Controlled month"
        description="Drive the visible month from outside — e.g. jump to a billing period."
      >
        <Card>
          <CardHeader>
            <CardTitle>Plan your stay</CardTitle>
            <CardDescription>
              Viewing{' '}
              {visibleMonth.toLocaleString(undefined, {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              selected={bookingDate}
              onSelect={setBookingDate}
              month={visibleMonth}
              onMonthChange={setVisibleMonth}
            />
          </CardContent>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
