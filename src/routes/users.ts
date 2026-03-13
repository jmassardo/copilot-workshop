import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { getAllUsers, getUserByEmail, createUser, updateLastLogin } from "../db/queries";
import { authenticate, authorize, generateToken } from "../middleware/auth";
import { validate, CreateUserSchema, LoginSchema } from "../middleware/validation";
import { buildResponse } from "../utils/helpers";
import { logger } from "../utils/logger";

const router = Router();
const SALT_ROUNDS = 12;

/**
 * GET /api/users
 * List all users (admin only). Excludes password hashes.
 */
router.get(
  "/",
  authenticate,
  authorize("admin"),
  async (_req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.json(buildResponse(users));
    } catch (err) {
      logger.error("Failed to fetch users", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * POST /api/users
 * Create a new user account (admin only).
 */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(CreateUserSchema),
  async (req: Request, res: Response) => {
    try {
      const existing = await getUserByEmail(req.body.email);
      if (existing) {
        res.status(409).json(buildResponse(null, "User with this email already exists"));
        return;
      }

      const passwordHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const user = await createUser({ ...req.body, passwordHash });

      // Strip password hash from response
      const { passwordHash: _, ...safeUser } = user;
      logger.info("User created", { email: user.email, role: user.role });
      res.status(201).json(buildResponse(safeUser));
    } catch (err) {
      logger.error("Failed to create user", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

/**
 * POST /api/auth/login
 * Authenticate and receive a JWT token.
 */
router.post(
  "/login",
  validate(LoginSchema),
  async (req: Request, res: Response) => {
    try {
      const user = await getUserByEmail(req.body.email);

      if (!user) {
        res.status(401).json(buildResponse(null, "Invalid email or password"));
        return;
      }

      const validPassword = await bcrypt.compare(req.body.password, user.passwordHash);

      if (!validPassword) {
        logger.warn("Failed login attempt", { email: req.body.email });
        res.status(401).json(buildResponse(null, "Invalid email or password"));
        return;
      }

      await updateLastLogin(user.id);

      const { passwordHash: _, ...safeUser } = user;
      const token = generateToken(safeUser);

      logger.info("User logged in", { email: user.email });
      res.json(buildResponse({ token, user: safeUser }));
    } catch (err) {
      logger.error("Login failed", { error: err });
      res.status(500).json(buildResponse(null, "Internal server error"));
    }
  }
);

export default router;
