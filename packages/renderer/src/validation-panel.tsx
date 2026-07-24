import { Alert, AlertTitle, Card, Stack, Typography } from '@truongdq01/ui';

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
    <Card padding="md">
      <Stack spacing="sm">
        <Alert severity="error">
          <AlertTitle>{title}</AlertTitle>
          <Typography variant="body2">
            Fix the schema before preview can render.
          </Typography>
        </Alert>
        {errors.map((message) => (
          <Typography key={message} variant="caption" color="error">
            {message}
          </Typography>
        ))}
        {warnings && warnings.length > 0 ? (
          <>
            <Typography variant="caption" color="secondary">
              Warnings
            </Typography>
            {warnings.map((message) => (
              <Typography key={message} variant="caption" color="tertiary">
                {message}
              </Typography>
            ))}
          </>
        ) : null}
      </Stack>
    </Card>
  );
}
