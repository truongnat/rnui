import { useState } from 'react';
import { RadioGroup, RadioItem } from '@truongdq01/ui';
import { useRadioGroup } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from '@/demo/DemoPage';

export default function RadioScreen() {
  const [plan, setPlan] = useState('pro');
  const [gender, setGender] = useState('m');
  const [standaloneRadio, setStandaloneRadio] = useState('one');

  const standaloneRadioGroup = useRadioGroup({
    value: standaloneRadio,
    onChange: (v) => setStandaloneRadio(v as string),
  });

  return (
    <DemoPage
      title="Radio"
      description="Select one option from mutually exclusive choices."
    >
      <DemoSection title="Radio Group" description="Vertical list with descriptions.">
        <RadioGroup
          label="Subscription Plan"
          value={plan}
          onChange={(v) => setPlan(v as string)}
          options={[
            {
              value: 'free',
              label: 'Free',
              description: 'Up to 3 projects, community support',
            },
            {
              value: 'pro',
              label: 'Pro',
              description: '$12/month, unlimited projects, priority support',
            },
            {
              value: 'enterprise',
              label: 'Enterprise',
              description: 'Custom pricing, dedicated account manager',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Direction & Size" description="Horizontal layout and compact density.">
        <DemoGroup label="Horizontal (SM)">
          <RadioGroup
            direction="horizontal"
            value={plan}
            onChange={(v) => setPlan(v as string)}
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'enterprise', label: 'Ent.' },
            ]}
            size="sm"
          />
        </DemoGroup>

        <DemoGroup label="Gender">
          <RadioGroup
            direction="horizontal"
            value={gender}
            onChange={(v) => setGender(v as string)}
            options={[
              { value: 'm', label: 'Male' },
              { value: 'f', label: 'Female' },
              { value: 'o', label: 'Other' },
            ]}
            size="sm"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Standalone Items" description="Custom layout with useRadioGroup.">
        <DemoGroup direction="row">
          <RadioItem
            value="one"
            label="Option One"
            isSelected={standaloneRadioGroup.isSelected('one')}
            onPress={standaloneRadioGroup.getItemProps('one').onPress}
            size="md"
          />
          <RadioItem
            value="two"
            label="Option Two"
            isSelected={standaloneRadioGroup.isSelected('two')}
            onPress={standaloneRadioGroup.getItemProps('two').onPress}
            size="md"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Disabled">
        <RadioGroup
          label="Locked Selection"
          disabled
          value="fixed"
          onChange={() => {}}
          options={[
            { value: 'fixed', label: 'Fixed Option' },
            { value: 'other', label: 'Other Option' },
          ]}
        />
      </DemoSection>
    </DemoPage>
  );
}
