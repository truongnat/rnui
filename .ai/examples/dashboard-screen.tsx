/**
 * RNUI reference: dashboard screen (loading / success states)
 */
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AppBar,
  AppBarTitle,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from '@truongdq01/ui';

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
    <Box flex={1}>
      <AppBar>
        <Toolbar>
          <AppBarTitle subtitle="Today">Dashboard</AppBarTitle>
        </Toolbar>
      </AppBar>

      <ScrollView>
        <Stack spacing="lg" style={{ padding: 16 }}>
          <Stack direction="row" spacing="sm" alignItems="center">
            <Typography variant="h5">Good morning</Typography>
            <Badge label="Live" variant="success" size="sm" />
          </Stack>

          {phase === 'loading' ? (
            <Stack spacing="md">
              <Skeleton width="100%" height={96} />
              <Skeleton width="100%" height={96} />
              <Skeleton width="100%" height={120} />
            </Stack>
          ) : (
            <>
              <Grid container spacing="md" columns={2}>
                {MOCK_METRICS.map((metric) => (
                  <Grid key={metric.label} size={6}>
                    <Card padding="md">
                      <Typography variant="caption" color="secondary">
                        {metric.label}
                      </Typography>
                      <Typography variant="h5">{metric.value}</Typography>
                      <Typography variant="body2" color="brand">
                        {metric.change}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Card padding="md">
                <Typography variant="subtitle1" gutterBottom>
                  Recent activity
                </Typography>
                <Typography variant="body2" color="secondary">
                  3 new sign-ups in the last hour.
                </Typography>
              </Card>

              <Stack direction="row" spacing="sm">
                <Button label="View report" onPress={() => {}} />
                <Button label="Export" variant="outline" onPress={() => {}} />
              </Stack>
            </>
          )}
        </Stack>
      </ScrollView>
    </Box>
  );
}
