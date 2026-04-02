import React from "react";
import { render } from "@testing-library/react-native";
import { Skeleton, SkeletonText } from "../Skeleton";
import { ThemeProvider } from "@truongdq01/headless";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider colorScheme="light" brand={undefined} override={undefined}>
    {children}
  </ThemeProvider>
);

test("Skeleton renders", () => {
  const { toJSON } = render(
    <Wrap>
      <Skeleton width={100} height={20} />
      <SkeletonText lines={2} />
    </Wrap>
  );
  expect(toJSON()).toBeTruthy();
});

test("Skeleton renders with animate false", () => {
  const { toJSON } = render(
    <Wrap>
      <Skeleton width={100} height={20} animate={false} />
    </Wrap>
  );
  expect(toJSON()).toBeTruthy();
});

test("Skeleton unmounts without throwing", () => {
  const { unmount } = render(
    <Wrap>
      <Skeleton width={50} height={10} animate />
    </Wrap>
  );
  expect(() => unmount()).not.toThrow();
});
