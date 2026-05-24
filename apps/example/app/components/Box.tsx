import { Box, Typography } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function BoxScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Box"
      description="Layout wrapper for padding, flexbox, and nested surfaces."
    >
      <DemoSection title="Basic" description="Padding, background, and border radius.">
        <DemoPreview>
          <Box
            style={{
              padding: tokens.spacing[4],
              backgroundColor: tokens.color.surface.raised,
              borderRadius: tokens.radius.lg,
            }}
          >
            <Typography variant="body1">
              Box with token-based padding and surface color.
            </Typography>
          </Box>
        </DemoPreview>
      </DemoSection>

      <DemoSection title="Flexbox" description="Row layout with gap and alignment.">
        <Box
          style={{
            flexDirection: 'row',
            gap: tokens.spacing[4],
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              width: tokens.spacing[12],
              height: tokens.spacing[12],
              backgroundColor: tokens.color.brand.default,
              borderRadius: tokens.radius.md,
            }}
          />
          <Box
            style={{
              width: tokens.spacing[12],
              height: tokens.spacing[12],
              backgroundColor: tokens.color.warning.border,
              borderRadius: tokens.radius.md,
            }}
          />
          <Box
            style={{
              width: tokens.spacing[12],
              height: tokens.spacing[12],
              backgroundColor: tokens.color.success.icon,
              borderRadius: tokens.radius.md,
            }}
          />
        </Box>
      </DemoSection>

      <DemoSection title="Accent Border" description="Semantic spacing and brand accent.">
        <Box
          style={{
            marginVertical: tokens.spacing[6],
            borderLeftWidth: 4,
            borderLeftColor: tokens.color.brand.default,
            paddingLeft: tokens.spacing[4],
          }}
        >
          <Typography variant="body2" color="secondary">
            Left accent border with semantic spacing tokens.
          </Typography>
        </Box>
      </DemoSection>

      <DemoSection title="Nested" bare>
        <Box
          style={{
            padding: tokens.spacing[6],
            backgroundColor: tokens.color.bg.subtle,
            borderRadius: tokens.radius.xl,
          }}
        >
          <Box
            style={{
              padding: tokens.spacing[4],
              backgroundColor: tokens.color.surface.default,
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: tokens.color.border.subtle,
            }}
          >
            <Typography variant="body1">Nested Content</Typography>
          </Box>
        </Box>
      </DemoSection>
    </DemoPage>
  );
}
