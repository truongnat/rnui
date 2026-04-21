import { useTokens } from '@truongdq01/headless';
import { Button, ButtonGroup, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@truongdq01/ui';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ButtonGroupScreen() {
  const t = useTokens();
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(['bold']);

  return (
    <DemoPage 
      title="Button Group" 
      description="Button groups can be used to group related buttons together, or for selection."
    >
      <DemoSection title="Basic Button Group">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Stack related buttons with consistent visual styles.
        </Typography>
        <ButtonGroup>
          <Button label="One" variant="outline" onPress={() => {}} />
          <Button label="Two" variant="outline" onPress={() => {}} />
          <Button label="Three" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Full Width Group">
        <ButtonGroup fullWidth>
          <Button label="LEFT" variant="outline" onPress={() => {}} />
          <Button label="CENTER" variant="outline" onPress={() => {}} />
          <Button label="RIGHT" variant="outline" onPress={() => {}} />
        </ButtonGroup>
      </DemoSection>

      <DemoSection title="Toggle Button Group (Single Selection)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Current Alignment: {alignment.toUpperCase()}
        </Typography>
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
      
      <DemoSection title="Toggle Button Group (Multiple Selection)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Active Formats: {formats.join(', ') || 'NONE'}
        </Typography>
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
                <Typography variant="overline" style={{ marginBottom: 4 }}>Small (SM)</Typography>
                <ButtonGroup size="sm">
                  <Button label="S" variant="outline" onPress={() => {}} />
                  <Button label="M" variant="outline" onPress={() => {}} />
                  <Button label="L" variant="outline" onPress={() => {}} />
                  <Button label="XL" variant="outline" onPress={() => {}} />
                </ButtonGroup>
            </View>
            <View>
                <Typography variant="overline" style={{ marginBottom: 4 }}>Large (LG)</Typography>
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
