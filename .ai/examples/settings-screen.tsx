/**
 * RNUI reference: settings screen
 * Components are registry files copied into the app under components/ui/.
 */
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppBar, AppBarTitle } from '@/components/ui/app-bar';
import { List, ListSectionTitle } from '@/components/ui/list';
import { ListItem } from '@/components/ui/list-item';
import { Stack } from '@/components/ui/stack';
import { Switch } from '@/components/ui/switch';

export default function SettingsScreenExample() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <View className="flex-1">
      <AppBar>
        <AppBarTitle>Settings</AppBarTitle>
      </AppBar>

      <ScrollView>
        <Stack spacing={0} className="py-4">
          <ListSectionTitle>Notifications</ListSectionTitle>
          <List>
            <ListItem
              title="Push notifications"
              chevron={false}
              trailing={
                <Switch
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                />
              }
            />
            <ListItem
              title="Weekly email digest"
              chevron={false}
              trailing={
                <Switch
                  checked={emailDigest}
                  onCheckedChange={setEmailDigest}
                />
              }
            />
            <ListItem
              title="Product updates"
              chevron={false}
              trailing={
                <Switch checked={marketing} onCheckedChange={setMarketing} />
              }
            />
          </List>

          <ListSectionTitle>Account</ListSectionTitle>
          <List>
            <ListItem title="Edit profile" onPress={() => {}} />
            <ListItem title="Privacy & security" onPress={() => {}} />
            <ListItem title="Sign out" onPress={() => {}} />
          </List>
        </Stack>
      </ScrollView>
    </View>
  );
}
