# API design and developer experience (NestJS)

## Contents

1. [DTOs and validation](#dtos-and-validation)
2. [HTTP semantics and errors](#http-semantics-and-errors)
3. [Pagination and filtering](#pagination-and-filtering)
4. [Versioning and deprecation](#versioning-and-deprecation)
5. [OpenAPI and documentation](#openapi-and-documentation)
6. [Consistency for client teams](#consistency-for-client-teams)

---

## DTOs and validation

- Keep **request DTOs** at the HTTP boundary (`class-validator` decorators); keep **domain models** separate from transport if the domain grows.
- Use **`ValidationPipe`** globally with `whitelist: true` and `forbidNonWhitelisted: true` to reject unknown fields (reduces injection and surprise fields).
- Prefer **explicit types** for query params (`@Query()` DTO) instead of loose `Record<string, string>` — same for route params with `ParseUUIDPipe` / `ParseIntPipe` where applicable.
- **Nested objects** — validate with `@ValidateNested()` and `@Type()` from `class-transformer`.

## HTTP semantics and errors

- Map business failures to **4xx** (client) vs **5xx** (server) deliberately; use **409** for conflicts, **422** for semantic validation when you standardize on it.
- Return a **stable JSON body** for errors: e.g. `{ statusCode, message, error, code?, details? }` — document `code` for machine clients.
- Use **`HttpException`** or domain-specific exceptions caught by a **global filter** that logs stack traces server-side only.

## Pagination and filtering

- Standardize **limit/offset** or **cursor**; enforce **max limit** (e.g. 100) in the DTO with `@Max()`.
- Document **sort** fields allowlist — avoid raw SQL fragments from query strings.

## Versioning and deprecation

- Pick one strategy: **URI** (`/v1`), **header**, or **media type** — document in README/OpenAPI.
- Deprecate with **`Deprecation`** header or OpenAPI `deprecated: true` before removal; keep changelog entries.

## OpenAPI and documentation

- If using **Swagger**, colocate `@ApiProperty()` with DTOs or use plugins that infer from decorators — avoid duplicating schema in prose.
- Expose **Swagger only in non-production** or protect with auth if public staging exists.

## Consistency for client teams

- Same resource naming (`snake_case` vs `camelCase` JSON) across endpoints — align with frontend contract.
- **Date/time**: ISO-8601 strings in UTC with clear naming (`createdAt`); document timezone assumptions for domain-specific fields.

---

*Align with your organization’s API guidelines; Nest gives the tools — consistency is a team choice.*
