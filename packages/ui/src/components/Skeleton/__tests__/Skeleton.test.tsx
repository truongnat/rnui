import React from "react";
import { render } from "@testing-library/react-native";
import { Skeleton, SkeletonText } from "../Skeleton";
import { ThemeProvider } from "@rnui/headless";

test("Skeleton renders", () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Skeleton width={100} height={20} />
      <SkeletonText lines={2} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
