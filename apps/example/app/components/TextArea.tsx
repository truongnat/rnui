import { useTokens } from '@truongdq01/headless';
import { TextArea, Typography } from '@truongdq01/ui';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function TextAreaScreen() {
  const t = useTokens();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('This is a preset value with character counter enabled.');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('Error state example');

  return (
    <DemoPage
      title="TextArea"
      description="A multi-line text input component for long-form content."
    >
      <DemoSection
        title="Standard TextArea"
        description="Default multi-line input with label and placeholder."
      >
        <TextArea
          label="Notes"
          placeholder="Enter your notes here..."
          value={value1}
          onChangeText={setValue1}
          helperText="Maximum allowed characters is not set."
        />
      </DemoSection>

      <DemoSection
        title="Character Counter"
        description="Show a counter inside, above, or below the text field."
      >
        <TextArea
          label="Description (Inside Counter)"
          placeholder="Tell us about yourself..."
          value={value2}
          onChangeText={setValue2}
          maxLength={100}
          showCounter={true}
          counterPosition="inside"
        />
        <View style={{ height: t.spacing[4] }} />
        <TextArea
          label="Feedback (Above Counter)"
          placeholder="Any suggestions?"
          value={value3}
          onChangeText={setValue3}
          maxLength={50}
          showCounter={true}
          counterPosition="above"
        />
      </DemoSection>

      <DemoSection
        title="States"
        description="Visual feedback for error, disabled, and focus states."
      >
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

      <DemoSection
        title="Height Options"
        description="Control the minimum and maximum lines of the text area."
      >
        <TextArea
          label="Compact (Rows: 2-4)"
          placeholder="Short bio..."
          minLines={2}
          maxLines={4}
        />
        <View style={{ height: t.spacing[4] }} />
        <TextArea
          label="Tall (Rows: 8+)"
          placeholder="Long essay..."
          minLines={8}
          maxLines={12}
        />
      </DemoSection>
    </DemoPage>
  );
}

import { View } from 'react-native';
