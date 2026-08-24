import { useCodeBlock, useTheme } from '@truongdq01/headless';
import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Icon } from '../Icon/Icon';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
  onCopy?: () => void;
}

function highlightSyntax(
  line: string,
  syntax: {
    keyword: string;
    string: string;
    number: string;
    comment: string;
    function: string;
    operator: string;
    punctuation: string;
    tag: string;
    attr: string;
    plain: string;
  }
): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let remaining = line;

  const addToken = (text: string, color: string) => {
    if (!text) return;
    tokens.push(
      <Text key={`${tokens.length}-${text}`} style={{ color }}>
        {text}
      </Text>
    );
  };

  while (remaining.length > 0) {
    const commentMatch = remaining.match(/\/\/.*$/);
    if (commentMatch && commentMatch.index === 0) {
      addToken(remaining, syntax.comment);
      remaining = '';
      break;
    }

    const multiCommentMatch = remaining.match(/\/\*[\s\S]*?\*\//);
    if (multiCommentMatch && multiCommentMatch.index === 0) {
      addToken(multiCommentMatch[0], syntax.comment);
      remaining = remaining.slice(multiCommentMatch[0].length);
      continue;
    }

    const stringMatch = remaining.match(
      /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/
    );
    if (stringMatch && stringMatch.index === 0) {
      addToken(stringMatch[0], syntax.string);
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    const tagMatch = remaining.match(/<\/?[\w-]+[\s\S]*?\/?>/);
    if (tagMatch && tagMatch.index === 0) {
      addToken(tagMatch[0], syntax.tag);
      remaining = remaining.slice(tagMatch[0].length);
      continue;
    }

    const attrMatch = remaining.match(
      /(\b(class|id|style|href|src|alt|type|name|value|placeholder|onClick|onChange|disabled|checked|selected|key|ref)\s*[=])/
    );
    if (attrMatch && attrMatch.index === 0) {
      addToken(attrMatch[1], syntax.attr);
      remaining = remaining.slice(attrMatch[1].length);
      continue;
    }

    const keywordMatch = remaining.match(
      /^(import|export|default|from|return|const|let|var|function|if|else|for|while|do|switch|case|break|continue|new|this|typeof|instanceof|void|delete|in|of|class|extends|super|async|await|yield|try|catch|finally|throw|interface|type|implements|enum|namespace|module|declare|abstract|private|protected|public|static|readonly|get|set|true|false|null|undefined)\b/
    );
    if (keywordMatch) {
      addToken(keywordMatch[1], syntax.keyword);
      remaining = remaining.slice(keywordMatch[1].length);
      continue;
    }

    const numberMatch = remaining.match(/^\b(\d+(?:\.\d+)?)\b/);
    if (numberMatch) {
      addToken(numberMatch[1], syntax.number);
      remaining = remaining.slice(numberMatch[1].length);
      continue;
    }

    const functionMatch = remaining.match(/^([\w$]+)\s*\(/);
    if (functionMatch) {
      addToken(functionMatch[1], syntax.function);
      remaining = remaining.slice(functionMatch[1].length);
      continue;
    }

    const operatorMatch = remaining.match(
      /^(=>|===|!==|==|!=|<=|>=|\*\*|<<|>>|\|\||&&|\+\+|--|\+=|-=|\*=|[/=]|[+\-*%<>=!&^~?:])/
    );
    if (operatorMatch) {
      addToken(operatorMatch[1], syntax.operator);
      remaining = remaining.slice(operatorMatch[1].length);
      continue;
    }

    const punctuationMatch = remaining.match(/^[;,.[\]{}()]/);
    if (punctuationMatch) {
      addToken(punctuationMatch[0], syntax.punctuation);
      remaining = remaining.slice(1);
      continue;
    }

    const spaceMatch = remaining.match(/^\s+/);
    if (spaceMatch) {
      addToken(spaceMatch[0], syntax.plain);
      remaining = remaining.slice(spaceMatch[0].length);
      continue;
    }

    addToken(remaining[0], syntax.plain);
    remaining = remaining.slice(1);
  }

  return tokens;
}

function CodeBlockInner({
  code,
  language,
  title,
  showLineNumbers: showLineNumbersProp,
  highlightedLines,
  maxHeight,
  style,
  onCopy,
}: CodeBlockProps) {
  const {
    components: { codeBlock },
    tokens,
  } = useTheme();

  const { copied, copy, lines } = useCodeBlock({ code, onCopy });

  const effectiveLines = code.length === 0 ? [] : lines;
  const showLineNumbers = showLineNumbersProp ?? effectiveLines.length >= 5;

  const isHighlighted = useCallback(
    (idx: number) => highlightedLines?.includes(idx + 1) ?? false,
    [highlightedLines]
  );

  const lineCount = effectiveLines.length;
  const lineNumWidth =
    lineCount >= 1000
      ? tokens.spacing[12]
      : lineCount >= 100
        ? tokens.spacing[10]
        : tokens.spacing[8];

  const handleCopy = useCallback(() => {
    copy(code);
  }, [copy, code]);

  const containerStyle = useMemo(
    () => [codeBlock.container, style as ViewStyle],
    [codeBlock.container, style]
  );

  const headerPart = useMemo(() => {
    if (!title && !language) return null;
    return (
      <View style={codeBlock.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing[2],
            flex: 1,
          }}
        >
          {title ? (
            <Text style={codeBlock.title} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
          {language ? (
            <Text style={codeBlock.langBadge}>{language}</Text>
          ) : null}
        </View>
        <Pressable
          onPress={handleCopy}
          accessibilityRole="button"
          accessibilityLabel={copied ? 'Copied' : 'Copy code'}
          style={({ pressed }) => [
            codeBlock.copyButton,
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing[1],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Icon
            name={copied ? 'check' : 'copy'}
            size={16}
            color={
              copied ? tokens.color.success.text : tokens.color.text.secondary
            }
          />
          {copied ? (
            <Text
              style={{
                fontSize: tokens.fontSize.xs,
                color: tokens.color.success.text,
              }}
            >
              Copied!
            </Text>
          ) : null}
        </Pressable>
      </View>
    );
  }, [
    title,
    language,
    codeBlock.header,
    codeBlock.title,
    codeBlock.langBadge,
    codeBlock.copyButton,
    copied,
    handleCopy,
    tokens,
  ]);

  const bodyStyle = useMemo(
    () => [
      codeBlock.body,
      maxHeight ? { maxHeight, overflow: 'hidden' as const } : undefined,
    ],
    [codeBlock.body, maxHeight]
  );

  const lineNumStyle = useMemo(
    () => [codeBlock.lineNumber, { minWidth: lineNumWidth }],
    [codeBlock.lineNumber, lineNumWidth]
  );

  const syntaxTheme = codeBlock.syntax;

  const codeLines = useMemo(
    () =>
      effectiveLines.map((line: string, idx: number) => {
        const highlighted = isHighlighted(idx);
        const highlightedTokens = highlightSyntax(line, syntaxTheme);
        // biome-ignore lint/suspicious/noArrayIndexKey: Code lines are static and don't reorder.
        return (
          <View
            key={`line-${idx}`}
            style={[
              { flexDirection: 'row' as const, alignItems: 'center' as const },
              highlighted && codeBlock.highlightLine,
            ]}
          >
            {showLineNumbers ? (
              <Text style={lineNumStyle}>{idx + 1}</Text>
            ) : null}
            <Text style={codeBlock.code}>{highlightedTokens}</Text>
          </View>
        );
      }),
    [
      isHighlighted,
      syntaxTheme,
      showLineNumbers,
      lineNumStyle,
      codeBlock.code,
      codeBlock.highlightLine,
      effectiveLines.map,
    ]
  );

  return (
    <View style={containerStyle}>
      {headerPart}
      <ScrollView style={bodyStyle} showsVerticalScrollIndicator>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          nestedScrollEnabled
        >
          <View style={{ flexDirection: 'column' }}>{codeLines}</View>
        </ScrollView>
      </ScrollView>
      {!title && !language ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing[4],
            right: tokens.spacing[4],
          }}
        >
          <Pressable
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel={copied ? 'Copied' : 'Copy code'}
            style={({ pressed }) => [
              codeBlock.copyButton,
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing[1],
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Icon
              name={copied ? 'check' : 'copy'}
              size={16}
              color={
                copied ? tokens.color.success.text : tokens.color.text.secondary
              }
            />
            {copied ? (
              <Text
                style={{
                  fontSize: tokens.fontSize.xs,
                  color: tokens.color.success.text,
                }}
              >
                Copied!
              </Text>
            ) : null}
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export const CodeBlock = React.memo(CodeBlockInner);
CodeBlock.displayName = 'CodeBlock';
