import { DatePicker, Stack } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DatePickerScreen() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <DemoPage
      title="Date Picker"
      description="Cross-platform date selection with validation and locale support."
    >
      <DemoSection title="Basic" description="Native pickers with design-system labels.">
        <DatePicker
          label="Appointment Date"
          placeholder="Pick a date"
          date={date}
          onChange={setDate}
        />
      </DemoSection>

      <DemoSection title="Placeholder" description="Empty state before selection.">
        <DatePicker
          label="Birth Date"
          placeholder="Select your birthday"
          date={birthDate}
          onChange={setBirthDate}
        />
      </DemoSection>

      <DemoSection title="Vietnamese Locale" description="Custom formatOptions and modal strings.">
        <DatePicker
          label="Ngày hẹn"
          placeholder="Chọn ngày"
          date={birthDate}
          onChange={setBirthDate}
          locale="vi-VN"
          formatOptions={{ day: '2-digit', month: '2-digit', year: 'numeric' }}
          strings={{
            titleDate: 'Chọn ngày',
            selectMonth: 'Chọn tháng',
            selectYear: 'Chọn năm',
            confirm: 'Xong',
            cancel: 'Hủy',
            today: 'Hôm nay',
          }}
        />
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="lg">
          <DatePicker
            label="Read-only / Disabled"
            disabled
            date={new Date()}
            onChange={() => {}}
          />
          <DatePicker
            label="Validation Error"
            error="Date cannot be in the past"
            date={new Date(2000, 0, 1)}
            onChange={() => {}}
          />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
