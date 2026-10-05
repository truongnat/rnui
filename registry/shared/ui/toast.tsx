import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface ToastData {
  id: number;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

const ToastContext = createContext<{
  toast: (t: Omit<ToastData, 'id'>) => void;
}>({
  toast: () => {},
});

export const useToast = () => useContext(ToastContext);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toast = useCallback((t: Omit<ToastData, 'id'>) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((x) => x.id !== id)),
      t.duration ?? 4000
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <View className="flex-1">{children}</View>
      <View
        pointerEvents="box-none"
        className="absolute bottom-10 left-4 right-4 gap-2"
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            data={t}
            onDismiss={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function Toast({
  data,
  onDismiss,
}: {
  data: ToastData;
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

  return (
    <Animated.View style={{ opacity }}>
      <Pressable
        accessibilityRole="alert"
        onPress={dismiss}
        className={cn(
          'rounded-md border p-4 shadow-md',
          data.variant === 'destructive'
            ? 'border-destructive bg-destructive'
            : 'border-border bg-background'
        )}
      >
        <Text
          className={cn(
            'text-sm font-semibold',
            data.variant === 'destructive'
              ? 'text-destructive-foreground'
              : 'text-foreground'
          )}
        >
          {data.title}
        </Text>
        {!!data.description && (
          <Text
            className={cn(
              'mt-1 text-sm',
              data.variant === 'destructive'
                ? 'text-destructive-foreground'
                : 'text-muted-foreground'
            )}
          >
            {data.description}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
