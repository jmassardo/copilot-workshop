# Project Context
This is a Node.js REST API for inventory management built with TypeScript, Express, and PostgreSQL.

## Architecture
- Express routes in `src/routes/` handle HTTP requests
- Database access goes through `src/db/` — never put raw SQL in route handlers
- Authentication uses JWT via middleware in `src/middleware/auth.ts`
- Request validation uses Zod schemas in `src/middleware/validation.ts`
- Logging goes through the Winston logger in `src/utils/logger.ts`

## Conventions
- Use camelCase for variables and functions, PascalCase for types and interfaces
- All API responses use the `{ data, error, meta }` envelope format
- Parameterized queries only — never concatenate user input into SQL
- All endpoints except `GET /api/items` require authentication
- Dates are stored and returned in ISO 8601 format (UTC)
- Error messages should be human-readable (never expose stack traces)

## What Copilot Should Always Do
- Follow the existing patterns in the codebase
- Use the shared `logger` for logging, not `console.log`
- Include proper TypeScript types (avoid `any`)
- Add JSDoc comments to exported functions

## What Copilot Should Never Do
- Suggest `console.log` for logging (use `logger` instead)
- Generate raw SQL in route handler files
- Expose internal error details in API responses
- Use `var` — always use `const` or `let`
