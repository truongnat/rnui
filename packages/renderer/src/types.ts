import type {
  ComponentNode,
  LazyLoadPlan,
  ScreenSchema,
} from '@truongdq01/component-schema';
import type { ElementType } from 'react';

export type SchemaActionHandlers = Record<string, () => void>;

export type RendererComponentMap = Record<string, ElementType>;

export type LazyComponentLoader = () => Promise<{
  default: ElementType;
}>;

export type LazyComponentMap = Record<string, LazyComponentLoader>;

export type PrepareScreenRenderOptions = {
  requireWebPreview?: boolean;
  maxDepth?: number;
  maxNodes?: number;
};

export type PreparedScreenRender = {
  valid: boolean;
  schema?: ScreenSchema;
  plan?: LazyLoadPlan;
  errors: string[];
  warnings: string[];
};

export type ExportScreenTsxOptions = {
  componentName?: string;
  includeThemeProvider?: boolean;
  includeActionHandlers?: boolean;
};

export type ScreenSchemaRendererProps = {
  schema: ScreenSchema;
  componentMap?: RendererComponentMap;
  actions?: SchemaActionHandlers;
  requireWebPreview?: boolean;
  onValidationError?: (errors: string[]) => void;
};

export type WebPreviewHostProps = ScreenSchemaRendererProps & {
  minHeight?: number;
  withGestureRoot?: boolean;
};

export type RenderSchemaNodeProps = {
  node: ComponentNode;
  componentMap: RendererComponentMap;
  actions?: SchemaActionHandlers;
  path?: string;
};

export type { ComponentNode, LazyLoadPlan, ScreenSchema };
