import { useTokens } from '@truongdq01/headless';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@truongdq01/ui';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ToggleButtonScreen() {
  const t = useTokens();
  const [alignment, setAlignment] = useState<string | undefined>('left');
  const [formatting, setFormatting] = useState<string | string[] | undefined>(['bold']);
  const [size, setSize] = useState<string | undefined>('md');

  const ICON_SIZE = 18;

  return (
    <DemoPage
      title="ToggleButton"
      description="Toggle buttons can be used to group related options. To emphasize groups of related toggle buttons, a group should share a common container."
    >
      <DemoSection
        title="Exclusive Selection"
        description="Only one button can be active at a time. Ideal for text alignment or view modes."
      >
        <Stack gap={12}>
          <Typography variant="body2" color="secondary">Selected Alignment: {alignment}</Typography>
          <ToggleButtonGroup
            value={alignment}
            onChange={(v) => setAlignment(v as string)}
            exclusive
          >
            <ToggleButton value="left">
               <AlignLeft size={ICON_SIZE} color={alignment === 'left' ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
            <ToggleButton value="center">
               <AlignCenter size={ICON_SIZE} color={alignment === 'center' ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
            <ToggleButton value="right">
               <AlignRight size={ICON_SIZE} color={alignment === 'right' ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
            <ToggleButton value="justify">
               <AlignJustify size={ICON_SIZE} color={alignment === 'justify' ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Multiple Selection"
        description="Users can select multiple options simultaneously. Ideal for text formatting."
      >
        <Stack gap={12}>
          <Typography variant="body2" color="secondary">Selected Styles: {Array.isArray(formatting) ? formatting.join(', ') : formatting}</Typography>
          <ToggleButtonGroup
            value={formatting}
            onChange={(v) => setFormatting(v)}
          >
            <ToggleButton value="bold">
               <Bold size={ICON_SIZE} color={Array.isArray(formatting) && formatting.includes('bold') ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
            <ToggleButton value="italic">
               <Italic size={ICON_SIZE} color={Array.isArray(formatting) && formatting.includes('italic') ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
            <ToggleButton value="underline">
               <Underline size={ICON_SIZE} color={Array.isArray(formatting) && formatting.includes('underline') ? t.color.brand.default : t.color.text.secondary} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Available in small, medium, and large sizes."
      >
        <Stack gap={16}>
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

      <DemoSection
        title="Vertical Orientation"
        description="Buttons can be stacked vertically."
      >
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
