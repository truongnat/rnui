import { useCallback, useRef, useSyncExternalStore } from "react";

// ─── Types ────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "warning" | "error" | "info";
export type ToastPosition = "top" | "bottom";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  /** If true, user must dismiss manually */
  persistent: boolean;
  /** Optional action button */
  action?: {
    label: string;
    onPress: () => void;
  };
}

export interface ShowToastOptions {
  message: string;
  variant?: ToastVariant;
  /** Duration in ms before auto-dismiss. Default 3500. */
  duration?: number;
  persistent?: boolean;
  action?: ToastItem["action"];
}

// ─── Store (singleton — lives outside React) ─────────────────────

interface ToastStore {
  queue: ToastItem[];
  listeners: Set<() => void>;
}

const store: ToastStore = {
  queue: [],
  listeners: new Set(),
};

function notify() {
  store.listeners.forEach((l) => l());
}

function getSnapshot(): ToastItem[] {
  return store.queue;
}

function subscribe(listener: () => void) {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}

// ─── Internal queue operations ────────────────────────────────────

let _idCounter = 0;

export function showToast(options: ShowToastOptions): string {
  const id = `toast-${++_idCounter}`;
  const item: ToastItem = {
    id,
    message: options.message,
    variant: options.variant ?? "default",
    duration: options.duration ?? 3500,
    persistent: options.persistent ?? false,
    action: options.action,
  };

  // Max 3 toasts visible at once — drop oldest
  store.queue = [...store.queue.slice(-2), item];
  notify();
  return id;
}

export function dismissToast(id: string) {
  store.queue = store.queue.filter((t) => t.id !== id);
  notify();
}

export function dismissAllToasts() {
  store.queue = [];
  notify();
}

// ─── Hook ─────────────────────────────────────────────────────────

export interface UseToastReturn {
  /** Current visible toasts */
  toasts: ToastItem[];
  /** Show a new toast, returns its id */
  show: (options: ShowToastOptions) => string;
  /** Dismiss a toast by id */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
  /** Shorthand helpers */
  success: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
  error: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
  warning: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
  info: (message: string, options?: Omit<ShowToastOptions, "message" | "variant">) => string;
}

export function useToast(): UseToastReturn {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const show = useCallback((options: ShowToastOptions) => showToast(options), []);
  const dismiss = useCallback((id: string) => dismissToast(id), []);
  const dismissAll = useCallback(() => dismissAllToasts(), []);

  const success = useCallback(
    (message: string, opts?: Omit<ShowToastOptions, "message" | "variant">) =>
      showToast({ ...opts, message, variant: "success" }),
    []
  );
  const error = useCallback(
    (message: string, opts?: Omit<ShowToastOptions, "message" | "variant">) =>
      showToast({ ...opts, message, variant: "error" }),
    []
  );
  const warning = useCallback(
    (message: string, opts?: Omit<ShowToastOptions, "message" | "variant">) =>
      showToast({ ...opts, message, variant: "warning" }),
    []
  );
  const info = useCallback(
    (message: string, opts?: Omit<ShowToastOptions, "message" | "variant">) =>
      showToast({ ...opts, message, variant: "info" }),
    []
  );

  return { toasts, show, dismiss, dismissAll, success, error, warning, info };
}