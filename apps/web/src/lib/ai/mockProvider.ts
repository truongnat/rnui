import { validateScreenSchema } from '@truongdq01/component-schema';
import type { ScreenSchema } from '@truongdq01/component-schema';
import { exampleSchemas, type ExampleSchemaKey } from '../example-schemas';
import type {
  AIProvider,
  GenerateSchemaInput,
  GenerateSchemaResult,
  RepairSchemaInput,
} from './types';

const PROMPT_MAP: Array<{
  match: RegExp;
  key: ExampleSchemaKey;
  summary: string;
}> = [
  {
    match: /login|sign[\s-]?in|auth/i,
    key: 'login',
    summary:
      'Generated a login screen using Card, Typography, Input, and Button with primary and secondary actions.',
  },
  {
    match: /setting|preference|toggle|notification/i,
    key: 'settings',
    summary:
      'Generated a settings screen with profile card, preference switches, checkbox, and sign-out action.',
  },
  {
    match: /profile|avatar|member/i,
    key: 'profile-card',
    summary:
      'Generated a profile card with Avatar, stats row, Badge, and edit/share actions.',
  },
  {
    match: /dashboard|overview|stats|metric|home/i,
    key: 'dashboard',
    summary:
      'Generated a dashboard home with greeting, summary cards, filter chips, activity list, and CTA.',
  },
  {
    match: /form|input|field|submit|contact|payment|checkout|ecommerce/i,
    key: 'form',
    summary:
      'Generated a contact form using Card, labeled Inputs, helper Alert, and submit action.',
  },
];

function cloneSchema(schema: ScreenSchema): ScreenSchema {
  return structuredClone(schema);
}

function invalidDemoSchema(): ScreenSchema {
  const broken = cloneSchema(exampleSchemas.login);
  broken.root.children = [
    ...(Array.isArray(broken.root.children) ? broken.root.children : []),
    {
      type: 'UnknownComponent',
      props: { label: 'broken' },
    },
  ];
  return broken;
}

function resolveExampleKey(prompt: string): ExampleSchemaKey {
  const matched = PROMPT_MAP.find((entry) => entry.match.test(prompt));
  return matched?.key ?? 'dashboard';
}

export class MockAIProvider implements AIProvider {
  async generateSchema(
    input: GenerateSchemaInput
  ): Promise<GenerateSchemaResult> {
    const trimmed = input.prompt.trim();

    if (/invalid|error|repair|broken/i.test(trimmed)) {
      return {
        schema: invalidDemoSchema(),
        reasoningSummary:
          'Generated an intentionally invalid schema for repair-loop testing.',
      };
    }

    const key = resolveExampleKey(trimmed);
    const matched = PROMPT_MAP.find((entry) => entry.key === key);

    return {
      schema: cloneSchema(exampleSchemas[key]),
      reasoningSummary:
        matched?.summary ??
        'No exact template matched — using dashboard as the default polished home screen.',
    };
  }

  async repairSchema(input: RepairSchemaInput): Promise<GenerateSchemaResult> {
    const validation = validateScreenSchema(input.schema, {
      requireWebPreview: true,
    });

    if (validation.valid && typeof input.schema === 'object' && input.schema) {
      return {
        schema: input.schema as ScreenSchema,
        reasoningSummary: 'Schema already valid — no repair needed.',
      };
    }

    const fallback = cloneSchema(exampleSchemas.login);
    return {
      schema: fallback,
      reasoningSummary: `Repaired schema using login template (${input.errors.length} issue(s) replaced).`,
    };
  }
}

export const mockAIProvider = new MockAIProvider();
