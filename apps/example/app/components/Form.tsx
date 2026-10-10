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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

/** Reads FormFieldContext — helper text hides while the field has an error. */
function PasswordHint() {
  const field = useFormField();
  return field.error ? null : (
    <FormDescription>Minimum 8 characters with a letter & number.</FormDescription>
  );
}

export default function FormScreen() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    subscribe: true,
    notifications: false,
    termsAccepted: true,
  });
  const [plan, setPlan] = useState('one');
  const [submitted, setSubmitted] = useState(false);

  const passwordError =
    formData.password.length > 0 && formData.password.length < 8
      ? 'Password must be at least 8 characters long'
      : undefined;

  const termsError =
    submitted && !formData.termsAccepted
      ? 'You must accept the terms of service'
      : undefined;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!formData.username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!formData.termsAccepted) {
      toast.error('Please accept the terms to continue');
      return;
    }
    toast.success('Account profile updated successfully!');
  };

  return (
    <DemoPage
      title="Form Components"
      description="Form fields with clean labels, helper descriptions, validation states & focus rings."
    >
      <DemoSection
        title="Account Profile"
        description="Structured input fields with live validation, helper text, and multiline bio."
        bare
      >
        <Card className="p-5 border-border">
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
                Your public profile handle visible to other members.
              </FormDescription>
            </FormField>

            <FormField>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(v) => setFormData((d) => ({ ...d, email: v }))}
              />
              <FormDescription>We will only use this for security and receipt alerts.</FormDescription>
            </FormField>

            <FormField error={passwordError}>
              <View className="flex-row items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link onPress={() => toast.info('Password reset link sent')}>
                  Forgot?
                </Link>
              </View>
              <Input
                placeholder="Enter a secure password"
                secureTextEntry
                value={formData.password}
                onChangeText={(v) =>
                  setFormData((d) => ({ ...d, password: v }))
                }
              />
              <PasswordHint />
              <FormMessage />
            </FormField>

            <FormField>
              <FormLabel>About You (Bio)</FormLabel>
              <Textarea
                placeholder="Tell us a little bit about yourself, interests or experience..."
                value={formData.bio}
                onChangeText={(v) => setFormData((d) => ({ ...d, bio: v }))}
              />
              <FormDescription>Brief description for your team profile.</FormDescription>
            </FormField>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Disabled Field"
        description="Read-only field with muted visual styling."
        bare
      >
        <Card className="p-5">
          <FormField>
            <FormLabel>Account ID</FormLabel>
            <Input value="usr_92837482" disabled />
            <FormDescription>System-generated ID assigned during sign up.</FormDescription>
          </FormField>
        </Card>
      </DemoSection>

      <DemoSection
        title="Notification Preferences"
        description="Switch toggles paired with clear descriptions."
        bare
      >
        <Card className="p-5">
          <Stack spacing="md">
            <Pressable
              onPress={() =>
                setFormData((d) => ({ ...d, subscribe: !d.subscribe }))
              }
              className="flex-row items-center justify-between gap-3 active:opacity-75"
            >
              <View className="flex-1 gap-0.5">
                <Text className="text-sm font-semibold text-foreground">
                  Product Updates
                </Text>
                <Text variant="muted">Receive occasional news about releases</Text>
              </View>
              <Switch
                checked={formData.subscribe}
                onCheckedChange={(v) =>
                  setFormData((d) => ({ ...d, subscribe: v }))
                }
              />
            </Pressable>

            <Separator />

            <Pressable
              onPress={() =>
                setFormData((d) => ({ ...d, notifications: !d.notifications }))
              }
              className="flex-row items-center justify-between gap-3 active:opacity-75"
            >
              <View className="flex-1 gap-0.5">
                <Text className="text-sm font-semibold text-foreground">
                  Push Notifications
                </Text>
                <Text variant="muted">Real-time alerts for incoming activity</Text>
              </View>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(v) =>
                  setFormData((d) => ({ ...d, notifications: v }))
                }
              />
            </Pressable>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Plan Selection"
        description="Single-selection radio group with custom card tiles."
        bare
      >
        <Card className="p-5">
          <FormField>
            <FormLabel>Billing Plan</FormLabel>
            <RadioGroup value={plan} onValueChange={setPlan} className="gap-3 mt-1">
              {[
                { value: 'one', title: 'Starter Tier', desc: 'Free forever for personal projects' },
                { value: 'two', title: 'Pro Plan ($12/mo)', desc: 'Unlimited teams and priority deployment' },
                { value: 'three', title: 'Enterprise', desc: 'Custom security SLAs and dedicated support' },
              ].map((opt) => (
                <Pressable
                  key={opt.value}
                  className="flex-row items-start gap-3 p-3 rounded-xl border border-border bg-background active:bg-accent/40"
                  onPress={() => setPlan(opt.value)}
                >
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <View className="flex-1 gap-0.5">
                    <Text className="text-sm font-semibold text-foreground">
                      {opt.title}
                    </Text>
                    <Text variant="muted">{opt.desc}</Text>
                  </View>
                </Pressable>
              ))}
            </RadioGroup>
          </FormField>
        </Card>
      </DemoSection>

      <DemoSection
        title="Terms & Consent"
        description="Checkbox verification with conditional error message."
        bare
      >
        <Card className="p-5">
          <FormField error={termsError}>
            <Pressable
              onPress={() =>
                setFormData((d) => ({ ...d, termsAccepted: !d.termsAccepted }))
              }
              className="flex-row items-start gap-3 active:opacity-75"
            >
              <Checkbox
                checked={formData.termsAccepted}
                onCheckedChange={(v) =>
                  setFormData((d) => ({ ...d, termsAccepted: v }))
                }
                style={{ marginTop: 2 }}
              />
              <View className="flex-1 gap-0.5">
                <Text className="text-sm font-semibold text-foreground">
                  I agree to the Terms of Service & Privacy Policy
                </Text>
                <Text variant="muted">
                  Required to maintain an active registered developer account.
                </Text>
              </View>
            </Pressable>
            <FormMessage />
          </FormField>
        </Card>
      </DemoSection>

      <DemoSection title="Submit Form" bare>
        <Button className="w-full h-12 rounded-xl" onPress={handleSubmit}>
          Save Profile Changes
        </Button>
      </DemoSection>
    </DemoPage>
  );
}
