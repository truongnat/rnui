import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react-native';
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
import { ActivityIndicator, Animated, Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export type ToastType =
  | 'default'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'loading';

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

const ToastContext = createContext<{ toast: ToastApi }>({
  toast: (() => 0) as unknown as ToastApi,
});

export const useToast = () => useContext(ToastContext);

let nextId = 0;

export function ToastProvider({
  children,
  /** Where toasts stack, mirrors Sonner `position`. */
  position = 'bottom',
  /** Colored type accents on the toast itself, mirrors Sonner `richColors`. */
  richColors = false,
}: {
  children: ReactNode;
  position?: 'top' | 'bottom';
  richColors?: boolean;
}) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id?: number) => {
    setToasts((prev) =>
      id === undefined ? [] : prev.filter((x) => x.id !== id)
    );
  }, []);

  const show = useCallback(
    (t: Omit<ToastData, 'id'> & { id?: number }) => {
      const id = t.id ?? ++nextId;
      const toastData = { ...t, id };
      setToasts((prev) =>
        prev.some((x) => x.id === id)
          ? prev.map((x) => (x.id === id ? toastData : x))
          : [...prev, toastData]
      );
      const timer = timers.current.get(id);
      if (timer) clearTimeout(timer);
      const duration = t.duration ?? (t.type === 'loading' ? Infinity : 4000);
      if (duration !== Infinity) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  const toast = useMemo<ToastApi>(() => {
    const api = ((
      titleOrData: string | Omit<ToastData, 'id' | 'type'>,
      opts?: ToastOptions
    ) =>
      show(
        typeof titleOrData === 'string'
          ? { ...opts, title: titleOrData, type: 'default' }
          : { type: 'default', ...titleOrData }
      )) as ToastApi;
    for (const type of [
      'success',
      'error',
      'info',
      'warning',
      'message',
    ] as const) {
      api[type] = (title, opts) =>
        show({ ...opts, title, type: type === 'message' ? 'default' : type });
    }
    api.loading = (title, opts) =>
      show({ duration: Infinity, ...opts, title, type: 'loading' });
    api.promise = (promise, msgs, opts) => {
      const id = show({ type: 'loading', title: msgs.loading, ...opts });
      promise
        .then((v) =>
          show({
            ...opts,
            id,
            type: 'success',
            title:
              typeof msgs.success === 'function'
                ? msgs.success(v)
                : msgs.success,
          })
        )
        .catch((e) =>
          show({
            ...opts,
            id,
            type: 'error',
            title:
              typeof msgs.error === 'function' ? msgs.error(e) : msgs.error,
          })
        );
      return id;
    };
    api.dismiss = dismiss;
    return api;
  }, [show, dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      <View className="flex-1">{children}</View>
      <View
        pointerEvents="box-none"
        className={cn(
          'absolute left-4 right-4 gap-2',
          position === 'bottom' ? 'bottom-10' : 'top-12'
        )}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            data={t}
            richColors={richColors}
            onDismiss={() => dismiss(t.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const TYPE_COLORS = {
  success: '#16a34a',
  error: '#ef4444',
  info: '#0ea5e9',
  warning: '#f59e0b',
} as const;

function ToastIcon({ type, filled }: { type: ToastType; filled: boolean }) {
  const foreground = useIconColor('foreground');
  const size = 16;
  if (type === 'loading') {
    return <ActivityIndicator size="small" color={foreground} />;
  }
  if (type === 'default') return null;
  const color = filled ? '#fafafa' : TYPE_COLORS[type];
  const Icon = {
    success: CircleCheck,
    error: CircleX,
    info: Info,
    warning: TriangleAlert,
  }[type];
  return <Icon size={size} color={color} />;
}

function Toast({
  data,
  richColors,
  onDismiss,
}: {
  data: ToastData;
  richColors: boolean;
  onDismiss: () => void;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [opacity]);
  const dismiss = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(onDismiss);
  };

  // Legacy `variant="destructive"` and richColors typed toasts fill the color.
  const tint =
    data.type in TYPE_COLORS
      ? TYPE_COLORS[data.type as keyof typeof TYPE_COLORS]
      : undefined;
  const filled = data.variant === 'destructive' || (richColors && !!tint);

  return (
    <Animated.View style={{ opacity }}>
      <View
        accessibilityRole="alert"
        className={cn(
          'flex-row items-center gap-3 rounded-md border p-4 shadow-md',
          data.variant === 'destructive' && 'border-destructive bg-destructive',
          richColors && tint ? undefined : 'border-border bg-background'
        )}
        style={
          richColors && tint
            ? { borderColor: tint, backgroundColor: tint }
            : undefined
        }
      >
        <Pressable
          onPress={dismiss}
          className="flex-1 flex-row items-center gap-3"
        >
          {data.icon === undefined ? (
            <ToastIcon type={data.type} filled={filled} />
          ) : (
            data.icon
          )}
          <View className="flex-1">
            <Text
              className={cn(
                'text-sm font-semibold',
                filled ? 'text-destructive-foreground' : 'text-foreground'
              )}
            >
              {data.title}
            </Text>
            {!!data.description && (
              <Text
                className={cn(
                  'mt-1 text-sm',
                  filled
                    ? 'text-destructive-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {data.description}
              </Text>
            )}
          </View>
        </Pressable>
        {!!data.action && (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              data.action?.onPress?.();
              dismiss();
            }}
            className={cn(
              'rounded-md border px-3 py-1.5',
              filled ? 'border-destructive-foreground/40' : 'border-border'
            )}
          >
            <Text
              className={cn(
                'text-sm font-medium',
                filled ? 'text-destructive-foreground' : 'text-foreground'
              )}
            >
              {data.action.label}
            </Text>
          </Pressable>
        )}
        {!!data.cancel && (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              data.cancel?.onPress?.();
              dismiss();
            }}
            className="rounded-md px-3 py-1.5"
          >
            <Text
              className={cn(
                'text-sm',
                filled ? 'text-destructive-foreground' : 'text-muted-foreground'
              )}
            >
              {data.cancel.label}
            </Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
