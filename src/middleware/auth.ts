import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

/**
 * Express middleware to verify JWT authentication.
 *
 * Expects the Authorization header in the format: Bearer <token>
 * On success, attaches the decoded user to req.user.
 * On failure, returns 401 Unauthorized.
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      data: null,
      error: "Authentication required. Provide a Bearer token.",
      meta: { timestamp: new Date().toISOString(), requestId: "" },
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Omit<User, "passwordHash">;
    (req as any).user = decoded;
    next();
  } catch (err) {
    logger.warn("Invalid authentication token", {
      error: err instanceof Error ? err.message : "Unknown error",
    });
    res.status(401).json({
      data: null,
      error: "Invalid or expired token.",
      meta: { timestamp: new Date().toISOString(), requestId: "" },
    });
  }
}

/**
 * Generate a JWT token for an authenticated user.
 */
export function generateToken(user: Omit<User, "passwordHash">): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

/**
 * Middleware to restrict access by user role.
 *
 * Usage: authorize("admin", "manager")
 */
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({
        data: null,
        error: "Insufficient permissions.",
        meta: { timestamp: new Date().toISOString(), requestId: "" },
      });
      return;
    }

    next();
  };
}
