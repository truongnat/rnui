import React from "react";
import { render } from "@testing-library/react-native";
import { Breadcrumbs } from "../Breadcrumbs";
import { Link } from "../../Link";
import { ThemeProvider } from "@rnui/headless";

test("Breadcrumbs renders links and separators", () => {
  const { getByText } = render(
    <ThemeProvider>
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
      </Breadcrumbs>
    </ThemeProvider>
  );
  expect(getByText("Home")).toBeTruthy();
  expect(getByText("Docs")).toBeTruthy();
});
