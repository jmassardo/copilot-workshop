# Inventory Tracker — User Guide

This guide explains how to use the Inventory Tracker API as a warehouse manager. All examples use `curl`, but any HTTP client (Postman, Insomnia, etc.) works equally well.

**Base URL**: `http://localhost:3000`

---

## Getting Started: Authentication

Most operations require you to log in first and include a token with each request.

### Log In

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "manager@example.com", "password": "yourpassword"}'
```

The response includes a `token` you will use for all authenticated requests:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 2,
      "email": "manager@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "manager"
    }
  }
}
```

Save the token value and add it to every subsequent request as a header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Inventory Management

### View All Inventory Items

Retrieve a paginated list of all items in the warehouse. No authentication is required.

```bash
curl "http://localhost:3000/api/items?page=1&pageSize=20"
```

**Filter by category** (e.g., show only electronics):

```bash
curl "http://localhost:3000/api/items?category=electronics"
```

### View a Single Item

```bash
curl http://localhost:3000/api/items/42
```

### View an Item's Change History

Track every change made to an item, including who changed it and when:

```bash
curl http://localhost:3000/api/items/42/history \
  -H "Authorization: Bearer <token>"
```

### Add a New Item

Requires **admin** or **manager** role.

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "FURN-042",
    "name": "Standing Desk",
    "description": "Adjustable height standing desk, 60 inch",
    "category": "furniture",
    "quantity": 12,
    "unitPrice": 449.99,
    "reorderThreshold": 5,
    "supplierId": 2,
    "location": "Warehouse C, Bay 7"
  }'
```

**Important**: The `sku` must be unique. If the SKU already exists, the API returns a `409 Conflict` error. The `supplierId` must refer to an existing supplier — use the [supplier list](#list-all-suppliers) to find valid IDs.

### Update an Item

Use `PUT` to replace all fields, or `PATCH` to update only the fields you specify.

**Update quantity only (partial update with PATCH)**:

```bash
curl -X PATCH http://localhost:3000/api/items/42 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 25}'
```

**Replace all item details (full update with PUT)**:

```bash
curl -X PUT http://localhost:3000/api/items/42 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "FURN-042",
    "name": "Standing Desk Pro",
    "description": "Adjustable height standing desk, 72 inch",
    "category": "furniture",
    "quantity": 10,
    "unitPrice": 499.99,
    "reorderThreshold": 5,
    "supplierId": 2,
    "location": "Warehouse C, Bay 8"
  }'
```

### Delete an Item

Requires **admin** role.

```bash
curl -X DELETE http://localhost:3000/api/items/42 \
  -H "Authorization: Bearer <token>"
```

---

## Stock Monitoring

### Check for Low Stock Items

Retrieve all items where current quantity is at or below the reorder threshold:

```bash
curl http://localhost:3000/api/items/low-stock \
  -H "Authorization: Bearer <token>"
```

Review the `quantity` and `reorderThreshold` fields in each result to understand how urgently each item needs attention.

### Get a Full Reorder Report

Generate a prioritized list of items that need to be reordered, complete with supplier contact information:

```bash
curl http://localhost:3000/api/reports/reorder \
  -H "Authorization: Bearer <token>"
```

Items are sorted by urgency, so the most critical shortages appear first. Use the supplier contact details in the response to place orders directly.

---

## Supplier Management

### List All Suppliers

```bash
curl http://localhost:3000/api/suppliers \
  -H "Authorization: Bearer <token>"
```

The response lists each supplier's `id`, `name`, and contact details. Use the `id` values when adding or updating inventory items.

### View a Specific Supplier

```bash
curl http://localhost:3000/api/suppliers/3 \
  -H "Authorization: Bearer <token>"
```

---

## Reporting

### Get an Inventory Summary

Get a high-level overview of the current inventory health:

```bash
curl http://localhost:3000/api/reports/inventory-summary \
  -H "Authorization: Bearer <token>"
```

**Example response:**

```json
{
  "data": {
    "totalItems": 47,
    "totalValue": 125430.50,
    "lowStockCount": 8,
    "outOfStockCount": 2,
    "categoryCounts": {
      "electronics": 15,
      "furniture": 8,
      "office_supplies": 12,
      "raw_materials": 7,
      "finished_goods": 5
    }
  }
}
```

This summary shows:
- **`totalItems`** — total number of distinct products tracked
- **`totalValue`** — combined value of all stock on hand
- **`lowStockCount`** — number of items at or below their reorder threshold
- **`outOfStockCount`** — number of items with zero quantity
- **`categoryCounts`** — item count broken down by product category

### Get Item Count by Category

```bash
curl http://localhost:3000/api/reports/category-counts \
  -H "Authorization: Bearer <token>"
```

---

## User Management

These endpoints are for **admins** only.

### List All Users

```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer <token>"
```

### Create a New User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "manager"
  }'
```

Available roles: `admin`, `manager`, `viewer`.

### View Your Own Profile

Any authenticated user can retrieve their own profile:

```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <token>"
```

### Change Your Password

```bash
curl -X PUT http://localhost:3000/api/users/password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword",
    "newPassword": "newsecurepassword"
  }'
```

You must provide the correct `currentPassword`. If the current password is wrong, the request returns a `401 Unauthorized` error.

---

## Common Error Codes

| Code | Meaning | What to do |
|------|---------|------------|
| 400 | Bad Request | Check the request body for missing or invalid fields |
| 401 | Unauthorized | Log in again to get a fresh token |
| 403 | Forbidden | Your role does not have permission for this action |
| 404 | Not Found | The item, user, or supplier ID does not exist |
| 409 | Conflict | A resource with that value (e.g., SKU) already exists |
| 500 | Internal Server Error | Contact your system administrator |

---

For a complete list of all API endpoints and their request/response schemas, see the [API Reference](api-reference.md).
