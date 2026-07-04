import { DateTimeInput, Stack } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DateTimeInputScreen() {
  const [startsAt, setStartsAt] = useState<Date | null>(new Date());
  const [deadline, setDeadline] = useState<Date | null>(null);

  return (
    <DemoPage
      title="Date Time Input"
      description="Combined calendar and time selection for scheduling workflows."
    >
      <DemoSection title="Basic" description="Date and time in one interaction.">
        <DateTimeInput
          label="Starts at"
          value={startsAt}
          onChange={setStartsAt}
          placeholder="Pick date and time"
          minuteInterval={15}
          helperText="Slots snap to 15-minute increments."
        />
      </DemoSection>

      <DemoSection title="Locale" description="24-hour format for regional scheduling.">
        <DateTimeInput
          label="Thời hạn"
          value={deadline}
          onChange={setDeadline}
          placeholder="Chọn ngày và giờ"
          locale="vi-VN"
          is24Hour
          strings={{
            titleDateTime: 'Chọn ngày và giờ',
            selectMonth: 'Chọn tháng',
            selectYear: 'Chọn năm',
            confirm: 'Xong',
            cancel: 'Hủy',
            today: 'Hôm nay',
            hour: 'Giờ',
            minute: 'Phút',
          }}
        />
      </DemoSection>

      <DemoSection
        title="Validation"
        description="Error, warning, and success status states."
      >
        <Stack spacing="lg">
          <DateTimeInput
            label="Error"
            status="error"
            statusMessage="Start time overlaps another event"
            value={new Date()}
            onChange={() => {}}
          />
          <DateTimeInput
            label="Warning"
            status="warning"
            statusMessage="Scheduled outside business hours"
            value={new Date()}
            onChange={() => {}}
          />
          <DateTimeInput
            label="Success"
            status="success"
            statusMessage="Slot confirmed and available"
            value={new Date()}
            onChange={() => {}}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Disabled">
        <DateTimeInput
          label="Disabled"
          disabled
          value={new Date()}
          onChange={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}
