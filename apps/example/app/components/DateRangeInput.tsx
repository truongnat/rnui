import { DateRangeInput, Stack } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function DateRangeInputScreen() {
  const [range, setRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });
  const [emptyRange, setEmptyRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  return (
    <DemoPage
      title="Date Range Input"
      description="Dual-month range selection with quick presets and clearable state."
    >
      <DemoSection title="With Presets" description="Fast report and analytics filters.">
        <DateRangeInput
          label="Reporting period"
          value={range}
          onChange={setRange}
          helperText="Choose the period used for summary metrics."
        />
      </DemoSection>

      <DemoSection title="Booking Window" description="Min/max constraints and empty state.">
        <DateRangeInput
          label="Stay dates"
          value={emptyRange}
          onChange={setEmptyRange}
          placeholder="Select arrival and departure"
          minimumDate={new Date()}
          maximumDate={new Date(new Date().getFullYear() + 1, 11, 31)}
          presets={[]}
        />
      </DemoSection>

      <DemoSection
        title="Validation"
        description="Error, warning, and success status states."
      >
        <Stack spacing="lg">
          <DateRangeInput
            label="Error"
            value={{ start: new Date(2024, 0, 1), end: new Date(2024, 0, 3) }}
            onChange={() => {}}
            presets={[]}
            status="error"
            statusMessage="Campaign must run for at least seven days"
          />
          <DateRangeInput
            label="Warning"
            value={{ start: new Date(2024, 0, 1), end: new Date(2024, 2, 31) }}
            onChange={() => {}}
            presets={[]}
            status="warning"
            statusMessage="This range spans a high-demand period"
          />
          <DateRangeInput
            label="Success"
            value={{ start: new Date(2024, 0, 1), end: new Date(2024, 0, 14) }}
            onChange={() => {}}
            presets={[]}
            status="success"
            statusMessage="Range is available for booking"
          />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
