import {
  Image,
  ScrollView,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import type { ComponentType } from 'react';

type SharedValue<T> = { value: T };

export function useSharedValue<T>(initial: T): SharedValue<T> {
  return { value: initial };
}

export function useAnimatedStyle<T extends ViewStyle>(
  updater: () => T
): T {
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
  _value: number,
  _input: number[],
  output: string[]
): string {
  return output[0] ?? '#000';
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

const Animated = {
  View,
  Text,
  Image,
  ScrollView,
  createAnimatedComponent: <P extends object>(Component: ComponentType<P>) =>
    Component,
};

export default Animated;
