import { useTheme } from '@truongdq01/headless';
import type React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inheritAlertTextColor } from './inheritAlertTextColor';

function isPlainText(value: React.ReactNode): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

interface AlertContentProps {
  children?: React.ReactNode;
  textColor: string;
}

/**
 * Internal component to wrap the Alert message content.
 * Plain string/number children are wrapped in Text (RN requirement).
 */
export const AlertContent = ({ children, textColor }: AlertContentProps) => {
  const {
    components: { alert },
  } = useTheme();

  if (children == null) {
    return <View style={styles.contentContainer} />;
  }

  if (isPlainText(children)) {
    return (
      <View style={styles.contentContainer}>
        <Text style={[alert.message, { color: textColor }]}>{children}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      {inheritAlertTextColor(children, textColor)}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    minWidth: 0,
  },
});
