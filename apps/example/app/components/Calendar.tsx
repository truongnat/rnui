import { useState } from 'react';
import {
  Calendar,
  type CalendarViewMode,
  type DateRange,
} from '@/components/ui/calendar';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const today = new Date();
export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [view, setView] = useState<CalendarViewMode>('month');
  const [weekDate, setWeekDate] = useState<Date>(today);
  const [range, setRange] = useState<DateRange>({
    start: new Date(today.getFullYear(), today.getMonth(), 8),
    end: new Date(today.getFullYear(), today.getMonth(), 12),
  });
  return (
    <DemoPage
      title="Calendar"
      description="Pick a day or a date range. Spacious controls and clear selection keep the calendar readable on a phone."
    >
      <DemoSection
        title="Schedule an appointment"
        description="Navigate months, or switch to a compact week. Outside days remain selectable."
        bare
      >
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
          showViewToggle
          view={view}
          onViewChange={setView}
        />
        <Text variant="muted" className="mt-3" accessibilityLiveRegion="polite">
          Selected:{' '}
          {selectedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </DemoSection>
      <DemoSection
        title="Weekly work log"
        description="Use the arrows to move one week at a time."
        bare
      >
        <Calendar view="week" selected={weekDate} onSelect={setWeekDate} />
        <Text variant="muted" className="mt-3" accessibilityLiveRegion="polite">
          Work log for {weekDate.toLocaleDateString()}
        </Text>
      </DemoSection>
      <DemoSection
        title="Plan time away"
        description="Choose a start date, then an end date. Selecting an earlier day starts a new range."
        bare
      >
        <Calendar
          mode="range"
          selectedRange={range}
          onSelectRange={setRange}
          showOutsideDays={false}
        />
        <Text variant="muted" className="mt-3" accessibilityLiveRegion="polite">
          {range.start && range.end
            ? `${range.start.toLocaleDateString()} – ${range.end.toLocaleDateString()}`
            : range.start
              ? `Starts ${range.start.toLocaleDateString()}. Choose an end date.`
              : 'Choose a start date.'}
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
