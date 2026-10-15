import { useState } from 'react';
import { DataTable, type DataTableColumn } from '@/components/ui/data-table';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type ComponentRelease = {
  id: string;
  component: string;
  version: string;
  downloads: number;
};

const releases: ComponentRelease[] = [
  { id: 'button', component: 'Button', version: '2.4.0', downloads: 1840 },
  { id: 'sheet', component: 'Sheet', version: '1.8.2', downloads: 1260 },
  { id: 'tabs', component: 'Tabs', version: '1.5.1', downloads: 970 },
];

const columns: DataTableColumn<ComponentRelease>[] = [
  { key: 'component', header: 'Component', sortable: true, flex: 2 },
  { key: 'version', header: 'Version', sortable: true, flex: 1 },
  {
    key: 'downloads',
    header: 'Downloads',
    sortable: true,
    align: 'right',
    flex: 1,
  },
];

export default function DataTableScreen() {
  const [selected, setSelected] = useState('');

  return (
    <DemoPage
      title="Data Table"
      description="A sortable table for compact, structured records."
    >
      <DemoSection
        title="Component releases"
        description="Tap a column heading to sort. Tap a row to select it."
      >
        <DataTable
          columns={columns}
          data={releases}
          rowKey={(row) => row.id}
          onRowPress={(row) => setSelected(row.component)}
        />
        <Text variant="muted" accessibilityLiveRegion="polite">
          {selected ? `Selected: ${selected}` : 'No row selected.'}
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
