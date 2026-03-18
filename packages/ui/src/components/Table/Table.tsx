import React, { createContext, useContext } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";
import { Button } from "../Button/Button";

export type TableSize = "small" | "medium";
export type TablePadding = "normal" | "checkbox" | "none";

interface TableContextValue {
  size: TableSize;
  padding: TablePadding;
  stickyHeader: boolean;
}

const TableContext = createContext<TableContextValue | null>(null);

function useTableContext() {
  return useContext(TableContext);
}

export interface TableProps {
  children?: React.ReactNode;
  size?: TableSize;
  padding?: TablePadding;
  stickyHeader?: boolean;
  style?: object;
}

export function Table({
  children,
  size = "medium",
  padding = "normal",
  stickyHeader = false,
  style,
}: TableProps) {
  const ctx = { size, padding, stickyHeader };
  return (
    <TableContext.Provider value={ctx}>
      <View style={style}>{children}</View>
    </TableContext.Provider>
  );
}

export interface TableContainerProps {
  children?: React.ReactNode;
  style?: object;
}

export function TableContainer({ children, style }: TableContainerProps) {
  const tokens = useTokens();
  return (
    <ScrollView
      horizontal
      style={[
        {
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          borderRadius: tokens.radius.md,
        },
        style,
      ]}
    >
      <View style={{ minWidth: "100%" }}>{children}</View>
    </ScrollView>
  );
}

export function TableHead({ children }: { children?: React.ReactNode }) {
  const tokens = useTokens();
  return <View style={{ backgroundColor: tokens.color.bg.muted }}>{children}</View>;
}

export function TableBody({ children }: { children?: React.ReactNode }) {
  return <View>{children}</View>;
}

export function TableFooter({ children }: { children?: React.ReactNode }) {
  const tokens = useTokens();
  return <View style={{ borderTopWidth: 1, borderTopColor: tokens.color.border.default }}>{children}</View>;
}

export interface TableRowProps {
  children?: React.ReactNode;
  selected?: boolean;
  style?: object;
}

export function TableRow({ children, selected = false, style }: TableRowProps) {
  const tokens = useTokens();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderBottomWidth: 1,
          borderBottomColor: tokens.color.border.default,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface TableCellProps {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  padding?: TablePadding;
  size?: TableSize;
  variant?: "head" | "body" | "footer";
  style?: object;
}

export function TableCell({
  children,
  align = "left",
  padding,
  size,
  variant = "body",
  style,
}: TableCellProps) {
  const tokens = useTokens();
  const ctx = useTableContext();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";

  const basePadding = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0,
  }[resolvedPadding];

  const verticalPadding = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];

  return (
    <View style={[{ paddingHorizontal: basePadding, paddingVertical: verticalPadding, flexShrink: 0 }, style]}>
      <Text
        style={{
          color: tokens.color.text.primary,
          textAlign: align,
          fontWeight: variant === "head" ? tokens.fontWeight.semibold : tokens.fontWeight.regular,
          fontSize: resolvedSize === "small" ? tokens.fontSize.sm : tokens.fontSize.md,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  labelRowsPerPage?: string;
}

export function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  labelRowsPerPage = "Rows per page",
}: TablePaginationProps) {
  const tokens = useTokens();
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: tokens.spacing[3],
      }}
    >
      <Text style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
        {labelRowsPerPage}: {rowsPerPage}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing[2] }}>
        <Text style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
          Page {page + 1} of {totalPages}
        </Text>
        <Button
          size="sm"
          variant="outlined"
          disabled={page <= 0}
          onPress={() => onPageChange?.(Math.max(0, page - 1))}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outlined"
          disabled={page >= totalPages - 1}
          onPress={() => onPageChange?.(Math.min(totalPages - 1, page + 1))}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

export interface TableSortLabelProps {
  active?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
  children?: React.ReactNode;
}

export function TableSortLabel({
  active = false,
  direction = "asc",
  onClick,
  children,
}: TableSortLabelProps) {
  const tokens = useTokens();
  return (
    <Pressable onPress={onClick} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Text style={{ color: tokens.color.text.primary, fontWeight: active ? tokens.fontWeight.semibold : tokens.fontWeight.regular }}>
        {children}
      </Text>
      <Text style={{ color: tokens.color.text.tertiary, fontSize: tokens.fontSize.xs }}>
        {active ? (direction === "asc" ? "^" : "v") : "-"}
      </Text>
    </Pressable>
  );
}
