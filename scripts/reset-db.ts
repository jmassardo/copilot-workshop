import fs from "fs";
import path from "path";

/**
 * Reset the PGlite database by deleting the data directory.
 * The database will be re-initialized with schema and seed data
 * on the next server startup.
 */
const dataDir = process.env.PGLITE_DATA_DIR || path.join(process.cwd(), "data");

if (fs.existsSync(dataDir)) {
  fs.rmSync(dataDir, { recursive: true, force: true });
  console.log(`Database reset: removed ${dataDir}`);
  console.log("Run 'npm run dev' to re-initialize with fresh data.");
} else {
  console.log("No database directory found — nothing to reset.");
}
