import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewProps,
} from 'react-native';
import { Check, Copy } from 'lucide-react-native';
import { cn, useIconColor } from '@/lib/utils';

type CodeToken = {
  offset: number;
  text: string;
  kind:
    | 'plain'
    | 'comment'
    | 'keyword'
    | 'string'
    | 'number'
    | 'type'
    | 'function'
    | 'property'
    | 'tag';
};

const SCRIPT_LANGUAGES: Record<string, true | undefined> = {
  js: true,
  jsx: true,
  javascript: true,
  ts: true,
  tsx: true,
  typescript: true,
  json: true,
  jsonc: true,
};
const KEYWORDS: Record<string, true | undefined> = {
  import: true,
  from: true,
  export: true,
  default: true,
  return: true,
  function: true,
  const: true,
  let: true,
  var: true,
  async: true,
  await: true,
  if: true,
  else: true,
  for: true,
  while: true,
  do: true,
  switch: true,
  case: true,
  break: true,
  continue: true,
  throw: true,
  try: true,
  catch: true,
  finally: true,
  new: true,
  class: true,
  extends: true,
  static: true,
  super: true,
  this: true,
  typeof: true,
  instanceof: true,
  in: true,
  of: true,
  true: true,
  false: true,
  null: true,
  undefined: true,
  type: true,
  interface: true,
  enum: true,
  implements: true,
  public: true,
  private: true,
  protected: true,
  readonly: true,
  declare: true,
  as: true,
  satisfies: true,
  keyof: true,
  infer: true,
  is: true,
};
const TYPE_KEYWORDS: Record<string, true | undefined> = {
  void: true,
  never: true,
  unknown: true,
  number: true,
  string: true,
  boolean: true,
  any: true,
};
// Comments and quoted text take precedence, including unfinished editor input.
// Template strings stay a single string token; this is a lexer, not a parser.
const SCRIPT_TOKENS =
  /(?:\/\*[\s\S]*?(?:\*\/|$)|\/\/[^\r\n]*|"(?:\\[\s\S]|[^"\\])*(?:"|$)|'(?:\\[\s\S]|[^'\\])*(?:'|$)|`(?:\\[\s\S]|[^`\\])*(?:`|$)|[{}]|\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|[$A-Z_a-z][$\w]*)(?=(\s*[:(=])?)/g;
const JSX_TOKENS = new RegExp(
  `${SCRIPT_TOKENS.source}|<\\/?[$A-Z_a-z][$\\w.:-]*(?=[\\s/>])|<\\/?>|\\/?>`,
  'g'
);
const CSS_TOKENS =
  /(?:\/\*[\s\S]*?(?:\*\/|$)|"(?:\\[\s\S]|[^"\\])*(?:"|$)|'(?:\\[\s\S]|[^'\\])*(?:'|$)|#[\da-fA-F]{3,8}\b|-?(?:\d*\.)?\d+(?:%|[a-z]+)?|[.#@]?[a-zA-Z_-][\w-]*|[{};:])(?=(\s*[:(])?)/g;
// Private syntax roles use Tailwind's named palette tokens, separate from brand
// actions. Dark variants keep every role readable on the themed muted surface.
const TOKEN_CLASSES: Record<CodeToken['kind'], string> = {
  plain: '',
  comment: 'italic text-zinc-600 dark:text-zinc-400',
  keyword: 'text-violet-700 dark:text-violet-300',
  string: 'text-emerald-800 dark:text-emerald-300',
  number: 'text-orange-800 dark:text-orange-300',
  type: 'text-teal-800 dark:text-teal-200',
  function: 'text-amber-800 dark:text-amber-200',
  property: 'text-blue-800 dark:text-blue-300',
  tag: 'text-rose-700 dark:text-rose-300',
};

// Clipboard support is optional. Never show success without a real write.
async function copyToClipboard(text: string): Promise<boolean> {
  let nativeClipboard: unknown;
  try {
    nativeClipboard = require('expo-clipboard');
  } catch {
    nativeClipboard = undefined;
  }
  if (
    typeof nativeClipboard === 'object' &&
    nativeClipboard !== null &&
    'setStringAsync' in nativeClipboard &&
    typeof nativeClipboard.setStringAsync === 'function'
  ) {
    await nativeClipboard.setStringAsync(text);
    return true;
  }
  if (
    'navigator' in globalThis &&
    typeof globalThis.navigator === 'object' &&
    globalThis.navigator !== null &&
    'clipboard' in globalThis.navigator
  ) {
    const clipboard = globalThis.navigator.clipboard;
    if (
      typeof clipboard === 'object' &&
      clipboard !== null &&
      'writeText' in clipboard &&
      typeof clipboard.writeText === 'function'
    ) {
      await clipboard.writeText(text);
      return true;
    }
  }
  return false;
}

export interface CodeBlockProps extends ViewProps {
  /** Source text to render. */
  code: string;
  /** Basic lexical colors for JS/TS/JSX/TSX, JSON and CSS; other languages stay plain. */
  language?: string;
  /** Header title (e.g. file name). */
  title?: string;
  /** Show the title/language/copy bar independently of syntax highlighting. */
  showHeader?: boolean;
  /** Show the copy button. */
  showCopyButton?: boolean;
  /** Cap the scrollable code area. */
  maxHeight?: number;
  /** Called after a copy attempt. */
  onCopy?: () => void;
  className?: string;
  /** Extra classes for the code text. */
  codeClassName?: string;
}

/**
 * Monospace code container with a copy button and optional title bar.
 * Preserves the source exactly: highlighting does not reformat or rewrite code.
 */
export function CodeBlock({
  code,
  language,
  title,
  showHeader = true,
  showCopyButton = true,
  maxHeight,
  onCopy,
  className,
  codeClassName,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [copying, setCopying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  const copyRequest = useRef(0);
  const pendingCopy = useRef(false);
  const latestCode = useRef(code);
  latestCode.current = code;
  const iconColor = useIconColor('muted');
  const codeTextClass = cn(
    'text-sm leading-6',
    Platform.OS === 'ios' ? 'font-[Menlo]' : 'font-mono',
    codeClassName
  );

  const tokens = useMemo(() => {
    const syntax = language?.trim().toLowerCase();
    if (!syntax || (SCRIPT_LANGUAGES[syntax] !== true && syntax !== 'css'))
      return [];
    const pieces: CodeToken[] = [];
    const isCss = syntax === 'css';
    const isJson = syntax === 'json' || syntax === 'jsonc';
    const isJsx = syntax === 'jsx' || syntax === 'tsx';
    const matcher = isCss ? CSS_TOKENS : isJsx ? JSX_TOKENS : SCRIPT_TOKENS;
    let cursor = 0;
    let inTag = false;
    let tagExpressionDepth = 0;
    let cssDepth = 0;
    let cssValue = false;
    for (const match of code.matchAll(matcher)) {
      const text = match[0];
      const offset = match.index;
      const suffix = match[1]?.trim();
      let kind: CodeToken['kind'] = 'plain';
      if (text.startsWith('//') || text.startsWith('/*')) {
        kind = 'comment';
      } else if (/^["'`]/.test(text)) {
        kind = !isCss && suffix === ':' ? 'property' : 'string';
      } else if (isCss) {
        if (text === '{') {
          cssDepth++;
          cssValue = false;
        } else if (text === '}') {
          cssDepth--;
          cssValue = false;
        } else if (text === ';') {
          cssValue = false;
        } else if (text === ':') {
          cssValue = cssDepth > 0;
        } else if (
          /^-?(?:\d|\.\d)/.test(text) ||
          (cssValue && text[0] === '#')
        ) {
          kind = 'number';
        } else if (text[0] === '@') {
          kind = 'keyword';
        } else if (text.startsWith('--')) {
          kind = 'property';
        } else if (!cssValue) {
          kind =
            cssDepth > 0 && suffix === ':' && !/^[.#]/.test(text)
              ? 'property'
              : 'tag';
        } else {
          kind = suffix === '(' ? 'function' : 'keyword';
        }
      } else if (isJsx && text[0] === '<') {
        kind = 'tag';
        inTag = !text.endsWith('>');
        tagExpressionDepth = 0;
      } else if (inTag && text === '{') {
        tagExpressionDepth++;
      } else if (inTag && text === '}') {
        tagExpressionDepth--;
      } else if (inTag && text.endsWith('>') && tagExpressionDepth === 0) {
        kind = 'tag';
        inTag = false;
      } else if (/^\d/.test(text)) {
        kind = 'number';
      } else if (
        suffix === ':' ||
        (inTag && tagExpressionDepth === 0 && suffix === '=')
      ) {
        kind = 'property';
      } else if (!isJson && TYPE_KEYWORDS[text] === true) {
        kind = 'type';
      } else if (
        KEYWORDS[text] === true &&
        (!isJson || text === 'true' || text === 'false' || text === 'null')
      ) {
        kind = 'keyword';
      } else if (!isJson && suffix === '(') {
        kind = 'function';
      } else if (!isJson && /^[$A-Z_a-z]/.test(text)) {
        if (code[offset - 1] === '.') kind = 'property';
        else if (/^[A-Z]/.test(text)) kind = 'type';
      }
      if (kind === 'plain') continue;
      if (offset > cursor)
        pieces.push({
          offset: cursor,
          text: code.slice(cursor, offset),
          kind: 'plain',
        });
      pieces.push({ offset, text, kind });
      cursor = offset + text.length;
    }
    if (cursor < code.length)
      pieces.push({ offset: cursor, text: code.slice(cursor), kind: 'plain' });
    return pieces;
  }, [code, language]);

  useEffect(() => {
    mounted.current = true;
    latestCode.current = code;
    pendingCopy.current = false;
    setCopied(false);
    setCopyFailed(false);
    setCopying(false);
    return () => {
      mounted.current = false;
      copyRequest.current++;
      clearTimeout(timer.current);
    };
  }, [code]);

  const handleCopy = async () => {
    if (!code || pendingCopy.current) return;
    pendingCopy.current = true;
    const request = ++copyRequest.current;
    setCopying(true);
    let success = false;
    try {
      success = await copyToClipboard(code);
    } catch {
      success = false;
    }
    if (
      !mounted.current ||
      request !== copyRequest.current ||
      latestCode.current !== code
    )
      return;
    pendingCopy.current = false;
    setCopying(false);
    setCopied(success);
    setCopyFailed(!success);
    onCopy?.();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2000);
  };

  const copyButton = showCopyButton ? (
    <Pressable
      onPress={() => void handleCopy()}
      accessibilityRole="button"
      accessibilityLabel={
        copied
          ? 'Code copied'
          : copyFailed
            ? 'Copy unavailable. Select the code to copy.'
            : 'Copy code'
      }
      accessibilityState={{ disabled: !code || copying }}
      disabled={!code || copying}
      className="min-h-14 min-w-14 flex-row items-center justify-center gap-2 rounded-md px-2 active:opacity-60"
    >
      {copied ? (
        <Check size={16} color={iconColor} />
      ) : (
        <Copy size={16} color={iconColor} />
      )}
      <Text
        accessibilityLiveRegion="polite"
        className="text-sm text-muted-foreground"
      >
        {copied ? 'Copied' : copyFailed ? 'Unavailable' : 'Copy'}
      </Text>
    </Pressable>
  ) : null;

  const hasHeader = showHeader && (!!title || !!language || showCopyButton);

  return (
    <View
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-muted',
        className
      )}
      {...props}
    >
      {hasHeader ? (
        <View className="min-h-14 flex-row flex-wrap items-center gap-2 border-b border-border bg-muted px-3 py-1">
          {title ? (
            <Text
              numberOfLines={1}
              className="flex-1 text-sm font-medium text-foreground"
            >
              {title}
            </Text>
          ) : (
            <View className="flex-1" />
          )}
          {language ? (
            <Text className="text-sm text-muted-foreground">{language}</Text>
          ) : null}
          {copyButton}
        </View>
      ) : null}
      <ScrollView
        style={maxHeight !== undefined ? { maxHeight } : undefined}
        showsVerticalScrollIndicator
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text className={cn('p-4 text-foreground', codeTextClass)} selectable>
            {tokens.length
              ? tokens.map((token) =>
                  token.kind === 'plain' ? (
                    token.text
                  ) : (
                    <Text
                      key={token.offset}
                      className={cn(codeTextClass, TOKEN_CLASSES[token.kind])}
                    >
                      {token.text}
                    </Text>
                  )
                )
              : code}
          </Text>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
