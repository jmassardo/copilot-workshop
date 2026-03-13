/**
 * TypeScript type definitions for the Inventory Tracker API.
 *
 * All API responses follow the standard envelope format:
 *   { data, error, meta }
 */

// ─── Database Models ────────────────────────────────────────

export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  reorderThreshold: number;
  supplierId: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: number;
  name: string;
  contactEmail: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface AuditLog {
  id: number;
  userId: number;
  action: string;
  entityType: string;
  entityId: number;
  details: Record<string, unknown>;
  createdAt: Date;
}

// ─── Enums ──────────────────────────────────────────────────

export type UserRole = "admin" | "manager" | "viewer";

export type ItemCategory =
  | "electronics"
  | "furniture"
  | "office_supplies"
  | "raw_materials"
  | "finished_goods";

// ─── API Request/Response Types ─────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta: ApiMeta;
}

export interface ApiMeta {
  timestamp: string;
  requestId: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface CreateItemRequest {
  sku: string;
  name: string;
  description: string;
  category: ItemCategory;
  quantity: number;
  unitPrice: number;
  reorderThreshold: number;
  supplierId: number;
  location: string;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  category?: ItemCategory;
  quantity?: number;
  unitPrice?: number;
  reorderThreshold?: number;
  location?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, "passwordHash">;
}

// ─── Report Types ───────────────────────────────────────────

export interface InventorySummary {
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoryCounts: Record<string, number>;
}

export interface ReorderItem {
  id: number;
  sku: string;
  name: string;
  quantity: number;
  reorderThreshold: number;
  supplierName: string;
  supplierEmail: string;
}
