import {
  useActiveBrand,
  useBrandSwitch,
  useTheme,
} from '@truongdq01/headless';
import type { Brand, ColorScheme } from '@truongdq01/tokens';
import { allBrands } from '@truongdq01/themes';
import {
  Button,
  Fab,
  Modal,
  ModalHeader,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { Palette, X } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { persistBrandId } from './demoThemeStorage';
import { useDemoThemePreference } from './DemoThemeContext';

const SCHEME_OPTIONS: Array<ColorScheme | 'system'> = [
  'light',
  'dark',
  'system',
];

function SchemeChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Button
      label={label}
      size="sm"
      variant={selected ? 'solid' : 'outline'}
      onPress={onPress}
    />
  );
}

function BrandChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Button
      label={label}
      size="sm"
      variant={selected ? 'solid' : 'ghost'}
      onPress={onPress}
    />
  );
}

export function DemoThemeControls() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { schemePreference, setSchemePreference } = useDemoThemePreference();
  const { tokens } = useTheme();
  const activeBrand = useActiveBrand();
  const setBrand = useBrandSwitch();
  const [open, setOpen] = useState(false);

  const handleScheme = useCallback(
    (scheme: ColorScheme | 'system') => {
      setSchemePreference(scheme);
    },
    [setSchemePreference]
  );

  const handleBrand = useCallback(
    (brand: Brand | undefined) => {
      setBrand(brand);
      void persistBrandId(brand?.id ?? null);
    },
    [setBrand]
  );

  const fabTop = insets.top + tokens.spacing[2];

  const panelStyle = useMemo(
    () => ({
      backgroundColor: tokens.color.surface.default,
      borderRadius: tokens.radius.container,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: tokens.color.border.subtle,
      padding: tokens.spacing[4],
      gap: tokens.spacing[4],
      maxHeight: windowHeight * 0.8,
      width: '100%' as const,
      maxWidth: 420,
    }),
    [tokens, windowHeight]
  );

  return (
    <>
      <View
        pointerEvents="box-none"
        style={[
          styles.fabHost,
          {
            top: fabTop,
            right: tokens.spacing[3],
          },
        ]}
      >
        <Fab
          icon={<Palette />}
          size="sm"
          accessibilityLabel="Open theme preview settings"
          onPress={() => setOpen(true)}
        />
      </View>

      <Modal open={open} onClose={() => setOpen(false)}>
        <View style={panelStyle}>
          <ModalHeader
            title="Theme preview"
            trailing={
              <Pressable
                onPress={() => setOpen(false)}
                accessibilityRole="button"
                accessibilityLabel="Close theme settings"
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && { opacity: tokens.opacity[70] },
                ]}
              >
                <X size={20} color={tokens.color.text.secondary} />
              </Pressable>
            }
          />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: tokens.spacing[4] }}
          >
            <Stack spacing="sm">
              <Typography
                variant="subtitle2"
                style={{ fontWeight: tokens.fontWeight.semibold }}
              >
                Appearance
              </Typography>
              <Stack direction="row" spacing="sm" wrap>
                {SCHEME_OPTIONS.map((scheme) => (
                  <SchemeChip
                    key={scheme}
                    label={scheme}
                    selected={schemePreference === scheme}
                    onPress={() => handleScheme(scheme)}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing="sm">
              <Typography
                variant="subtitle2"
                style={{ fontWeight: tokens.fontWeight.semibold }}
              >
                Brand
              </Typography>
              <Stack direction="row" spacing="sm" wrap>
                <BrandChip
                  label="Built-in"
                  selected={activeBrand == null}
                  onPress={() => handleBrand(undefined)}
                />
                {allBrands.map((brand) => (
                  <BrandChip
                    key={brand.id}
                    label={brand.name}
                    selected={activeBrand?.id === brand.id}
                    onPress={() => handleBrand(brand)}
                  />
                ))}
              </Stack>
              <Typography variant="caption" color="tertiary">
                Brand color: {tokens.color.brand.default}
              </Typography>
            </Stack>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fabHost: {
    position: 'absolute',
    zIndex: 100,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
