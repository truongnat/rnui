import { useTokens } from '@truongdq01/headless';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@truongdq01/ui';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

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
  const t = useTokens();
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(3);

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

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <DemoPage
      title="Table"
      description="Tables display data in an easy-to-scan format, with rows and columns."
    >
      <DemoSection title="Basic Table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell variant="head">Name</TableCell>
                <TableCell variant="head">Role</TableCell>
                <TableCell variant="head" align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INITIAL_DATA.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection title="Size & Padding">
        <Typography variant="subtitle2" style={{ marginBottom: t.spacing[2] }}>Small Size, No Padding</Typography>
        <TableContainer style={{ marginBottom: t.spacing[4] }}>
          <Table size="small" padding="none">
            <TableHead>
              <TableRow>
                <TableCell variant="head">Category</TableCell>
                <TableCell variant="head" align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Efficiency</TableCell>
                <TableCell align="right">98%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Uptime</TableCell>
                <TableCell align="right">99.9%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection title="Interactive Sorting & Pagination">
        <TableContainer>
          <Table
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          >
            <TableHead>
              <TableRow>
                <TableCell variant="head">
                  <TableSortLabel
                    active={sortColumn === 'name'}
                    direction={sortColumn === 'name' ? sortDirection : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell variant="head">
                   <TableSortLabel
                    active={sortColumn === 'role'}
                    direction={sortColumn === 'role' ? sortDirection : 'asc'}
                    onClick={() => handleSort('role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell variant="head" align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
               <TableRow>
                <View style={{ flex: 1 }}>
                    <TablePagination
                        count={INITIAL_DATA.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setPage}
                    />
                </View>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </DemoSection>

      <DemoSection title="Sticky Header">
        <View style={{ height: 200 }}>
            <TableContainer>
            <Table stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell variant="head">Column 1</TableCell>
                    <TableCell variant="head">Column 2</TableCell>
                    <TableCell variant="head">Column 3</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {[...Array(10)].map((_, i) => (
                    <TableRow key={i}>
                    <TableCell>Row {i + 1} Col 1</TableCell>
                    <TableCell>Row {i + 1} Col 2</TableCell>
                    <TableCell>Row {i + 1} Col 3</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
