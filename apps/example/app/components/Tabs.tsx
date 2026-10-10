import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stack } from '@/components/ui/stack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TabsScreen() {
  const { toast } = useToast();
  const [activeTab1, setActiveTab1] = useState('profile');
  const [accountTab, setAccountTab] = useState('general');

  return (
    <DemoPage
      title="Tabs"
      description="Organize content into categories with a smooth spring sliding indicator and animated content fade."
    >
      <DemoSection
        title="Interactive Navigation Tabs"
        description="Tap any tab to watch the floating pill slide across with spring physics."
        bare
      >
        <Card className="p-5">
          <Tabs value={activeTab1} onValueChange={setActiveTab1}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <View className="p-4 mt-2 rounded-xl bg-muted/40 border border-border gap-2">
                <Text className="text-base font-semibold text-foreground">
                  User Profile View
                </Text>
                <Text variant="muted">
                  Manage your personal information, avatar, and public bio.
                </Text>
              </View>
            </TabsContent>

            <TabsContent value="settings">
              <View className="p-4 mt-2 rounded-xl bg-muted/40 border border-border gap-2">
                <Text className="text-base font-semibold text-foreground">
                  Application Settings
                </Text>
                <Text variant="muted">
                  Configure language, regional preferences, and security options.
                </Text>
              </View>
            </TabsContent>

            <TabsContent value="notifications">
              <View className="p-4 mt-2 rounded-xl bg-muted/40 border border-border gap-2">
                <Text className="text-base font-semibold text-foreground">
                  Notification Center
                </Text>
                <Text variant="muted">
                  Set email digest frequency and instant push alert filters.
                </Text>
              </View>
            </TabsContent>
          </Tabs>
        </Card>
      </DemoSection>

      <DemoSection
        title="Account Preferences Form"
        description="Tabs driving different form cards with clean input bindings."
        bare
      >
        <Card className="p-5">
          <Tabs value={accountTab} onValueChange={setAccountTab}>
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="password">Security</TabsTrigger>
              <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Stack spacing="md" className="mt-3">
                <View className="gap-1.5">
                  <Label>Display Name</Label>
                  <Input defaultValue="Jane Doe" placeholder="Your name" />
                </View>
                <View className="gap-1.5">
                  <Label>Email</Label>
                  <Input defaultValue="jane@example.com" placeholder="Your email" />
                </View>
                <Button onPress={() => toast.success('Profile saved!')}>
                  Save Changes
                </Button>
              </Stack>
            </TabsContent>

            <TabsContent value="password">
              <Stack spacing="md" className="mt-3">
                <View className="gap-1.5">
                  <Label>Current Password</Label>
                  <Input secureTextEntry placeholder="Enter current password" />
                </View>
                <View className="gap-1.5">
                  <Label>New Password</Label>
                  <Input secureTextEntry placeholder="Enter new password" />
                </View>
                <Button onPress={() => toast.success('Password updated!')}>
                  Update Password
                </Button>
              </Stack>
            </TabsContent>
          </Tabs>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
