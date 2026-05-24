import type { ReactNode } from 'react';
import { View } from 'react-native';

export function BlurView({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

export default BlurView;
