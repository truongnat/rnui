import { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DatePickerScreen() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [startsAt, setStartsAt] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<{
    start?: Date;
    end?: Date;
  }>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });
  const [rangeError, setRangeError] = useState<string | undefined>();

  const updateRange = (key: 'start' | 'end') => (d: Date) => {
    const next = { ...range, [key]: d };
    setRange(next);
    setRangeError(
      next.start && next.end && next.end.getTime() < next.start.getTime()
        ? 'End date must be after the start date'
        : undefined
    );
  };

  return (
    <DemoPage
      title="Date Picker"
      description="Calendar-backed date selection composable inside form fields."
    >
      <DemoSection
        title="Basic"
        description="Form field with label and helper text."
      >
        <FormField>
          <FormLabel>Appointment Date</FormLabel>
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Pick a date"
          />
          <FormDescription>Used to schedule the next review.</FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="Placeholder"
        description="Empty state before selection."
      >
        <FormField>
          <FormLabel>Birth Date</FormLabel>
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="Select your birthday"
          />
        </FormField>
      </DemoSection>

      <DemoSection
        title="Custom Format"
        description="format controls the trigger label — here a locale-aware date+time for scheduling."
      >
        <FormField>
          <FormLabel>Thời hạn</FormLabel>
          <DatePicker
            value={startsAt}
            onChange={setStartsAt}
            placeholder="Chọn ngày và giờ"
            format={(d) =>
              d.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }
          />
          <FormDescription>The calendar selects the date only.</FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="Date Range"
        description="Compose two pickers for start/end inputs; clamp the range in onChange."
      >
        <Stack spacing="lg">
          <FormField error={rangeError}>
            <FormLabel>Reporting period</FormLabel>
            <Stack spacing="md">
              <DatePicker
                value={range.start}
                onChange={updateRange('start')}
                placeholder="Start date"
              />
              <DatePicker
                value={range.end}
                onChange={updateRange('end')}
                placeholder="End date"
              />
            </Stack>
            <FormMessage />
            <FormDescription>
              Pick a start, then an end — invalid ranges surface an error.
            </FormDescription>
          </FormField>
        </Stack>
      </DemoSection>

      <DemoSection
        title="States"
        description="FormField error turns the trigger border destructive; disabled dims the control."
      >
        <Stack spacing="lg">
          <FormField error="Date cannot be in the past">
            <FormLabel>Validation Error</FormLabel>
            <DatePicker value={new Date(2000, 0, 1)} onChange={() => {}} />
            <FormMessage />
          </FormField>
          <FormField>
            <FormLabel>Read-only / Disabled</FormLabel>
            <DatePicker disabled value={new Date()} onChange={() => {}} />
            <FormDescription>This field cannot be changed.</FormDescription>
          </FormField>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
