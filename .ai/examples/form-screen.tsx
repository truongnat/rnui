/**
 * RNUI reference: form screen with validation states
 * Components are registry files copied into the app under components/ui/.
 */
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type SubmitPhase = 'idle' | 'loading' | 'success' | 'error';

export default function FormScreenExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [phase, setPhase] = useState<SubmitPhase>('idle');
  const [fieldError, setFieldError] = useState<string | undefined>();

  const handleSubmit = () => {
    if (!name.trim()) {
      setFieldError('Name is required');
      setPhase('error');
      return;
    }
    if (!consent) {
      setFieldError('Please accept the privacy policy');
      setPhase('error');
      return;
    }

    setFieldError(undefined);
    setPhase('loading');

    setTimeout(() => {
      setPhase('success');
    }, 700);
  };

  return (
    <View className="flex-1">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Stack spacing="lg" className="p-4">
          <Stack spacing="xs">
            <Text variant="h4" accessibilityRole="header">
              Contact us
            </Text>
            <Text variant="muted">
              We typically respond within one business day.
            </Text>
          </Stack>

          {phase === 'success' ? (
            <Alert>
              <AlertDescription>
                Thanks — your message was sent.
              </AlertDescription>
            </Alert>
          ) : null}

          {phase === 'error' && fieldError ? (
            <Alert variant="destructive">
              <AlertDescription>{fieldError}</AlertDescription>
            </Alert>
          ) : null}

          <Stack spacing="md">
            <TextField
              label="Full name"
              required
              error={phase === 'error' && !name ? 'Required' : undefined}
              value={name}
              onChangeText={setName}
              placeholder="Jane Doe"
            />

            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormField>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={message}
                onChangeText={setMessage}
                placeholder="How can we help?"
              />
              <FormDescription>Max 500 characters</FormDescription>
              <FormMessage />
            </FormField>

            <Stack direction="row" spacing="sm" alignItems="center">
              <Checkbox checked={consent} onCheckedChange={setConsent} />
              <Text variant="small" onPress={() => setConsent(!consent)}>
                I agree to the privacy policy
              </Text>
            </Stack>
          </Stack>

          <Button
            className="w-full"
            disabled={phase === 'loading'}
            onPress={handleSubmit}
          >
            {phase === 'loading' ? 'Sending…' : 'Send message'}
          </Button>
        </Stack>
      </ScrollView>
    </View>
  );
}
