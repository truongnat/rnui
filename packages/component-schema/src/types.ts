export type ComponentStatus = 'stable' | 'beta' | 'experimental';

export type ComponentCategory =
  | 'layout'
  | 'text'
  | 'actions'
  | 'forms'
  | 'status'
  | 'data-display'
  | 'feedback'
  | 'overlay'
  | 'navigation'
  | 'data-entry';

export type ComponentPropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'node'
  | 'action'
  | 'object';

export type ComponentSupport = {
  native: boolean;
  webPreview: boolean;
  reason?: string;
};

/**
 * Named import for a component. Registry kit components import from
 * `@/components/ui/<kebab-file>` (e.g. `@/components/ui/button`);
 * RN primitives import from `react-native`.
 */
export type ComponentImportSchema = {
  /** PascalCase export name (e.g. `Button`, `InputOTP`, `View`). */
  named: string;
  /** Module specifier, e.g. `@/components/ui/button` or `react-native`. */
  from: string;
  /** Key used by lazy component loaders (defaults to the schema type name). */
  lazyKey: string;
};

export type ComponentChildrenSchema = {
  /** Whether children are allowed at all. */
  allowed: boolean;
  /** Minimum number of child nodes (ScreenSchema nodes, not React children). */
  min?: number;
  /** Maximum number of child nodes. */
  max?: number;
  /** When true, text-only children are allowed (e.g. Text). */
  textAllowed?: boolean;
  /** When true, a single string child may be used instead of node array. */
  stringChildAllowed?: boolean;
  description?: string;
};

export type ComponentPropSchema = {
  name: string;
  type: ComponentPropType;
  required?: boolean;
  defaultValue?: unknown;
  enumValues?: readonly string[];
  description?: string;
  aiHint?: string;
  /** When false, AI must not generate this prop in ScreenSchema. */
  safeForAI?: boolean;
  /** Object props are AI-unsafe by default; declare the constrained literal shape (e.g. 'uri' for { uri: string }) to allow them. */
  safeShape?: string;
};

export type ComponentExample = {
  name: string;
  description?: string;
  schema: unknown;
  tsx?: string;
};

export type ComponentSchema = {
  name: string;
  category: ComponentCategory;
  status: ComponentStatus;
  description: string;
  support: ComponentSupport;
  import: ComponentImportSchema;
  props: ComponentPropSchema[];
  children?: ComponentChildrenSchema;
  examples: ComponentExample[];
  related?: string[];
  avoid?: string[];
  docsPath?: string;
};
