import React, { useRef, useState, useMemo, useCallback } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, FlatList } from "react-native";
import { useSelect, useTokens, useComponentTokens } from "@truongdq01/headless";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import type { BottomSheetRef } from "../BottomSheet/BottomSheet";
import type { UseSelectOptions, SelectOption } from "@truongdq01/headless";
import { Icon } from "../Icon";
import { SkeletonListItem } from "../Skeleton";

export interface SelectProps<T = string> extends UseSelectOptions<T> {
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  onClearError?: () => void;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  renderOption?: (
    option: SelectOption<T>,
    ctx: { selected: boolean }
  ) => React.ReactNode;
}

export function Select<T = string>({
  label,
  placeholder = "Select…",
  searchable = false,
  error,
  onClearError,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  renderOption,
  options,
  ...hookOptions
}: SelectProps<T>) {
  const { select } = useComponentTokens();
  const tokens = useTokens();
  const sheetRef = useRef<BottomSheetRef>(null);
  const [query, setQuery] = useState("");
  const endReachBusy = useRef(false);
  const a11yLabel = label ?? "Select";
  // FlashList is an optional native dependency. Fall back to FlatList when it's not installed.
  const ListImpl: React.ComponentType<any> = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require("@shopify/flash-list") as { FlashList?: React.ComponentType<any> };
      return mod?.FlashList ?? FlatList;
    } catch {
      return FlatList;
    }
  }, []);

  const {
    isOpen,
    open,
    close,
    selectOption,
    isSelected,
    displayLabel,
  } = useSelect({ options, ...hookOptions, placeholder });

  const hasSelection = displayLabel !== placeholder;

  const filtered = useMemo(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lowerQuery));
  }, [options, query]);

  const handleClose = useCallback(() => {
    sheetRef.current?.close();
    close();
  }, [close]);

  const handleOpen = useCallback(() => {
    setQuery("");
    sheetRef.current?.open();
    open();
  }, [open]);

  const handleSelect = useCallback(
    (val: T) => {
      selectOption(val);
      onClearError?.();
      if (!hookOptions.multiple) handleClose();
    },
    [selectOption, onClearError, hookOptions.multiple, handleClose]
  );

  const onEndReached = useCallback(() => {
    if (!onLoadMore || !hasMore || loading || loadingMore || endReachBusy.current) return;
    endReachBusy.current = true;
    onLoadMore();
  }, [onLoadMore, hasMore, loading, loadingMore]);

  React.useEffect(() => {
    if (!loadingMore) endReachBusy.current = false;
  }, [loadingMore]);

  const renderItem = useCallback(
    ({ item: option }: { item: SelectOption<T> }) => {
      const selected = isSelected(option.value);
      if (renderOption) {
        return (
          <Pressable
            onPress={() => !option.disabled && handleSelect(option.value)}
            style={{ opacity: option.disabled ? 0.4 : 1 }}
          >
            {renderOption(option, { selected })}
          </Pressable>
        );
      }
      return (
        <Pressable
          onPress={() => !option.disabled && handleSelect(option.value)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: tokens.spacing[3],
            paddingHorizontal: tokens.spacing[4],
            borderRadius: tokens.radius.md,
            backgroundColor: selected ? select.option.selected.bg : tokens.color.surface.default,
            opacity: option.disabled ? 0.4 : 1,
          }}
        >
          <Text
            style={{
              fontSize: tokens.fontSize.md,
              color: selected ? select.option.selected.color : select.option.default.color,
              fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular,
            }}
          >
            {option.label}
          </Text>
          {selected && <Icon size={16} color={select.option.selected.color} name={"check" as any} />}
        </Pressable>
      );
    },
    [isSelected, renderOption, select.option, tokens, handleSelect]
  );

  const listEmpty = useMemo(() => {
    if (loading && options.length === 0) {
      return (
        <View style={{ paddingVertical: tokens.spacing[2] }}>
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
        </View>
      );
    }
    if (filtered.length === 0) {
      const emptyMsg = loading
        ? "Loading…"
        : query
          ? `No results for "${query}"`
          : "No options";
      return (
        <Text
          style={{
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.sm,
            textAlign: "center",
            paddingVertical: tokens.spacing[6],
          }}
        >
          {emptyMsg}
        </Text>
      );
    }
    return null;
  }, [loading, options.length, filtered.length, query, tokens]);

  return (
    <View>
      {label && (
        <Text style={{ fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, color: tokens.color.text.secondary, marginBottom: tokens.spacing[1] }}>
          {label}
        </Text>
      )}

      <Pressable
        onPress={handleOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 48,
          paddingHorizontal: select.trigger.padding.x,
          paddingVertical: select.trigger.padding.y,
          borderWidth: 1,
          borderColor: error ? tokens.color.border.error : isOpen ? select.trigger.focusBorderColor : select.trigger.borderColor,
          borderRadius: select.trigger.borderRadius,
          backgroundColor: select.trigger.bg,
        }}
        accessibilityRole={"combobox" as any}
        accessibilityLabel={a11yLabel}
        accessibilityState={{ expanded: isOpen }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: tokens.fontSize.md,
            color: hasSelection ? tokens.color.text.primary : tokens.color.text.tertiary,
          }}
          numberOfLines={1}
        >
          {displayLabel}
        </Text>
        <Icon size={16} color={tokens.color.text.tertiary}>
          {isOpen ? "chevronUp" : "chevronDown"}
        </Icon>
      </Pressable>

      {error && (
        <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.error.text, marginTop: tokens.spacing[1] }}>
          {error}
        </Text>
      )}

      <BottomSheet
        ref={sheetRef}
        snapPoints={searchable || options.length > 6 ? ["70%"] : ["40%"]}
        onClose={close}
        enableBackdrop
        enableDismissOnSwipe
      >
        <View style={{ flex: 1, paddingHorizontal: tokens.spacing[4], backgroundColor: tokens.color.bg.default }}>
          {searchable && isOpen && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: tokens.color.border.default,
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing[3],
                height: 48,
                marginBottom: tokens.spacing[3],
                backgroundColor: tokens.color.bg.subtle,
              }}
            >
              <View style={{ marginRight: 8 }}>
                <Icon size={20} color={tokens.color.text.tertiary} name={"search" as any} />
              </View>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search…"
                placeholderTextColor={tokens.color.text.tertiary}
                style={{ flex: 1, fontSize: tokens.fontSize.md, color: tokens.color.text.primary, height: "100%" }}
                autoFocus
                accessibilityLabel={`${a11yLabel} search`}
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery("")} hitSlop={8}>
                  <Icon size={18} color={tokens.color.text.tertiary} name={"close" as any} />
                </Pressable>
              )}
            </View>
          )}

          {filtered.length === 0 ? (
            <View style={{ flex: 1, minHeight: 120 }}>{listEmpty}</View>
          ) : (
            <ListImpl
              style={{ flex: 1 }}
              data={filtered}
              extraData={query}
              renderItem={renderItem}
              keyExtractor={(item: SelectOption<T>) => String(item.value)}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.35}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: tokens.color.border.subtle,
                    marginLeft: tokens.spacing[4],
                  }}
                />
              )}
              ListFooterComponent={
                loadingMore ? (
                  <View style={{ paddingVertical: tokens.spacing[3], alignItems: "center" }}>
                    <ActivityIndicator color={tokens.color.brand.default} />
                  </View>
                ) : (
                  <View style={{ height: tokens.spacing[4] }} />
                )
              }
              // FlashList-only optimization; harmless for FlatList (ignored)
              estimatedItemSize={48}
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
}
