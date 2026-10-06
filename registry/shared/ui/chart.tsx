import { useMemo, useState } from 'react';
import { useColorScheme, View, type ViewProps } from 'react-native';
import {
  Canvas,
  Circle,
  Path,
  RoundedRect,
  Skia,
} from '@shopify/react-native-skia';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const LIGHT_PALETTE = ['#18181b', '#525252', '#a3a3a3', '#d4d4d4', '#0ea5e9'];
const DARK_PALETTE = ['#fafafa', '#a3a3a3', '#737373', '#525252', '#38bdf8'];

export interface ChartDatum {
  label: string;
  value: number;
  /** Per-bar/slice color override. */
  color?: string;
}

interface CommonChartProps extends ViewProps {
  className?: string;
  /** Palette override — index-mapped per datum. */
  colors?: string[];
}

function useChartColors(override?: string[]) {
  const dark = useColorScheme() === 'dark';
  return { palette: override ?? (dark ? DARK_PALETTE : LIGHT_PALETTE) };
}

function useWidth(): [
  number,
  (e: { nativeEvent: { layout: { width: number } } }) => void,
] {
  const [w, setW] = useState(0);
  return [w, (e) => setW(e.nativeEvent.layout.width)];
}

// ---------- Bar chart ----------

export interface BarChartProps extends CommonChartProps {
  data: ChartDatum[];
  height?: number;
  barRadius?: number;
  showLabels?: boolean;
}

export function BarChart({
  data,
  height = 160,
  barRadius = 4,
  showLabels = true,
  colors,
  className,
  ...props
}: BarChartProps) {
  const { palette } = useChartColors(colors);
  const [width, onLayout] = useWidth();
  const max = Math.max(...data.map((d) => d.value), 1);

  const bars = useMemo(() => {
    if (!width || !data.length) return [];
    const slot = width / data.length;
    const barWidth = Math.min(slot * 0.55, 56);
    return data.map((d, i) => {
      const h = Math.max((d.value / max) * (height - 4), 2);
      return {
        x: slot * i + (slot - barWidth) / 2,
        y: height - h,
        width: barWidth,
        height: h,
        color: d.color ?? (colors ? palette[i % palette.length] : palette[0]),
      };
    });
  }, [width, data, height, max, palette, colors]);

  return (
    <View className={cn('w-full', className)} onLayout={onLayout} {...props}>
      {width > 0 && (
        <>
          <Canvas style={{ width, height }}>
            {bars.map((b, i) => (
              <RoundedRect
                // biome-ignore lint/suspicious/noArrayIndexKey: stable by index
                key={i}
                x={b.x}
                y={b.y}
                width={b.width}
                height={b.height}
                r={barRadius}
                color={b.color}
              />
            ))}
          </Canvas>
          {showLabels && (
            <View className="mt-1 flex-row">
              {data.map((d) => (
                <Text
                  key={d.label}
                  className="flex-1 text-center text-xs text-muted-foreground"
                  numberOfLines={1}
                >
                  {d.label}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

// ---------- Line chart ----------

export interface LineChartProps extends CommonChartProps {
  data: ChartDatum[];
  height?: number;
  /** Stroke width of the line. */
  strokeWidth?: number;
  /** Show dots at each point. */
  dots?: boolean;
  showLabels?: boolean;
}

export function LineChart({
  data,
  height = 160,
  strokeWidth = 2.5,
  dots = true,
  showLabels = true,
  colors,
  className,
  ...props
}: LineChartProps) {
  const { palette } = useChartColors(colors);
  const [width, onLayout] = useWidth();
  const color = colors?.[0] ?? palette[0];
  const pad = 8;

  const { path, points } = useMemo(() => {
    if (!width || data.length < 2) {
      return {
        path: Skia.Path.Make(),
        points: [] as { x: number; y: number }[],
      };
    }
    const max = Math.max(...data.map((d) => d.value));
    const min = Math.min(...data.map((d) => d.value));
    const range = max - min || 1;
    const stepX = (width - pad * 2) / (data.length - 1);
    const pts = data.map((d, i) => ({
      x: pad + i * stepX,
      y: height - pad - ((d.value - min) / range) * (height - pad * 2),
    }));
    const b = Skia.PathBuilder.Make();
    b.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cur = pts[i];
      const midX = (prev.x + cur.x) / 2;
      b.cubicTo(midX, prev.y, midX, cur.y, cur.x, cur.y);
    }
    return { path: b.build(), points: pts };
  }, [width, data, height]);

  return (
    <View className={cn('w-full', className)} onLayout={onLayout} {...props}>
      {width > 0 && (
        <>
          <Canvas style={{ width, height }}>
            <Path
              path={path}
              style="stroke"
              strokeWidth={strokeWidth}
              color={color}
              strokeJoin="round"
              strokeCap="round"
            />
            {dots &&
              points.map((pt, i) => (
                <Circle
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable by index
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={3}
                  color={color}
                />
              ))}
          </Canvas>
          {showLabels && (
            <View className="mt-1 flex-row">
              {data.map((d) => (
                <Text
                  key={d.label}
                  className="flex-1 text-center text-xs text-muted-foreground"
                  numberOfLines={1}
                >
                  {d.label}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

// ---------- Donut chart ----------

export interface DonutChartProps extends CommonChartProps {
  data: ChartDatum[];
  size?: number;
  /** Ring thickness. */
  strokeWidth?: number;
  /** Center label — e.g. total. */
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 160,
  strokeWidth = 24,
  centerLabel,
  centerValue,
  colors,
  className,
  ...props
}: DonutChartProps) {
  const { palette } = useChartColors(colors);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - strokeWidth) / 2;
  const c = size / 2;

  const segments = useMemo(() => {
    let acc = 0;
    return data.map((d, i) => {
      const start = acc / total;
      acc += d.value;
      const end = acc / total;
      const startAngle = start * 360 - 90;
      const sweep = (end - start) * 360 - 1;
      const path = Skia.PathBuilder.Make()
        .arcToOval(
          Skia.XYWHRect(c - r, c - r, r * 2, r * 2),
          startAngle,
          sweep,
          true
        )
        .build();
      return { path, color: d.color ?? palette[i % palette.length] };
    });
  }, [data, total, r, c, palette]);

  return (
    <View
      className={cn('items-center self-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Canvas style={{ width: size, height: size }}>
        {segments.map((s, i) => (
          <Path
            // biome-ignore lint/suspicious/noArrayIndexKey: stable by index
            key={i}
            path={s.path}
            style="stroke"
            strokeWidth={strokeWidth}
            color={s.color}
            strokeCap="butt"
          />
        ))}
      </Canvas>
      {(centerLabel || centerValue) && (
        <View className="absolute inset-0 items-center justify-center">
          {centerValue && (
            <Text className="text-2xl font-bold text-foreground">
              {centerValue}
            </Text>
          )}
          {centerLabel && (
            <Text className="text-xs text-muted-foreground">{centerLabel}</Text>
          )}
        </View>
      )}
    </View>
  );
}

// ---------- Legend ----------

export function ChartLegend({
  data,
  colors,
  className,
  ...props
}: CommonChartProps & { data: ChartDatum[] }) {
  const { palette } = useChartColors(colors);
  return (
    <View
      className={cn(
        'flex-row flex-wrap justify-center gap-x-4 gap-y-1',
        className
      )}
      {...props}
    >
      {data.map((d, i) => (
        <View key={d.label} className="flex-row items-center gap-1.5">
          <View
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: d.color ?? palette[i % palette.length] }}
          />
          <Text className="text-xs text-muted-foreground">{d.label}</Text>
        </View>
      ))}
    </View>
  );
}
