import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";
import { logger } from "../utils/logger";

/**
 * Middleware factory that validates the request body against a Zod schema.
 *
 * Usage:
 *   router.post('/items', validate(CreateItemSchema), createItemHandler);
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      logger.warn("Validation failed", { errors });

      res.status(400).json({
        data: null,
        error: "Validation failed",
        meta: {
          timestamp: new Date().toISOString(),
          requestId: "",
          validationErrors: errors,
        },
      });
      return;
    }

    req.body = result.data;
    next();
  };
}

// ─── Validation Schemas ─────────────────────────────────────

export const CreateItemSchema = z.object({
  sku: z.string().min(3).max(50),
  name: z.string().min(1).max(200),
  description: z.string().max(2000).default(""),
  category: z.enum([
    "electronics",
    "furniture",
    "office_supplies",
    "raw_materials",
    "finished_goods",
  ]),
  quantity: z.number().int().min(0),
  unitPrice: z.number().positive(),
  reorderThreshold: z.number().int().min(0),
  supplierId: z.number().int().positive(),
  location: z.string().min(1).max(100),
});

export const UpdateItemSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z
    .enum([
      "electronics",
      "furniture",
      "office_supplies",
      "raw_materials",
      "finished_goods",
    ])
    .optional(),
  quantity: z.number().int().min(0).optional(),
  unitPrice: z.number().positive().optional(),
  reorderThreshold: z.number().int().min(0).optional(),
  location: z.string().min(1).max(100).optional(),
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(["admin", "manager", "viewer"]),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
