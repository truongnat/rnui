import { Image, ScrollView, Text, View, type ViewStyle } from 'react-native';
import type { ComponentType } from 'react';

type SharedValue<T> = { value: T };

export function useSharedValue<T>(initial: T): SharedValue<T> {
  return { value: initial };
}

export function useAnimatedStyle<T extends ViewStyle>(updater: () => T): T {
  return updater();
}

export function useDerivedValue<T>(updater: () => T): SharedValue<T> {
  return { value: updater() };
}

export function withTiming<T>(toValue: T): T {
  return toValue;
}

export function withSpring<T>(toValue: T): T {
  return toValue;
}

export function interpolate(
  value: number,
  _input: number[],
  output: number[]
): number {
  return output[0] ?? value;
}

export function interpolateColor(
  value: number,
  input: number[],
  output: string[]
): string {
  if (output.length === 0) return '#000';
  if (output.length === 1 || input.length < 2) return output[0];
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];
  return output[0];
}

export function scheduleOnRN<T extends (...args: never[]) => unknown>(
  fn: T,
  ...args: Parameters<T>
): void {
  fn(...args);
}

export function runOnJS<T extends (...args: never[]) => void>(fn: T): T {
  return fn;
}

export const Easing = {
  linear: (t: number) => t,
  bezier: () => ({
    factory: () => (t: number) => t,
  }),
};

export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

export function useAnimatedScrollHandler(
  handlers: Record<string, (...args: never[]) => void>
) {
  return handlers.onScroll ?? (() => {});
}

export const FadeIn = { duration: () => ({}) };
export const FadeOut = { duration: () => ({}) };
export const FadeInDown = { duration: () => ({}) };
export const LinearTransition = { duration: () => ({}) };

export function useAnimatedProps<T extends object>(updater: () => T): T {
  return updater();
}

export function withRepeat<T>(value: T): T {
  return value;
}

export function withSequence<T>(...values: T[]): T {
  return values[0] ?? (0 as T);
}

export function cancelAnimation(_sharedValue: SharedValue<unknown>): void {}

export type BaseAnimationBuilder = {
  duration: (ms: number) => BaseAnimationBuilder;
};

const Animated = {
  View,
  Text,
  Image,
  ScrollView,
  createAnimatedComponent: <P extends object>(Component: ComponentType<P>) =>
    Component,
};

export default Animated;
