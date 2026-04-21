import { useId, useSelect } from '@truongdq01/headless';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import type { BottomSheetRef } from '../BottomSheet/types';
import { SelectContext } from './context';
import { SelectDropdown } from './SelectDropdown';
import { SelectOption } from './SelectOption';
import { SelectPlaceholder } from './SelectPlaceholder';
import { SelectTrigger } from './SelectTrigger';
import type { SelectOptionType, SelectProps } from './types';

export type { SelectProps } from './types';

export function Select<T = string>({
  label,
  placeholder = 'Select\u2026',
  searchable = false,
  error,
  onClearError,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  renderOption,
  options,
  id: idProp,
  ...hookOptions
}: SelectProps<T>) {
  const id = useId(idProp, 'select');
  const sheetRef = useRef<BottomSheetRef>(null);
  const [query, setQuery] = useState('');
  const endReachBusy = useRef(false);
  const a11yLabel = label ?? 'Select';

  const { isOpen, open, close, selectOption, isSelected, displayLabel } =
    useSelect({ options, ...hookOptions, placeholder });

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
    setQuery('');
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
    if (
      !onLoadMore ||
      !hasMore ||
      loading ||
      loadingMore ||
      endReachBusy.current
    )
      return;
    endReachBusy.current = true;
    onLoadMore();
  }, [onLoadMore, hasMore, loading, loadingMore]);

  React.useEffect(() => {
    if (!loadingMore) endReachBusy.current = false;
  }, [loadingMore]);

  const renderItem = useCallback(
    ({ item: option }: { item: SelectOptionType<T> }) => (
      <SelectOption<T>
        option={option}
        selected={isSelected(option.value)}
        onSelect={handleSelect}
        renderOption={renderOption}
      />
    ),
    [isSelected, handleSelect, renderOption]
  );

  const listEmpty = useMemo(
    () => (
      <SelectPlaceholder
        loading={loading}
        query={query}
        optionCount={options.length}
      />
    ),
    [loading, query, options.length]
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
      selectOption,
      isSelected,
      displayLabel,
      options,
      multiple: hookOptions.multiple,
    }),
    [isOpen, open, close, selectOption, isSelected, displayLabel, options, hookOptions.multiple]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <View nativeID={id}>
        <SelectTrigger
          id={id}
          displayLabel={displayLabel}
          placeholder={placeholder}
          isOpen={isOpen}
          error={error}
          label={label}
          onPress={handleOpen}
          accessibilityLabel={a11yLabel}
        />
        <SelectDropdown<T>
          sheetRef={sheetRef}
          searchable={searchable}
          options={options}
          isOpen={isOpen}
          loading={loading}
          loadingMore={loadingMore}
          filtered={filtered}
          query={query}
          onQueryChange={setQuery}
          onClose={close}
          onEndReached={onEndReached}
          renderItem={renderItem}
          listEmpty={listEmpty}
          accessibilityLabel={a11yLabel}
        />
      </View>
    </SelectContext.Provider>
  );
}
