import React, { createContext, useContext, useMemo } from "react";
import { View, Text, Pressable, type StyleProp, type ViewStyle } from "react-native";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { useTokens, useComponentTokens } from "@truongnat/headless";

// ─── List Context ────────────────────────────────────────────────

interface ListContextValue {
  dense?: boolean;
  disablePadding?: boolean;
}

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
  return useContext(ListContext);
}

// ─── List Component ──────────────────────────────────────────────

export interface ListProps {
  children?: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function List({ children, dense = false, disablePadding = false, subheader, style }: ListProps) {
  const { list } = useComponentTokens();
  const tokens = useTokens();

  return (
    <ListContext.Provider value={{ dense, disablePadding }}>
      <View style={[list.container, style] as any}>
        {subheader && (
          <View style={list.subheader as any}>
            {typeof subheader === "string" ? (
              <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: "600", color: tokens.color.text.tertiary }}>
                {subheader}
              </Text>
            ) : subheader}
          </View>
        )}
        {children}
      </View>
    </ListContext.Provider>
  );
}

// ─── ListItem ────────────────────────────────────────────────────

export interface ListItemProps {
  children?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ListItem({
  children,
  secondaryAction,
  onPress,
  disabled = false,
  selected = false,
  divider = false,
  style,
}: ListItemProps) {
  const { list } = useComponentTokens();
  const tokens = useTokens();
  const ctx = useListContext();

  const isDense = ctx?.dense;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        list.item,
        {
          paddingVertical: isDense ? tokens.spacing[2] : tokens.spacing[3],
          backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
          borderBottomWidth: divider ? 1 : 0,
          borderBottomColor: tokens.color.border.subtle,
          opacity: disabled ? 0.5 : 1,
        },
        pressed && list.item.pressed,
        style,
      ] as any}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {children}
      </View>
      {secondaryAction && (
        <View style={{ marginLeft: tokens.spacing[2] }}>
          {secondaryAction}
        </View>
      )}
    </Pressable>
  );
}

// ─── ListItemText ────────────────────────────────────────────────

export interface ListItemTextProps {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}

export function ListItemText({ primary, secondary }: ListItemTextProps) {
  const { list } = useComponentTokens();
  const tokens = useTokens();
  const ctx = useListContext();

  return (
    <View style={{ flex: 1 }}>
      {typeof primary === "string" ? (
        <Text style={[list.itemText, ctx?.dense && { fontSize: tokens.fontSize.sm }] as any}>
          {primary}
        </Text>
      ) : primary}
      {secondary && (
        typeof secondary === "string" ? (
          <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary, marginTop: 2 }}>
            {secondary}
          </Text>
        ) : secondary
      )}
    </View>
  );
}

// ─── ListItemIcon ────────────────────────────────────────────────

export function ListItemIcon({ children }: { children: React.ReactNode }) {
  const tokens = useTokens();
  return (
    <View style={{ marginRight: tokens.spacing[4], minWidth: 24, alignItems: "center" }}>
      {children}
    </View>
  );
}

// ─── FlatList Wrapper ────────────────────────────────────────────

export interface ListDataProps<T> extends Omit<ListProps, "children"> {
  data: T[];
  renderItem: ListRenderItem<T>;
  estimatedItemSize: number;
  keyExtractor?: (item: T, index: number) => string;
}

export function ListData<T>({
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
  ...listProps
}: ListDataProps<T>) {
  return (
    <List {...listProps}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize} {...(listProps as any)}
        keyExtractor={keyExtractor}
      />
    </List>
  );
}
