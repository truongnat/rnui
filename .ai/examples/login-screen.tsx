/**
 * RNUI reference: login screen
 * For AI agents — copy patterns, not necessarily file path.
 * Components are registry files copied into the app under components/ui/.
 */
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';

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
      const ok = email === MOCK_VALID_EMAIL && password === MOCK_VALID_PASSWORD;
      if (ok) {
        setPhase('idle');
        // Navigate to home in a real app
        return;
      }
      setPhase('error');
      setErrorMessage(
        'Invalid email or password. Try demo@rnui.dev / password'
      );
    }, 800);
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack
          spacing="lg"
          justifyContent="center"
          className="flex-1 p-6"
        >
          <Stack spacing="sm">
            <Text variant="h3" accessibilityRole="header">
              Welcome back
            </Text>
            <Text variant="muted">Sign in to continue</Text>
          </Stack>

          {phase === 'error' && errorMessage ? (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}

          <Stack spacing="md">
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="password"
            />
          </Stack>

          <Button
            className="w-full"
            disabled={!email || !password || phase === 'loading'}
            onPress={handleSignIn}
          >
            {phase === 'loading' ? 'Signing in…' : 'Sign in'}
          </Button>

          <Text variant="muted" className="text-center text-xs">
            Demo credentials: demo@rnui.dev / password
          </Text>
        </Stack>
      </ScrollView>
    </View>
  );
}
