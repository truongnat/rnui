import {
  useActiveBrand,
  useBrandSwitch,
  useTheme,
  useTokens,
} from '@truongdq01/headless';
import type { Brand } from '@truongdq01/tokens';
import { allBrands } from '@truongdq01/themes';
import {
  Button,
  Card,
  Skeleton,
  Stack,
  Typography,
} from '@truongdq01/ui';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const SCHEME_OPTIONS: Array<'light' | 'dark' | 'system'> = [
  'light',
  'dark',
  'system',
];

const RADIUS_KEYS = ['inner', 'element', 'container', 'page', 'chat'] as const;

const DATA_KEYS = [
  'blue',
  'orange',
  'purple',
  'green',
  'pink',
  'cyan',
  'red',
  'teal',
  'brown',
  'indigo',
] as const;

/** Brand switcher — includes the additive Astryx-neutral brand. */
function BrandSwitcher() {
  const t = useTokens();
  const activeBrand = useActiveBrand();
  const setBrand = useBrandSwitch();

  const renderChip = (
    id: string,
    label: string,
    selected: boolean,
    onPress: () => void
  ) => (
    <Button
      key={id}
      label={label}
      size="sm"
      variant={selected ? 'solid' : 'outline'}
      onPress={onPress}
    />
  );

  return (
    <Stack direction="row" spacing="sm" wrap>
      {renderChip(
        'builtin',
        'Built-in',
        activeBrand == null,
        () => setBrand(undefined)
      )}
      {allBrands.map((brand: Brand) =>
        renderChip(
          brand.id,
          brand.name,
          activeBrand?.id === brand.id,
          () => setBrand(brand)
        )
      )}
      <Typography variant="caption" color="tertiary">
        Preview: {t.color.brand.default}
      </Typography>
    </Stack>
  );
}

function SchemeToggle() {
  const { colorScheme, setColorScheme } = useTheme();
  return (
    <Stack direction="row" spacing="sm" wrap>
      {SCHEME_OPTIONS.map((scheme) => (
        <Button
          key={scheme}
          label={scheme}
          size="sm"
          variant={colorScheme === scheme ? 'solid' : 'ghost'}
          onPress={() => setColorScheme(scheme)}
        />
      ))}
    </Stack>
  );
}

/** body → surface → card → popover layering. */
function SurfaceHierarchy() {
  const t = useTokens();
  const layer = (bg: string, label: string, child?: React.ReactNode) => (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: t.radius.container,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: t.color.border.subtle,
        padding: t.spacing[3],
        gap: t.spacing[2],
      }}
    >
      <Typography variant="caption" color="secondary">
        {label}
      </Typography>
      {child}
    </View>
  );

  return layer(
    t.color.bg.default,
    'bg.default',
    layer(
      t.color.surface.default,
      'surface.default',
      layer(
        t.color.surface.card ?? t.color.surface.default,
        'surface.card',
        layer(t.color.surface.popover ?? t.color.surface.raised, 'surface.popover')
      )
    )
  );
}

function RadiusSwatches() {
  const t = useTokens();
  return (
    <Stack direction="row" spacing="md" wrap>
      {RADIUS_KEYS.map((key) => (
        <View key={key} style={{ alignItems: 'center', gap: t.spacing[1] }}>
          <View
            style={{
              width: 56,
              height: 56,
              backgroundColor: t.color.brand.subtle,
              borderColor: t.color.brand.default,
              borderWidth: 2,
              borderRadius: t.radius[key],
              borderCurve: 'continuous',
            }}
          />
          <Typography variant="caption" color="tertiary">
            {key} · {t.radius[key]}
          </Typography>
        </View>
      ))}
    </Stack>
  );
}

function DataSwatches() {
  const t = useTokens();
  const categorical = t.color.data?.categorical;
  if (!categorical) return null;
  return (
    <Stack direction="row" spacing="sm" wrap>
      {DATA_KEYS.map((key) => (
        <View key={key} style={{ alignItems: 'center', gap: t.spacing[1] }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: t.radius.full,
              backgroundColor: categorical[key],
            }}
          />
          <Typography variant="caption" color="tertiary">
            {key}
          </Typography>
        </View>
      ))}
    </Stack>
  );
}

export default function AstryxTokensScreen() {
  return (
    <DemoPage
      title="Astryx tokens"
      description="Astryx-aligned additions: brand switcher (incl. Neutral), surface hierarchy, semantic radius, geometric display type, and data colors."
      showThemeControls={false}
    >
      <DemoSection
        title="Theme controls"
        description="Switch brand and color scheme. Built-in uses the default violet/amber tokens."
      >
        <Stack spacing="md">
          <SchemeToggle />
          <BrandSwitcher />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Surface hierarchy"
        description="body → surface → card → popover — each level sits above the previous."
        bare
      >
        <SurfaceHierarchy />
      </DemoSection>

      <DemoSection
        title="Semantic radius"
        description="inner (8) → element (12) → container (16) → page (32) · chat (28)."
      >
        <RadiusSwatches />
      </DemoSection>

      <DemoSection
        title="Display type"
        description="Geometric display variants for hero / marketing / data callouts."
      >
        <Stack spacing="sm">
          <Typography variant="display1">Display 1</Typography>
          <Typography variant="display2">Display 2</Typography>
          <Typography variant="display3">Display 3</Typography>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Data colors"
        description="Categorical palette for charts and visualizations (tokens.color.data)."
      >
        <DataSwatches />
      </DemoSection>

      <DemoSection
        title="Concentric radius + reduced motion"
        description="Card exposes useCardSurface(); Skeleton honors the OS reduce-motion setting."
      >
        <Card padding="lg">
          <Stack spacing="sm">
            <Typography variant="body2" color="secondary">
              Skeleton (static when reduce motion is on)
            </Typography>
            <Skeleton width="100%" height={14} />
            <Skeleton width="70%" height={14} />
          </Stack>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
