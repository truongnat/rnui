import { DateInput, Stack } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DateInputScreen() {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [birthday, setBirthday] = useState<Date | null>(null);

  return (
    <DemoPage
      title="Date Input"
      description="Single-date field with calendar selection, helper text, and validation."
    >
      <DemoSection title="Basic" description="Form-friendly date selection.">
        <DateInput
          label="Due date"
          value={dueDate}
          onChange={setDueDate}
          placeholder="Select a date"
          helperText="Used to schedule the next review."
        />
      </DemoSection>

      <DemoSection title="Constraints" description="Restrict the valid date window.">
        <DateInput
          label="Booking date"
          value={birthday}
          onChange={setBirthday}
          placeholder="Pick an available day"
          minimumDate={new Date()}
          maximumDate={new Date(new Date().getFullYear(), 11, 31)}
          clearable
        />
      </DemoSection>

      <DemoSection
        title="Validation"
        description="Error, warning, and success status states."
      >
        <Stack spacing="lg">
          <DateInput
            label="Error"
            status="error"
            statusMessage="Date must be inside the current quarter"
            value={new Date(2000, 0, 1)}
            onChange={() => {}}
          />
          <DateInput
            label="Warning"
            status="warning"
            statusMessage="This date falls on a public holiday"
            value={new Date()}
            onChange={() => {}}
          />
          <DateInput
            label="Success"
            status="success"
            statusMessage="Date is available"
            value={new Date()}
            onChange={() => {}}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Disabled">
        <DateInput
          label="Disabled"
          disabled
          value={new Date()}
          onChange={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}
