import fs from "fs";
import path from "path";
import { db, queryOne } from "./connection";
import { logger } from "../utils/logger";

/**
 * Initialize the embedded PGlite database.
 *
 * On first run, executes schema.sql and seed-data.sql to set up all tables
 * and populate sample data. On subsequent runs, detects existing tables and
 * skips initialization — your data persists in the `data/` directory.
 *
 * Delete the `data/` directory to start fresh.
 */
export async function initDatabase(): Promise<void> {
  // Wait for PGlite to be ready
  await db.waitReady;

  // Check if schema already exists
  const existing = await queryOne<{ exists: boolean }>(
    `SELECT EXISTS (
       SELECT FROM information_schema.tables
       WHERE table_name = 'inventory_items'
     ) as exists`
  );

  if (existing?.exists) {
    logger.info("Database already initialized — skipping setup");
    return;
  }

  logger.info("First run detected — initializing database...");

  // Read and execute schema
  const schemaPath = path.join(process.cwd(), "sql", "schema.sql");
  let schemaSql = fs.readFileSync(schemaPath, "utf-8");

  // PGlite doesn't bundle uuid-ossp by default; strip the extension line
  // (it's only marked "for future use" in the schema)
  schemaSql = schemaSql.replace(
    /CREATE EXTENSION IF NOT EXISTS "uuid-ossp";/g,
    "-- uuid-ossp extension skipped (not needed with PGlite)"
  );

  await db.exec(schemaSql);
  logger.info("Schema created successfully");

  // Read and execute seed data
  const seedPath = path.join(process.cwd(), "sql", "seed-data.sql");
  const seedSql = fs.readFileSync(seedPath, "utf-8");

  await db.exec(seedSql);
  logger.info("Seed data loaded successfully");

  logger.info("Database initialization complete");
}
