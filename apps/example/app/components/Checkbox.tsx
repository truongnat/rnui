import { useState } from 'react';
import { Checkbox, Divider } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function CheckboxScreen() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [partialCheck, setPartialCheck] = useState<boolean | 'indeterminate'>(
    'indeterminate',
  );

  return (
    <DemoPage
      title="Checkbox"
      description="Select one or more items from a set."
    >
      <DemoSection title="Basic" description="Label and optional description text.">
        <Checkbox
          label="Basic Checkbox"
          checked={checked1}
          onChange={setChecked1}
        />
        <Divider spacing="md" />
        <Checkbox
          label="With Description"
          description="Helper text to explain the setting."
          checked={checked2}
          onChange={setChecked2}
        />
      </DemoSection>

      <DemoSection title="States" description="Indeterminate and disabled.">
        <Checkbox
          label="Indeterminate"
          description="Child items partially selected"
          checked={partialCheck === true}
          indeterminate={partialCheck === 'indeterminate'}
          onChange={(v) => setPartialCheck(v)}
        />
        <Divider spacing="md" />
        <Checkbox label="Disabled (Checked)" disabled checked onChange={() => {}} />
        <Divider spacing="md" />
        <Checkbox label="Disabled (Unchecked)" disabled checked={false} onChange={() => {}} />
      </DemoSection>
    </DemoPage>
  );
}
