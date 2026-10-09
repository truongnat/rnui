import type { ComponentPropSchema, ComponentSchema } from '../types';

/** Import specifier for a registry kit component: `@/components/ui/<kebab>`. */
const uiImport = (named: string, file: string, lazyKey = named) =>
  ({ named, from: `@/components/ui/${file}`, lazyKey }) as const;

/** Shared prop builders */
const idProp = {
  name: 'id',
  type: 'string' as const,
  description: 'Optional unique identifier',
  safeForAI: false,
};

const accessibilityLabelProp: ComponentPropSchema = {
  name: 'accessibilityLabel',
  type: 'string',
  safeForAI: true,
};

export const webPreviewComponentSchemas: ComponentSchema[] = [
  {
    name: 'Screen',
    category: 'layout',
    status: 'stable',
    description:
      'ScreenSchema root container. Not a standalone registry export — renderer maps to Stack with flex 1 and screen padding.',
    support: { native: true, webPreview: true },
    import: uiImport('Stack', 'stack', 'Screen'),
    props: [
      {
        name: 'padding',
        type: 'enum',
        enumValues: ['none', 'sm', 'md', 'lg'],
        defaultValue: 'md',
        description: 'Screen edge padding applied by renderer',
        aiHint: 'Use token-aligned padding presets, not raw pixel values',
        safeForAI: true,
      },
      {
        name: 'spacing',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl'],
        defaultValue: 'md',
        description:
          'Default gap between direct children when renderer wraps in Stack',
        safeForAI: true,
      },
    ],
    children: {
      allowed: true,
      min: 1,
      description: 'Screen content nodes',
    },
    examples: [
      {
        name: 'Basic screen',
        description: 'Root screen with stacked content',
        schema: {
          type: 'Screen',
          props: { padding: 'md', spacing: 'md' },
          children: [
            {
              type: 'Text',
              props: { variant: 'h4', children: 'Welcome' },
            },
            { type: 'Button', props: { children: 'Continue' } },
          ],
        },
        tsx: `<Stack spacing="md" style={{ flex: 1, padding: 16 }}>\n  <Text variant="h4">Welcome</Text>\n  <Button>Continue</Button>\n</Stack>`,
      },
    ],
    related: ['Stack', 'View'],
    avoid: [
      'Do not pass arbitrary style objects from ScreenSchema',
      'Do not nest Screen inside Screen',
    ],
    docsPath: 'guides/component-schema',
  },
  {
    name: 'Stack',
    category: 'layout',
    status: 'stable',
    description: 'Flex layout primitive with token-based spacing via gap.',
    support: { native: true, webPreview: true },
    import: uiImport('Stack', 'stack'),
    props: [
      idProp,
      {
        name: 'direction',
        type: 'enum',
        enumValues: ['column', 'column-reverse', 'row', 'row-reverse'],
        defaultValue: 'column',
        safeForAI: true,
      },
      {
        name: 'spacing',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl'],
        defaultValue: 'sm',
        description: 'Gap between children (token preset or number in TSX)',
        safeForAI: true,
      },
      {
        name: 'alignItems',
        type: 'enum',
        enumValues: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
        safeForAI: true,
      },
      {
        name: 'justifyContent',
        type: 'enum',
        enumValues: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'space-evenly',
        ],
        safeForAI: true,
      },
      {
        name: 'wrap',
        type: 'boolean',
        defaultValue: false,
        description: 'Wrap children to next line',
        safeForAI: true,
      },
    ],
    children: { allowed: true, description: 'Layout children' },
    examples: [
      {
        name: 'Vertical form stack',
        schema: {
          type: 'Stack',
          props: { spacing: 'md' },
          children: [
            { type: 'TextField', props: { label: 'Email' } },
            { type: 'Button', props: { children: 'Submit' } },
          ],
        },
        tsx: `<Stack spacing="md">\n  <TextField label="Email" />\n  <Button>Submit</Button>\n</Stack>`,
      },
    ],
    related: ['View', 'Grid', 'Screen'],
    avoid: [
      'Do not use gap prop — Stack uses spacing',
      'Do not inline magic margin on children',
    ],
    docsPath: 'components/stack',
  },
  {
    name: 'View',
    category: 'layout',
    status: 'stable',
    description:
      'Plain react-native View — generic container when no higher-level primitive fits.',
    support: { native: true, webPreview: true },
    import: { named: 'View', from: 'react-native', lazyKey: 'View' },
    props: [
      idProp,
      {
        name: 'flex',
        type: 'number',
        description: 'Flex grow/shrink factor',
        safeForAI: true,
      },
    ],
    children: { allowed: true },
    examples: [
      {
        name: 'Flex wrapper',
        schema: { type: 'View', props: { flex: 1 }, children: [] },
        tsx: `<View style={{ flex: 1 }}>{children}</View>`,
      },
    ],
    related: ['Stack', 'Grid'],
    avoid: [
      'Prefer Stack for spacing — View has no gap',
      'Do not use style for colors — use kit components',
    ],
    docsPath: 'components/view',
  },
  {
    name: 'Grid',
    category: 'layout',
    status: 'stable',
    description:
      'Wrap-based responsive grid. Children default to one track; use GridItem for spans.',
    support: { native: true, webPreview: true },
    import: uiImport('Grid', 'grid'),
    props: [
      idProp,
      {
        name: 'columns',
        type: 'number',
        defaultValue: 1,
        description: 'Track count — each cell is span/columns wide',
        safeForAI: true,
      },
      {
        name: 'gap',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Row and column gutter (token preset)',
        safeForAI: true,
      },
      {
        name: 'rowGap',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl'],
        safeForAI: true,
      },
      {
        name: 'columnGap',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl'],
        safeForAI: true,
      },
    ],
    children: { allowed: true, description: 'Cells (GridItem or plain nodes)' },
    examples: [
      {
        name: 'Two-column stats',
        schema: {
          type: 'Grid',
          props: { columns: 2, gap: 'md' },
          children: [
            { type: 'Card', children: [] },
            { type: 'Card', children: [] },
          ],
        },
        tsx: `<Grid columns={2} gap="md">\n  <Card />\n  <Card />\n</Grid>`,
      },
    ],
    related: ['Stack', 'GridItem'],
    docsPath: 'components/grid',
  },
  {
    name: 'GridItem',
    category: 'layout',
    status: 'stable',
    description: 'Grid cell that spans multiple tracks.',
    support: { native: true, webPreview: true },
    import: uiImport('GridItem', 'grid'),
    props: [
      idProp,
      {
        name: 'span',
        type: 'number',
        defaultValue: 1,
        description: 'Tracks this cell occupies (1..columns)',
        safeForAI: true,
      },
      {
        name: 'offset',
        type: 'number',
        description: 'Tracks to skip before this cell',
        safeForAI: true,
      },
    ],
    children: { allowed: true },
    examples: [
      {
        name: 'Full-width row cell',
        schema: { type: 'GridItem', props: { span: 2 }, children: [] },
        tsx: `<GridItem span={2}>{children}</GridItem>`,
      },
    ],
    related: ['Grid'],
    avoid: ['Must be placed inside a Grid'],
    docsPath: 'components/grid',
  },
  {
    name: 'Card',
    category: 'layout',
    status: 'stable',
    description:
      'Elevated surface for grouped content; pairs with CardHeader/CardTitle/CardContent/CardFooter in TSX.',
    support: { native: true, webPreview: true },
    import: uiImport('Card', 'card'),
    props: [idProp, accessibilityLabelProp],
    children: { allowed: true },
    examples: [
      {
        name: 'Profile card',
        schema: {
          type: 'Card',
          children: [
            {
              type: 'Text',
              props: { variant: 'h4', children: 'Profile' },
            },
            {
              type: 'Text',
              props: { variant: 'muted', children: 'Member since 2024' },
            },
          ],
        },
        tsx: `<Card>\n  <Text variant="h4">Profile</Text>\n  <Text variant="muted">Member since 2024</Text>\n</Card>`,
      },
    ],
    related: ['Paper', 'GlassCard', 'Stack'],
    avoid: ['Do not pass style for elevation — card styling is baked in'],
    docsPath: 'components/card',
  },
  {
    name: 'Paper',
    category: 'layout',
    status: 'stable',
    description: 'Surface with flat/elevated/outlined variants.',
    support: { native: true, webPreview: true },
    import: uiImport('Paper', 'paper'),
    props: [
      {
        name: 'variant',
        type: 'enum',
        enumValues: ['flat', 'elevated', 'outlined'],
        defaultValue: 'elevated',
        safeForAI: true,
      },
    ],
    children: { allowed: true },
    examples: [
      {
        name: 'Outlined panel',
        schema: {
          type: 'Paper',
          props: { variant: 'outlined' },
          children: [{ type: 'Text', props: { children: 'Panel content' } }],
        },
        tsx: `<Paper variant="outlined">\n  <Text>Panel content</Text>\n</Paper>`,
      },
    ],
    related: ['Card'],
    avoid: ['Do not pass raw style for shadow'],
    docsPath: 'components/paper',
  },
  {
    name: 'Separator',
    category: 'layout',
    status: 'stable',
    description: 'Hairline horizontal or vertical separator.',
    support: { native: true, webPreview: true },
    import: uiImport('Separator', 'separator'),
    props: [
      {
        name: 'orientation',
        type: 'enum',
        enumValues: ['horizontal', 'vertical'],
        defaultValue: 'horizontal',
        safeForAI: true,
      },
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Row separator',
        schema: { type: 'Separator' },
        tsx: `<Separator />`,
      },
    ],
    related: ['Stack'],
    avoid: ['Do not use Separator as a spacer — use Stack spacing'],
    docsPath: 'components/separator',
  },
  {
    name: 'Text',
    category: 'text',
    status: 'stable',
    description:
      'Typography primitive with shadcn-style variants (h1–h4, p, lead, muted, …).',
    support: { native: true, webPreview: true },
    import: uiImport('Text', 'text'),
    props: [
      idProp,
      {
        name: 'variant',
        type: 'enum',
        enumValues: [
          'default',
          'h1',
          'h2',
          'h3',
          'h4',
          'p',
          'lead',
          'large',
          'small',
          'muted',
          'blockquote',
          'code',
        ],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'children',
        type: 'string',
        required: true,
        description: 'Text content',
        safeForAI: true,
      },
      {
        name: 'numberOfLines',
        type: 'number',
        safeForAI: true,
      },
    ],
    children: {
      allowed: false,
      stringChildAllowed: true,
      textAllowed: true,
      description: 'Use children string prop or text child in schema',
    },
    examples: [
      {
        name: 'Heading',
        schema: {
          type: 'Text',
          props: { variant: 'h4', children: 'Settings' },
        },
        tsx: `<Text variant="h4">Settings</Text>`,
      },
    ],
    related: ['Link', 'Stack'],
    avoid: ['Do not wrap plain strings in View', 'Do not use random fontSize'],
    docsPath: 'components/text',
  },
  {
    name: 'Link',
    category: 'text',
    status: 'stable',
    description:
      'Inline text link; presses href through scheme-guarded Linking.',
    support: { native: true, webPreview: true },
    import: uiImport('Link', 'link'),
    props: [
      idProp,
      {
        name: 'variant',
        type: 'enum',
        enumValues: ['default', 'muted'],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'underline',
        type: 'enum',
        enumValues: ['always', 'none'],
        defaultValue: 'always',
        safeForAI: true,
      },
      {
        name: 'href',
        type: 'string',
        description:
          'URL opened via Linking (http/https/mailto/tel scheme-guarded)',
        safeForAI: true,
      },
      {
        name: 'children',
        type: 'string',
        required: true,
        description: 'Link text',
        safeForAI: true,
      },
    ],
    children: {
      allowed: false,
      stringChildAllowed: true,
      textAllowed: true,
    },
    examples: [
      {
        name: 'External link',
        schema: {
          type: 'Link',
          props: { href: 'https://example.com', children: 'Learn more' },
        },
        tsx: `<Link href="https://example.com">Learn more</Link>`,
      },
    ],
    related: ['Text', 'Button'],
    docsPath: 'components/link',
  },
  {
    name: 'Button',
    category: 'actions',
    status: 'stable',
    description: 'Primary action control with shadcn variants and sizes.',
    support: { native: true, webPreview: true },
    import: uiImport('Button', 'button'),
    props: [
      idProp,
      {
        name: 'children',
        type: 'string',
        description: 'Button label text (schema string child)',
        safeForAI: true,
      },
      {
        name: 'variant',
        type: 'enum',
        enumValues: [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
        ],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'size',
        type: 'enum',
        enumValues: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        safeForAI: true,
      },
      {
        name: 'invalid',
        type: 'boolean',
        defaultValue: false,
        description: 'Destructive border, mirrors aria-invalid',
        safeForAI: true,
      },
      {
        name: 'action',
        type: 'action',
        description: 'Reference to ScreenSchema action id',
        aiHint: 'Do not embed onPress functions in JSON',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false, stringChildAllowed: true },
    examples: [
      {
        name: 'Primary CTA',
        schema: {
          type: 'Button',
          props: { children: 'Sign in', variant: 'default', action: 'signIn' },
        },
        tsx: `<Button onPress={handleSignIn}>Sign in</Button>`,
      },
    ],
    related: ['ButtonGroup', 'IconButton', 'Stack'],
    avoid: [
      'Do not pass arbitrary onPress from schema JSON',
      'Do not use raw style for colors — use variant',
    ],
    docsPath: 'components/button',
  },
  {
    name: 'Input',
    category: 'forms',
    status: 'stable',
    description:
      'Bare text input (TextInput wrapper). Use TextField for label/error/helper chrome.',
    support: { native: true, webPreview: true },
    import: uiImport('Input', 'input'),
    props: [
      idProp,
      {
        name: 'placeholder',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'value',
        type: 'string',
        description: 'Controlled value or binding key in schema',
        safeForAI: true,
      },
      {
        name: 'defaultValue',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'secureTextEntry',
        type: 'boolean',
        description: 'Password masking',
        safeForAI: true,
      },
      {
        name: 'keyboardType',
        type: 'enum',
        enumValues: ['default', 'email-address', 'numeric', 'phone-pad'],
        safeForAI: true,
      },
      {
        name: 'multiline',
        type: 'boolean',
        defaultValue: false,
        safeForAI: true,
      },
      {
        name: 'invalid',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Search input',
        schema: {
          type: 'Input',
          props: { placeholder: 'Search…', value: '' },
        },
        tsx: `<Input placeholder="Search…" />`,
      },
    ],
    related: ['TextField', 'Textarea', 'Stack'],
    avoid: [
      'Do not pass style prop',
      'Use TextField when you need a label or error message',
    ],
    docsPath: 'components/input',
  },
  {
    name: 'TextField',
    category: 'forms',
    status: 'stable',
    description:
      'Input with label, required marker, description, and error message.',
    support: { native: true, webPreview: true },
    import: uiImport('TextField', 'text-field'),
    props: [
      idProp,
      {
        name: 'label',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'required',
        type: 'boolean',
        defaultValue: false,
        safeForAI: true,
      },
      {
        name: 'description',
        type: 'string',
        description: 'Helper text under the input',
        safeForAI: true,
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message; marks the input invalid',
        safeForAI: true,
      },
      {
        name: 'placeholder',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'value',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'defaultValue',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'secureTextEntry',
        type: 'boolean',
        description: 'Password masking',
        safeForAI: true,
      },
      {
        name: 'keyboardType',
        type: 'enum',
        enumValues: ['default', 'email-address', 'numeric', 'phone-pad'],
        safeForAI: true,
      },
      {
        name: 'multiline',
        type: 'boolean',
        defaultValue: false,
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Email field',
        schema: {
          type: 'TextField',
          props: {
            label: 'Email',
            placeholder: 'you@example.com',
            keyboardType: 'email-address',
          },
        },
        tsx: `<TextField label="Email" placeholder="you@example.com" keyboardType="email-address" />`,
      },
    ],
    related: ['Input'],
    docsPath: 'components/text-field',
  },
  {
    name: 'Checkbox',
    category: 'forms',
    status: 'stable',
    description:
      'Boolean checkbox control (unlabeled — compose with Stack + Text for labels).',
    support: { native: true, webPreview: true },
    import: uiImport('Checkbox', 'checkbox'),
    props: [
      idProp,
      {
        name: 'checked',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'invalid',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'action',
        type: 'action',
        description: 'Toggle handler reference',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Terms acceptance',
        schema: {
          type: 'Stack',
          props: { direction: 'row', spacing: 'sm', alignItems: 'center' },
          children: [
            { type: 'Checkbox', props: { checked: false } },
            { type: 'Text', props: { children: 'I agree to the terms' } },
          ],
        },
        tsx: `<Stack direction="row" spacing="sm" alignItems="center">\n  <Checkbox />\n  <Text>I agree to the terms</Text>\n</Stack>`,
      },
    ],
    related: ['Switch'],
    avoid: ['Do not pass onCheckedChange functions in schema JSON'],
    docsPath: 'components/checkbox',
  },
  {
    name: 'Switch',
    category: 'forms',
    status: 'stable',
    description:
      'On/off toggle control (unlabeled — compose with Stack + Text for labels).',
    support: { native: true, webPreview: true },
    import: uiImport('Switch', 'switch'),
    props: [
      idProp,
      {
        name: 'checked',
        type: 'boolean',
        description: 'Controlled on state',
        safeForAI: true,
      },
      {
        name: 'size',
        type: 'enum',
        enumValues: ['default', 'sm'],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'invalid',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'action',
        type: 'action',
        description: 'Toggle handler reference',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Notifications toggle',
        schema: {
          type: 'Stack',
          props: {
            direction: 'row',
            spacing: 'sm',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          children: [
            { type: 'Text', props: { children: 'Enable notifications' } },
            { type: 'Switch', props: { checked: true } },
          ],
        },
        tsx: `<Stack direction="row" spacing="sm" alignItems="center" justifyContent="space-between">\n  <Text>Enable notifications</Text>\n  <Switch checked />\n</Stack>`,
      },
    ],
    related: ['Checkbox'],
    avoid: ['Do not pass onCheckedChange in schema JSON'],
    docsPath: 'components/switch',
  },
  {
    name: 'Badge',
    category: 'status',
    status: 'stable',
    description: 'Compact status label.',
    support: { native: true, webPreview: true },
    import: uiImport('Badge', 'badge'),
    props: [
      idProp,
      {
        name: 'variant',
        type: 'enum',
        enumValues: ['default', 'secondary', 'destructive', 'outline'],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'children',
        type: 'string',
        required: true,
        description: 'Badge label text',
        safeForAI: true,
      },
    ],
    children: { allowed: false, stringChildAllowed: true },
    examples: [
      {
        name: 'Status badge',
        schema: { type: 'Badge', props: { children: 'New' } },
        tsx: `<Badge>New</Badge>`,
      },
    ],
    related: ['Chip'],
    docsPath: 'components/badge',
  },
  {
    name: 'Chip',
    category: 'status',
    status: 'stable',
    description: 'Compact interactive tag with remove affordance.',
    support: { native: true, webPreview: true },
    import: uiImport('Chip', 'chip'),
    props: [
      idProp,
      {
        name: 'label',
        type: 'string',
        required: true,
        safeForAI: true,
      },
      {
        name: 'variant',
        type: 'enum',
        enumValues: ['filled', 'outlined'],
        defaultValue: 'filled',
        safeForAI: true,
      },
      {
        name: 'selected',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'action',
        type: 'action',
        description: 'Press handler reference',
        safeForAI: true,
      },
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Filter chip',
        schema: {
          type: 'Chip',
          props: { label: 'Design', variant: 'outlined' },
        },
        tsx: `<Chip label="Design" variant="outlined" />`,
      },
    ],
    related: ['Badge'],
    avoid: ['Do not use onClick/onRemove in JSON — use action'],
    docsPath: 'components/chip',
  },
  {
    name: 'Alert',
    category: 'feedback',
    status: 'stable',
    description: 'Inline contextual feedback banner.',
    support: { native: true, webPreview: true },
    import: uiImport('Alert', 'alert'),
    props: [
      idProp,
      {
        name: 'variant',
        type: 'enum',
        enumValues: ['default', 'destructive'],
        defaultValue: 'default',
        safeForAI: true,
      },
      {
        name: 'children',
        type: 'string',
        description: 'Alert message body',
        safeForAI: true,
      },
    ],
    children: {
      allowed: true,
      textAllowed: true,
      stringChildAllowed: true,
      description:
        'Use children string prop; compose AlertTitle/AlertDescription nodes for richer content',
    },
    examples: [
      {
        name: 'Info alert',
        schema: {
          type: 'Alert',
          props: {
            children: 'Your profile was updated successfully.',
          },
        },
        tsx: `<Alert>\n  <AlertDescription>Your profile was updated successfully.</AlertDescription>\n</Alert>`,
      },
    ],
    related: ['AlertTitle', 'AlertDescription', 'Badge'],
    avoid: ['Do not use Alert for blocking confirmations — use AlertDialog'],
    docsPath: 'components/alert',
  },
  {
    name: 'AlertTitle',
    category: 'feedback',
    status: 'stable',
    description: 'Bold title line inside Alert.',
    support: { native: true, webPreview: true },
    import: uiImport('AlertTitle', 'alert'),
    props: [
      {
        name: 'children',
        type: 'string',
        required: true,
        safeForAI: true,
      },
    ],
    children: {
      allowed: false,
      stringChildAllowed: true,
      textAllowed: true,
    },
    examples: [
      {
        name: 'Alert with title',
        schema: {
          type: 'Alert',
          children: [
            { type: 'AlertTitle', props: { children: 'Heads up' } },
            {
              type: 'AlertDescription',
              props: { children: 'Something needs attention.' },
            },
          ],
        },
        tsx: `<Alert>\n  <AlertTitle>Heads up</AlertTitle>\n  <AlertDescription>Something needs attention.</AlertDescription>\n</Alert>`,
      },
    ],
    related: ['Alert', 'AlertDescription'],
    avoid: ['Must be placed inside an Alert'],
    docsPath: 'components/alert',
  },
  {
    name: 'AlertDescription',
    category: 'feedback',
    status: 'stable',
    description: 'Muted body text inside Alert.',
    support: { native: true, webPreview: true },
    import: uiImport('AlertDescription', 'alert'),
    props: [
      {
        name: 'children',
        type: 'string',
        required: true,
        safeForAI: true,
      },
    ],
    children: {
      allowed: false,
      stringChildAllowed: true,
      textAllowed: true,
    },
    examples: [],
    related: ['Alert', 'AlertTitle'],
    avoid: ['Must be placed inside an Alert'],
    docsPath: 'components/alert',
  },
  {
    name: 'Avatar',
    category: 'data-display',
    status: 'stable',
    description:
      'Avatar container — compose AvatarImage + AvatarFallback inside.',
    support: { native: true, webPreview: true },
    import: uiImport('Avatar', 'avatar'),
    props: [idProp, accessibilityLabelProp],
    children: {
      allowed: true,
      description: 'AvatarImage and AvatarFallback nodes',
    },
    examples: [
      {
        name: 'Initials avatar',
        schema: {
          type: 'Avatar',
          children: [{ type: 'AvatarFallback', props: { children: 'TD' } }],
        },
        tsx: `<Avatar>\n  <AvatarFallback>TD</AvatarFallback>\n</Avatar>`,
      },
    ],
    related: ['AvatarImage', 'AvatarFallback', 'Card'],
    docsPath: 'components/avatar',
  },
  {
    name: 'AvatarImage',
    category: 'data-display',
    status: 'stable',
    description: 'Image layer inside Avatar.',
    support: { native: true, webPreview: true },
    import: uiImport('AvatarImage', 'avatar'),
    props: [
      {
        name: 'source',
        type: 'object',
        description:
          'RN Image source — always the literal shape { uri: "https://…" }',
        safeForAI: true,
        safeShape: 'uri',
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Avatar with image',
        schema: {
          type: 'Avatar',
          children: [
            {
              type: 'AvatarImage',
              props: { source: { uri: 'https://example.com/me.png' } },
            },
            { type: 'AvatarFallback', props: { children: 'TD' } },
          ],
        },
      },
    ],
    related: ['Avatar', 'AvatarFallback', 'Image'],
    avoid: ['Must be placed inside an Avatar'],
    docsPath: 'components/avatar',
  },
  {
    name: 'AvatarFallback',
    category: 'data-display',
    status: 'stable',
    description: 'Fallback content (initials) shown while avatar loads/fails.',
    support: { native: true, webPreview: true },
    import: uiImport('AvatarFallback', 'avatar'),
    props: [
      {
        name: 'children',
        type: 'string',
        required: true,
        description: 'Fallback text, usually initials',
        safeForAI: true,
      },
    ],
    children: {
      allowed: false,
      stringChildAllowed: true,
      textAllowed: true,
    },
    examples: [],
    related: ['Avatar', 'AvatarImage'],
    avoid: ['Must be placed inside an Avatar'],
    docsPath: 'components/avatar',
  },
  {
    name: 'Icon',
    category: 'data-display',
    status: 'stable',
    description: 'Lucide icon rendered by name from the kit ICON_MAP.',
    support: { native: true, webPreview: true },
    import: uiImport('Icon', 'icon'),
    props: [
      idProp,
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Icon name from the kit ICON_MAP (e.g. search, settings)',
        safeForAI: true,
      },
      {
        name: 'size',
        type: 'enum',
        enumValues: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        defaultValue: 'md',
        safeForAI: true,
      },
      {
        name: 'tone',
        type: 'enum',
        enumValues: [
          'default',
          'muted',
          'primary',
          'destructive',
          'success',
          'warning',
        ],
        defaultValue: 'default',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Search icon',
        schema: { type: 'Icon', props: { name: 'search', size: 'md' } },
        tsx: `<Icon name="search" />`,
      },
    ],
    related: ['IconButton', 'Text'],
    docsPath: 'components/icon',
  },
  {
    name: 'Image',
    category: 'data-display',
    status: 'stable',
    description:
      'RN Image with rounded corners, aspect ratio, and loading placeholder.',
    support: { native: true, webPreview: true },
    import: uiImport('Image', 'image'),
    props: [
      idProp,
      {
        name: 'source',
        type: 'object',
        required: true,
        description:
          'RN Image source — always the literal shape { uri: "https://…" }',
        safeForAI: true,
        safeShape: 'uri',
      },
      {
        name: 'rounded',
        type: 'enum',
        enumValues: ['none', 'sm', 'md', 'lg', 'full'],
        defaultValue: 'md',
        safeForAI: true,
      },
      {
        name: 'aspectRatio',
        type: 'number',
        description: 'Width/height ratio (e.g. 1.7778 for 16:9, 1 for square)',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Square thumbnail',
        schema: {
          type: 'Image',
          props: {
            source: { uri: 'https://example.com/pic.png' },
            rounded: 'lg',
            aspectRatio: 1,
          },
        },
        tsx: `<Image source={{ uri: 'https://example.com/pic.png' }} rounded="lg" aspectRatio={1} />`,
      },
    ],
    related: ['AvatarImage', 'ImageList'],
    docsPath: 'components/image',
  },
  {
    name: 'Progress',
    category: 'status',
    status: 'stable',
    description: 'Determinate progress bar (0–100).',
    support: { native: true, webPreview: true },
    import: uiImport('Progress', 'progress'),
    props: [
      idProp,
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'Progress 0–100',
        safeForAI: true,
      },
      accessibilityLabelProp,
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Half progress',
        schema: { type: 'Progress', props: { value: 50 } },
        tsx: `<Progress value={50} />`,
      },
    ],
    related: ['CircularProgress', 'Skeleton'],
    docsPath: 'components/progress',
  },
  {
    name: 'List',
    category: 'data-display',
    status: 'beta',
    description:
      'Sectioned list container; renders children or a FlatList for data+renderItem (not schema-expressible).',
    support: { native: true, webPreview: true },
    import: uiImport('List', 'list'),
    props: [
      {
        name: 'sectionTitle',
        type: 'string',
        description: 'Section header above the items',
        safeForAI: true,
      },
    ],
    children: { allowed: true, description: 'ListItem nodes' },
    examples: [
      {
        name: 'Settings list',
        schema: {
          type: 'List',
          props: { sectionTitle: 'General' },
          children: [
            {
              type: 'ListItem',
              props: { title: 'Account', chevron: true, action: 'openAccount' },
            },
          ],
        },
        tsx: `<List sectionTitle="General">\n  <ListItem title="Account" chevron onPress={handleOpenAccount} />\n</List>`,
      },
    ],
    related: ['ListItem', 'Stack'],
    docsPath: 'components/list',
  },
  {
    name: 'ListItem',
    category: 'data-display',
    status: 'stable',
    description: 'Pressable list row with title, subtitle, and chevron.',
    support: { native: true, webPreview: true },
    import: uiImport('ListItem', 'list-item'),
    props: [
      idProp,
      {
        name: 'title',
        type: 'string',
        required: true,
        safeForAI: true,
      },
      {
        name: 'subtitle',
        type: 'string',
        safeForAI: true,
      },
      {
        name: 'chevron',
        type: 'boolean',
        description: 'Chevron affordance for pressable rows',
        safeForAI: true,
      },
      {
        name: 'disabled',
        type: 'boolean',
        safeForAI: true,
      },
      {
        name: 'action',
        type: 'action',
        description: 'Press handler reference',
        safeForAI: true,
      },
    ],
    children: { allowed: false },
    examples: [
      {
        name: 'Pressable row',
        schema: {
          type: 'ListItem',
          props: {
            title: 'Account',
            subtitle: 'Profile and security',
            chevron: true,
            action: 'openAccount',
          },
        },
        tsx: `<ListItem title="Account" subtitle="Profile and security" chevron onPress={handleOpenAccount} />`,
      },
    ],
    related: ['List'],
    avoid: ['Do not pass onPress in schema JSON — use action'],
    docsPath: 'components/list',
  },
];
