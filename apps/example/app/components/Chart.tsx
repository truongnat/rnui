import { BarChart, type ChartDatum } from '@/components/ui/chart';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const weeklyData: ChartDatum[] = [
  { label: 'Mon', value: 24 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 31 },
  { label: 'Thu', value: 52 },
  { label: 'Fri', value: 44 },
];

export default function ChartScreen() {
  return (
    <DemoPage
      title="Chart"
      description="A compact weekly activity chart rendered with Skia."
    >
      <DemoSection
        title="Weekly activity"
        description="Activity over the last five days."
      >
        <BarChart data={weeklyData} height={126} />
      </DemoSection>
    </DemoPage>
  );
}
