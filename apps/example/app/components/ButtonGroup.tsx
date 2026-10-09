import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ClipboardPaste,
  Copy,
  Italic,
  Scissors,
  Underline,
} from 'lucide-react-native';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonGroupScreen() {
  const colors = useThemeColor();
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(['bold']);

  return (
    <DemoPage
      title="Button Group"
      description="Join related actions into one connected control — shared borders and outer-corner radius only."
    >
      <DemoSection
        title="Basic"
        description="Related edit actions sharing the outline variant — copy / cut / paste."
      >
        <ButtonGroup label="Text editing actions">
          <Button variant="outline" onPress={() => {}}>
            <Copy size={16} color={colors.foreground} />
            <Text>Copy</Text>
          </Button>
          <Button variant="outline" onPress={() => {}}>
            <Scissors size={16} color={colors.foreground} />
            <Text>Cut</Text>
          </Button>
          <Button variant="outline" onPress={() => {}}>
            <ClipboardPaste size={16} color={colors.foreground} />
            <Text>Paste</Text>
          </Button>
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Solid">
        <ButtonGroup label="Alignment actions" buttonVariant="default">
          <Button onPress={() => {}}>Left</Button>
          <Button onPress={() => {}}>Center</Button>
          <Button onPress={() => {}}>Right</Button>
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Full width">
        <ButtonGroup label="Full width group" fullWidth>
          <Button variant="outline" onPress={() => {}}>
            Left
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Center
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Right
          </Button>
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Vertical">
        <ButtonGroup label="Vertical actions" orientation="vertical">
          <Button variant="outline" onPress={() => {}}>
            Undo
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Redo
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Reset
          </Button>
        </ButtonGroup>
      </DemoSection>

      <DemoSection
        title="Single selection"
        description={`Current alignment: ${alignment.toUpperCase()}`}
      >
        <ToggleGroup
          type="single"
          value={alignment}
          onValueChange={(v) => typeof v === 'string' && v && setAlignment(v)}
        >
          <ToggleGroupItem value="left" accessibilityLabel="Align left">
            <AlignLeft size={18} color={colors.foreground} />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" accessibilityLabel="Align center">
            <AlignCenter size={18} color={colors.foreground} />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" accessibilityLabel="Align right">
            <AlignRight size={18} color={colors.foreground} />
          </ToggleGroupItem>
        </ToggleGroup>
      </DemoSection>

      <DemoSection
        title="Multiple selection"
        description={`Active formats: ${formats.join(', ') || 'NONE'}`}
      >
        <ToggleGroup
          type="multiple"
          value={formats}
          onValueChange={(v) => setFormats(Array.isArray(v) ? v : [v])}
        >
          <ToggleGroupItem value="bold" accessibilityLabel="Bold">
            <Bold size={18} color={colors.foreground} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" accessibilityLabel="Italic">
            <Italic size={18} color={colors.foreground} />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" accessibilityLabel="Underline">
            <Underline size={18} color={colors.foreground} />
          </ToggleGroupItem>
        </ToggleGroup>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack spacing="md">
          <ButtonGroup label="Small group" size="sm">
            <Button variant="outline" onPress={() => {}}>
              S
            </Button>
            <Button variant="outline" onPress={() => {}}>
              M
            </Button>
            <Button variant="outline" onPress={() => {}}>
              L
            </Button>
          </ButtonGroup>
          <ButtonGroup label="Large group" size="lg" buttonVariant="default">
            <Button onPress={() => {}}>Start</Button>
            <Button onPress={() => {}}>End</Button>
          </ButtonGroup>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
