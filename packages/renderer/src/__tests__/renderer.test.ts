import { describe, expect, test } from 'bun:test';
import {
  getLazyLoadPlan,
  loginScreenSchemaExample,
} from '@rnui/component-schema';
import {
  createLazyComponentMap,
  prepareScreenRender,
  validateBeforeRender,
} from '../component-loader';
import { createDefaultComponentMap } from '../componentMap';
import { exportSchemaToTsx, exportScreenSchemaToTsx } from '../export-tsx';
import { guardNodeProps, resolveActionName } from '../propGuards';
import { resolveNodeRender, shouldWrapStringChild } from '../resolve-props';
import { resolveScreenPadding } from '../token-map';

describe('resolveScreenPadding', () => {
  test('maps md preset to 16', () => {
    expect(resolveScreenPadding('md')).toBe(16);
  });

  test('falls back to md for unknown values', () => {
    expect(resolveScreenPadding('unknown')).toBe(16);
  });
});

describe('resolveActionName', () => {
  test('accepts string action ids', () => {
    expect(resolveActionName('signIn')).toBe('signIn');
  });

  test('accepts event action objects', () => {
    expect(resolveActionName({ type: 'event', name: 'continue' })).toBe(
      'continue'
    );
  });
});

describe('guardNodeProps', () => {
  test('blocks style and unknown props on Button', () => {
    const result = guardNodeProps('Button', {
      children: 'Go',
      variant: 'default',
      style: { color: 'red' },
      onPress: () => {},
      unknownProp: true,
    });

    expect(result.safeProps.children).toBe('Go');
    expect(result.safeProps.style).toBeUndefined();
    expect(result.safeProps.onPress).toBeUndefined();
    expect(result.safeProps.unknownProp).toBeUndefined();
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe('resolveNodeRender', () => {
  test('maps Screen to Stack with flex and padding', () => {
    const resolved = resolveNodeRender({
      type: 'Screen',
      props: { padding: 'lg', spacing: 'md' },
      children: [],
    });

    expect(resolved.componentType).toBe('Stack');
    expect(resolved.props.style).toEqual({ flex: 1, padding: 24 });
    expect(resolved.props.spacing).toBe('md');
  });

  test('maps View flex prop to style', () => {
    const resolved = resolveNodeRender({
      type: 'View',
      props: { flex: 1 },
      children: [],
    });

    expect(resolved.componentType).toBe('View');
    expect(resolved.props.style).toEqual({ flex: 1 });
    expect(resolved.props.flex).toBeUndefined();
  });

  test('maps Button string action to onPress when handler provided', () => {
    const resolved = resolveNodeRender(
      {
        type: 'Button',
        props: { children: 'Go', action: 'signIn' },
      },
      { actions: { signIn: () => {} } }
    );

    expect(resolved.children).toBe('Go');
    expect(resolved.props.action).toBeUndefined();
    expect(typeof resolved.props.onPress).toBe('function');
  });

  test('maps Button event action object via onAction', () => {
    let captured: { name: string; sourceNodeId?: string } | undefined;
    const resolved = resolveNodeRender(
      {
        id: 'cta',
        type: 'Button',
        props: {
          children: 'Continue',
          action: { type: 'event', name: 'continue' },
        },
      },
      {
        onAction: (action) => {
          captured = action;
        },
      }
    );

    expect(typeof resolved.props.onPress).toBe('function');
    (resolved.props.onPress as () => void)();
    expect(captured).toEqual({ name: 'continue', sourceNodeId: 'cta' });
  });

  test('keeps Button string children as children', () => {
    const resolved = resolveNodeRender({
      type: 'Button',
      props: { variant: 'default', action: 'go' },
      children: 'Continue',
    });

    expect(resolved.children).toBe('Continue');
    expect(resolved.props.label).toBeUndefined();
  });

  test('promotes Text children prop to text child', () => {
    const resolved = resolveNodeRender({
      type: 'Text',
      props: { variant: 'h4', children: 'Hello' },
    });

    expect(resolved.children).toBe('Hello');
    expect(resolved.props.children).toBeUndefined();
  });
});

describe('shouldWrapStringChild', () => {
  test('wraps raw strings in Stack', () => {
    expect(shouldWrapStringChild('Stack')).toBe(true);
  });

  test('allows Text string children', () => {
    expect(shouldWrapStringChild('Text')).toBe(false);
  });
});

describe('prepareScreenRender / validateBeforeRender', () => {
  test('accepts valid login schema', () => {
    const result = prepareScreenRender(loginScreenSchemaExample);
    expect(result.valid).toBe(true);
    expect(result.plan?.components.length).toBeGreaterThan(0);
  });

  test('validateBeforeRender alias matches prepareScreenRender', () => {
    const prepared = prepareScreenRender(loginScreenSchemaExample);
    const validated = validateBeforeRender(loginScreenSchemaExample);
    expect(validated.valid).toBe(prepared.valid);
  });

  test('rejects invalid schema', () => {
    const result = prepareScreenRender({
      id: '',
      name: '',
      version: '1',
      root: { type: 'Nope' },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('exportScreenSchemaToTsx / exportSchemaToTsx', () => {
  test('exports login screen with per-file kit imports and no ThemeProvider', () => {
    const tsx = exportScreenSchemaToTsx(loginScreenSchemaExample, {
      componentName: 'LoginScreen',
    });

    expect(tsx).not.toContain('ThemeProvider');
    expect(tsx).not.toContain('@truongdq01');
    expect(tsx).toContain(
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar';"
    );
    expect(tsx).toContain("import { Button } from '@/components/ui/button';");
    expect(tsx).toContain("import { Card } from '@/components/ui/card';");
    expect(tsx).toContain("import { Stack } from '@/components/ui/stack';");
    expect(tsx).toContain("import { Text } from '@/components/ui/text';");
    expect(tsx).toContain(
      "import { TextField } from '@/components/ui/text-field';"
    );
    expect(tsx).toContain("import { View } from 'react-native';");
    expect(tsx).toContain('export function LoginScreen');
    expect(tsx).toContain('<AvatarFallback>RN</AvatarFallback>');
    expect(tsx).toContain('onPress={handleSignIn}');
    expect(tsx).toContain('const handleSignIn');
    expect(tsx).toContain('const handleForgotPassword');
  });

  test('exportSchemaToTsx alias produces identical output', () => {
    const a = exportScreenSchemaToTsx(loginScreenSchemaExample);
    const b = exportSchemaToTsx(loginScreenSchemaExample);
    expect(a).toBe(b);
  });

  test('escapes quotes in string props', () => {
    const tsx = exportScreenSchemaToTsx({
      id: 'quote-test',
      name: 'Quote',
      version: '1',
      root: {
        type: 'Text',
        props: { variant: 'p', children: "It's fine" },
      },
    });

    expect(tsx).toContain(">It's fine</Text>");
  });

  test('comments out native-only components', () => {
    const tsx = exportScreenSchemaToTsx({
      id: 'native',
      name: 'Native',
      version: '1',
      root: {
        type: 'Screen',
        props: { padding: 'md' },
        children: [{ type: 'Modal', props: {} }],
      },
    });

    expect(tsx).toContain('Unsupported in web preview: Modal');
  });
});

describe('component maps', () => {
  test('createLazyComponentMap keys loaders by lazyKey', () => {
    const loaded: string[] = [];
    const map = createLazyComponentMap((specifier) => {
      loaded.push(specifier);
      return Promise.resolve({ Button: () => null });
    });

    expect(typeof map.Screen).toBe('function');
    expect(typeof map.Button).toBe('function');
    expect(typeof map.Sheet).toBe('function');
  });

  test('createDefaultComponentMap maps Screen to Stack then View', () => {
    const Stack = () => null;
    const View = () => null;
    expect(createDefaultComponentMap({ Stack }).Screen).toBe(Stack);
    expect(createDefaultComponentMap({ View }).Screen).toBe(View);
  });

  test('getLazyLoadPlan returns unique component types for login schema', () => {
    const plan = getLazyLoadPlan(loginScreenSchemaExample);
    const types = plan.components.map((entry) => entry.type);
    expect(types).toContain('Screen');
    expect(types).toContain('Button');
    expect(types).toContain('TextField');
    expect(new Set(types).size).toBe(types.length);
  });
});
