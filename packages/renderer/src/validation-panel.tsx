import { Text, View } from 'react-native';

export function SchemaValidationPanel({
  title,
  errors,
  warnings,
}: {
  title: string;
  errors: string[];
  warnings?: string[];
}) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f5c6c6',
        backgroundColor: '#fef2f2',
        gap: 4,
      }}
    >
      <Text style={{ fontWeight: '600', color: '#991b1b' }}>{title}</Text>
      <Text style={{ fontSize: 13, color: '#7f1d1d' }}>
        Fix the schema before preview can render.
      </Text>
      {errors.map((message) => (
        <Text key={message} style={{ fontSize: 12, color: '#b91c1c' }}>
          {message}
        </Text>
      ))}
      {warnings && warnings.length > 0 ? (
        <>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#57534e',
              marginTop: 8,
            }}
          >
            Warnings
          </Text>
          {warnings.map((message) => (
            <Text key={message} style={{ fontSize: 12, color: '#78716c' }}>
              {message}
            </Text>
          ))}
        </>
      ) : null}
    </View>
  );
}
