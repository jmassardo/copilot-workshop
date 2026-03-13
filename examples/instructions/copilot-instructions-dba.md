# Project Context
This project uses PostgreSQL 15 with a normalized relational schema.
Primary tables: inventory_items, users, suppliers, audit_log.

## Database Architecture
- Connection pooling via `pg` library (max 20 connections)
- All queries go through `src/db/connection.ts` — parameterized only
- Schema defined in `sql/schema.sql`
- Seed data for development in `sql/seed-data.sql`
- Ad-hoc reporting queries in `sql/queries/`

## SQL Conventions
- Always use parameterized queries ($1, $2, etc.) — never concatenate user input
- Prefix indexes with `idx_` followed by table and column: `idx_items_sku`
- Use `TIMESTAMPTZ` for all date/time columns (not `TIMESTAMP`)
- Include comments for any query with JOINs or subqueries
- Table names are snake_case plural: `inventory_items`, `audit_log`
- Column names are snake_case: `unit_price`, `created_at`

## Performance Guidelines
- Suggest `EXPLAIN ANALYZE` for any non-trivial query
- Flag missing indexes for columns used in WHERE, JOIN, or ORDER BY
- Warn about full table scans on tables with > 1000 rows
- Prefer `COUNT(*) FILTER (WHERE ...)` over subqueries for conditional counts
- Use partial indexes where appropriate (e.g., low-stock items)

## When Helping Me
- Always show the query plan impact of suggestions
- Include rollback steps for any schema change
- Suggest migration files, not direct DDL commands
- Flag any query that might lock tables during execution
