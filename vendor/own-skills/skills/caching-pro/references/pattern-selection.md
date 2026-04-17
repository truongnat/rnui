# Pattern selection

- **Cache-aside**: app reads cache first, loads origin on miss, then writes cache; simple and common default.
- **Read-through**: cache layer fetches origin automatically; centralizes behavior but adds dependency on cache middleware.
- **Write-through**: write cache and origin in same flow; better read freshness, higher write latency.
- **Write-behind**: write cache first and flush later; high throughput, larger data-loss/ordering risk on failure.
- **HTTP/CDN cache**: ideal for idempotent public content with validators (`ETag`, `Last-Modified`) and cache headers.

Default recommendation:

1. Start with **cache-aside** for read-heavy endpoints.
2. Add **request coalescing** for hot keys.
3. Use **write-through** only when freshness pressure outweighs write cost.
4. Prefer **HTTP/CDN** for static or safely cacheable API responses.
