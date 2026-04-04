import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Tracks the OS “reduce motion” / “prefer reduced motion” setting.
 * Use to skip non-essential animations (WCAG 2.3.3).
 */
export function useReduceMotionEnabled(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    const initial =
      typeof AccessibilityInfo.isReduceMotionEnabled === 'function'
        ? AccessibilityInfo.isReduceMotionEnabled()
        : Promise.resolve(false);
    initial
      .then((v) => {
        if (mounted) setReduceMotion(!!v);
      })
      .catch(() => {});

    let subscription: { remove: () => void } | undefined;
    if (typeof AccessibilityInfo.addEventListener === 'function') {
      subscription = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        (v) => {
          setReduceMotion(v);
        }
      );
    }

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, []);

  return reduceMotion;
}
