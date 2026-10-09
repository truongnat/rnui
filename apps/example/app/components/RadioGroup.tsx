import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoGroup, DemoSection } from '@/demo/DemoPage';

function RadioOption({
  value,
  label,
  description,
  disabled,
  onSelect,
}: {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onSelect?.(value)}
      className="flex-row items-start gap-3"
    >
      <RadioGroupItem value={value} disabled={disabled} />
      <View className="flex-1">
        <Text
          className={`text-sm font-medium ${disabled ? 'text-muted-foreground' : 'text-foreground'}`}
        >
          {label}
        </Text>
        {description ? (
          <Text className="text-sm text-muted-foreground">{description}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function RadioScreen() {
  const [plan, setPlan] = useState('pro');
  const [gender, setGender] = useState('m');
  const [choice, setChoice] = useState('one');

  return (
    <DemoPage
      title="Radio"
      description="Select one option from mutually exclusive choices."
    >
      <DemoSection
        title="Radio Group"
        description="Vertical list with descriptions."
      >
        <RadioGroup value={plan} onValueChange={setPlan}>
          <RadioOption
            value="free"
            label="Free"
            description="Up to 3 projects, community support"
            onSelect={setPlan}
          />
          <RadioOption
            value="pro"
            label="Pro"
            description="$12/month, unlimited projects, priority support"
            onSelect={setPlan}
          />
          <RadioOption
            value="enterprise"
            label="Enterprise"
            description="Custom pricing, dedicated account manager"
            onSelect={setPlan}
          />
        </RadioGroup>
      </DemoSection>

      <DemoSection
        title="Direction"
        description="Horizontal layout for compact choices."
      >
        <DemoGroup label="Plan">
          <RadioGroup
            value={plan}
            onValueChange={setPlan}
            className="flex-row gap-4"
          >
            <RadioOption value="free" label="Free" onSelect={setPlan} />
            <RadioOption value="pro" label="Pro" onSelect={setPlan} />
            <RadioOption value="enterprise" label="Ent." onSelect={setPlan} />
          </RadioGroup>
        </DemoGroup>

        <DemoGroup label="Gender">
          <RadioGroup
            value={gender}
            onValueChange={setGender}
            className="flex-row gap-4"
          >
            <RadioOption value="m" label="Male" onSelect={setGender} />
            <RadioOption value="f" label="Female" onSelect={setGender} />
            <RadioOption value="o" label="Other" onSelect={setGender} />
          </RadioGroup>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Custom Layout"
        description="Items placed in a card-style row."
      >
        <RadioGroup
          value={choice}
          onValueChange={setChoice}
          className="flex-row gap-2"
        >
          <Pressable
            onPress={() => setChoice('one')}
            className={`flex-1 items-center gap-2 rounded-md border p-4 ${
              choice === 'one' ? 'border-primary' : 'border-border'
            }`}
          >
            <RadioGroupItem value="one" />
            <Text className="text-sm font-medium text-foreground">
              Option One
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setChoice('two')}
            className={`flex-1 items-center gap-2 rounded-md border p-4 ${
              choice === 'two' ? 'border-primary' : 'border-border'
            }`}
          >
            <RadioGroupItem value="two" />
            <Text className="text-sm font-medium text-foreground">
              Option Two
            </Text>
          </Pressable>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Disabled">
        <RadioGroup value="fixed">
          <RadioOption value="fixed" label="Fixed Option" disabled />
          <RadioOption value="other" label="Other Option" disabled />
        </RadioGroup>
      </DemoSection>
    </DemoPage>
  );
}
