import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useTokens } from '@truongdq01/headless';

const ROW = 40;
const VISIBLE = 5;

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

export interface TimePickerWheelsProps {
  value: Date;
  onChange: (next: Date) => void;
}

/**
 * Simple scrollable hour / minute columns (bottom-sheet style).
 */
export function TimePickerWheels({ value, onChange }: TimePickerWheelsProps) {
  const t = useTokens();
  const h = value.getHours();
  const m = value.getMinutes();
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  const setHM = useCallback(
    (nh: number, nm: number) => {
      const d = new Date(value);
      d.setHours(nh, nm, 0, 0);
      onChange(d);
    },
    [value, onChange]
  );

  const col = (label: string, child: React.ReactNode) => (
    <View style={{ width: 80 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: t.fontSize.xs,
          fontWeight: t.fontWeight.medium,
          color: t.color.text.tertiary,
          marginBottom: 4,
        }}
      >
        {label}
      </Text>
      <ScrollView
        style={{ height: ROW * VISIBLE }}
        showsVerticalScrollIndicator={false}
      >
        {child}
      </ScrollView>
    </View>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: t.spacing[4],
        justifyContent: 'center',
        paddingVertical: t.spacing[3],
      }}
    >
      {col(
        'Hour',
        hours.map((hour) => (
          <Pressable
            key={hour}
            onPress={() => setHM(hour, m)}
            style={{
              height: ROW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: t.radius.md,
              backgroundColor:
                hour === h ? t.color.brand.subtle : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: t.fontSize.lg,
                fontWeight:
                  hour === h ? t.fontWeight.semibold : t.fontWeight.regular,
                color: hour === h ? t.color.brand.text : t.color.text.primary,
              }}
            >
              {pad2(hour)}
            </Text>
          </Pressable>
        ))
      )}
      {col(
        'Min',
        minutes.map((minute) => (
          <Pressable
            key={minute}
            onPress={() => setHM(h, minute)}
            style={{
              height: ROW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: t.radius.md,
              backgroundColor:
                minute === m ? t.color.brand.subtle : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: t.fontSize.lg,
                fontWeight:
                  minute === m ? t.fontWeight.semibold : t.fontWeight.regular,
                color: minute === m ? t.color.brand.text : t.color.text.primary,
              }}
            >
              {pad2(minute)}
            </Text>
          </Pressable>
        ))
      )}
    </View>
  );
}
