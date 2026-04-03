import type { StoryObj } from "@storybook/react-native";
import React from "react";
import { ThemeProvider, Pagination } from "@truongdq01/ui";
import { View } from "react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <View style={{ padding: 24 }}>
      {children}
    </View>
  </ThemeProvider>
);

const PaginationWrapper = (props: any) => {
  const [page, setPage] = React.useState(props.defaultPage ?? 1);
  return (
    <Pagination
      {...props}
      page={page}
      onChange={setPage}
    />
  );
};

const meta = {
  title: "Components/Pagination",
  component: PaginationWrapper,
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
  argTypes: {
    count: { control: "number" },
    siblingCount: { control: "number" },
    boundaryCount: { control: "number" },
    showFirstButton: { control: "boolean" },
    showLastButton: { control: "boolean" },
  },
  args: {
    count: 10,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstButton: false,
    showLastButton: false,
    defaultPage: 1,
  },
};

export default meta;
type Story = StoryObj<typeof PaginationWrapper>;

export const Default: Story = {
  args: { count: 10 },
};

export const Small: Story = {
  args: { count: 5 },
};

export const Large: Story = {
  args: { count: 50 },
};

export const WithBoundaryButtons: Story = {
  args: { count: 20, showFirstButton: true, showLastButton: true },
};
