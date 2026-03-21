import React, { createContext, useContext, useMemo } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";
import { Button } from "../Button/Button";
import { Icon } from "../Icon";

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
  const ctx = useMemo(() => ({ size, padding, stickyHeader }), [size, padding, stickyHeader]);
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
  const { table } = useComponentTokens();
  return (
    <ScrollView
      horizontal
      style={[
        table.container,
        style,
      ]}
    >
      <View style={{ minWidth: "100%" }}>{children}</View>
    </ScrollView>
  );
}

export function TableHead({ children }: { children?: React.ReactNode }) {
  const { table } = useComponentTokens();
  return <View style={table.header}>{children}</View>;
}

export function TableBody({ children }: { children?: React.ReactNode }) {
  return <View>{children}</View>;
}

export function TableFooter({ children }: { children?: React.ReactNode }) {
  const { table } = useComponentTokens();
  return <View style={{ borderTopWidth: 1, borderTopColor: table.container.borderColor }}>{children}</View>;
}

export interface TableRowProps {
  children?: React.ReactNode;
  selected?: boolean;
  style?: object;
}

export function TableRow({ children, selected = false, style }: TableRowProps) {
  const { table } = useComponentTokens();
  const tokens = useTokens();
  return (
    <View
      style={[
        table.row,
        selected && { backgroundColor: tokens.color.brand.subtle },
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
  const { table } = useComponentTokens();
  const ctx = useTableContext();
  const tokens = useTokens();
  const resolvedPadding = padding ?? ctx?.padding ?? "normal";
  const resolvedSize = size ?? ctx?.size ?? "medium";

  const paddingX = {
    normal: tokens.spacing[4],
    checkbox: tokens.spacing[2],
    none: 0,
  }[resolvedPadding];

  const paddingY = resolvedSize === "small" ? tokens.spacing[2] : tokens.spacing[3];

  return (
    <View style={[{ paddingHorizontal: paddingX, paddingVertical: paddingY, flexShrink: 0 }, style]}>
      <Text
        style={[
          table.cell,
          { textAlign: align },
          variant === "head" && { fontWeight: tokens.fontWeight.semibold },
          resolvedSize === "small" && { fontSize: tokens.fontSize.sm },
        ]}
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
          startIcon={<Icon size={16}>chevronLeft</Icon>}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outlined"
          disabled={page >= totalPages - 1}
          onPress={() => onPageChange?.(Math.min(totalPages - 1, page + 1))}
          endIcon={<Icon size={16}>chevronRight</Icon>}
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
      {active ? (
        <Icon size={14} color={tokens.color.text.primary}>
          {direction === "asc" ? "arrowUp" : "arrowDown"}
        </Icon>
      ) : (
        <View style={{ width: 14 }} />
      )}
    </Pressable>
  );
}
