import { describe, expect, test } from 'bun:test';
import {
  getLazyLoadPlan,
  loginScreenSchemaExample,
} from '@truongdq01/component-schema';
import {
  createLazyComponentMap,
  prepareScreenRender,
  validateBeforeRender,
} from '../component-loader';
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
      label: 'Go',
      variant: 'solid',
      style: { color: 'red' },
      onPress: () => {},
      unknownProp: true,
    });

    expect(result.safeProps.label).toBe('Go');
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

  test('maps Button string action to onPress when handler provided', () => {
    const resolved = resolveNodeRender(
      {
        type: 'Button',
        props: { label: 'Go', action: 'signIn' },
      },
      { actions: { signIn: () => {} } }
    );

    expect(resolved.props.label).toBe('Go');
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
          label: 'Continue',
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

  test('maps string children to Button label when label missing', () => {
    const resolved = resolveNodeRender({
      type: 'Button',
      props: { variant: 'solid', action: 'go' },
      children: 'Continue',
    });

    expect(resolved.props.label).toBe('Continue');
    expect(resolved.children).toBeUndefined();
  });

  test('promotes Typography children prop to text child', () => {
    const resolved = resolveNodeRender({
      type: 'Typography',
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

  test('allows Typography string children', () => {
    expect(shouldWrapStringChild('Typography')).toBe(false);
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
  test('exports login screen with Stack root and ThemeProvider', () => {
    const tsx = exportScreenSchemaToTsx(loginScreenSchemaExample, {
      componentName: 'LoginScreen',
    });

    expect(tsx).toContain(
      "import { ThemeProvider } from '@truongdq01/headless'"
    );
    expect(tsx).toContain(
      "import { Avatar, Box, Button, Card, Input, Stack, Typography } from '@truongdq01/ui'"
    );
    expect(tsx).toContain('export function LoginScreen');
    expect(tsx).toContain('<Avatar initials');
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
        type: 'Typography',
        props: { variant: 'body1', children: "It's fine" },
      },
    });

    expect(tsx).toContain(">It's fine</Typography>");
  });

  test('comments out native-only components', () => {
    const tsx = exportScreenSchemaToTsx({
      id: 'native',
      name: 'Native',
      version: '1',
      root: {
        type: 'Screen',
        props: { padding: 'md' },
        children: [{ type: 'Modal', props: { visible: true } }],
      },
    });

    expect(tsx).toContain('Unsupported in web preview: Modal');
  });
});

describe('component maps', () => {
  test('createLazyComponentMap includes Screen lazy key', () => {
    const map = createLazyComponentMap();
    expect(typeof map.Screen).toBe('function');
    expect(typeof map.Button).toBe('function');
  });

  test('getLazyLoadPlan returns unique component types for login schema', () => {
    const plan = getLazyLoadPlan(loginScreenSchemaExample);
    const types = plan.components.map((entry) => entry.type);
    expect(types).toContain('Screen');
    expect(types).toContain('Button');
    expect(types).toContain('Input');
    expect(new Set(types).size).toBe(types.length);
  });
});
