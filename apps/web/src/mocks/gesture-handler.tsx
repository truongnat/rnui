import type { ReactNode } from 'react';
import { Pressable, View, type PressableProps } from 'react-native';

type GestureHandler = (...args: never[]) => void;

type GestureStore = {
  disabled: boolean;
  onBegin?: () => void;
  onFinalize?: (event: unknown, success: boolean) => void;
  onStart?: () => void;
};

type GestureChain = {
  __store: GestureStore;
  enabled: (value: boolean) => GestureChain;
  hitSlop: (value: unknown) => GestureChain;
  minDuration: (value: number) => GestureChain;
  maxDuration: (value: number) => GestureChain;
  maxDistance: (value: number) => GestureChain;
  numberOfTaps: (value: number) => GestureChain;
  onBegin: (fn: GestureHandler) => GestureChain;
  onFinalize: (fn: GestureHandler) => GestureChain;
  onEnd: (fn: GestureHandler) => GestureChain;
  onStart: (fn: GestureHandler) => GestureChain;
  onUpdate: (fn: GestureHandler) => GestureChain;
  onChange: (fn: GestureHandler) => GestureChain;
  onTouchesDown: (fn: GestureHandler) => GestureChain;
  onTouchesUp: (fn: GestureHandler) => GestureChain;
  withTestId: (value: string) => GestureChain;
};

function createGestureChain(): GestureChain {
  const store: GestureStore = { disabled: false };
  const chain: GestureChain = {
    __store: store,
    enabled: (value: boolean) => {
      store.disabled = !value;
      return chain;
    },
    hitSlop: () => chain,
    minDuration: () => chain,
    maxDuration: () => chain,
    maxDistance: () => chain,
    numberOfTaps: () => chain,
    onBegin: (fn) => {
      store.onBegin = fn as () => void;
      return chain;
    },
    onFinalize: (fn) => {
      store.onFinalize = fn as (event: unknown, success: boolean) => void;
      return chain;
    },
    onEnd: (fn) => {
      store.onFinalize = fn as (event: unknown, success: boolean) => void;
      return chain;
    },
    onStart: (fn) => {
      store.onStart = fn as () => void;
      return chain;
    },
    onUpdate: () => chain,
    onChange: () => chain,
    onTouchesDown: () => chain,
    onTouchesUp: () => chain,
    withTestId: () => chain,
  };
  return chain;
}

function isGestureChain(value: unknown): value is GestureChain {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__store' in value &&
    typeof (value as GestureChain).__store === 'object'
  );
}

function resolveGestureStore(gesture: unknown): GestureStore | undefined {
  if (!isGestureChain(gesture)) return undefined;
  return gesture.__store;
}

export const Gesture = {
  Tap: () => createGestureChain(),
  LongPress: () => createGestureChain(),
  Pan: () => createGestureChain(),
  Pinch: () => createGestureChain(),
  Rotation: () => createGestureChain(),
  Fling: () => createGestureChain(),
  Native: () => createGestureChain(),
  Manual: () => createGestureChain(),
  Simultaneous: (...gestures: unknown[]) => {
    const tap = gestures.find(isGestureChain);
    const longPress = gestures.filter(isGestureChain)[1];
    if (tap && longPress) {
      tap.__store.onStart = longPress.__store.onStart;
    }
    return tap ?? createGestureChain();
  },
  Exclusive: (...gestures: unknown[]) =>
    gestures.find(isGestureChain) ?? createGestureChain(),
  Race: (...gestures: unknown[]) =>
    gestures.find(isGestureChain) ?? createGestureChain(),
};

export function GestureDetector({
  gesture,
  children,
}: {
  gesture: unknown;
  children: ReactNode;
}) {
  const store = resolveGestureStore(gesture);

  if (!store) {
    return children;
  }

  const pressableProps: PressableProps = {
    disabled: store.disabled,
    onPressIn: () => {
      store.onBegin?.();
    },
    onPress: () => {
      store.onFinalize?.({}, true);
    },
    onLongPress: () => {
      store.onStart?.();
    },
    style: ({ pressed }) =>
      pressed && !store.disabled ? { opacity: 0.92 } : undefined,
  };

  return <Pressable {...pressableProps}>{children}</Pressable>;
}

export const GestureHandlerRootView = View;

export { Pressable };
