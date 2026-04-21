import { useTheme } from '@truongdq01/headless';
import { DatePicker, Typography, Stack } from '@truongdq01/ui';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function DatePickerScreen() {
  const { tokens } = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <DemoPage
      title="Date Picker"
      description="A standardized input for selecting dates, providing a consistent experience across iOS and Android with integrated validation."
    >
      <DemoSection title="Basic Features">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 12 }}>
          Integrates with native system pickers while maintaining design system consistency for labels and validation.
        </Typography>
        <DatePicker
          label="Appointement Date"
          placeholder="Pick a date"
          date={date}
          onChange={setDate}
        />
      </DemoSection>

      <DemoSection title="Placeholder State">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 12 }}>
          Clear and readable placeholder state when no date is selected.
        </Typography>
        <DatePicker
          label="Birth Date"
          placeholder="Select your birthday"
          date={birthDate}
          onChange={setBirthDate}
        />
      </DemoSection>

      <DemoSection title="Format & Vietnamese labels">
        <Typography variant="body2" color="tertiary" style={{ marginBottom: 12 }}>
          Custom display via formatOptions, and modal copy via strings (month/year titles, actions).
        </Typography>
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

      <DemoSection title="Component States">
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
