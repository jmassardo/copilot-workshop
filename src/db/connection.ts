import { Pool, PoolConfig } from "pg";
import { logger } from "../utils/logger";

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

/**
 * PostgreSQL connection pool.
 *
 * All database access should go through this pool.
 * Do NOT create additional pools or direct connections.
 */
export const pool = new Pool(poolConfig);

pool.on("error", (err) => {
  logger.error("Unexpected database pool error", { error: err.message });
});

pool.on("connect", () => {
  logger.debug("New database connection established");
});

/**
 * Execute a parameterized query.
 *
 * Always use parameterized queries to prevent SQL injection.
 * Never concatenate user input into query strings.
 */
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug("Query executed", { text, duration, rows: result.rowCount });
    return result.rows as T[];
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
