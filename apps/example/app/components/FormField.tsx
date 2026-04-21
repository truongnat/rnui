import React from 'react';
import { 
  FormField, 
  FormGroup, 
  Input, 
  PasswordInput,
  Typography, 
  Divider,
  Icon,
  Link
} from '@truongdq01/ui';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function FormFieldScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="FormField"
      description="A higher-level component that wraps inputs with consistent label row, requirement indicators, and validation messages."
    >
      <DemoSection title="Standard Form Fields">
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
          labelTrailing={
            <Link size="sm" onPress={() => {}}>Forgot?</Link>
          }
        >
          <PasswordInput />
        </FormField>
      </DemoSection>

      <DemoSection title="Standard Form Group">
        <FormGroup gap="md">
          <FormField label="First Name">
            <Input />
          </FormField>
          <FormField label="Last Name">
            <Input />
          </FormField>
        </FormGroup>
      </DemoSection>

      <DemoSection title="Grouped Variant (iOS Style)">
        <Typography variant="caption" style={{ marginBottom: 8, color: t.color.text.secondary }}>
          Useful for settings or profile sections
        </Typography>
        <FormGroup variant="grouped" footer="These details are only visible to you.">
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

      <DemoSection title="Grouped with Validation">
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

const styles = StyleSheet.create({});
