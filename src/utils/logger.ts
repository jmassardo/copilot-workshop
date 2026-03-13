import winston from "winston";

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

/**
 * Application logger using Winston.
 *
 * Log levels (from most to least severe):
 *   error > warn > info > http > debug
 *
 * Usage:
 *   import { logger } from './utils/logger';
 *   logger.info('Server started', { port: 3000 });
 *   logger.error('Database connection failed', { error: err.message });
 */
export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "inventory-tracker" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length > 1
            ? ` ${JSON.stringify(meta)}`
            : "";
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        })
      ),
    }),
  ],
});
