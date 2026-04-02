# API design edge cases

## Retry and duplicate effects

- Client/network retries can create duplicate records without idempotency controls.
- Timeout after server success can cause clients to replay the same write.

## Partial update ambiguity

- PATCH semantics can be unclear: omitted field vs explicit null vs delete intent.
- Merge behavior differences across clients can lead to accidental data loss.

## Date/time and locale handling

- Mixed timezone assumptions break ordering, expiry, and reporting logic.
- Human-formatted date strings cause parsing inconsistencies across clients.

## Compatibility drift

- Older clients may ignore new required behavior even if schema appears compatible.
- Enum expansion can break clients with strict unknown-value handling.

## Pagination and consistency

- Offset pagination can skip/duplicate items when data changes between requests.
- Missing stable sort keys can make cursor pagination unreliable.

## Security and data leakage

- Overly broad response payloads can leak internal or sensitive fields.
- Verbose errors can expose implementation details useful for attackers.
