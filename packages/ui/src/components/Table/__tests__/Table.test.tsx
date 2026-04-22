import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../index';

test('Table renders rows and cells', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ThemeProvider>
  );
  expect(getByText('Name')).toBeTruthy();
  expect(getByText('Ada')).toBeTruthy();
});
