# Tips and tricks

Pick one stack per layer; avoid duplicating the same assertion in three tools.

## JavaScript / TypeScript (frontend)

| Layer | Common tools |
|-------|----------------|
| Unit/component | Vitest, Jest, **RTL** (React Testing Library) |
| E2E browser | **Playwright**, Cypress |
| API mocking | MSW (browser/node), nock |

- Prefer **RTL** queries: `getByRole`, `getByLabelText` over `getByTestId` when possible; use `data-testid` when stable hooks are needed.

## JavaScript / TypeScript (backend / Node)

| Tool | Use |
|------|-----|
| Vitest/Jest | Unit tests for services, pure logic |
| Supertest | HTTP assertions against Express/Fastify/Nest test app |

## Python

| Tool | Use |
|------|-----|
| pytest | Unit + integration; fixtures for setup |
| pytest-asyncio | Async code |
| httpx / requests | API integration |

## JVM

JUnit 5, TestNG; Testcontainers for databases.

## .NET

xUnit, NUnit; WebApplicationFactory for ASP.NET Core integration tests.

## Mobile

- **React Native**: Detox, Maestro; Jest for RN unit tests.
- **Native**: XCTest (iOS), Espresso/Compose (Android).

## Load / performance

- **k6**, Gatling, Locust — separate from functional tests; define SLOs and scenarios.

## Contract testing

- **Pact** (consumer-driven) or OpenAPI diff tests between producer and consumer.

## Snapshot testing

- Useful for **stable** UI output; **fragile** if abused; review diffs carefully.
