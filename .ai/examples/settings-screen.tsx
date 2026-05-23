/**
 * RNUI reference: settings screen
 */
import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AppBar,
  AppBarTitle,
  Box,
  List,
  ListItem,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@truongdq01/ui';

export default function SettingsScreenExample() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <Box flex={1}>
      <AppBar>
        <Toolbar>
          <AppBarTitle>Settings</AppBarTitle>
        </Toolbar>
      </AppBar>

      <ScrollView>
        <Stack spacing="md" style={{ paddingVertical: 16 }}>
          <Typography variant="overline" color="secondary" style={{ paddingHorizontal: 16 }}>
            Notifications
          </Typography>
          <List>
            <ListItem
              label="Push notifications"
              secondaryAction={
                <Switch on={pushEnabled} onChange={setPushEnabled} />
              }
            />
            <ListItem
              label="Weekly email digest"
              secondaryAction={
                <Switch on={emailDigest} onChange={setEmailDigest} />
              }
            />
            <ListItem
              label="Product updates"
              secondaryAction={
                <Switch on={marketing} onChange={setMarketing} />
              }
            />
          </List>

          <Typography variant="overline" color="secondary" style={{ paddingHorizontal: 16 }}>
            Account
          </Typography>
          <List>
            <ListItem label="Edit profile" onPress={() => {}} />
            <ListItem label="Privacy & security" onPress={() => {}} />
            <ListItem label="Sign out" onPress={() => {}} />
          </List>
        </Stack>
      </ScrollView>
    </Box>
  );
}
