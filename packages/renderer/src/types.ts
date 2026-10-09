import type {
  ComponentNode,
  LazyLoadPlan,
  ScreenSchema,
} from '@rnui/component-schema';
import type { ElementType, ReactElement } from 'react';

export type SchemaActionHandlers = Record<string, () => void>;

export type RendererAction = {
  name: string;
  sourceNodeId?: string;
  payload?: unknown;
};

export type RendererActionContext = {
  actions?: SchemaActionHandlers;
  onAction?: (action: RendererAction) => void;
  nodeId?: string;
};

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
  includeActionHandlers?: boolean;
};

export type UnsupportedComponentInfo = {
  type: string;
  reason?: string;
  nodeId?: string;
};

export type RendererOptions = {
  onAction?: (action: RendererAction) => void;
  mode?: 'preview' | 'export';
  strict?: boolean;
};

export type RNUISchemaRendererProps = {
  schema: ScreenSchema | unknown;
  mode?: 'preview' | 'export';
  strict?: boolean;
  componentMap?: RendererComponentMap;
  actions?: SchemaActionHandlers;
  onAction?: (action: RendererAction) => void;
  requireWebPreview?: boolean;
  onValidationError?: (errors: string[]) => void;
  fallbackComponent?: (info: UnsupportedComponentInfo) => ReactElement;
  renderUnsupported?: (info: UnsupportedComponentInfo) => ReactElement;
};

export type WebPreviewHostProps = RNUISchemaRendererProps & {
  minHeight?: number;
  /** Preview canvas background color (plain value — no theme provider). */
  backgroundColor?: string;
};

export type RenderSchemaNodeProps = {
  node: ComponentNode;
  componentMap: RendererComponentMap;
  actions?: SchemaActionHandlers;
  onAction?: (action: RendererAction) => void;
  path?: string;
  fallbackComponent?: (info: UnsupportedComponentInfo) => ReactElement;
  renderUnsupported?: (info: UnsupportedComponentInfo) => ReactElement;
};

export type { ComponentNode, LazyLoadPlan, ScreenSchema };
