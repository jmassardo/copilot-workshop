---
applyTo: "src/**/*.ts"
---

When writing or editing TypeScript source code in this project:

## Architecture Patterns
- Route handlers in `src/routes/` — thin controllers that call query functions
- Database queries in `src/db/queries.ts` — all SQL lives here, not in routes
- Middleware in `src/middleware/` — auth, validation, and cross-cutting concerns
- Types in `src/types/index.ts` — all shared interfaces and type definitions
- Utilities in `src/utils/` — logger, response helpers, shared functions

## Code Conventions
- Use `const` by default, `let` only when reassignment is needed, never `var`
- Prefer `async/await` over `.then()` chains
- All exported functions must have JSDoc comments
- Use the `logger` from `src/utils/logger.ts` — never `console.log`
- Error messages in API responses must be human-readable
- Use the `buildResponse()` helper for all API responses

## TypeScript Rules
- Avoid `any` — use proper types or `unknown` with type guards
- Define interfaces for all request/response shapes in `src/types/`
- Use `Omit<>`, `Pick<>`, and `Partial<>` utilities instead of duplicating types
- Enable strict mode — all code must pass `tsc --strict`

## Error Handling
- Wrap all async route handlers in try/catch
- Log errors with `logger.error()` including context
- Never expose stack traces or internal details in API responses
- Use appropriate HTTP status codes (400 for validation, 401 for auth, etc.)

## Security
- All user input must be validated via Zod schemas before processing
- Parameterized queries only — never string concatenation for SQL
- Strip sensitive fields (like `passwordHash`) before sending responses
- Rate limiting is handled globally — don't add per-route limits unless needed
