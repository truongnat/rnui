import { ScrollView, View } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

const STATS = [
  { label: 'Posts', value: '128' },
  { label: 'Followers', value: '4.2k' },
  { label: 'Following', value: '312' },
];

export function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="items-center gap-2 px-6 pb-6 pt-10">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl">TQ</AvatarFallback>
        </Avatar>
        <Text className="text-xl font-semibold text-foreground">Truong DQ</Text>
        <Text className="text-sm text-muted-foreground">@truongdq</Text>
        <View className="mt-1 flex-row gap-2">
          <Badge variant="secondary">Developer</Badge>
          <Badge variant="outline">Hanoi</Badge>
        </View>
        <View className="mt-3 flex-row gap-2">
          <Button size="sm">Follow</Button>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </View>
      </View>
      <Card className="mx-4 mb-6">
        <CardContent className="flex-row justify-around py-4">
          {STATS.map((s, i) => (
            <View key={s.label} className="flex-1 flex-row items-center">
              {i > 0 && <Separator />}
              <View className="flex-1 items-center">
                <Text className="text-lg font-semibold text-foreground">
                  {s.value}
                </Text>
                <Text className="text-xs text-muted-foreground">{s.label}</Text>
              </View>
            </View>
          ))}
        </CardContent>
      </Card>
      <View className="px-4 pb-10">
        <Text className="mb-2 text-sm font-semibold text-foreground">
          About
        </Text>
        <Text className="text-sm leading-5 text-muted-foreground">
          Building RNUI — a shadcn-style component registry for React Native.
        </Text>
      </View>
    </ScrollView>
  );
}
