import React from 'react';
import { View } from 'react-native';
import { Typography, Divider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function TypographyScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Typography"
      description="The typography system helps create a hierarchy and organize content using a curated scale of fonts, weights, and sizes."
    >
      <DemoSection title="Headings">
        <View style={{ gap: 8 }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
        </View>
      </DemoSection>

      <DemoSection title="Body Texts">
        <Typography variant="body1">
          Body 1 — The standard body text size for general reading.
        </Typography>
        <Divider spacing="md" />
        <Typography variant="body2">
          Body 2 — Slightly smaller text for denser content or secondary descriptions.
        </Typography>
      </DemoSection>

      <DemoSection title="Specialized Variants">
        <Typography variant="caption">
          Caption — Used for secondary information or metadata.
        </Typography>
        <Divider spacing="sm" />
        <Typography variant="overline">
          OVERLINE — ALL CAPS SMALL TEXT
        </Typography>
        <Divider spacing="sm" />
        <Typography variant="code">
          {`const theme = useTheme();`}
        </Typography>
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
            padding: tokens.spacing.md, 
            borderRadius: tokens.radius.md,
            marginTop: 8
          }}
        >
          <Typography variant="body1" color="inverse">
            Inverse Color (On Dark Brand)
          </Typography>
        </View>
      </DemoSection>

      <DemoSection title="Alignment">
        <Typography align="left">Left Aligned (Default)</Typography>
        <Typography align="center">Center Aligned</Typography>
        <Typography align="right">Right Aligned</Typography>
      </DemoSection>

      <DemoSection title="Layout Helpers">
        <Typography variant="h6" gutterBottom>
          With Gutter Bottom
        </Typography>
        <Typography variant="body2">
          This text is placed after a heading with gutterBottom.
        </Typography>
        
        <Divider spacing="lg" />

        <Typography variant="body1" paragraph>
          Paragraph: This has a margin bottom to separate it from the next block of text automatically.
        </Typography>
        <Typography variant="body1">
          Notice the spacing above this line.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}

