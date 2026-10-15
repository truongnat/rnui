import {
  CircleCheck,
  CircleX,
  Clock,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react-native';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Reanimated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

const ZERO_SAFE_AREA_INSETS = { top: 0, right: 0, bottom: 0, left: 0 };

export type ToastType =
  'default' | 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ToastButtonData {
  label: string;
  onPress?: () => void;
}

export interface ToastOptions {
  id?: number;
  description?: string;
  /** Mirrors shadcn legacy variant — 'destructive' renders a filled error toast. */
  variant?: 'default' | 'destructive';
  /** Right-side action button, mirrors Sonner `action`. */
  action?: ToastButtonData;
  /** Right-side dismiss button, mirrors Sonner `cancel`. */
  cancel?: ToastButtonData;
  /** Icon override — set to null to hide. */
  icon?: ReactNode | null;
  /** Auto-dismiss delay in ms. Default 4000; Infinity keeps it visible. */
  duration?: number;
}

export interface ToastData extends ToastOptions {
  id: number;
  title: string;
  type: ToastType;
}

interface ToastApi {
  (title: string, opts?: ToastOptions): number;
  (data: Omit<ToastData, 'id' | 'type'> & { type?: ToastType }): number;
  success: (title: string, opts?: ToastOptions) => number;
  error: (title: string, opts?: ToastOptions) => number;
  info: (title: string, opts?: ToastOptions) => number;
  warning: (title: string, opts?: ToastOptions) => number;
  message: (title: string, opts?: ToastOptions) => number;
  /** Persistent until dismissed or updated via the same `id`. */
  loading: (title: string, opts?: ToastOptions) => number;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((value: T) => string);
      error: string | ((err: unknown) => string);
    },
    opts?: ToastOptions
  ) => number;
  dismiss: (id?: number) => void;
}

const ToastContext = createContext<{ toast: ToastApi } | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

interface ToastEntry {
  data: ToastData;
  visible: boolean;
  revision: number;
}

let nextId = 0;

