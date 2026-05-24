import {
  Divider,
  FormField,
  FormGroup,
  Input,
  Link,
  PasswordInput,
} from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function FormFieldScreen() {
  return (
    <DemoPage
      title="FormField"
      description="Wrap inputs with labels, requirements, and validation messages."
    >
      <DemoSection title="Standard" description="Helper text, errors, and trailing links.">
        <FormField
          label="Display Name"
          helperText="Visible to anyone on the platform"
          required
        >
          <Input placeholder="e.g. John Doe" />
        </FormField>

        <Divider spacing="md" />

        <FormField
          label="Password"
          error="Password is too weak"
          labelTrailing={<Link onPress={() => {}}>Forgot?</Link>}
        >
          <PasswordInput />
        </FormField>
      </DemoSection>

      <DemoSection title="Form Group" description="Stack related fields with consistent gap.">
        <FormGroup gap="md">
          <FormField label="First Name">
            <Input />
          </FormField>
          <FormField label="Last Name">
            <Input />
          </FormField>
        </FormGroup>
      </DemoSection>

      <DemoSection
        title="Grouped (iOS)"
        description="Rounded container for settings-style sections."
      >
        <FormGroup
          variant="grouped"
          footer="These details are only visible to you."
        >
          <FormField label="Phone Number">
            <Input placeholder="+1 (555) 000-0000" />
          </FormField>
          <FormField label="Email">
            <Input placeholder="user@example.com" />
          </FormField>
          <FormField label="Location">
            <Input placeholder="San Francisco, CA" />
          </FormField>
        </FormGroup>
      </DemoSection>

      <DemoSection title="Grouped Validation" description="Group-level error message.">
        <FormGroup variant="grouped" error="Some fields have invalid information">
          <FormField label="Credit Card" error="Invalid number">
            <Input placeholder="XXXX XXXX XXXX XXXX" />
          </FormField>
          <FormField label="Expiry">
            <Input placeholder="MM/YY" />
          </FormField>
        </FormGroup>
      </DemoSection>
    </DemoPage>
  );
}
