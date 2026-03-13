# Exercise 3: Create Instructions Files

**Block**: 3 — Instructions & Prompt Files  
**Time**: 10 minutes  
**Goal**: Create both a repo-level and a scoped instructions file

---

## Background

Instructions files provide **persistent context** that Copilot includes automatically. There are two types:

| Type | Location | When Applied |
|------|----------|-------------|
| **Repo-level** | `.github/copilot-instructions.md` | Every Copilot chat interaction |
| **Scoped** | `*.instructions.md` with `applyTo` front matter | Only when working on matching files |

---

## Part 1: Create Repo-Level Instructions

Create the file `.github/copilot-instructions.md` with 5-10 lines describing the project and your role's conventions.

### How to Create It

1. In VS Code, create the file: `.github/copilot-instructions.md`
2. Write content tailored to your role (see examples below)

### Example: Developer-Focused

```markdown
# Project Context
This is a Node.js REST API for inventory management using TypeScript, Express, and PostgreSQL.

## Conventions
- Use camelCase for variables, PascalCase for types
- All API responses follow the { data, error, meta } envelope format
- Database queries use the `db` module in src/db/ — no raw SQL in routes
- Logging uses the `logger` from src/utils/logger.ts
- Authentication uses JWT with the middleware in src/middleware/auth.ts
```

### Example: PM-Focused

```markdown
# Project Context
This is an inventory management system for a warehouse operations team.
The API supports product tracking, stock level monitoring, and reorder alerts.

## When Helping Me
- Explain technical concepts in business terms
- Reference API endpoints by their purpose, not their code path
- Frame suggestions in terms of user impact and business value
- When discussing features, include acceptance criteria format
```

### Example: DBA-Focused

```markdown
# Project Context
This project uses PostgreSQL 15 with a normalized schema.
Tables: inventory_items, users, suppliers, audit_log.

## SQL Conventions
- Always use parameterized queries (never concatenate user input)
- Include comments explaining complex joins or subqueries
- Prefix indexes with idx_ followed by table and column names
- Use TIMESTAMPTZ for all date/time columns
- All schema changes require a migration file in sql/
```

---

## Part 2: Create a Scoped Instructions File

Create a scoped `.instructions.md` file for a folder relevant to your role:

| Role | File to Create | `applyTo` Value | Content Ideas |
|------|---------------|----------------|--------------|
| **PM** | `reports/.instructions.md` | `reports/**` | Report format, status update template, stakeholder language |
| **Tech Writer** | `docs/.instructions.md` | `docs/**/*.md` | Style guide rules, heading conventions, link format |
| **DBA** | `sql/.instructions.md` | `sql/**/*.sql` | Naming conventions, index guidelines, always include comments |
| **Developer** | `src/.instructions.md` | `src/**/*.ts` | Architecture patterns, error handling, import order |
| **Manager** | `reviews/.instructions.md` | `reviews/**` | Performance review format, competency framework, tone |

### Scoped File Format

```markdown
---
applyTo: "your-glob-pattern-here"
---

Your instructions for files matching the glob pattern above.
Include at least 3 specific rules or conventions.
```

### Example: docs/.instructions.md

```markdown
---
applyTo: "docs/**/*.md"
---

When writing or editing documentation in this project:
- Use second person ("you") not third person
- Include code examples for every API endpoint or concept
- Use relative links for cross-references (e.g., [API Reference](api-reference.md))
- Structure docs with: Overview → Prerequisites → Steps → Troubleshooting
- Keep sentences short. Target a Grade 8 reading level.
```

---

## Part 3: Test It

1. Open a file that matches your scoped instructions glob pattern
2. Open Copilot Chat
3. Ask a question related to that file type
4. Notice how the instructions automatically shape the response

**Example test**: If you created `sql/.instructions.md`, open `sql/schema.sql` and ask Copilot:
> "Add a new table for tracking purchase orders"

The response should follow the conventions you specified.

---

## Checklist

- [ ] Created `.github/copilot-instructions.md` with project context
- [ ] Created a scoped `*.instructions.md` file with `applyTo` front matter
- [ ] Tested that instructions affect Copilot's responses
