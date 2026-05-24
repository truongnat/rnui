import { View } from 'react-native';
import { Typography, Divider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

export default function TypographyScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Typography"
      description="Type scale for hierarchy — headings, body, captions, and semantic colors."
    >
      <DemoSection title="Headings">
        <View style={{ gap: tokens.spacing[2] }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
        </View>
      </DemoSection>

      <DemoSection title="Body">
        <Typography variant="body1">
          Body 1 — standard reading size for general content.
        </Typography>
        <Divider spacing="md" />
        <Typography variant="body2">
          Body 2 — denser secondary descriptions and metadata.
        </Typography>
      </DemoSection>

      <DemoSection title="Specialized">
        <Typography variant="caption">Caption — metadata and fine print.</Typography>
        <Divider spacing="sm" />
        <Typography variant="overline">OVERLINE — SECTION LABELS</Typography>
        <Divider spacing="sm" />
        <Typography variant="code">{`const theme = useTheme();`}</Typography>
      </DemoSection>

      <DemoSection title="Semantic Colors">
        <Typography variant="body1" color="primary">
          Primary Content
        </Typography>
        <Typography variant="body1" color="secondary">
          Secondary Content
        </Typography>
        <Typography variant="body1" color="tertiary">
          Tertiary Content
        </Typography>
        <Typography variant="body1" color="brand">
          Brand Content
        </Typography>
        <Typography variant="body1" color="error">
          Error Message
        </Typography>
        <View
          style={{
            backgroundColor: tokens.color.brand.default,
            padding: tokens.spacing[4],
            borderRadius: tokens.radius.md,
            marginTop: tokens.spacing[2],
          }}
        >
          <Typography variant="body1" color="inverse">
            Inverse on brand background
          </Typography>
        </View>
      </DemoSection>

      <DemoSection title="Alignment">
        <Typography align="left">Left Aligned (Default)</Typography>
        <Typography align="center">Center Aligned</Typography>
        <Typography align="right">Right Aligned</Typography>
      </DemoSection>

      <DemoSection title="Layout Helpers" description="gutterBottom and paragraph spacing.">
        <DemoPreview>
          <Typography variant="h6" gutterBottom>
            With Gutter Bottom
          </Typography>
          <Typography variant="body2">
            Text after a heading with gutterBottom.
          </Typography>
          <Divider spacing="lg" />
          <Typography variant="body1" paragraph>
            Paragraph adds margin below automatically.
          </Typography>
          <Typography variant="body1">Notice the spacing above.</Typography>
        </DemoPreview>
      </DemoSection>
    </DemoPage>
  );
}
