import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AlertContentProps {
  children?: React.ReactNode;
}

/**
 * Internal component to wrap the Alert message content.
 */
export const AlertContent = ({ children }: AlertContentProps) => {
  return <View style={styles.contentContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
