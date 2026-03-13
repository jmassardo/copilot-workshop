# Architecture Overview

## System Design

The Inventory Tracker API follows a standard layered architecture:

```
┌──────────────────────────────────────────────────────┐
│                    Client (REST)                      │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  Express Server                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Middleware  │  │   Routes    │  │   Logging   │  │
│  │  (auth,     │──│  (items,    │──│  (winston)  │  │
│  │  validate,  │  │   users,    │  │             │  │
│  │  rate limit)│  │   reports)  │  │             │  │
│  └─────────────┘  └──────┬──────┘  └─────────────┘  │
└──────────────────────────┼───────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────┐
│                  Database Layer                        │
│  ┌─────────────┐  ┌─────────────────────────────┐    │
│  │  Connection  │  │  Query Module               │    │
│  │  Pool (pg)   │──│  (parameterized queries)    │    │
│  └─────────────┘  └─────────────────────────────┘    │
└──────────────────────────┬───────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────┐
│                    PostgreSQL                          │
│  Tables: inventory_items, users, suppliers,           │
│          audit_log                                     │
└──────────────────────────────────────────────────────┘
```

## Directory Structure

```
copilot-workshop/
├── src/
│   ├── index.ts              # Entry point, Express app setup
│   ├── routes/
│   │   ├── items.ts          # Inventory item CRUD endpoints
│   │   ├── users.ts          # User management + auth endpoints
│   │   └── reports.ts        # Reporting endpoints
│   ├── db/
│   │   ├── connection.ts     # PostgreSQL connection pool
│   │   └── queries.ts        # All database query functions
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication + authorization
│   │   └── validation.ts     # Zod request validation schemas
│   ├── utils/
│   │   ├── logger.ts         # Winston logging configuration
│   │   └── helpers.ts        # Response builders, pagination
│   └── types/
│       └── index.ts          # TypeScript interfaces and types
├── sql/
│   ├── schema.sql            # Database table definitions
│   ├── seed-data.sql         # Sample data for development
│   └── queries/
│       └── common-reports.sql # Useful ad-hoc reporting queries
├── docs/
│   ├── getting-started.md    # Setup guide
│   ├── api-reference.md      # Full API documentation
│   └── architecture.md       # This file
├── reports/                  # Report templates
├── reviews/                  # Performance review templates
└── exercises/                # Workshop exercise guides
```

## Design Decisions

### Why Express?
Express is the most widely used Node.js web framework. Its middleware pattern makes it easy to compose auth, validation, logging, and rate limiting without coupling them to route logic.

### Why PostgreSQL?
PostgreSQL provides robust SQL support, JSON columns for flexible data, and excellent performance for the read-heavy queries this inventory system needs. The `pg` library gives us connection pooling out of the box.

### Why Zod for Validation?
Zod provides TypeScript-first schema validation. Unlike class-validator or joi, Zod schemas can be directly inferred as TypeScript types, reducing duplication between runtime validation and compile-time types.

### API Response Envelope
Every response uses `{ data, error, meta }`:
- Consistent for clients to parse
- `meta.pagination` is present on list endpoints
- `error` is always a human-readable string (never a stack trace)
- `meta.requestId` enables log correlation

### Authentication Strategy
JWT tokens with 8-hour expiry. Bcrypt for password hashing with 12 salt rounds. Role-based access control with three roles: admin, manager, viewer.

## Security Considerations

- All user input validated via Zod schemas before reaching route handlers
- Parameterized queries prevent SQL injection
- Rate limiting at 100 requests per 15 minutes per IP
- Helmet adds security headers (X-Frame-Options, CSP, etc.)
- Passwords hashed with bcrypt (12 rounds)
- JWT secret must be configured via environment variable
- CORS enabled but should be restricted in production
