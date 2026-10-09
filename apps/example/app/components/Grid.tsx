import { View } from 'react-native';
import { Grid, GridItem } from '@/components/ui/grid';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function GridScreen() {
  return (
    <DemoPage
      title="Grid Layout"
      description="Responsive grid patterns using Grid and GridItem."
    >
      <DemoSection
        title="2-Column Grid"
        description="Equal-width cells with wrap."
      >
        <DemoPreview>
          <Grid columns={2} gap="md">
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                className="h-14 items-center justify-center rounded-md border border-border bg-muted"
              >
                <Text variant="h4">{i}</Text>
              </View>
            ))}
          </Grid>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="3-Column Grid"
        description="Square aspect-ratio cells."
      >
        <DemoPreview>
          <Grid columns={3} gap="sm">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View
                key={i}
                className="aspect-square items-center justify-center rounded-sm bg-primary/10"
              >
                <Text className="text-primary">{i}</Text>
              </View>
            ))}
          </Grid>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Mixed Spans"
        description="Combine full-width and split rows."
      >
        <Grid columns={3} gap="md">
          <GridItem span={3}>
            <View className="h-14 rounded-md bg-muted" />
          </GridItem>
          <GridItem span={2}>
            <View className="h-14 rounded-md bg-muted" />
          </GridItem>
          <GridItem span={1}>
            <View className="h-14 rounded-md bg-muted" />
          </GridItem>
          <GridItem span={3}>
            <View className="h-14 rounded-md bg-muted" />
          </GridItem>
        </Grid>
      </DemoSection>
    </DemoPage>
  );
}