export function ToastProvider({
  children,
  position = 'bottom',
  richColors = false,
}: {
  children: ReactNode;
  /** Where toasts stack, mirrors Sonner `position`. */
  position?: 'top' | 'bottom';
  /** Use semantic status accents, mirrors Sonner `richColors`. */
  richColors?: boolean;
}) {
  const safeAreaInsets = useContext(SafeAreaInsetsContext);
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const active = useRef(new Map<number, number>());
  const revision = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const pendingTimers = timers.current;
    const activeToasts = active.current;
    return () => {
      mounted.current = false;
      pendingTimers.forEach(clearTimeout);
      pendingTimers.clear();
      activeToasts.clear();
    };
  }, []);

  const dismiss = useCallback((id?: number) => {
    if (!mounted.current) return;
    if (id === undefined) {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
      active.current.clear();
    } else {
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
      active.current.delete(id);
    }
    setToasts((previous) =>
      previous.map((entry) =>
        id === undefined || entry.data.id === id
          ? { ...entry, visible: false }
          : entry
      )
    );
  }, []);

  const remove = useCallback((id: number, entryRevision: number) => {
    if (!mounted.current) return;
    setToasts((previous) =>
      previous.filter(
        (entry) =>
          entry.data.id !== id ||
          entry.visible ||
          entry.revision !== entryRevision
      )
    );
  }, []);

  const show = useCallback(
    (data: Omit<ToastData, 'id'> & { id?: number }) => {
      const id = data.id ?? ++nextId;
      nextId = Math.max(nextId, id);
      if (!mounted.current) return id;
      const entry = {
        data: { ...data, id },
        visible: true,
        revision: ++revision.current,
      };
      active.current.set(id, entry.revision);
      setToasts((previous) =>
        previous.some((item) => item.data.id === id)
          ? previous.map((item) => (item.data.id === id ? entry : item))
          : [...previous, entry]
      );
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
      const duration =
        data.duration ?? (data.type === 'loading' ? Infinity : 4000);
      if (Number.isFinite(duration)) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), Math.max(0, duration))
        );
      }
      return id;
    },
    [dismiss]
  );

  const toast = useMemo<ToastApi>(() => {
    const message = (title: string, opts?: ToastOptions) =>
      show({ ...opts, title, type: 'default' });
    const promise: ToastApi['promise'] = (pending, messages, opts) => {
      const id = show({ ...opts, type: 'loading', title: messages.loading });
      const pendingRevision = active.current.get(id);
      void pending.then(
        (value) => {
          if (!mounted.current || active.current.get(id) !== pendingRevision)
            return;
          show({
            ...opts,
            id,
            type: 'success',
            title:
              typeof messages.success === 'function'
                ? messages.success(value)
                : messages.success,
          });
        },
        (error: unknown) => {
          if (!mounted.current || active.current.get(id) !== pendingRevision)
            return;
          show({
            ...opts,
            id,
            type: 'error',
            title:
              typeof messages.error === 'function'
                ? messages.error(error)
                : messages.error,
          });
        }
      );
      return id;
    };
    return Object.assign(
      (
        titleOrData:
          string | (Omit<ToastData, 'id' | 'type'> & { type?: ToastType }),
        opts?: ToastOptions
      ) =>
        typeof titleOrData === 'string'
          ? message(titleOrData, opts)
          : show({ type: 'default', ...titleOrData }),
      {
        success: (title: string, opts?: ToastOptions) =>
          show({ ...opts, title, type: 'success' }),
        error: (title: string, opts?: ToastOptions) =>
          show({ ...opts, title, type: 'error' }),
        info: (title: string, opts?: ToastOptions) =>
          show({ ...opts, title, type: 'info' }),
        warning: (title: string, opts?: ToastOptions) =>
          show({ ...opts, title, type: 'warning' }),
        message,
        loading: (title: string, opts?: ToastOptions) =>
          show({ duration: Infinity, ...opts, title, type: 'loading' }),
        promise,
        dismiss,
      }
    );
  }, [show, dismiss]);
  const toastOverlay = (
    <SafeAreaView
      style={StyleSheet.absoluteFill}
      mode="margin"
      pointerEvents="box-none"
    >
      <View
        pointerEvents="box-none"
        className={cn(
          'absolute left-4 right-4 gap-2',
          position === 'bottom' ? 'bottom-10' : 'top-12'
        )}
      >
        {toasts.map((entry) => (
          <Toast
            key={entry.data.id}
            entry={entry}
            richColors={richColors}
            position={position}
            onDismiss={dismiss}
            onExited={remove}
          />
        ))}
      </View>
    </SafeAreaView>
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      <View className="flex-1">{children}</View>
      {/* The nested web provider host blocks input, so use the root insets. */}
      {Platform.OS === 'web' ? (
        <SafeAreaInsetsContext.Provider
          value={safeAreaInsets ?? ZERO_SAFE_AREA_INSETS}
        >
          {toastOverlay}
        </SafeAreaInsetsContext.Provider>
      ) : (
        <SafeAreaProvider
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          {toastOverlay}
        </SafeAreaProvider>
      )}
    </ToastContext.Provider>
  );
}

