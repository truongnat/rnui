import { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { DataTable, type DataTableColumn } from '@/components/ui/data-table';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableScroll,
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type Member = { id: string; name: string; role: string; status: string };
const MEMBERS: Member[] = [
  { id: 'maya', name: 'Maya Chen', role: 'Designer', status: 'Active' },
  { id: 'alex', name: 'Alex Morgan', role: 'Developer', status: 'Active' },
  { id: 'priya', name: 'Priya Shah', role: 'Product lead', status: 'Away' },
  { id: 'jordan', name: 'Jordan Lee', role: 'QA engineer', status: 'Active' },
  { id: 'sam', name: 'Sam Rivera', role: 'Developer', status: 'Away' },
];
const COLUMNS: DataTableColumn<Member>[] = [
  { key: 'name', header: 'Name', sortable: true, flex: 2 },
  { key: 'role', header: 'Role', sortable: true, flex: 2 },
  {
    key: 'status',
    header: 'Status',
    render: (member) => <Badge variant="secondary">{member.status}</Badge>,
  },
];
const INVOICES = [
  { id: 'INV-1042', date: 'Oct 11', amount: '$240.00', status: 'Paid' },
  { id: 'INV-1041', date: 'Oct 8', amount: '$128.50', status: 'Due' },
  { id: 'INV-1040', date: 'Oct 4', amount: '$86.00', status: 'Paid' },
];

export default function TableScreen() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const { fontScale } = useWindowDimensions();
  const [availableWidth, setAvailableWidth] = useState(0);
  const tableWidth = Math.max(availableWidth, 320 * fontScale);
  return (
    <DemoPage
      title="Table"
      description="Readable columns, aligned amounts, and useful row actions. Wide datasets scroll instead of squeezing text."
    >
      <DemoSection
        title="Recent invoices"
        description="Secondary dates sit below the invoice number; amounts use tabular figures."
        flush
      >
        <TableScroll
          onLayout={(event) =>
            setAvailableWidth(event.nativeEvent.layout.width)
          }
        >
          <Table style={{ width: tableWidth }}>
            <TableHeader>
              <TableRow>
                <TableHead flex={2}>Invoice</TableHead>
                <TableHead className="items-end">Amount</TableHead>
                <TableHead className="items-end">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell flex={2}>
                    <Text className="text-sm font-medium">{invoice.id}</Text>
                    <Text variant="muted">{invoice.date}</Text>
                  </TableCell>
                  <TableCell className="items-end">
                    <Text
                      className="text-sm"
                      style={{ fontVariant: ['tabular-nums'] }}
                    >
                      {invoice.amount}
                    </Text>
                  </TableCell>
                  <TableCell className="items-end">
                    <Badge variant="outline" className="self-end">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScroll>
        <TableCaption className="px-3 pb-3">
          Sample invoices · amounts in USD
        </TableCaption>
      </DemoSection>
      <DemoSection
        title="Team directory"
        description="Scroll horizontally for roomier columns. Tap Name or Role to cycle ascending, descending, and original order."
        flush
      >
        <TableScroll>
          <View style={{ width: Math.max(availableWidth, 384 * fontScale) }}>
            <DataTable
              columns={COLUMNS}
              data={MEMBERS}
              rowKey={(member) => member.id}
              onRowPress={(member) => setSelected(member.name)}
            />
          </View>
        </TableScroll>
        <Text
          variant="muted"
          className="px-3 py-3"
          accessibilityLiveRegion="polite"
        >
          {selected ? `Selected ${selected}` : 'Tap a row to select a member.'}
        </Text>
      </DemoSection>
      <DemoSection
        title="Paginated rows"
        description="Three team members per page."
        flush
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead flex={2}>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.slice((page - 1) * 3, page * 3).map((member) => (
              <TableRow key={member.id}>
                <TableCell flex={2}>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <View className="items-center gap-2 py-4">
          <Pagination page={page} totalPages={2} onPageChange={setPage} />
          <Text variant="muted">
            Page {page} of 2 · {MEMBERS.length} members
          </Text>
        </View>
      </DemoSection>
      <DemoSection
        title="Pinned header"
        description="The column labels stay in place while the rows scroll."
        flush
      >
        <ScrollView
          className="max-h-48"
          nestedScrollEnabled
          stickyHeaderIndices={[0]}
        >
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead flex={2}>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((member) => (
              <TableRow key={member.id}>
                <TableCell flex={2}>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollView>
      </DemoSection>
    </DemoPage>
  );
}
