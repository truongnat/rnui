import { useTokens } from '@truongdq01/headless';
import { TextArea } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TextAreaScreen() {
  const t = useTokens();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('This is a preset value with character counter enabled.');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('Error state example');

  return (
    <DemoPage
      title="TextArea"
      description="Multi-line text input for long-form content."
    >
      <DemoSection title="Standard" description="Label, placeholder, and helper text.">
        <TextArea
          label="Notes"
          placeholder="Enter your notes here…"
          value={value1}
          onChangeText={setValue1}
          helperText="No character limit set."
        />
      </DemoSection>

      <DemoSection title="Character Counter" description="Inside or above the field.">
        <TextArea
          label="Description (Inside Counter)"
          placeholder="Tell us about yourself…"
          value={value2}
          onChangeText={setValue2}
          maxLength={100}
          showCounter
          counterPosition="inside"
        />
        <View style={{ height: t.spacing[4] }} />
        <TextArea
          label="Feedback (Above Counter)"
          placeholder="Any suggestions?"
          value={value3}
          onChangeText={setValue3}
          maxLength={50}
          showCounter
          counterPosition="above"
        />
      </DemoSection>

      <DemoSection title="States" description="Error and disabled variants.">
        <TextArea
          label="Error State"
          value={value4}
          onChangeText={setValue4}
          error="Something went wrong while saving your notes."
        />
        <View style={{ height: t.spacing[4] }} />
        <TextArea
          label="Disabled State"
          value="You cannot edit this content."
          disabled
          helperText="This field is read-only."
        />
      </DemoSection>

      <DemoSection title="Height" description="Control min and max lines.">
        <TextArea
          label="Compact (Rows: 2–4)"
          placeholder="Short bio…"
          minLines={2}
          maxLines={4}
        />
        <View style={{ height: t.spacing[4] }} />
        <TextArea
          label="Tall (Rows: 8+)"
          placeholder="Long essay…"
          minLines={8}
          maxLines={12}
        />
      </DemoSection>
    </DemoPage>
  );
}
