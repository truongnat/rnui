/**
 * RNUI reference: login screen
 * For AI agents — copy patterns, not necessarily file path.
 */
import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Alert,
  Box,
  Button,
  Input,
  Stack,
  Typography,
} from '@truongdq01/ui';

type AuthPhase = 'idle' | 'loading' | 'error';

const MOCK_VALID_EMAIL = 'demo@rnui.dev';
const MOCK_VALID_PASSWORD = 'password';

export default function LoginScreenExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phase, setPhase] = useState<AuthPhase>('idle');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSignIn = () => {
    setPhase('loading');
    setErrorMessage(undefined);

    setTimeout(() => {
      const ok =
        email === MOCK_VALID_EMAIL && password === MOCK_VALID_PASSWORD;
      if (ok) {
        setPhase('idle');
        // Navigate to home in a real app
        return;
      }
      setPhase('error');
      setErrorMessage('Invalid email or password. Try demo@rnui.dev / password');
    }, 800);
  };

  return (
    <Box flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack spacing="lg" style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          <Stack spacing="sm">
            <Typography variant="h4" as="h1">
              Welcome back
            </Typography>
            <Typography variant="body2" color="secondary">
              Sign in to continue
            </Typography>
          </Stack>

          {phase === 'error' && errorMessage ? (
            <Alert severity="error" onClose={() => setPhase('idle')}>
              {errorMessage}
            </Alert>
          ) : null}

          <Stack spacing="md">
            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="password"
            />
          </Stack>

          <Button
            label="Sign in"
            fullWidth
            loading={phase === 'loading'}
            disabled={!email || !password}
            onPress={handleSignIn}
          />

          <Typography variant="caption" color="secondary" align="center">
            Demo credentials: demo@rnui.dev / password
          </Typography>
        </Stack>
      </ScrollView>
    </Box>
  );
}
