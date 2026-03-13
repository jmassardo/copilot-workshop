# API Reference

Base URL: `http://localhost:3000`

All responses use the standard envelope format:

```json
{
  "data": { ... },
  "error": null,
  "meta": {
    "timestamp": "2026-03-13T10:00:00.000Z",
    "requestId": "abc-123",
    "pagination": { ... }
  }
}
```

## Authentication

Most endpoints require a JWT token. Obtain one via the login endpoint, then include it in subsequent requests:

```
Authorization: Bearer <your-token>
```

---

## Items

### List Items

```
GET /api/items?page=1&pageSize=20
```

**Auth**: Not required (public catalog)

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `pageSize` | integer | 20 | Items per page (max 100) |

**Response**: `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "sku": "ELEC-001",
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with USB receiver",
      "category": "electronics",
      "quantity": 150,
      "unitPrice": 24.99,
      "reorderThreshold": 25,
      "supplierId": 1,
      "location": "Aisle B, Shelf 3",
      "createdAt": "2026-01-15T08:00:00.000Z",
      "updatedAt": "2026-03-01T14:30:00.000Z"
    }
  ],
  "error": null,
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 47,
      "totalPages": 3
    }
  }
}
```

### Get Item by ID

```
GET /api/items/:id
```

**Auth**: Not required

**Response**: `200 OK` or `404 Not Found`

### Create Item

```
POST /api/items
```

**Auth**: Required (admin or manager)

**Body:**

```json
{
  "sku": "FURN-042",
  "name": "Standing Desk",
  "description": "Adjustable height standing desk, 60 inch",
  "category": "furniture",
  "quantity": 12,
  "unitPrice": 449.99,
  "reorderThreshold": 5,
  "supplierId": 2,
  "location": "Warehouse C, Bay 7"
}
```

**Response**: `201 Created`

### Update Item

```
PUT /api/items/:id
```

**Auth**: Required (admin or manager)

**Body**: Any subset of item fields (partial update)

**Response**: `200 OK` or `404 Not Found`

### Delete Item

```
DELETE /api/items/:id
```

**Auth**: Required (admin only)

**Response**: `200 OK` or `404 Not Found`

### Low Stock Items

```
GET /api/items/low-stock
```

**Auth**: Required

Returns items where quantity is at or below the reorder threshold.

---

## Users

### List Users

```
GET /api/users
```

**Auth**: Required (admin only)

### Create User

```
POST /api/users
```

**Auth**: Required (admin only)

**Body:**

```json
{
  "email": "jane@example.com",
  "password": "securepass123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "manager"
}
```

### Login

```
POST /api/users/login
```

**Auth**: Not required

**Body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin"
    }
  }
}
```

---

## Reports

### Inventory Summary

```
GET /api/reports/inventory-summary
```

**Auth**: Required

**Response:**

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

### Reorder Report

```
GET /api/reports/reorder
```

**Auth**: Required

Returns items needing reorder with supplier contact info, sorted by urgency.

---

## Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — validation failed |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found — resource doesn't exist |
| 409 | Conflict — duplicate resource |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error |
