---
applyTo: "sql/**/*.sql"
---

When writing or reviewing SQL for this project:

## Query Standards
- Always use parameterized queries — never concatenate user input
- Include a comment block at the top of every file explaining its purpose
- Comment any JOIN that isn't self-explanatory
- Use explicit column names — never `SELECT *` in production queries
- Alias tables in JOINs for readability: `inventory_items i`, `suppliers s`

## Naming Conventions
- Tables: snake_case, plural (`inventory_items`, not `InventoryItem`)
- Columns: snake_case (`unit_price`, `created_at`)
- Indexes: `idx_<table>_<column>` (e.g., `idx_items_sku`)
- Constraints: `chk_<table>_<rule>` for checks, `fk_<table>_<ref>` for foreign keys

## Schema Changes
- Every schema change gets its own migration file in `sql/`
- Include both the UP (apply) and DOWN (rollback) statements
- Never modify `schema.sql` directly — add a new migration file
- Test migrations against a copy of production data when possible

## Performance
- Add indexes for columns used in WHERE, JOIN, and ORDER BY clauses
- Use `EXPLAIN ANALYZE` to verify query plans before committing
- Prefer `EXISTS` over `IN` for subqueries
- Use partial indexes where the filter is selective (e.g., low-stock items)
