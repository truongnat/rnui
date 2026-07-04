import { CodeBlock, Stack } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const TYPESCRIPT_CODE = `import { useTheme } from '@truongdq01/headless';
import { Stack, Typography } from '@truongdq01/ui';

export function Welcome() {
  const { tokens } = useTheme();
  return (
    <Stack spacing="md">
      <Typography variant="h1">
        Hello, RNUI!
      </Typography>
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
      description="Syntax-highlighted code display with copy, line numbers, and language badge."
    >
      <DemoSection
        title="TypeScript"
        description="Language badge and line numbers (auto-shown for 5+ lines)."
      >
        <CodeBlock
          code={TYPESCRIPT_CODE}
          language="typescript"
          title="Welcome.tsx"
        />
      </DemoSection>

      <DemoSection
        title="CSS"
        description="CSS syntax highlighting with title."
      >
        <CodeBlock
          code={CSS_CODE}
          language="css"
          title="styles.css"
        />
      </DemoSection>

      <DemoSection
        title="Short snippet"
        description="Line numbers auto-hide for fewer than 5 lines. Use showLineNumbers to override."
      >
        <Stack spacing="md">
          <CodeBlock code={SHORT_CODE} language="javascript" />
          <CodeBlock code={SHORT_CODE} language="javascript" showLineNumbers />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Without header"
        description="CodeBlock renders without a header bar when both title and language are omitted."
      >
        <CodeBlock code={TYPESCRIPT_CODE} />
      </DemoSection>

    </DemoPage>
  );
}
