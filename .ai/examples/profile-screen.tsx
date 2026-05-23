/**
 * RNUI reference: profile screen
 */
import { ScrollView } from 'react-native';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Toolbar,
  Typography,
} from '@truongdq01/ui';

const MOCK_USER = {
  name: 'Alex Nguyen',
  handle: '@alex.nguyen',
  bio: 'Mobile developer building with RNUI.',
  posts: 24,
  followers: 1280,
};

export default function ProfileScreenExample() {
  return (
    <Box flex={1}>
      <AppBar>
        <Toolbar>
          <AppBarTitle>Profile</AppBarTitle>
        </Toolbar>
      </AppBar>

      <ScrollView>
        <Stack spacing="lg" style={{ padding: 16 }}>
          <Stack direction="row" spacing="md" alignItems="center">
            <Avatar initials="AN" size="xl" status="online" accessibilityLabel="Alex Nguyen avatar" />
            <Stack spacing="xs" style={{ flex: 1 }}>
              <Typography variant="h6">{MOCK_USER.name}</Typography>
              <Typography variant="body2" color="secondary">
                {MOCK_USER.handle}
              </Typography>
            </Stack>
          </Stack>

          <Card padding="md">
            <Typography variant="body1">{MOCK_USER.bio}</Typography>
          </Card>

          <Stack direction="row" spacing="md">
            <Card padding="md" style={{ flex: 1 }}>
              <Typography variant="h5">{MOCK_USER.posts}</Typography>
              <Typography variant="caption" color="secondary">
                Posts
              </Typography>
            </Card>
            <Card padding="md" style={{ flex: 1 }}>
              <Typography variant="h5">{MOCK_USER.followers}</Typography>
              <Typography variant="caption" color="secondary">
                Followers
              </Typography>
            </Card>
          </Stack>

          <Button label="Edit profile" variant="outline" fullWidth onPress={() => {}} />
        </Stack>
      </ScrollView>
    </Box>
  );
}
