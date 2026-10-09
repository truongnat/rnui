import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
import { DemoGroup, DemoPage, DemoSection } from '@/demo/DemoPage';
import { useThemeColor } from '@/lib/utils';

export default function ToggleButtonScreen() {
  const colors = useThemeColor();
  const [alignment, setAlignment] = useState('left');
  const [formatting, setFormatting] = useState<string[]>(['bold']);

  const ICON_SIZE = 18;

  const iconColor = (active: boolean) =>
    active ? colors.foreground : colors.mutedForeground;

  const activeFormat = (value: string) => formatting.includes(value);

  return (
    <DemoPage
      title="ToggleButton"
      description="Grouped toggles for related options — exclusive or multi-select."
    >
      <DemoSection
        title="Exclusive"
        description={`Selected alignment: ${alignment || 'none'}`}
      >
        <ToggleGroup
          type="single"
          value={alignment}
          onValueChange={(v) =>
            setAlignment(Array.isArray(v) ? (v[0] ?? '') : v)
          }
        >
          <ToggleGroupItem value="left" accessibilityLabel="Align left">
            <AlignLeft
              size={ICON_SIZE}
              color={iconColor(alignment === 'left')}
            />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" accessibilityLabel="Align center">
            <AlignCenter
              size={ICON_SIZE}
              color={iconColor(alignment === 'center')}
            />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" accessibilityLabel="Align right">
            <AlignRight
              size={ICON_SIZE}
              color={iconColor(alignment === 'right')}
            />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" accessibilityLabel="Align justify">
            <AlignJustify
              size={ICON_SIZE}
              color={iconColor(alignment === 'justify')}
            />
          </ToggleGroupItem>
        </ToggleGroup>
      </DemoSection>

      <DemoSection
        title="Multiple"
        description={`Selected styles: ${formatting.length ? formatting.join(', ') : 'none'}`}
      >
        <ToggleGroup
          type="multiple"
          value={formatting}
          onValueChange={(v) => setFormatting(Array.isArray(v) ? v : [v])}
        >
          <ToggleGroupItem value="bold" accessibilityLabel="Bold">
            <Bold size={ICON_SIZE} color={iconColor(activeFormat('bold'))} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" accessibilityLabel="Italic">
            <Italic
              size={ICON_SIZE}
              color={iconColor(activeFormat('italic'))}
            />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" accessibilityLabel="Underline">
            <Underline
              size={ICON_SIZE}
              color={iconColor(activeFormat('underline'))}
            />
          </ToggleGroupItem>
        </ToggleGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="sm, md, and lg densities.">
        <DemoGroup direction="column" gap={16}>
          <ToggleGroup type="single" size="sm" defaultValue="sm">
            <ToggleGroupItem value="sm">Small</ToggleGroupItem>
            <ToggleGroupItem value="md">Medium</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="default" defaultValue="md">
            <ToggleGroupItem value="sm">Small</ToggleGroupItem>
            <ToggleGroupItem value="md">Medium</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="lg" defaultValue="lg">
            <ToggleGroupItem value="sm">Small</ToggleGroupItem>
            <ToggleGroupItem value="md">Medium</ToggleGroupItem>
          </ToggleGroup>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Vertical" description="Stacked button orientation.">
        <ToggleGroup
          type="single"
          orientation="vertical"
          value={alignment}
          onValueChange={(v) =>
            setAlignment(Array.isArray(v) ? (v[0] ?? '') : v)
          }
        >
          <ToggleGroupItem value="left">Left Align</ToggleGroupItem>
          <ToggleGroupItem value="center">Center Align</ToggleGroupItem>
          <ToggleGroupItem value="right">Right Align</ToggleGroupItem>
        </ToggleGroup>
      </DemoSection>
    </DemoPage>
  );
}
