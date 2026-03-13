---
title: "SQL Query Review"
description: "Review a SQL query for performance, correctness, and best practices"
mode: "ask"
---

Review the following SQL query for the Inventory Tracker database:

#selection

Check for:
1. **Performance**: Missing indexes, full table scans, N+1 patterns
2. **Correctness**: Logic errors, edge cases (NULLs, empty results)
3. **Security**: SQL injection risks, unparameterized inputs
4. **Best Practices**: Naming conventions, readability, comments
5. **Optimization**: Suggest EXPLAIN ANALYZE if the query is non-trivial

Reference the database schema from #file:sql/schema.sql for table structure and existing indexes.

Provide the improved query with comments explaining each change.
