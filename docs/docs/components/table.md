# Table

A flexible data table component with optional headless logic for sorting, pagination, and selection.

## Basic Usage

```tsx
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@rnui/ui";

<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell variant="head">Name</TableCell>
        <TableCell variant="head">Role</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Ada Lovelace</TableCell>
        <TableCell>Engineer</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
```

## Advanced Usage (Headless)

Use the `useTable` hook to manage complex state like sorting and pagination automatically.

```tsx
import { 
  Table, TableContainer, TableHead, TableRow, TableCell, TableBody, 
  TablePagination, TableSortLabel, useTable 
} from "@rnui/ui";

const MyTable = ({ data }) => {
  const {
    paginatedData,
    page,
    rowsPerPage,
    setPage,
    sort,
    handleSort,
    isSelected,
    toggleSelect,
  } = useTable({ 
    data, 
    rowsPerPage: 5,
    initialSort: { key: 'name', direction: 'asc' }
  });

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">
                <TableSortLabel
                  active={sort?.key === 'name'}
                  direction={sort?.direction}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell variant="head">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} selected={isSelected(row.id)}>
                <TableCell onPress={() => toggleSelect(row.id)}>
                  {row.name}
                </TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
      />
    </>
  );
};
```

## API Reference

### useTable Options

| Option | Type | Default | Description |
|---|---|---|---|
| `data` | `T[]` | `[]` | The raw data array |
| `rowsPerPage` | `number` | `10` | Number of items per page |
| `initialPage` | `number` | `0` | Starting page index |
| `initialSort` | `{ key: keyof T, direction: 'asc' \| 'desc' }` | `null` | Initial sort state |

### useTable Return

| Return | Type | Description |
|---|---|---|
| `processedData` | `T[]` | The sorted but not yet paginated data |
| `paginatedData` | `T[]` | Data for the current page |
| `totalPages` | `number` | Total number of pages |
| `handleSort` | `(key: keyof T) => void` | Toggles sort direction for a key |
| `setPage` | `(page: number) => void` | Jump to a specific page |
| `toggleSelect` | `(id: any) => void` | Toggles selection state for an item |
