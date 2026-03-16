import { Router, Request, Response } from "express";
import { getAllSuppliers, getSupplierById } from "../db/queries";
import { buildResponse } from "../utils/helpers";
import { isValidId, invalidIdMessage } from "../utils/helpers";
import { logger } from "../utils/logger";

const router = Router();

/**
 * GET /api/suppliers
 * List all suppliers (public).
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const suppliers = await getAllSuppliers();
    res.json(buildResponse(suppliers));
  } catch (err) {
    logger.error("Failed to fetch suppliers", { error: err });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * GET /api/suppliers/:id
 * Get a single supplier by ID (public).
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json(buildResponse(null, invalidIdMessage("supplier ID", req.params.id)));
      return;
    }

    const supplier = await getSupplierById(parseInt(req.params.id));

    if (!supplier) {
      res.status(404).json(buildResponse(null, "Supplier not found"));
      return;
    }

    res.json(buildResponse(supplier));
  } catch (err) {
    logger.error("Failed to fetch supplier", { error: err, id: req.params.id });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

export default router;
