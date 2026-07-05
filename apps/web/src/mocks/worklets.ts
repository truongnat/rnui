export function runOnUI<T extends (...args: never[]) => void>(fn: T): T {
  return fn;
}

export function runOnJS<T extends (...args: never[]) => void>(fn: T): T {
  return fn;
}

export function scheduleOnRN<T extends (...args: never[]) => unknown>(
  fn: T,
  ...args: Parameters<T>
): void {
  fn(...args);
}

export function scheduleOnUI<T extends (...args: never[]) => unknown>(
  fn: T
): T {
  return fn;
}
