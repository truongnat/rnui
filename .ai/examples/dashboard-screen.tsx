/**
 * RNUI reference: dashboard screen (loading / success states)
 * Components are registry files copied into the app under components/ui/.
 */
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppBar, AppBarSubtitle, AppBarTitle } from '@/components/ui/app-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Grid, GridItem } from '@/components/ui/grid';
import { Skeleton } from '@/components/ui/skeleton';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

type DashboardPhase = 'loading' | 'success';

const MOCK_METRICS = [
  { label: 'Active users', value: '1,284', change: '+12%' },
  { label: 'Revenue', value: '$8,420', change: '+4%' },
  { label: 'Sessions', value: '3,902', change: '+8%' },
  { label: 'Churn', value: '2.1%', change: '-0.3%' },
];

export default function DashboardScreenExample() {
  const [phase, setPhase] = useState<DashboardPhase>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('success'), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1">
      <AppBar>
        <View>
          <AppBarTitle>Dashboard</AppBarTitle>
          <AppBarSubtitle>Today</AppBarSubtitle>
        </View>
      </AppBar>

      <ScrollView>
        <Stack spacing="lg" className="p-4">
          <Stack direction="row" spacing="sm" alignItems="center">
            <Text variant="h4">Good morning</Text>
            <Badge variant="secondary">Live</Badge>
          </Stack>

          {phase === 'loading' ? (
            <Stack spacing="md">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-30 w-full rounded-lg" />
            </Stack>
          ) : (
            <>
              <Grid columns={2} gap="md">
                {MOCK_METRICS.map((metric) => (
                  <GridItem key={metric.label} span={1}>
                    <Card>
                      <CardContent className="p-4">
                        <Text variant="muted">{metric.label}</Text>
                        <Text variant="h4">{metric.value}</Text>
                        <Text variant="small" className="text-primary">
                          {metric.change}
                        </Text>
                      </CardContent>
                    </Card>
                  </GridItem>
                ))}
              </Grid>

              <Card>
                <CardContent className="p-4">
                  <Text variant="large">Recent activity</Text>
                  <Text variant="muted">3 new sign-ups in the last hour.</Text>
                </CardContent>
              </Card>

              <Stack direction="row" spacing="sm">
                <Button onPress={() => {}}>View report</Button>
                <Button variant="outline" onPress={() => {}}>
                  Export
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </ScrollView>
    </View>
  );
}
