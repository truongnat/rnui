import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

interface DataItem {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const INITIAL_DATA: DataItem[] = [
  { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', role: 'QA Engineer', status: 'Active' },
  { id: 5, name: 'Charlie Davis', role: 'Product Owner', status: 'Inactive' },
];

export default function TableScreen() {
  const iconColor = useIconColor();
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const sortedData = [...INITIAL_DATA].sort((a, b) => {
    const fieldA = a[sortColumn as keyof DataItem];
    const fieldB = b[sortColumn as keyof DataItem];
    if (sortDirection === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    }
    return fieldA < fieldB ? 1 : -1;
  });

  const totalPages = Math.ceil(INITIAL_DATA.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const sortIcon = (column: string) =>
    sortColumn === column ? (
      sortDirection === 'asc' ? (
        <ArrowUp size={14} color={iconColor} />
      ) : (
        <ArrowDown size={14} color={iconColor} />
      )
    ) : null;

  return (
    <DemoPage
      title="Table"
      description="Scan-friendly rows and columns for structured data."
    >
      <DemoSection title="Basic" flush>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead flex={2}>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="items-end">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INITIAL_DATA.slice(0, 3).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{String(row.id)}</TableCell>
                <TableCell flex={2}>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className="items-end">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableCaption>3 of 5 team members.</TableCaption>
      </DemoSection>

      <DemoSection
        title="Size & Padding"
        description="Compact cells via className padding overrides."
        flush
      >
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead className="py-1.5">Category</TableHead>
              <TableHead className="items-end py-1.5">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-1.5">Efficiency</TableCell>
              <TableCell className="items-end py-1.5">98%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-1.5">Uptime</TableCell>
              <TableCell className="items-end py-1.5">99.9%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DemoSection>

      <DemoSection
        title="Sort & Pagination"
        description="Interactive column sorting with pagination."
        flush
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => handleSort('name')}
                >
                  <Text className="text-sm font-medium text-muted-foreground">
                    Name
                  </Text>
                  {sortIcon('name')}
                </Pressable>
              </TableHead>
              <TableHead>
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => handleSort('role')}
                >
                  <Text className="text-sm font-medium text-muted-foreground">
                    Role
                  </Text>
                  {sortIcon('role')}
                </Pressable>
              </TableHead>
              <TableHead className="items-end">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className="items-end">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <View className="items-center py-3">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </View>
      </DemoSection>

      <DemoSection
        title="Sticky Header"
        description="Header stays visible while scrolling."
        flush
      >
        <ScrollView style={{ height: 200 }} stickyHeaderIndices={[0]}>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
              <TableHead>Column 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>{`Row ${i + 1} Col 1`}</TableCell>
                <TableCell>{`Row ${i + 1} Col 2`}</TableCell>
                <TableCell>{`Row ${i + 1} Col 3`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollView>
      </DemoSection>
    </DemoPage>
  );
}
