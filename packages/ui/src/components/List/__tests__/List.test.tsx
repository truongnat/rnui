import React from "react";
import { render } from "@testing-library/react-native";
import { List, ListItem, ListItemText } from "../List";
import { ThemeProvider } from "@truongdq01/headless";

test("List renders items and text", () => {
  const { getByText } = render(
    <ThemeProvider>
      <List>
        <ListItem>
          <ListItemText primary="Item Primary" secondary="Secondary" />
        </ListItem>
      </List>
    </ThemeProvider>
  );
  expect(getByText("Item Primary")).toBeTruthy();
  expect(getByText("Secondary")).toBeTruthy();
});
