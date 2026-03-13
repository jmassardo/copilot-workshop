import { query, queryOne } from "./connection";
import {
  InventoryItem,
  CreateItemRequest,
  UpdateItemRequest,
  User,
  CreateUserRequest,
  InventorySummary,
  ReorderItem,
} from "../types";

// ─── Item Queries ───────────────────────────────────────────

export async function getAllItems(
  page: number = 1,
  pageSize: number = 20
): Promise<{ items: InventoryItem[]; total: number }> {
  const offset = (page - 1) * pageSize;

  const items = await query<InventoryItem>(
    `SELECT * FROM inventory_items
     ORDER BY name ASC
     LIMIT $1 OFFSET $2`,
    [pageSize, offset]
  );

  const countResult = await queryOne<{ count: string }>(
    "SELECT COUNT(*) as count FROM inventory_items"
  );
  const total = parseInt(countResult?.count || "0", 10);

  return { items, total };
}

export async function getItemById(
  id: number
): Promise<InventoryItem | null> {
  return queryOne<InventoryItem>(
    "SELECT * FROM inventory_items WHERE id = $1",
    [id]
  );
}

export async function createItem(
  item: CreateItemRequest
): Promise<InventoryItem> {
  const rows = await query<InventoryItem>(
    `INSERT INTO inventory_items
       (sku, name, description, category, quantity, unit_price,
        reorder_threshold, supplier_id, location)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      item.sku,
      item.name,
      item.description,
      item.category,
      item.quantity,
      item.unitPrice,
      item.reorderThreshold,
      item.supplierId,
      item.location,
    ]
  );
  return rows[0];
}

export async function updateItem(
  id: number,
  updates: UpdateItemRequest
): Promise<InventoryItem | null> {
  // Build dynamic SET clause from provided fields
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(updates.name);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(updates.description);
  }
  if (updates.category !== undefined) {
    fields.push(`category = $${paramIndex++}`);
    values.push(updates.category);
  }
  if (updates.quantity !== undefined) {
    fields.push(`quantity = $${paramIndex++}`);
    values.push(updates.quantity);
  }
  if (updates.unitPrice !== undefined) {
    fields.push(`unit_price = $${paramIndex++}`);
    values.push(updates.unitPrice);
  }
  if (updates.reorderThreshold !== undefined) {
    fields.push(`reorder_threshold = $${paramIndex++}`);
    values.push(updates.reorderThreshold);
  }
  if (updates.location !== undefined) {
    fields.push(`location = $${paramIndex++}`);
    values.push(updates.location);
  }

  if (fields.length === 0) return getItemById(id);

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const rows = await query<InventoryItem>(
    `UPDATE inventory_items
     SET ${fields.join(", ")}
     WHERE id = $${paramIndex}
     RETURNING *`,
    values
  );

  return rows.length > 0 ? rows[0] : null;
}

export async function deleteItem(id: number): Promise<boolean> {
  const rows = await query<{ id: number }>(
    "DELETE FROM inventory_items WHERE id = $1 RETURNING id",
    [id]
  );
  return rows.length > 0;
}

export async function getLowStockItems(): Promise<InventoryItem[]> {
  return query<InventoryItem>(
    `SELECT * FROM inventory_items
     WHERE quantity <= reorder_threshold
     ORDER BY quantity ASC`
  );
}

// ─── User Queries ───────────────────────────────────────────

export async function getUserByEmail(
  email: string
): Promise<User | null> {
  return queryOne<User>("SELECT * FROM users WHERE email = $1", [email]);
}

export async function getUserById(id: number): Promise<User | null> {
  return queryOne<User>("SELECT * FROM users WHERE id = $1", [id]);
}

export async function createUser(user: CreateUserRequest & { passwordHash: string }): Promise<User> {
  const rows = await query<User>(
    `INSERT INTO users (email, password_hash, first_name, last_name, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user.email, user.passwordHash, user.firstName, user.lastName, user.role]
  );
  return rows[0];
}

export async function getAllUsers(): Promise<Omit<User, "passwordHash">[]> {
  return query(
    `SELECT id, email, first_name, last_name, role, last_login_at, created_at, updated_at
     FROM users ORDER BY last_name, first_name`
  );
}

export async function updateLastLogin(userId: number): Promise<void> {
  await query("UPDATE users SET last_login_at = NOW() WHERE id = $1", [userId]);
}

// ─── Report Queries ─────────────────────────────────────────

export async function getInventorySummary(): Promise<InventorySummary> {
  const summary = await queryOne<{
    total_items: string;
    total_value: string;
    low_stock_count: string;
    out_of_stock_count: string;
  }>(
    `SELECT
       COUNT(*) as total_items,
       COALESCE(SUM(quantity * unit_price), 0) as total_value,
       COUNT(*) FILTER (WHERE quantity <= reorder_threshold AND quantity > 0) as low_stock_count,
       COUNT(*) FILTER (WHERE quantity = 0) as out_of_stock_count
     FROM inventory_items`
  );

  const categories = await query<{ category: string; count: string }>(
    `SELECT category, COUNT(*) as count
     FROM inventory_items
     GROUP BY category
     ORDER BY category`
  );

  const categoryCounts: Record<string, number> = {};
  for (const row of categories) {
    categoryCounts[row.category] = parseInt(row.count, 10);
  }

  return {
    totalItems: parseInt(summary?.total_items || "0", 10),
    totalValue: parseFloat(summary?.total_value || "0"),
    lowStockCount: parseInt(summary?.low_stock_count || "0", 10),
    outOfStockCount: parseInt(summary?.out_of_stock_count || "0", 10),
    categoryCounts,
  };
}

export async function getReorderReport(): Promise<ReorderItem[]> {
  return query<ReorderItem>(
    `SELECT
       i.id, i.sku, i.name, i.quantity, i.reorder_threshold,
       s.name as supplier_name, s.contact_email as supplier_email
     FROM inventory_items i
     JOIN suppliers s ON i.supplier_id = s.id
     WHERE i.quantity <= i.reorder_threshold
     ORDER BY (i.quantity::float / NULLIF(i.reorder_threshold, 0)) ASC`
  );
}
