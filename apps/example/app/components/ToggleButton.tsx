import { useTokens } from '@truongdq01/headless';
import { Stack, ToggleButton, ToggleButtonGroup } from '@truongdq01/ui';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ToggleButtonScreen() {
  const t = useTokens();
  const [alignment, setAlignment] = useState<string | undefined>('left');
  const [formatting, setFormatting] = useState<string | string[] | undefined>([
    'bold',
  ]);

  const ICON_SIZE = 18;

  const iconColor = (active: boolean) =>
    active ? t.color.brand.default : t.color.text.secondary;

  return (
    <DemoPage
      title="ToggleButton"
      description="Grouped toggles for related options — exclusive or multi-select."
    >
      <DemoSection
        title="Exclusive"
        description={`Selected alignment: ${alignment ?? 'none'}`}
      >
        <ToggleButtonGroup
          value={alignment}
          onChange={(v) => setAlignment(v as string)}
          exclusive
        >
          <ToggleButton value="left">
            <AlignLeft size={ICON_SIZE} color={iconColor(alignment === 'left')} />
          </ToggleButton>
          <ToggleButton value="center">
            <AlignCenter size={ICON_SIZE} color={iconColor(alignment === 'center')} />
          </ToggleButton>
          <ToggleButton value="right">
            <AlignRight size={ICON_SIZE} color={iconColor(alignment === 'right')} />
          </ToggleButton>
          <ToggleButton value="justify">
            <AlignJustify size={ICON_SIZE} color={iconColor(alignment === 'justify')} />
          </ToggleButton>
        </ToggleButtonGroup>
      </DemoSection>

      <DemoSection
        title="Multiple"
        description={`Selected styles: ${Array.isArray(formatting) ? formatting.join(', ') : formatting}`}
      >
        <ToggleButtonGroup value={formatting} onChange={(v) => setFormatting(v)}>
          <ToggleButton value="bold">
            <Bold
              size={ICON_SIZE}
              color={iconColor(
                Array.isArray(formatting) && formatting.includes('bold'),
              )}
            />
          </ToggleButton>
          <ToggleButton value="italic">
            <Italic
              size={ICON_SIZE}
              color={iconColor(
                Array.isArray(formatting) && formatting.includes('italic'),
              )}
            />
          </ToggleButton>
          <ToggleButton value="underline">
            <Underline
              size={ICON_SIZE}
              color={iconColor(
                Array.isArray(formatting) && formatting.includes('underline'),
              )}
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="sm, md, and lg densities.">
        <Stack spacing="lg">
          <ToggleButtonGroup size="sm" value="sm">
            <ToggleButton value="sm">Small</ToggleButton>
            <ToggleButton value="md">Medium</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="md" value="md">
            <ToggleButton value="sm">Small</ToggleButton>
            <ToggleButton value="md">Medium</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="lg" value="lg">
            <ToggleButton value="sm">Small</ToggleButton>
            <ToggleButton value="md">Medium</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </DemoSection>

      <DemoSection title="Vertical" description="Stacked button orientation.">
        <ToggleButtonGroup
          orientation="vertical"
          value={alignment}
          onChange={(v) => setAlignment(v as string)}
          exclusive
        >
          <ToggleButton value="left">Left Align</ToggleButton>
          <ToggleButton value="center">Center Align</ToggleButton>
          <ToggleButton value="right">Right Align</ToggleButton>
        </ToggleButtonGroup>
      </DemoSection>
    </DemoPage>
  );
}
