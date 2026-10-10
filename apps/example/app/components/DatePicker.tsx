import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker';
import { type DateRange } from '@/components/ui/calendar';
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
  });

  return (
    <DemoPage
      title="Date Picker"
      description="Calendar-backed date selection and unified date-range picker."
    >
      <DemoSection
        title="Basic (Default Format)"
        description="Single date selection with default locale format."
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
        title="Format Option (String Pattern)"
        description="Direct format pattern using format='DD/MM/YYYY'."
      >
        <FormField>
          <FormLabel>Ngày sinh (DD/MM/YYYY)</FormLabel>
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh (DD/MM/YYYY)"
          />
          <FormDescription>Định dạng ngày/tháng/năm quen thuộc tại Việt Nam.</FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="Custom Format (Function)"
        description="format function callback for full localized formatting."
      >
        <FormField>
          <FormLabel>Thời hạn</FormLabel>
          <DatePicker
            value={startsAt}
            onChange={setStartsAt}
            placeholder="Chọn ngày"
            format={(d) =>
              d.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }
          />
        </FormField>
      </DemoSection>

      <DemoSection
        title="Unified Date Range Picker (1 Input)"
        description="Chọn cả khoảng thời gian (Start & End) trên 1 Calendar duy nhất thay vì 2 ô input riêng lẻ."
      >
        <FormField>
          <FormLabel>Reporting Period (Khoảng ngày)</FormLabel>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            format="DD/MM/YYYY"
            placeholder="Chọn khoảng ngày (Start - End)"
          />
          <FormDescription>
            Bấm ngày đầu để bắt đầu, bấm ngày sau để kết thúc. Lịch tự động tô màu dải ngày ở giữa.
          </FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="States"
        description="Validation error and disabled states."
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
