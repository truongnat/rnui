import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/lib/utils';

type AnimatedListDemoFrameProps = {
  insertLabel: string;
  onInsert: () => void;
  /** The configured <AnimatedList /> for this demo. */
  children: ReactNode;
};

/** Shared chrome for every list demo: insert button + list shell. */
export function AnimatedListDemoFrame({
  insertLabel,
  onInsert,
  children,
}: AnimatedListDemoFrameProps) {
  const colors = useThemeColor();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingBottom: 12 }}>
        <Button onPress={onInsert}>{insertLabel}</Button>
      </View>
      <View
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        {children}
      </View>
    </View>
  );
}
