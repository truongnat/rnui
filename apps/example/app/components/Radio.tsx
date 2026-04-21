import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioGroup, RadioItem, Divider } from '@truongdq01/ui';
import { useRadioGroup } from '@truongdq01/headless';
import { DemoPage, DemoSection, DemoGroup } from './_shared/DemoPage';

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
      description="Allows the user to select one option from a set of mutually exclusive choices."
    >
      <DemoSection title="Basic Radio Group">
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
              description: '$12/month, unlimited projects, priority support' 
            },
            {
              value: 'enterprise',
              label: 'Enterprise',
              description: 'Custom pricing, dedicated account manager',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Directions & Sizes">
        <DemoGroup label="Horizontal Group (SM)">
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

        <DemoGroup label="Gender Selection">
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

      <DemoSection title="Standalone Radio Items">
        <DemoGroup label="Custom Layout using useRadioGroup hooks">
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
        </DemoGroup>
      </DemoSection>

      <DemoSection title="States">
        <DemoGroup label="Disabled Radio Group">
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
        </DemoGroup>
      </DemoSection>
    </DemoPage>
  );
}

