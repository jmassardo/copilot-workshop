-- ============================================================
-- Inventory Tracker API — Seed Data
-- ============================================================
-- Run after schema.sql to populate the database with sample data:
--   psql -d inventory -f sql/seed-data.sql
-- ============================================================

-- ─── Suppliers ──────────────────────────────────────────────

INSERT INTO suppliers (name, contact_email, phone, address) VALUES
    ('TechParts Inc.',       'orders@techparts.example.com',    '555-0101', '123 Silicon Ave, San Jose, CA 95112'),
    ('Office Essentials Co.','sales@officeessentials.example.com','555-0102', '456 Commerce Blvd, Austin, TX 78701'),
    ('Global Materials Ltd.','procurement@globalmats.example.com','555-0103', '789 Industrial Park, Chicago, IL 60601'),
    ('Furniture Direct',     'wholesale@furnituredirect.example.com','555-0104', '321 Design District, Portland, OR 97201'),
    ('BuildRight Supplies',  'info@buildright.example.com',      '555-0105', '654 Warehouse Row, Denver, CO 80201');

-- ─── Inventory Items ────────────────────────────────────────

INSERT INTO inventory_items (sku, name, description, category, quantity, unit_price, reorder_threshold, supplier_id, location) VALUES
    -- Electronics
    ('ELEC-001', 'Wireless Mouse',           'Ergonomic wireless mouse with USB-C receiver',           'electronics',     150, 24.99,  25, 1, 'Aisle B, Shelf 3'),
    ('ELEC-002', 'Mechanical Keyboard',      'Cherry MX Blue switch mechanical keyboard',              'electronics',      45, 89.99,  20, 1, 'Aisle B, Shelf 4'),
    ('ELEC-003', 'USB-C Hub',                '7-port USB-C hub with HDMI and ethernet',                'electronics',      12, 49.99,  15, 1, 'Aisle B, Shelf 5'),
    ('ELEC-004', '27" Monitor',              '4K IPS monitor, adjustable stand, VESA mount',           'electronics',       8, 349.99, 10, 1, 'Aisle A, Bay 2'),
    ('ELEC-005', 'Webcam HD',                '1080p webcam with built-in microphone',                  'electronics',       3, 59.99,  10, 1, 'Aisle B, Shelf 3'),

    -- Furniture
    ('FURN-001', 'Ergonomic Office Chair',   'Adjustable lumbar support, mesh back, 5-year warranty',  'furniture',        22, 299.99, 10, 4, 'Warehouse C, Bay 1'),
    ('FURN-002', 'Standing Desk',            'Electric sit-stand desk, 60 inch, white oak top',        'furniture',         5, 449.99,  5, 4, 'Warehouse C, Bay 2'),
    ('FURN-003', 'Filing Cabinet',           '3-drawer lateral filing cabinet, locking',               'furniture',        30, 179.99, 10, 4, 'Warehouse C, Bay 3'),
    ('FURN-004', 'Bookshelf',               '5-shelf industrial bookshelf, 72 inch',                   'furniture',         0, 129.99,  5, 4, 'Warehouse C, Bay 4'),

    -- Office Supplies
    ('OFFC-001', 'Printer Paper (case)',     '10-ream case, 8.5x11, 20lb white',                      'office_supplies', 200, 42.99,  50, 2, 'Aisle D, Shelf 1'),
    ('OFFC-002', 'Ballpoint Pens (box)',     'Box of 60, medium point, blue ink',                      'office_supplies', 150, 12.99,  30, 2, 'Aisle D, Shelf 2'),
    ('OFFC-003', 'Sticky Notes (12-pack)',   '3x3 inch, assorted colors',                              'office_supplies',  85, 8.99,   20, 2, 'Aisle D, Shelf 2'),
    ('OFFC-004', 'Whiteboard Markers (set)', 'Set of 12, chisel tip, assorted colors',                 'office_supplies',  18, 14.99,  20, 2, 'Aisle D, Shelf 3'),
    ('OFFC-005', 'Binder Clips (box)',       'Box of 100, medium size, black',                         'office_supplies', 300, 6.99,   40, 2, 'Aisle D, Shelf 3'),

    -- Raw Materials
    ('RAWM-001', 'Steel Sheet (4x8)',       '16 gauge cold-rolled steel, 4ft x 8ft',                  'raw_materials',    35, 89.99,  15, 3, 'Warehouse A, Rack 1'),
    ('RAWM-002', 'Copper Wire (spool)',     '12 AWG solid copper wire, 500ft spool',                   'raw_materials',    10, 124.99, 10, 3, 'Warehouse A, Rack 2'),
    ('RAWM-003', 'Aluminum Tubing',         '1 inch OD, 6061 alloy, 20ft length',                     'raw_materials',    60, 34.99,  20, 3, 'Warehouse A, Rack 3'),
    ('RAWM-004', 'Rubber Gaskets (bag)',    'Bag of 200, assorted sizes, neoprene',                    'raw_materials',     2, 29.99,  10, 5, 'Warehouse A, Rack 4'),

    -- Finished Goods
    ('FING-001', 'Widget Assembly Kit',     'Complete widget assembly with mounting hardware',          'finished_goods',   75, 19.99,  30, 5, 'Shipping Area, Bin A'),
    ('FING-002', 'Sensor Module v2',        'Temperature and humidity sensor, I2C interface',           'finished_goods',  120, 34.99,  40, 1, 'Shipping Area, Bin B'),
    ('FING-003', 'Control Board PCB',       'Main control board, pre-programmed firmware v3.1',         'finished_goods',   15, 74.99,  20, 1, 'Shipping Area, Bin C');

-- ─── Users ──────────────────────────────────────────────────
-- Passwords are bcrypt hashed. Default passwords for dev/testing:
--   admin@example.com    -> admin123
--   manager@example.com  -> manager123
--   viewer@example.com   -> viewer123

INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
    ('admin@example.com',   '$2b$12$LJ3m4ys3Lk0TSwHjfR8WaOaKsJGDBLt3rSOU.yyJMwuApcGxE8bKi', 'Admin',   'User',    'admin'),
    ('manager@example.com', '$2b$12$LJ3m4ys3Lk0TSwHjfR8WaOaKsJGDBLt3rSOU.yyJMwuApcGxE8bKi', 'Sarah',   'Chen',    'manager'),
    ('viewer@example.com',  '$2b$12$LJ3m4ys3Lk0TSwHjfR8WaOaKsJGDBLt3rSOU.yyJMwuApcGxE8bKi', 'Marcus',  'Johnson', 'viewer');

-- ─── Sample Audit Entries ───────────────────────────────────

INSERT INTO audit_log (user_id, action, entity_type, entity_id, details) VALUES
    (1, 'CREATE', 'inventory_item', 1,  '{"sku": "ELEC-001", "name": "Wireless Mouse"}'),
    (1, 'CREATE', 'inventory_item', 6,  '{"sku": "FURN-001", "name": "Ergonomic Office Chair"}'),
    (2, 'UPDATE', 'inventory_item', 3,  '{"field": "quantity", "old": 20, "new": 12}'),
    (1, 'CREATE', 'user',           2,  '{"email": "manager@example.com", "role": "manager"}'),
    (2, 'UPDATE', 'inventory_item', 5,  '{"field": "quantity", "old": 15, "new": 3}');
