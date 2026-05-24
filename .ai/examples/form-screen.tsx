/**
 * RNUI reference: form screen with validation states
 */
import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormField,
  Input,
  Stack,
  TextArea,
  Typography,
} from '@truongdq01/ui';

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
    <Box flex={1}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Stack spacing="lg" style={{ padding: 16 }}>
          <Stack spacing="xs">
            <Typography variant="h5" as="h1">
              Contact us
            </Typography>
            <Typography variant="body2" color="secondary">
              We typically respond within one business day.
            </Typography>
          </Stack>

          {phase === 'success' ? (
            <Alert severity="success">
              <Typography variant="body2">
                Thanks — your message was sent.
              </Typography>
            </Alert>
          ) : null}

          {phase === 'error' && fieldError ? (
            <Alert severity="error">
              <Typography variant="body2">{fieldError}</Typography>
            </Alert>
          ) : null}

          <Stack spacing="md">
            <FormField label="Full name" required error={phase === 'error' && !name ? 'Required' : undefined}>
              <Input value={name} onChange={setName} placeholder="Jane Doe" />
            </FormField>

            <FormField label="Email">
              <Input
                value={email}
                onChange={setEmail}
                placeholder="jane@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormField>

            <FormField label="Message" helperText="Max 500 characters">
              <TextArea value={message} onChangeText={setMessage} placeholder="How can we help?" />
            </FormField>

            <Checkbox
              label="I agree to the privacy policy"
              checked={consent}
              onChange={setConsent}
            />
          </Stack>

          <Button
            label="Send message"
            fullWidth
            loading={phase === 'loading'}
            onPress={handleSubmit}
          />
        </Stack>
      </ScrollView>
    </Box>
  );
}
