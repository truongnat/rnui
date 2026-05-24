import type { ReactNode } from 'react';
import { View } from 'react-native';

export function FlashList({
  data,
  renderItem,
}: {
  data: unknown[];
  renderItem: (info: { item: unknown; index: number }) => ReactNode;
}) {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>{renderItem({ item, index })}</View>
      ))}
    </View>
  );
}

export default FlashList;
