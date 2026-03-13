-- ============================================================
-- Common Reporting Queries
-- ============================================================
-- Useful ad-hoc queries for analyzing inventory data.
-- These can be run directly in psql or any SQL client.
-- ============================================================

-- ─── Inventory Value by Category ────────────────────────────
-- Shows total stock value grouped by category, sorted highest first.

SELECT
    category,
    COUNT(*)                            AS item_count,
    SUM(quantity)                       AS total_units,
    SUM(quantity * unit_price)          AS total_value,
    ROUND(AVG(unit_price), 2)          AS avg_unit_price
FROM inventory_items
GROUP BY category
ORDER BY total_value DESC;


-- ─── Top 10 Most Valuable Items ─────────────────────────────
-- Items with the highest total stock value (quantity * unit_price).

SELECT
    sku,
    name,
    category,
    quantity,
    unit_price,
    (quantity * unit_price) AS total_value
FROM inventory_items
ORDER BY total_value DESC
LIMIT 10;


-- ─── Low Stock Alert ────────────────────────────────────────
-- Items at or below reorder threshold, with supplier contact info.

SELECT
    i.sku,
    i.name,
    i.quantity,
    i.reorder_threshold,
    i.quantity - i.reorder_threshold    AS deficit,
    s.name                              AS supplier,
    s.contact_email                     AS supplier_email
FROM inventory_items i
LEFT JOIN suppliers s ON i.supplier_id = s.id
WHERE i.quantity <= i.reorder_threshold
ORDER BY deficit ASC;


-- ─── Out of Stock Items ─────────────────────────────────────

SELECT sku, name, category, location
FROM inventory_items
WHERE quantity = 0
ORDER BY name;


-- ─── Users Who Haven't Logged In for 90 Days ───────────────

SELECT
    id,
    email,
    first_name,
    last_name,
    role,
    last_login_at,
    NOW() - last_login_at AS time_since_login
FROM users
WHERE last_login_at < NOW() - INTERVAL '90 days'
   OR last_login_at IS NULL
ORDER BY last_login_at ASC NULLS FIRST;


-- ─── Recent Audit Activity ──────────────────────────────────
-- Last 50 audit log entries with user details.

SELECT
    a.created_at,
    u.email          AS performed_by,
    a.action,
    a.entity_type,
    a.entity_id,
    a.details
FROM audit_log a
LEFT JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC
LIMIT 50;


-- ─── Supplier Order Summary ─────────────────────────────────
-- How many items each supplier provides and their total value.

SELECT
    s.name                              AS supplier,
    s.contact_email,
    COUNT(i.id)                         AS products_supplied,
    SUM(i.quantity)                     AS total_units,
    SUM(i.quantity * i.unit_price)      AS total_inventory_value
FROM suppliers s
LEFT JOIN inventory_items i ON s.id = i.supplier_id
GROUP BY s.id, s.name, s.contact_email
ORDER BY total_inventory_value DESC;
