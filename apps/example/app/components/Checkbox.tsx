import React, { useState } from 'react';
import { Checkbox, Divider } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function CheckboxScreen() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [partialCheck, setPartialCheck] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <DemoPage 
      title="Checkbox" 
      description="Selection controls that allow the user to select one or more items from a set."
    >
      <DemoSection title="Basic Examples">
        <Checkbox
          label="Basic Checkbox"
          checked={checked1}
          onChange={setChecked1}
        />
        <Divider spacing="md" />
        <Checkbox
          label="Checkbox with Description"
          description="This is a helper text to explain the setting."
          checked={checked2}
          onChange={setChecked2}
        />
      </DemoSection>

      <DemoSection title="States">
        <Checkbox
          label="Indeterminate State"
          description="Used when child items are partially selected"
          checked={partialCheck === true}
          indeterminate={partialCheck === 'indeterminate'}
          onChange={(v) => setPartialCheck(v)}
        />
        <Divider spacing="md" />
        <Checkbox
          label="Disabled Checkbox"
          disabled
          checked={true}
          onChange={() => {}}
        />
        <Divider spacing="md" />
        <Checkbox
          label="Disabled (Unchecked)"
          disabled
          checked={false}
          onChange={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}

