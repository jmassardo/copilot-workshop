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
  unit_price: number;
  reorder_threshold: number;
  supplier_id: number;
  location: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Supplier {
  id: number;
  name: string;
  contact_email: string;
  phone: string;
  address: string;
  created_at: Date;
}

export interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  details: Record<string, unknown>;
  created_at: Date;
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
  notes?: string;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  category?: ItemCategory;
  quantity?: number;
  unitPrice?: number;
  reorderThreshold?: number;
  location?: string;
  notes?: string;
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
  user: Omit<User, "password_hash">;
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
  reorder_threshold: number;
  supplier_name: string;
  supplier_email: string;
}
