import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
import itemRoutes from "./routes/items";
import userRoutes from "./routes/users";
import reportRoutes from "./routes/reports";

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// ─── Security Middleware ────────────────────────────────────

app.use(helmet());
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

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 Handler ────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    data: null,
    error: "Endpoint not found",
    meta: { timestamp: new Date().toISOString(), requestId: "" },
  });
});

// ─── Error Handler ──────────────────────────────────────────

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error("Unhandled error", { error: err.message, stack: err.stack });
  res.status(500).json({
    data: null,
    error: "Internal server error",
    meta: { timestamp: new Date().toISOString(), requestId: "" },
  });
});

// ─── Start Server ───────────────────────────────────────────

app.listen(PORT, () => {
  logger.info(`Inventory Tracker API running on port ${PORT}`);
});

export default app;
