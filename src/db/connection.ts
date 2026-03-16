import { PGlite } from "@electric-sql/pglite";
import { logger } from "../utils/logger";
import path from "path";

const dataDir = process.env.PGLITE_DATA_DIR || path.join(process.cwd(), "data");

/**
 * PGlite embedded PostgreSQL instance.
 *
 * All database access should go through the exported query helpers.
 * Data is stored in the local `data/` directory (no external PostgreSQL required).
 */
export const db = new PGlite(dataDir);

/**
 * Execute a parameterized query.
 *
 * Always use parameterized queries to prevent SQL injection.
 * Never concatenate user input into query strings.
 */
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const start = Date.now();
  try {
    const result = await db.query<T>(text, params);
    const duration = Date.now() - start;
    logger.debug("Query executed", { text, duration, rows: result.rows.length });
    return result.rows;
  } catch (error) {
    logger.error("Query failed", {
      text,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

/**
 * Execute a query and return a single row or null.
 */
export async function queryOne<T>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}
