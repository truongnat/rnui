import { useState } from 'react';
import { Calendar, type CalendarViewMode, type DateRange } from '@/components/ui/calendar';
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
  const [calendarView, setCalendarView] = useState<CalendarViewMode>('month');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    start: new Date(today.getFullYear(), today.getMonth(), 8),
    end: new Date(today.getFullYear(), today.getMonth(), 18),
  });

  return (
    <DemoPage
      title="Calendar"
      description="Standalone month & week-grid selection with outside days and range mode."
    >
      <DemoSection
        title="Show Outside Days & View Toggle"
        description="Hiển thị các ngày mờ của tháng trước/sau (showOutsideDays) và chuyển đổi xem theo Tuần / Tháng (Month / Week toggle)."
      >
        <Card>
          <CardHeader>
            <CardTitle>Schedule an appointment</CardTitle>
            <CardDescription>
              {selectedDate
                ? `Selected: ${selectedDate.toDateString()}`
                : 'Pick a day to continue.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              selected={selectedDate}
              showOutsideDays={true}
              showViewToggle={true}
              view={calendarView}
              onViewChange={setCalendarView}
              onSelect={(date) => {
                setSelectedDate(date);
                toast.info(`Selected ${date.toDateString()}`);
              }}
            />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Week View Only"
        description="Chế độ xem gọn theo 7 ngày trong tuần (view='week'). Bấm < và > để chuyển tuần."
      >
        <Card>
          <CardHeader>
            <CardTitle>Weekly Work Log</CardTitle>
            <CardDescription>7-day compact row view</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              view="week"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Range Mode in Calendar"
        description="Chọn khoảng ngày (mode='range') trực tiếp trên lưới lịch có dải màu highlight."
      >
        <Card>
          <CardHeader>
            <CardTitle>Vacation booking</CardTitle>
            <CardDescription>
              {selectedRange?.start && selectedRange?.end
                ? `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
                : 'Select start date then end date.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selectedRange={selectedRange}
              onSelectRange={setSelectedRange}
              showOutsideDays={true}
            />
          </CardContent>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
