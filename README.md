# Inventory Tracker API

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![PGlite](https://img.shields.io/badge/PGlite-embedded_PostgreSQL-336791)](https://electric-sql.com/product/pglite)

A lightweight REST API for managing product inventory, built with Node.js, TypeScript, and Express. Uses PostgreSQL for data storage.

> **Workshop repo** — This repository is the companion project for the [GitHub Copilot: Context Mastery & Beyond Developers](docs/workshop-syllabus.md) hands-on workshop. Clone it before the session starts.

## Overview

This application provides a complete inventory management system for a small warehouse operation. It tracks products, stock levels, suppliers, and generates reports on inventory health.

The codebase intentionally includes multiple file types (TypeScript, SQL, Markdown, JSON) and role-relevant content (status reports, review templates, API docs) so that every workshop attendee — developer, PM, tech writer, DBA, or manager — has realistic material to work with.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Client     │────▶│  Express API │────▶│  PostgreSQL  │
│  (REST)      │◀────│  (Node.js)   │◀────│  Database    │
└─────────────┘     └──────────────┘     └──────────────┘
```

### Key Components

- **`src/index.ts`** — Application entry point, Express server setup with security middleware
- **`src/routes/`** — Route handlers for items, users, and reports
- **`src/middleware/`** — JWT authentication and Zod request validation
- **`src/db/`** — Embedded PGlite database connection and parameterized query functions
- **`src/types/`** — Shared TypeScript interfaces and types
- **`src/utils/`** — Logging (Winston) and response helpers

### Supporting Content

- **`sql/`** — Database schema, seed data, and common reporting queries
- **`docs/`** — API reference, architecture overview, getting-started guide, and the workshop syllabus
- **`reports/`** — Sample status report for PM/manager exercises
- **`reviews/`** — Self-assessment template for manager exercises
- **`exercises/`** — Step-by-step exercise guides for the workshop
- **`examples/`** — Example solutions for workshop exercises (instructions, prompts, chat modes)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/jmassardo/copilot-workshop.git
cd copilot-workshop

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if you want to change defaults (no database setup needed!)

# Start the development server (database auto-initializes on first run)
npm run dev
```

See [docs/getting-started.md](docs/getting-started.md) for the full setup guide with troubleshooting.

## API Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/items` | List all inventory items (paginated) | Public |
| GET | `/api/items/:id` | Get a specific item | Public |
| POST | `/api/items` | Create a new item | Admin/Manager |
| PUT | `/api/items/:id` | Update an item | Admin/Manager |
| DELETE | `/api/items/:id` | Delete an item | Admin only |
| GET | `/api/items/low-stock` | Items below reorder threshold | Authenticated |
| GET | `/api/users` | List all users | Admin only |
| POST | `/api/users` | Create a new user | Admin only |
| POST | `/api/users/login` | Authenticate and get JWT | Public |
| GET | `/api/reports/inventory-summary` | Inventory overview stats | Authenticated |
| GET | `/api/reports/reorder` | Items needing reorder | Authenticated |
| GET | `/health` | Health check | Public |

All responses use the standard envelope: `{ data, error, meta }`. See [docs/api-reference.md](docs/api-reference.md) for full details.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port |
| `PGLITE_DATA_DIR` | No | `./data` | Directory for embedded database files |
| `JWT_SECRET` | Yes | — | Secret key for JWT signing |
| `LOG_LEVEL` | No | `info` | Logging level (debug, info, warn, error) |

## Scripts

```bash
npm run dev      # Start development server with hot-reload
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled JavaScript from dist/
npm test         # Run tests with coverage
npm run lint     # Lint TypeScript source files
```

## Project Conventions

- **Language**: TypeScript with strict mode
- **Naming**: `camelCase` for variables/functions, `PascalCase` for types/interfaces
- **API responses**: Always use `{ data, error, meta }` envelope format
- **Database**: Parameterized queries only — no string concatenation in SQL
- **Validation**: Zod schemas for all request bodies
- **Auth**: JWT tokens with role-based access (admin, manager, viewer)
- **Logging**: Winston logger — never use `console.log`

## Workshop Usage

This repository is designed for a **3-hour guided workshop** that teaches GitHub Copilot's context model to mixed audiences (developers, PMs, tech writers, DBAs, managers).

### Workshop Structure

| Block | Topic | Time |
|-------|-------|------|
| 0 | Welcome & Setup Check | 15 min |
| 1 | Copilot for Everyone | 40 min |
| 2 | The Context Model | 30 min |
| — | Break | 15 min |
| 3 | Instructions & Prompt Files | 30 min |
| 4 | Skills, Agents & MCP | 30 min |
| 5 | Capstone Exercise | 15 min |
| — | Q&A + Wrap-Up | 10 min |

### Key Workshop Resources

- **[Workshop Syllabus](docs/workshop-syllabus.md)** — Full facilitator guide with talking points and demo scripts
- **[Exercises](exercises/)** — Step-by-step exercise guides for attendees
- **[Example Solutions](examples/)** — Reference solutions for every exercise
- **[API Reference](docs/api-reference.md)** — Complete API documentation
- **[Architecture](docs/architecture.md)** — System design and decision rationale
- **[Getting Started](docs/getting-started.md)** — Local development setup

### What Attendees Will Create

During the workshop, attendees create three types of Copilot context files:

1. **Repository Instructions** (`.github/copilot-instructions.md`) — Automatically included in every Copilot interaction
2. **Prompt Files** (`.github/prompts/*.prompt.md`) — Reusable, on-demand task prompts
3. **Scoped Instructions** (`*.instructions.md` files) — Auto-applied when working on matching files

Example solutions for each are in the [`examples/`](examples/) directory.

## Documentation

- [Getting Started](docs/getting-started.md) — Setup and first run
- [API Reference](docs/api-reference.md) — All endpoints with examples
- [User Guide](docs/user-guide.md) — How-to guide for warehouse managers
- [Architecture](docs/architecture.md) — Design decisions and structure
- [Workshop Syllabus](docs/workshop-syllabus.md) — Facilitator guide

## License

This project is provided for educational and workshop purposes.
