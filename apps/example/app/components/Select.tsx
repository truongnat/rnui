import { useState } from 'react';
import { View } from 'react-native';
import { Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { COUNTRIES, LARGE_COUNTRIES } from '@/demo/demoData';

export default function SelectScreen() {
  const { toast } = useToast();

  const [country, setCountry] = useState<string | undefined>();
  const [bigCountry, setBigCountry] = useState<string | undefined>();

  return (
    <DemoPage title="Select" description="Choose one item from a list.">
      <DemoSection
        title="Basic Picker"
        description="Standard dropdown for small to medium lists."
      >
        <View className="gap-1.5">
          <Text variant="small" className="text-foreground">
            Country Selection
          </Text>
          <Select
            options={COUNTRIES}
            value={country}
            onValueChange={(v) => {
              setCountry(v);
              toast.info(`Selected: ${v}`);
            }}
            placeholder="Choose a country…"
          />
        </View>
      </DemoSection>

      <DemoSection
        title="Long List"
        description="The modal sheet scrolls for larger datasets."
      >
        <Select
          options={LARGE_COUNTRIES.slice(0, 30)}
          value={bigCountry}
          onValueChange={setBigCountry}
          placeholder="Pick a country…"
        />
      </DemoSection>

      <DemoSection title="Disabled" description="Non-interactive trigger.">
        <Select
          options={COUNTRIES}
          value={country}
          placeholder="Disabled…"
          disabled
        />
      </DemoSection>
    </DemoPage>
  );
}
