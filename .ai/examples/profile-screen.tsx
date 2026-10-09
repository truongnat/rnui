/**
 * RNUI reference: profile screen
 * Components are registry files copied into the app under components/ui/.
 */
import { ScrollView, View } from 'react-native';
import { AppBar, AppBarTitle } from '@/components/ui/app-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

const MOCK_USER = {
  name: 'Alex Nguyen',
  handle: '@alex.nguyen',
  bio: 'Mobile developer building with RNUI.',
  posts: 24,
  followers: 1280,
};

export default function ProfileScreenExample() {
  return (
    <View className="flex-1">
      <AppBar>
        <AppBarTitle>Profile</AppBarTitle>
      </AppBar>

      <ScrollView>
        <Stack spacing="lg" className="p-4">
          <Stack direction="row" spacing="md" alignItems="center">
            <Avatar
              className="h-16 w-16"
              accessibilityLabel="Alex Nguyen avatar"
            >
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Stack spacing="xs" className="flex-1">
              <Text variant="large">{MOCK_USER.name}</Text>
              <Text variant="muted">{MOCK_USER.handle}</Text>
            </Stack>
          </Stack>

          <Card>
            <CardContent className="p-4">
              <Text variant="p">{MOCK_USER.bio}</Text>
            </CardContent>
          </Card>

          <Stack direction="row" spacing="md">
            <Card className="flex-1">
              <CardContent className="p-4">
                <Text variant="h4">{MOCK_USER.posts}</Text>
                <Text variant="muted">Posts</Text>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="p-4">
                <Text variant="h4">{MOCK_USER.followers}</Text>
                <Text variant="muted">Followers</Text>
              </CardContent>
            </Card>
          </Stack>

          <Button variant="outline" className="w-full" onPress={() => {}}>
            Edit profile
          </Button>
        </Stack>
      </ScrollView>
    </View>
  );
}
