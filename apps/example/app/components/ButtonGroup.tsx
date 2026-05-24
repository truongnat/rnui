import { Button, ButtonGroup, Stack, ToggleButton, ToggleButtonGroup } from '@truongdq01/ui';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonGroupScreen() {
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(['bold']);

  return (
    <DemoPage
      title="Button Group"
      description="Group related buttons or selection toggles."
    >
      <DemoSection title="Basic" description="Stack related buttons with consistent styling.">
        <ButtonGroup>
          <Button label="One" variant="outline" onPress={() => {}} />
          <Button label="Two" variant="outline" onPress={() => {}} />
          <Button label="Three" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Full Width">
        <ButtonGroup fullWidth>
          <Button label="LEFT" variant="outline" onPress={() => {}} />
          <Button label="CENTER" variant="outline" onPress={() => {}} />
          <Button label="RIGHT" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection
        title="Single Selection"
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
        title="Multiple Selection"
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
            <ButtonGroup size="sm">
              <Button label="S" variant="outline" onPress={() => {}} />
              <Button label="M" variant="outline" onPress={() => {}} />
              <Button label="L" variant="outline" onPress={() => {}} />
              <Button label="XL" variant="outline" onPress={() => {}} />
            </ButtonGroup>
          </View>
          <View>
            <ButtonGroup size="lg">
              <Button label="START" onPress={() => {}} />
              <Button label="END" onPress={() => {}} />
            </ButtonGroup>
          </View>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
