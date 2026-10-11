import { CodeBlock } from '@/components/ui/code-block';
import { Stack } from '@/components/ui/stack';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const TSX_CODE = `import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from '@/components/ui/stack';

export function Welcome() {
  return (
    <Stack spacing="md">
      <Text variant="h1">Hello, RNUI!</Text>
      <Button>Say Hi</Button>
    </Stack>
  );
}`;

const JSON_CODE = `{
  "name": "RNUI",
  "mobileFirst": true,
  "components": 42
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
      description="Selectable source with monospace type and colored syntax in light and dark mode. Source indentation and line breaks stay unchanged; code is not automatically formatted."
    >
      <DemoSection
        title="TypeScript + JSX"
        description="Keywords, functions, tags, attributes and strings have distinct syntax colors. Copy confirms only when a clipboard is available."
        bare
      >
        <CodeBlock code={TSX_CODE} language="tsx" title="Welcome.tsx" />
      </DemoSection>

      <DemoSection
        title="JSON"
        description="Property names, strings, booleans and numbers have distinct colors. Copy preserves the source exactly."
        bare
      >
        <CodeBlock code={JSON_CODE} language="json" title="config.json" />
      </DemoSection>

      <DemoSection
        title="CSS"
        description="Selectors, properties, functions and numeric values use distinct syntax colors without changing source spacing."
        bare
      >
        <CodeBlock code={CSS_CODE} language="css" title="styles.css" />
      </DemoSection>

      <DemoSection
        title="Copy button"
        description="showCopyButton hides the copy affordance."
        bare
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
        bare
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
        description="Hide the header independently; TSX syntax colors and source formatting stay intact."
        bare
      >
        <CodeBlock code={TSX_CODE} language="tsx" showHeader={false} />
      </DemoSection>
    </DemoPage>
  );
}
