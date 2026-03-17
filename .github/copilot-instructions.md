# Copilot Instructions — Inventory Tracker API

## Build, Test & Lint

```bash
npm run dev        # Start dev server with hot-reload (ts-node-dev)
npm run build      # Compile TypeScript to dist/
npm test           # Run Jest test suite with coverage
npm run lint       # ESLint on src/**/*.ts
npm run db:reset   # Delete ./data/ directory to reset the embedded database
```

Run a single test file: `npx jest path/to/file.test.ts`
Run tests matching a name: `npx jest -t "description text"`

The project requires Node.js ≥ 20. No external database server is needed.

## Architecture

This is a TypeScript/Express REST API using PGlite (embedded PostgreSQL via WebAssembly). Data lives in the `./data/` directory and auto-initializes from `sql/schema.sql` and `sql/seed-data.sql` on first run.

**Request lifecycle:** Client → Helmet/CORS/Rate-limit → Request ID (UUID) → Route → `authenticate` → `authorize(...roles)` → `validate(zodSchema)` → Handler → `buildResponse()` → Client

**Layer responsibilities:**

- `src/routes/` — HTTP handlers. Each handler wraps DB calls in try-catch, uses `buildResponse()` for output, and delegates all data access to query functions.
- `src/db/connection.ts` — PGlite connection with `query<T>()` and `queryOne<T>()` helpers. All queries use `$1, $2` positional parameters.
- `src/db/queries.ts` — All SQL lives here, never in route files. Queries are grouped by entity (items, suppliers, users, reports, audit).
- `src/db/init.ts` — Checks if tables exist on startup; if not, runs schema + seed SQL files.
- `src/middleware/auth.ts` — JWT verification (`authenticate`) and role-gating (`authorize("admin", "manager")`). Tokens carry `{ id, email, role }` and expire in 8 hours.
- `src/middleware/validation.ts` — `validate(schema)` middleware factory using Zod. On failure returns 400 with per-field error details.
- `src/utils/logger.ts` — Winston logger. All logging goes through this, never `console.log`.
- `src/utils/helpers.ts` — `buildResponse()`, `calculatePagination()`, `isValidId()`.
- `src/types/index.ts` — Shared interfaces (InventoryItem, User, Supplier, AuditLog) and enums (UserRole, ItemCategory).
- `src/validateEnv.ts` — Validates JWT_SECRET, PORT, and LOG_LEVEL on startup.

## API Response Envelope

Every endpoint returns this shape:

```json
{
  "data": "<payload or null>",
  "error": "<message or null>",
  "meta": {
    "timestamp": "ISO 8601",
    "requestId": "uuid",
    "pagination": { "page": 1, "pageSize": 20, "totalItems": 100, "totalPages": 5 }
  }
}
```

New endpoints must use `buildResponse()` from `src/utils/helpers.ts` to produce this format.

## Key Conventions

- **Logging**: Use the Winston `logger` (`import { logger } from "../utils/logger"`). Never use `console.log`.
- **SQL**: All queries go in `src/db/queries.ts` with parameterized placeholders (`$1`, `$2`). Never concatenate user input into SQL. Never put raw SQL in route files.
- **Validation**: All request bodies are validated with Zod schemas defined in `src/middleware/validation.ts`. Replaces `req.body` with parsed output.
- **Auth pattern**: Routes stack middleware as `authenticate, authorize("admin", "manager"), validate(schema), handler`.
- **Error handling**: Every route handler wraps its logic in try-catch. On error, log with `logger.error()` and return 500 via `buildResponse(null, "Internal server error")`. Never expose stack traces.
- **Passwords**: Hashed with bcrypt (12 rounds). Never returned in responses — destructure out `password_hash` before sending.
- **TypeScript**: Strict mode enabled. Avoid `any`. Use `const`/`let`, never `var`.
- **Naming**: `camelCase` for variables/functions, `PascalCase` for types/interfaces, `snake_case` for database columns/tables.
- **IDs**: Database IDs are auto-incrementing integers. Validate with `isValidId()` before querying.
- **Dates**: Stored and returned in ISO 8601 UTC format.

## Database

Four tables: `suppliers`, `inventory_items`, `users`, `audit_log`. Schema is in `sql/schema.sql`.

- Tables use `snake_case` plural names. Indexes follow `idx_<table>_<column>`.
- `inventory_items` and `users` have auto-updating `updated_at` triggers.
- `category` is constrained to: electronics, furniture, office_supplies, raw_materials, finished_goods.
- `role` is constrained to: admin, manager, viewer.
- Seed data includes 5 suppliers, 23 items, and 3 test users (admin/manager/viewer, all with password `password123`).

## Roles

| Role | Can do |
|------|--------|
| admin | Full CRUD on items and users, delete items |
| manager | Create and update items |
| viewer | Read-only, access low-stock and report endpoints |

## Environment

Configured via `.env` (see `.env.example`):

- `JWT_SECRET` (required) — signing key for JWTs
- `PORT` — default 3000
- `LOG_LEVEL` — debug, info, warn, error (default: info)
- `PGLITE_DATA_DIR` — database storage directory (default: ./data)
