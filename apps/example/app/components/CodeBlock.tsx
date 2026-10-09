import { CodeBlock } from '@/components/ui/code-block';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const TYPESCRIPT_CODE = `import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export function Welcome() {
  return (
    <Stack spacing="md">
      <Text variant="h1">Hello, RNUI!</Text>
      <Button>Say Hi</Button>
    </Stack>
  );
}`;

const CSS_CODE = `.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--surface-default);
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}`;

const SHORT_CODE = `const x = 42;`;

export default function CodeBlockScreen() {
  return (
    <DemoPage
      title="CodeBlock"
      description="Monospace code container with a copy button and optional title bar."
    >
      <DemoSection
        title="TypeScript"
        description="Header shows the title and a cosmetic language badge."
      >
        <CodeBlock
          code={TYPESCRIPT_CODE}
          language="typescript"
          title="Welcome.tsx"
        />
      </DemoSection>

      <DemoSection
        title="CSS"
        description="Language badge with a file-name title."
      >
        <CodeBlock code={CSS_CODE} language="css" title="styles.css" />
      </DemoSection>

      <DemoSection
        title="Copy button"
        description="showCopyButton hides the copy affordance."
      >
        <Stack spacing="md">
          <CodeBlock code={SHORT_CODE} language="javascript" />
          <CodeBlock
            code={SHORT_CODE}
            language="javascript"
            showCopyButton={false}
          />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Scrollable height"
        description="maxHeight caps the code area for long sources."
      >
        <CodeBlock
          code={CSS_CODE}
          language="css"
          title="styles.css"
          maxHeight={160}
        />
      </DemoSection>

      <DemoSection
        title="Without header"
        description="CodeBlock renders no header bar when both title and language are omitted."
      >
        <CodeBlock code={TYPESCRIPT_CODE} />
      </DemoSection>
    </DemoPage>
  );
}
