import { useId, useTabs, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabsContext } from './context';
import type { TabsProps } from './types';

// Re-export sub-components and types so that imports from './Tabs' remain
// backward-compatible with existing consumers and tests.
export { Tab } from './Tab';
export { TabList } from './TabList';
export { TabPanel } from './TabPanel';
export type { TabProps, TabListProps, TabPanelProps, TabsContextValue, TabsProps } from './types';

/**
 * Root Tabs component.
 * Owns the context provider and the thin outer container View.
 * Tab buttons live in TabList; content panels live in TabPanel.
 */
export function Tabs<T = string>({
  id: idProp,
  value,
  defaultValue,
  onChange,
  variant = 'standard',
  centered = false,
  orientation = 'horizontal',
  children,
}: TabsProps<T>) {
  const id = useId(idProp, 'tabs');
  const {
    components: { tabs },
  } = useTheme();
  const { getTabProps, isSelected } = useTabs<T>({
    value,
    defaultValue,
    onChange,
  });

  const containerStyle = useMemo(
    () => [
      tabs.container,
      orientation === 'horizontal'
        ? styles.borderBottom
        : styles.borderLeft,
      centered ? styles.justifyCenter : styles.justifyStart,
      orientation === 'horizontal'
        ? styles.rowDirection
        : styles.columnDirection,
    ],
    [tabs.container, orientation, centered]
  );

  const ctx = useMemo(
    () => ({ getTabProps, isSelected, orientation, variant, centered }),
    [getTabProps, isSelected, orientation, variant, centered]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <View nativeID={id} style={containerStyle}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

const styles = StyleSheet.create({
  rowDirection: { flexDirection: 'row' },
  columnDirection: { flexDirection: 'column' },
  justifyCenter: { justifyContent: 'center' },
  justifyStart: { justifyContent: 'flex-start' },
  borderBottom: { borderBottomWidth: 1 },
  borderLeft: { borderLeftWidth: 1 },
});
