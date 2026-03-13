-- ============================================================
-- Inventory Tracker API — Database Schema
-- ============================================================
-- Run this file to create all tables:
--   psql -d inventory -f sql/schema.sql
-- ============================================================

-- Enable UUID extension for future use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Suppliers ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS suppliers (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200)    NOT NULL,
    contact_email   VARCHAR(255)    NOT NULL,
    phone           VARCHAR(50),
    address         TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_suppliers_name ON suppliers(name);

-- ─── Inventory Items ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS inventory_items (
    id                  SERIAL PRIMARY KEY,
    sku                 VARCHAR(50)     NOT NULL UNIQUE,
    name                VARCHAR(200)    NOT NULL,
    description         TEXT            DEFAULT '',
    category            VARCHAR(50)     NOT NULL
                        CHECK (category IN (
                            'electronics', 'furniture', 'office_supplies',
                            'raw_materials', 'finished_goods'
                        )),
    quantity            INTEGER         NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_price          NUMERIC(12,2)   NOT NULL CHECK (unit_price > 0),
    reorder_threshold   INTEGER         NOT NULL DEFAULT 0 CHECK (reorder_threshold >= 0),
    supplier_id         INTEGER         REFERENCES suppliers(id) ON DELETE SET NULL,
    location            VARCHAR(100)    NOT NULL DEFAULT '',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_items_sku ON inventory_items(sku);
CREATE INDEX idx_items_category ON inventory_items(category);
CREATE INDEX idx_items_supplier ON inventory_items(supplier_id);
CREATE INDEX idx_items_low_stock ON inventory_items(quantity, reorder_threshold)
    WHERE quantity <= reorder_threshold;

-- ─── Users ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    first_name      VARCHAR(100)    NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    role            VARCHAR(20)     NOT NULL DEFAULT 'viewer'
                    CHECK (role IN ('admin', 'manager', 'viewer')),
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ─── Audit Log ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_log (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER         REFERENCES users(id) ON DELETE SET NULL,
    action          VARCHAR(50)     NOT NULL,
    entity_type     VARCHAR(50)     NOT NULL,
    entity_id       INTEGER,
    details         JSONB           DEFAULT '{}',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_log(created_at);

-- ─── Trigger: Auto-update updated_at ────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_items_updated_at
    BEFORE UPDATE ON inventory_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
