import { View } from 'react-native';
import { Typography, Box, Stack } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function GridScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Grid Layout"
      description="Responsive grid patterns using Box and Stack."
    >
      <DemoSection title="2-Column Grid" description="Equal-width cells with wrap.">
        <DemoPreview>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing[4],
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                style={{
                  width: '46.5%',
                  height: tokens.spacing[14],
                  backgroundColor: tokens.color.bg.subtle,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: tokens.color.border.default,
                }}
              >
                <Typography variant="h4">{i}</Typography>
              </Box>
            ))}
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="3-Column Grid" description="Square aspect-ratio cells.">
        <DemoPreview>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing[3],
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Box
                key={i}
                style={{
                  width: '30.5%',
                  aspectRatio: 1,
                  backgroundColor: tokens.color.brand.muted,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: tokens.radius.sm,
                }}
              >
                <Typography
                  variant="body1"
                  style={{ color: tokens.color.brand.text }}
                >
                  {i}
                </Typography>
              </Box>
            ))}
          </View>
        </DemoPreview>
      </DemoSection>

      <DemoSection
        title="Mixed Spacing"
        description="Combine full-width and split rows."
      >
        <Stack spacing="lg">
          <Box
            style={{
              height: tokens.spacing[14],
              backgroundColor: tokens.color.bg.subtle,
              borderRadius: tokens.radius.md,
            }}
          />
          <View style={{ flexDirection: 'row', gap: tokens.spacing[4] }}>
            <Box
              style={{
                flex: 2,
                height: tokens.spacing[14],
                backgroundColor: tokens.color.bg.subtle,
                borderRadius: tokens.radius.md,
              }}
            />
            <Box
              style={{
                flex: 1,
                height: tokens.spacing[14],
                backgroundColor: tokens.color.bg.subtle,
                borderRadius: tokens.radius.md,
              }}
            />
          </View>
          <Box
            style={{
              height: tokens.spacing[14],
              backgroundColor: tokens.color.bg.subtle,
              borderRadius: tokens.radius.md,
            }}
          />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
