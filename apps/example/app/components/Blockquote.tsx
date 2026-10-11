import { Blockquote, BlockquoteCite } from '@/components/ui/blockquote';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function BlockquoteScreen() {
  return (
    <DemoPage
      title="Blockquote"
      description="A quiet reading treatment: the quoted passage carries the emphasis, while attribution stays secondary."
    >
      <DemoSection
        title="Quoted passage"
        description="A simple excerpt without attribution."
      >
        <Blockquote>
          The details are not the details. They make the design.
        </Blockquote>
      </DemoSection>
      <DemoSection
        title="With a source"
        description="Keep attribution close to the passage it belongs to."
      >
        <Blockquote cite="— Charles Eames">
          The details are not the details. They make the design.
        </Blockquote>
      </DemoSection>
      <DemoSection
        title="In a reading flow"
        description="Longer quotations wrap naturally alongside the surrounding body text."
      >
        <Stack spacing="md">
          <Text variant="p">
            A useful review starts with the person using the interface. This
            sample team note captures that principle:
          </Text>
          <Blockquote
            cite={<BlockquoteCite>— Sample design review note</BlockquoteCite>}
          >
            Make the next step clear, keep the important details readable, and
            let each interaction explain what changed. An interface should help
            people move forward without asking them to decode it.
          </Blockquote>
          <Text variant="muted">
            Static reading content stays still. No entrance animation is needed
            to understand a quotation.
          </Text>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
