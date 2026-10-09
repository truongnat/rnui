import { useState } from 'react';
import { View } from 'react-native';
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TextAreaScreen() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState(
    'This is a preset value with character counter enabled.'
  );
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('Error state example');

  return (
    <DemoPage
      title="TextArea"
      description="Multi-line text input for long-form content."
    >
      <DemoSection
        title="Standard"
        description="Label, placeholder, and helper text."
      >
        <FormField>
          <FormLabel>Notes</FormLabel>
          <Textarea
            placeholder="Enter your notes here…"
            value={value1}
            onChangeText={setValue1}
          />
          <FormDescription>No character limit set.</FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="Character Counter"
        description="Counters placed inside or below the field."
      >
        <FormField>
          <FormLabel>Description</FormLabel>
          <View>
            <Textarea
              placeholder="Tell us about yourself…"
              value={value2}
              onChangeText={setValue2}
              maxLength={100}
              className="pb-6"
            />
            <View className="absolute bottom-2 right-3">
              <Text className="text-xs text-muted-foreground">
                {value2.length}/100
              </Text>
            </View>
          </View>
        </FormField>
        <View className="h-4" />
        <FormField>
          <View className="flex-row items-baseline justify-between">
            <FormLabel>Feedback</FormLabel>
            <Text className="text-xs text-muted-foreground">
              {value3.length}/50
            </Text>
          </View>
          <Textarea
            placeholder="Any suggestions?"
            value={value3}
            onChangeText={setValue3}
            maxLength={50}
          />
        </FormField>
      </DemoSection>

      <DemoSection title="States" description="Error and disabled variants.">
        <FormField error="Something went wrong while saving your notes.">
          <FormLabel>Error State</FormLabel>
          <Textarea value={value4} onChangeText={setValue4} />
          <FormMessage />
        </FormField>
        <View className="h-4" />
        <FormField>
          <FormLabel>Disabled State</FormLabel>
          <Textarea value="You cannot edit this content." disabled />
          <FormDescription>This field is read-only.</FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection title="Height" description="Control min and max lines.">
        <FormField>
          <FormLabel>Compact (Rows: 2–4)</FormLabel>
          <Textarea
            placeholder="Short bio…"
            style={{ minHeight: 60, maxHeight: 100 }}
          />
        </FormField>
        <View className="h-4" />
        <FormField>
          <FormLabel>Tall (Rows: 8+)</FormLabel>
          <Textarea
            placeholder="Long essay…"
            style={{ minHeight: 180, maxHeight: 280 }}
          />
        </FormField>
      </DemoSection>
    </DemoPage>
  );
}
