import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';

export function LoginScreen() {
  const [remember, setRemember] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <View className="gap-1.5">
            <Label>Email</Label>
            <Input
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="gap-1.5">
            <Label>Password</Label>
            <Input placeholder="••••••••" secureTextEntry />
          </View>
          <View className="flex-row items-center gap-2">
            <Checkbox checked={remember} onCheckedChange={setRemember} />
            <Label onPress={() => setRemember(!remember)}>Remember me</Label>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full">Sign in</Button>
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
          <Text variant="muted" className="text-center">
            Don&apos;t have an account? Sign up
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
