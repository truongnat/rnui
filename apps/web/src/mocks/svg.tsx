import type { ReactNode } from 'react';
import { View } from 'react-native';

export function Svg({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

export function Path() {
  return null;
}

export function Circle() {
  return null;
}

export function Rect() {
  return null;
}

export default Svg;
