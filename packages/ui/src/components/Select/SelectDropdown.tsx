import type { SnapPoint } from '@truongdq01/headless';
import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { Icon } from '../Icon';
import type { SelectDropdownProps } from './types';

export function SelectDropdown<T = string>({
  sheetRef,
  searchable,
  options,
  isOpen,
  loading,
  loadingMore,
  filtered,
  query,
  onQueryChange,
  onClose,
  onEndReached,
  renderItem,
  listEmpty,
  accessibilityLabel,
}: SelectDropdownProps<T>) {
  const { tokens } = useTheme();

  // FlashList is an optional native dependency — fall back to FlatList when absent.
  const ListImpl: React.ComponentType<any> = useMemo(() => {
    try {
      const mod = require('@shopify/flash-list') as {
        FlashList?: React.ComponentType<any>;
      };
      return mod?.FlashList ?? FlatList;
    } catch {
      return FlatList;
    }
  }, []);

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      paddingHorizontal: tokens.spacing[4],
      backgroundColor: tokens.color.bg.default,
    }),
    [tokens.spacing, tokens.color.bg.default]
  );

  const searchBarStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderWidth: 1,
      borderColor: tokens.color.border.default,
      borderRadius: tokens.radius.md,
      paddingHorizontal: tokens.spacing[3],
      height: 48,
      marginBottom: tokens.spacing[3],
      backgroundColor: tokens.color.bg.subtle,
    }),
    [tokens.color.border.default, tokens.radius.md, tokens.spacing, tokens.color.bg.subtle]
  );

  const searchInputStyle = useMemo(
    () => ({
      flex: 1,
      fontSize: tokens.fontSize.md,
      color: tokens.color.text.primary,
      height: '100%' as const,
    }),
    [tokens.fontSize.md, tokens.color.text.primary]
  );

  const separatorStyle = useMemo(
    () => ({
      height: 1,
      backgroundColor: tokens.color.border.subtle,
      marginLeft: tokens.spacing[4],
    }),
    [tokens.color.border.subtle, tokens.spacing]
  );

  const footerStyle = useMemo(
    () => ({
      paddingVertical: tokens.spacing[3],
      alignItems: 'center' as const,
    }),
    [tokens.spacing]
  );

  const footerSpacerStyle = useMemo(
    () => ({ height: tokens.spacing[4] }),
    [tokens.spacing]
  );

  const snapPoints: SnapPoint[] =
    searchable || options.length > 6 ? (['70%'] as SnapPoint[]) : (['40%'] as SnapPoint[]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onClose={onClose}
      enableBackdrop
      enableDismissOnSwipe
    >
      <View style={containerStyle}>
        {searchable && isOpen && (
          <View style={searchBarStyle}>
            <View style={styles.searchIconWrapper}>
              <Icon size={20} color={tokens.color.text.tertiary} name="search" />
            </View>
            <TextInput
              value={query}
              onChangeText={onQueryChange}
              placeholder="Search\u2026"
              placeholderTextColor={tokens.color.text.tertiary}
              style={searchInputStyle}
              autoFocus
              accessibilityLabel={`${accessibilityLabel} search`}
            />
            {query.length > 0 && (
              <Pressable onPress={() => onQueryChange('')} hitSlop={8}>
                <Icon size={18} color={tokens.color.text.tertiary} name="close" />
              </Pressable>
            )}
          </View>
        )}

        {filtered.length === 0 ? (
          <View style={styles.emptyWrapper}>{listEmpty}</View>
        ) : (
          <ListImpl
            style={styles.list}
            data={filtered}
            extraData={query}
            renderItem={renderItem}
            keyExtractor={(item: any) => String(item.value)}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.35}
            ItemSeparatorComponent={() => <View style={separatorStyle} />}
            ListFooterComponent={
              loadingMore ? (
                <View style={footerStyle}>
                  <ActivityIndicator color={tokens.color.brand.default} />
                </View>
              ) : (
                <View style={footerSpacerStyle} />
              )
            }
            estimatedItemSize={48}
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  searchIconWrapper: {
    marginRight: 8,
  },
  emptyWrapper: {
    flex: 1,
    minHeight: 120,
  },
  list: {
    flex: 1,
  },
});
