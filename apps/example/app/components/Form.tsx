import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

/** Reads FormFieldContext — helper text hides while the field has an error. */
function PasswordHint() {
  const field = useFormField();
  return field.error ? null : (
    <FormDescription>Minimum 8 characters.</FormDescription>
  );
}

export default function FormScreen() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    subscribe: true,
    notifications: false,
    termsAccepted: false,
  });
  const [plan, setPlan] = useState('one');

  const passwordError =
    formData.password.length > 0 && formData.password.length < 8
      ? 'Password is too weak'
      : undefined;

  return (
    <DemoPage
      title="Form Components"
      description="FormField wires labels, descriptions, and errors to controls through context."
    >
      <DemoSection
        title="Account Details"
        description="FormField + label/description/message around each input."
        bare
      >
        <Card className="p-4">
          <Stack spacing="lg">
            <FormField>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="e.g. janesmith"
                value={formData.username}
                onChangeText={(v) =>
                  setFormData((d) => ({ ...d, username: v }))
                }
              />
              <FormDescription>
                Visible to anyone on the platform.
              </FormDescription>
            </FormField>
            <FormField>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="email@example.com"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(v) => setFormData((d) => ({ ...d, email: v }))}
              />
              <FormDescription>We will never share your email.</FormDescription>
            </FormField>
            <FormField error={passwordError}>
              <View className="flex-row items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link onPress={() => {}}>Forgot?</Link>
              </View>
              <Input
                placeholder="Enter password"
                secureTextEntry
                value={formData.password}
                onChangeText={(v) =>
                  setFormData((d) => ({ ...d, password: v }))
                }
              />
              <PasswordHint />
              <FormMessage />
            </FormField>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Disabled Field"
        description="The field dims and blocks editing; the description explains why."
        bare
      >
        <Card className="p-4">
          <FormField>
            <FormLabel>Username</FormLabel>
            <Input value="truongdang" disabled />
            <FormDescription>This field cannot be changed.</FormDescription>
          </FormField>
        </Card>
      </DemoSection>

      <DemoSection
        title="Preferences"
        description="Control labels pair Switch and Checkbox with descriptive text."
        bare
      >
        <Card className="p-4">
          <Stack spacing="md">
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">
                  Email Subscription
                </Text>
                <Text variant="muted">Receive weekly product updates</Text>
              </View>
              <Switch
                checked={formData.subscribe}
                onCheckedChange={(v) =>
                  setFormData((d) => ({ ...d, subscribe: v }))
                }
              />
            </View>
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">
                  Push Notifications
                </Text>
                <Text variant="muted">Real-time alerts for system events</Text>
              </View>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(v) =>
                  setFormData((d) => ({ ...d, notifications: v }))
                }
              />
            </View>
            <Separator />
            <FormField
              error={
                formData.termsAccepted
                  ? undefined
                  : 'You must accept the terms to continue'
              }
            >
              <View className="flex-row items-center gap-2">
                <Checkbox
                  checked={formData.termsAccepted}
                  onCheckedChange={(v) =>
                    setFormData((d) => ({ ...d, termsAccepted: v }))
                  }
                />
                <Text className="text-sm text-foreground">
                  I agree to the Terms of Service
                </Text>
              </View>
              <FormMessage />
            </FormField>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Radio Group"
        description="RadioGroup shares value through context; items stay unlabeled primitives."
      >
        <FormField>
          <FormLabel>Subscription Plan</FormLabel>
          <RadioGroup value={plan} onValueChange={setPlan}>
            {[
              { value: 'one', label: 'Free Tier' },
              { value: 'two', label: 'Pro ($10/mo)' },
              { value: 'three', label: 'Enterprise' },
            ].map((opt) => (
              <Pressable
                key={opt.value}
                className="flex-row items-center gap-2"
                onPress={() => setPlan(opt.value)}
              >
                <RadioGroupItem value={opt.value} />
                <Text className="text-sm text-foreground">{opt.label}</Text>
              </Pressable>
            ))}
          </RadioGroup>
          <FormDescription>
            Billed monthly; switch plans anytime.
          </FormDescription>
        </FormField>
      </DemoSection>

      <DemoSection
        title="Grouped (iOS)"
        description="Rounded card with borderless inputs for settings-style sections."
        bare
      >
        <Card>
          {[
            { label: 'Phone', placeholder: '+1 (555) 000-0000' },
            { label: 'Email', placeholder: 'user@example.com' },
            { label: 'Location', placeholder: 'San Francisco, CA' },
          ].map((field, i) => (
            <View key={field.label}>
              {i > 0 && <Separator className="ml-4" />}
              <FormField className="flex-row items-center gap-3 px-4">
                <FormLabel className="w-20">{field.label}</FormLabel>
                <Input
                  className="h-11 flex-1 border-0 bg-transparent px-0"
                  placeholder={field.placeholder}
                />
              </FormField>
            </View>
          ))}
        </Card>
        <Text variant="muted" className="mt-2 px-4">
          These details are only visible to you.
        </Text>
      </DemoSection>

      <DemoSection title="Submit" bare>
        <Button
          className="w-full"
          disabled={!formData.termsAccepted}
          onPress={() => toast.success('Form submitted successfully!')}
        >
          Save Changes
        </Button>
      </DemoSection>
    </DemoPage>
  );
}
