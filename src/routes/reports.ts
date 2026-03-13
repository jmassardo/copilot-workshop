import { Router, Request, Response } from "express";
import { getInventorySummary, getReorderReport } from "../db/queries";
import { authenticate } from "../middleware/auth";
import { buildResponse } from "../utils/helpers";
import { logger } from "../utils/logger";

const router = Router();

/**
 * GET /api/reports/inventory-summary
 * Overview of inventory health: total items, value, low stock count.
 */
router.get(
  "/inventory-summary",
  authenticate,
  async (_req: Request, res: Response) => {
    try {
      const summary = await getInventorySummary();
      res.json(buildResponse(summary));
    } catch (err) {
      logger.error("Failed to generate inventory summary", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * GET /api/reports/reorder
 * Items that need to be reordered, sorted by urgency.
 * Includes supplier contact information for easy follow-up.
 */
router.get(
  "/reorder",
  authenticate,
  async (_req: Request, res: Response) => {
    try {
      const items = await getReorderReport();
      res.json(buildResponse(items));
    } catch (err) {
      logger.error("Failed to generate reorder report", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

export default router;
