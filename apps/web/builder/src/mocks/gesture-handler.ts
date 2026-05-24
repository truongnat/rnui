import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

type GestureChain = {
  onBegin: (fn: () => void) => GestureChain;
  onFinalize: (fn: () => void) => GestureChain;
  onEnd: (fn: () => void) => GestureChain;
};

function createTap(): GestureChain {
  const chain: GestureChain = {
    onBegin: () => chain,
    onFinalize: () => chain,
    onEnd: () => chain,
  };
  return chain;
}

export const Gesture = {
  Tap: () => createTap(),
};

export function GestureDetector({
  children,
}: {
  gesture: unknown;
  children: ReactNode;
}) {
  return children;
}

export const GestureHandlerRootView = View;

export { Pressable };
