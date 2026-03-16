import { Router, Request, Response } from "express";
import {
  getAllItems,
  getItemById,
  getItemBySku,
  getSupplierById,
  getItemCountByCategory,
  getAuditLogForItem,
  createItem,
  updateItem,
  deleteItem,
  getLowStockItems,
} from "../db/queries";
import { authenticate, authorize } from "../middleware/auth";
import { validate, CreateItemSchema, UpdateItemSchema } from "../middleware/validation";
import { buildResponse, calculatePagination, isValidId, invalidIdMessage } from "../utils/helpers";
import { logger } from "../utils/logger";

const router = Router();

/**
 * GET /api/items
 * List all inventory items (public — no auth required).
 * Supports pagination via ?page=1&pageSize=20
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
    const category = req.query.category as string | undefined;

    const { items, total } = await getAllItems(page, pageSize, category);
    const pagination = calculatePagination(page, pageSize, total);

    res.json(buildResponse(items, null, pagination));
  } catch (err) {
    logger.error("Failed to fetch items", { error: err });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * GET /api/items/low-stock
 * Items below their reorder threshold (auth required).
 */
router.get("/low-stock", authenticate, async (_req: Request, res: Response) => {
  try {
    const items = await getLowStockItems();
    res.json(buildResponse(items));
  } catch (err) {
    logger.error("Failed to fetch low stock items", { error: err });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * GET /api/items/count-by-category
 * Returns item count grouped by category (public).
 */
router.get("/count-by-category", async (_req: Request, res: Response) => {
  try {
    const counts = await getItemCountByCategory();
    res.json(buildResponse(counts));
  } catch (err) {
    logger.error("Failed to fetch category counts", { error: err });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * GET /api/items/:id/history
 * Get the audit log history for a specific item (auth required).
 */
router.get("/:id/history", authenticate, async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json(buildResponse(null, invalidIdMessage("item ID", req.params.id)));
      return;
    }

    const item = await getItemById(parseInt(req.params.id));
    if (!item) {
      res.status(404).json(buildResponse(null, "Item not found"));
      return;
    }

    const history = await getAuditLogForItem(parseInt(req.params.id));
    res.json(buildResponse(history));
  } catch (err) {
    logger.error("Failed to fetch item history", { error: err, id: req.params.id });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * GET /api/items/:id
 * Get a single item by ID (public).
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json(buildResponse(null, invalidIdMessage("item ID", req.params.id)));
      return;
    }

    const item = await getItemById(parseInt(req.params.id));

    if (!item) {
      res.status(404).json(buildResponse(null, "Item not found"));
      return;
    }

    res.json(buildResponse(item));
  } catch (err) {
    logger.error("Failed to fetch item", { error: err, id: req.params.id });
    res.status(500).json(buildResponse(null, "Internal server error"));
  }
});

/**
 * POST /api/items
 * Create a new inventory item (admin or manager only).
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "manager"),
  validate(CreateItemSchema),
  async (req: Request, res: Response) => {
    try {
      const existing = await getItemBySku(req.body.sku);
      if (existing) {
        res.status(409).json(buildResponse(null, `An item with SKU '${req.body.sku}' already exists (item #${existing.id}: ${existing.name})`));
        return;
      }

      if (req.body.supplierId) {
        const supplier = await getSupplierById(req.body.supplierId);
        if (!supplier) {
          res.status(400).json(buildResponse(null, `Supplier with ID ${req.body.supplierId} does not exist`));
          return;
        }
      }

      const item = await createItem(req.body);
      logger.info("Item created", { sku: item.sku, id: item.id });
      res.status(201).json(buildResponse(item));
    } catch (err) {
      logger.error("Failed to create item", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * PUT /api/items/:id
 * Update an existing item (admin or manager only).
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin", "manager"),
  validate(UpdateItemSchema),
  async (req: Request, res: Response) => {
    try {
      if (!isValidId(req.params.id)) {
        res.status(400).json(buildResponse(null, invalidIdMessage("item ID", req.params.id)));
        return;
      }

      const item = await updateItem(parseInt(req.params.id), req.body);

      if (!item) {
        res.status(404).json(buildResponse(null, "Item not found"));
        return;
      }

      logger.info("Item updated", { id: item.id });
      res.json(buildResponse(item));
    } catch (err) {
      logger.error("Failed to update item", { error: err, id: req.params.id });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * PATCH /api/items/:id
 * Partially update an inventory item (admin or manager only).
 * Unlike PUT, PATCH only requires the fields being changed.
 */
router.patch(
  "/:id",
  authenticate,
  authorize("admin", "manager"),
  validate(UpdateItemSchema),
  async (req: Request, res: Response) => {
    try {
      if (!isValidId(req.params.id)) {
        res.status(400).json(buildResponse(null, invalidIdMessage("item ID", req.params.id)));
        return;
      }

      const item = await updateItem(parseInt(req.params.id), req.body);

      if (!item) {
        res.status(404).json(buildResponse(null, "Item not found"));
        return;
      }

      logger.info("Item patched", { id: item.id });
      res.json(buildResponse(item));
    } catch (err) {
      logger.error("Failed to patch item", { error: err, id: req.params.id });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * DELETE /api/items/:id
 * Delete an item (admin only).
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  async (req: Request, res: Response) => {
    try {
      if (!isValidId(req.params.id)) {
        res.status(400).json(buildResponse(null, invalidIdMessage("item ID", req.params.id)));
        return;
      }

      const deleted = await deleteItem(parseInt(req.params.id));

      if (!deleted) {
        res.status(404).json(buildResponse(null, "Item not found"));
        return;
      }

      logger.info("Item deleted", { id: req.params.id });
      res.json(buildResponse({ deleted: true }));
    } catch (err) {
      logger.error("Failed to delete item", { error: err, id: req.params.id });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

export default router;