function Toast({
  entry,
  richColors,
  position,
  onDismiss,
  onExited,
}: {
  entry: ToastEntry;
  richColors: boolean;
  position: 'top' | 'bottom';
  onDismiss: (id: number) => void;
  onExited: (id: number, revision: number) => void;
}) {
  const { data, visible, revision } = entry;
  const colors = useThemeColor();
  const success = useIconColor('success');
  const warning = useIconColor('warning');
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  const filled = data.variant === 'destructive';
  const dark = useColorScheme() === 'dark';
  const statusColor =
    data.type === 'success'
      ? success
      : data.type === 'warning'
        ? warning
        : data.type === 'error'
          ? colors.destructive
          : colors.primary;
  const foreground = filled
    ? dark
      ? colors.background
      : colors.foreground
    : colors.cardForeground;
  const iconColor = filled ? foreground : statusColor;
  const Icon =
    data.type === 'success'
      ? CircleCheck
      : data.type === 'error'
        ? CircleX
        : data.type === 'warning'
          ? TriangleAlert
          : data.type === 'loading'
            ? Clock
            : Info;

  useEffect(() => {
    if (visible && Platform.OS === 'ios')
      AccessibilityInfo.announceForAccessibility(
        data.description ? `${data.title}. ${data.description}` : data.title
      );
  }, [visible, data.title, data.description]);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: reducedMotion ? 0 : visible ? 220 : 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && !visible) onExited(data.id, revision);
    });
    return () => animation.stop();
  }, [data.id, visible, revision, progress, reducedMotion, onExited]);

  return (
    <Reanimated.View
      layout={LinearTransition.duration(180).reduceMotion(ReduceMotion.System)}
    >
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        accessibilityElementsHidden={!visible}
        importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
        style={{
          opacity: progress,
          transform: [
            {
              translateY: reducedMotion
                ? 0
                : progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [position === 'bottom' ? 16 : -16, 0],
                  }),
            },
          ],
        }}
      >
        <View
          accessibilityLiveRegion={
            data.type === 'error' ? 'assertive' : 'polite'
          }
          onAccessibilityEscape={() => onDismiss(data.id)}
          className="rounded-xl border p-4"
          style={{
            backgroundColor: filled ? colors.destructive : colors.card,
            borderColor: filled
              ? colors.destructive
              : richColors
                ? statusColor
                : colors.border,
            borderCurve: 'continuous',
          }}
        >
          <View className="flex-row items-start gap-3">
            {data.icon !== null ? (
              <View className="pt-0.5" accessible={false}>
                {data.icon !== undefined ? (
                  data.icon
                ) : data.type === 'loading' && !reducedMotion ? (
                  <ActivityIndicator size="small" color={iconColor} />
                ) : (
                  <Icon size={20} color={iconColor} />
                )}
              </View>
            ) : null}
            <Reanimated.View
              key={revision}
              entering={FadeIn.duration(150).reduceMotion(ReduceMotion.System)}
              className="flex-1 gap-1"
            >
              <Text
                className="text-sm font-semibold leading-5"
                style={{ color: foreground }}
              >
                {data.title}
              </Text>
              {data.description ? (
                <Text
                  className="text-sm leading-5"
                  style={{
                    color: filled ? foreground : colors.mutedForeground,
                  }}
                >
                  {data.description}
                </Text>
              ) : null}
            </Reanimated.View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Dismiss ${data.title}`}
              onPress={() => onDismiss(data.id)}
              hitSlop={8}
              className="min-h-11 min-w-11 items-center justify-center rounded-md -mr-2 -mt-2 active:opacity-60"
            >
              <X
                size={18}
                color={filled ? foreground : colors.mutedForeground}
              />
            </Pressable>
          </View>
          {data.action || data.cancel ? (
            <View className="mt-3 flex-row flex-wrap justify-end gap-2">
              {data.cancel ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={data.cancel.label}
                  onPress={() => {
                    onDismiss(data.id);
                    data.cancel?.onPress?.();
                  }}
                  className="min-h-11 justify-center rounded-md px-3 active:opacity-60"
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: foreground }}
                  >
                    {data.cancel.label}
                  </Text>
                </Pressable>
              ) : null}
              {data.action ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={data.action.label}
                  onPress={() => {
                    onDismiss(data.id);
                    data.action?.onPress?.();
                  }}
                  className="min-h-11 justify-center rounded-md px-4 active:opacity-60"
                  style={{
                    backgroundColor: filled
                      ? colors.background
                      : colors.primary,
                  }}
                >
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: filled
                        ? colors.foreground
                        : colors.primaryForeground,
                    }}
                  >
                    {data.action.label}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </View>
      </Animated.View>
    </Reanimated.View>
  );
}
