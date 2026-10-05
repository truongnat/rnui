import { useColorScheme, View, type ViewProps } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface CircularProgressProps extends ViewProps {
  /** 0–100. Omit for an indeterminate 25% arc. */
  value?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 5,
  showLabel = false,
  className,
  ...props
}: CircularProgressProps) {
  const dark = useColorScheme() === 'dark';
  const trackColor = dark ? '#292524' : '#e7e5e4';
  const fillColor = dark ? '#fafafa' : '#18181b';

  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const pct = value == null ? 25 : Math.max(0, Math.min(100, value));

  return (
    <View
      className={cn('items-center justify-center self-start', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {showLabel && value != null && (
        <Text className="absolute text-xs font-medium text-foreground">
          {Math.round(pct)}%
        </Text>
      )}
    </View>
  );
}
