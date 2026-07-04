import { Button, ButtonGroup, Stack, ToggleButton, ToggleButtonGroup } from '@truongdq01/ui';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Scissors, Copy, ClipboardPaste, Underline } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonGroupScreen() {
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(['bold']);

  return (
    <DemoPage
      title="Button Group"
      description="Join related actions into one connected control — shared borders and outer-corner radius only."
    >
      <DemoSection
        title="Basic"
        description="Related edit actions with the same variant, like Astryx copy / cut / paste."
      >
        <ButtonGroup label="Text editing actions">
          <Button label="Copy" variant="outline" startIcon={<Copy size={16} />} onPress={() => {}} />
          <Button label="Cut" variant="outline" startIcon={<Scissors size={16} />} onPress={() => {}} />
          <Button label="Paste" variant="outline" startIcon={<ClipboardPaste size={16} />} onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Solid">
        <ButtonGroup label="Alignment actions">
          <Button label="Left" variant="solid" onPress={() => {}} />
          <Button label="Center" variant="solid" onPress={() => {}} />
          <Button label="Right" variant="solid" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Full width">
        <ButtonGroup label="Full width group" fullWidth>
          <Button label="Left" variant="outline" onPress={() => {}} />
          <Button label="Center" variant="outline" onPress={() => {}} />
          <Button label="Right" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Vertical">
        <ButtonGroup label="Vertical actions" orientation="vertical">
          <Button label="Undo" variant="outline" onPress={() => {}} />
          <Button label="Redo" variant="outline" onPress={() => {}} />
          <Button label="Reset" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection
        title="Single selection"
        description={`Current alignment: ${alignment.toUpperCase()}`}
      >
        <ToggleButtonGroup
          value={alignment}
          onChange={(v) => v && setAlignment(v as string)}
          exclusive
        >
          <ToggleButton value="left"><AlignLeft size={18} /></ToggleButton>
          <ToggleButton value="center"><AlignCenter size={18} /></ToggleButton>
          <ToggleButton value="right"><AlignRight size={18} /></ToggleButton>
        </ToggleButtonGroup>
      </DemoSection>

      <DemoSection
        title="Multiple selection"
        description={`Active formats: ${formats.join(', ') || 'NONE'}`}
      >
        <ToggleButtonGroup
          value={formats}
          onChange={(v) => setFormats(v as string[])}
          exclusive={false}
        >
          <ToggleButton value="bold"><Bold size={18} /></ToggleButton>
          <ToggleButton value="italic"><Italic size={18} /></ToggleButton>
          <ToggleButton value="underline"><Underline size={18} /></ToggleButton>
        </ToggleButtonGroup>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack spacing="md">
          <View>
            <ButtonGroup label="Small group" size="sm">
              <Button label="S" variant="outline" onPress={() => {}} />
              <Button label="M" variant="outline" onPress={() => {}} />
              <Button label="L" variant="outline" onPress={() => {}} />
            </ButtonGroup>
          </View>
          <View>
            <ButtonGroup label="Large group" size="lg">
              <Button label="Start" variant="solid" onPress={() => {}} />
              <Button label="End" variant="solid" onPress={() => {}} />
            </ButtonGroup>
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
