import React from "react";
import { render } from "@testing-library/react-native";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../Table";
import { ThemeProvider } from "@rnui/headless";

test("Table renders rows and cells", () => {
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
  expect(getByText("Name")).toBeTruthy();
  expect(getByText("Ada")).toBeTruthy();
});
