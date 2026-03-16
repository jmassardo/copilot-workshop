import { logger } from "./utils/logger";

/**
 * Validate required and optional environment variables on startup.
 * Logs warnings for missing optional variables and throws for
 * critically misconfigured values.
 */
export function validateEnv(): void {
  const warnings: string[] = [];

  // JWT_SECRET should be set in production
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "change-me-in-production") {
    warnings.push("JWT_SECRET is not set or using default — change this in production!");
  }

  // PORT should be a valid number if set
  if (process.env.PORT) {
    const port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid PORT: ${process.env.PORT}. Must be between 1 and 65535.`);
    }
  }

  // LOG_LEVEL should be a recognized value if set
  const validLogLevels = ["error", "warn", "info", "http", "debug"];
  if (process.env.LOG_LEVEL && !validLogLevels.includes(process.env.LOG_LEVEL)) {
    warnings.push(`LOG_LEVEL '${process.env.LOG_LEVEL}' is not recognized. Valid: ${validLogLevels.join(", ")}`);
  }

  // Report warnings
  for (const w of warnings) {
    logger.warn(`[env] ${w}`);
  }

  if (warnings.length === 0) {
    logger.info("Environment variables validated successfully");
  }
}
