import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./utils/logger";
import { initDatabase } from "./db/init";
import { query } from "./db/connection";
import itemRoutes from "./routes/items";
import userRoutes from "./routes/users";
import reportRoutes from "./routes/reports";
import supplierRoutes from "./routes/suppliers";

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// ─── Security Middleware ────────────────────────────────────

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(cors());

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    data: null,
    error: "Too many requests. Please try again later.",
    meta: { timestamp: new Date().toISOString(), requestId: "" },
  },
});
app.use(limiter);

// ─── Body Parsing ───────────────────────────────────────────

app.use(express.json({ limit: "10kb" }));

// ─── Request ID ──────────────────────────────────────────

app.use((req, _res, next) => {
  (req as any).requestId = req.headers["x-request-id"] as string || uuidv4();
  next();
});

// ─── Request Timing ─────────────────────────────────────────

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    res.setHeader("X-Response-Time", `${duration}ms`);
  });
  next();
});

// ─── Request Logging ────────────────────────────────────────

app.use((req, _res, next) => {
  logger.http(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  next();
});

// ─── Routes ─────────────────────────────────────────────────

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/suppliers", supplierRoutes);

// Health check
app.get("/health", async (_req, res) => {
  try {
    const result = await query<{ ok: number }>("SELECT 1 as ok");
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: result.length > 0 ? "connected" : "error",
    });
  } catch (err) {
    res.status(503).json({
      status: "degraded",
      timestamp: new Date().toISOString(),
      database: "disconnected",
    });
  }
});

// ─── Static UI ──────────────────────────────────────────────

app.use(express.static(path.join(process.cwd(), "public")));

// ─── 404 Handler ────────────────────────────────────────────

app.use((_req, res) => {
  const requestId = (_req as any).requestId || "";
  res.status(404).json({
    data: null,
    error: "Endpoint not found",
    meta: { timestamp: new Date().toISOString(), requestId },
  });
});

// ─── Error Handler ──────────────────────────────────────────

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const requestId = (_req as any).requestId || "";
  logger.error("Unhandled error", { error: err.message, stack: err.stack, requestId });
  res.status(500).json({
    data: null,
    error: "Internal server error",
    meta: { timestamp: new Date().toISOString(), requestId },
  });
});

// ─── Start Server ───────────────────────────────────────────

async function start() {
  await initDatabase();

  app.listen(PORT, () => {
    logger.info(`Inventory Tracker API running on port ${PORT}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", { error: err.message });
  process.exit(1);
});

export default app;
