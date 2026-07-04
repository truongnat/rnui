import { Blockquote, Card, Grid, Stack } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const TESTIMONIALS = [
  {
    id: '1',
    quote:
      'RNUI made our design system consistent across iOS and Android without sacrificing native feel.',
    author: '— Alex Chen, Mobile Lead',
  },
  {
    id: '2',
    quote:
      'Token-driven theming let us ship dark mode and brand presets in a single sprint.',
    author: '— Priya Sharma, Design Systems',
  },
  {
    id: '3',
    quote:
      'We replaced one-off quote styles with Blockquote and testimonials finally look intentional.',
    author: '— Jordan Lee, Product Designer',
  },
] as const;

export default function BlockquoteScreen() {
  return (
    <DemoPage
      title="Blockquote"
      description="Styled quotations with an emphasized left border and secondary text — for testimonials, excerpts, and cited content."
    >
      <DemoSection title="Basic quote">
        <Blockquote>
          Design is not just what it looks like. Design is how it works.
        </Blockquote>
      </DemoSection>

      <DemoSection
        title="With attribution"
        description="Use cite to credit the author or source."
      >
        <Stack spacing="md">
          <Blockquote>
            The details are not the details. They make the design.
          </Blockquote>
          <Blockquote cite="— Charles Eames">
            The details are not the details. They make the design.
          </Blockquote>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Testimonials"
        description="Combine with Card and Grid for social-proof layouts."
      >
        <Grid columns={1} spacing="md">
          {TESTIMONIALS.map((item) => (
            <Card key={item.id} padding="md">
              <Blockquote cite={item.author}>{item.quote}</Blockquote>
            </Card>
          ))}
        </Grid>
      </DemoSection>
    </DemoPage>
  );
}
