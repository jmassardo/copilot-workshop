#!/usr/bin/env bash
# Create 50 feature enhancement issues for the copilot-workshop repo
set -e

REPO="jmassardo/copilot-workshop"

declare -a ISSUES=(

# ─── API Enhancements (1-10) ─────────────────────────────────

'Add search query parameter to GET /api/items|enhancement,api|As a warehouse user, I want to search items by name or description via a query parameter so that I can quickly find products without scrolling through pages.

**Acceptance Criteria**
- Add `?search=` query parameter to `GET /api/items`
- Search should match against `name` and `description` columns (case-insensitive)
- Works alongside existing pagination'

'Add sorting options to GET /api/items|enhancement,api|As an inventory manager, I want to sort items by name, quantity, or price so that I can view them in a meaningful order.

**Acceptance Criteria**
- Add `?sortBy=` and `?order=` query parameters to `GET /api/items`
- Support sorting by: `name`, `quantity`, `unit_price`, `created_at`
- Default to `name ASC`'

'Add category filter to GET /api/items|enhancement,api|As a warehouse worker, I want to filter items by category so that I can view only the products relevant to my section.

**Acceptance Criteria**
- Add `?category=` query parameter to `GET /api/items`
- Accept valid category values; return 400 for invalid ones
- Works alongside search and pagination'

'Add PATCH endpoint for partial item updates|enhancement,api|As a developer, I want a PATCH endpoint for items so that I can update a single field without sending the entire object.

**Acceptance Criteria**
- Add `PATCH /api/items/:id` route
- Accept any subset of updatable fields
- Return the updated item'

'Add bulk delete endpoint for items|enhancement,api|As an admin, I want to delete multiple items at once so that I can efficiently clean up discontinued products.

**Acceptance Criteria**
- Add `DELETE /api/items/bulk` endpoint
- Accept an array of item IDs in the request body
- Return count of successfully deleted items'

'Add item count by category endpoint|enhancement,api|As a dashboard user, I want to see item counts broken down by category so that I can understand inventory distribution.

**Acceptance Criteria**
- Add `GET /api/reports/category-counts` endpoint
- Return an object with category names as keys and counts as values
- Should be a public endpoint'

'Add total inventory value by category|enhancement,api|As a finance user, I want to see the total inventory value grouped by category so that I can understand where our capital is allocated.

**Acceptance Criteria**
- Add `GET /api/reports/value-by-category` endpoint
- Return category name, item count, and total value for each
- Requires authentication'

'Add GET /api/suppliers endpoint|enhancement,api|As a procurement manager, I want to list all suppliers so that I can see who we work with.

**Acceptance Criteria**
- Add `GET /api/suppliers` route
- Return all suppliers with their contact information
- Public endpoint'

'Add item history via audit log|enhancement,api|As an inventory manager, I want to see the change history for a specific item so that I can track who modified it and when.

**Acceptance Criteria**
- Add `GET /api/items/:id/history` endpoint
- Query the audit_log table filtered by entity_type and entity_id
- Requires authentication'

'Add password change endpoint|enhancement,api|As an authenticated user, I want to change my password so that I can maintain account security.

**Acceptance Criteria**
- Add `PUT /api/users/me/password` endpoint
- Require current password and new password in body
- Validate new password meets minimum requirements'

# ─── Database (11-15) ─────────────────────────────────────────

'Add database index on inventory_items.name|enhancement,database|As a developer, I want an index on the items name column so that search queries perform well at scale.

**Acceptance Criteria**
- Add a B-tree index on `inventory_items.name`
- Add the index to `schema.sql`'

'Add soft delete support for items|enhancement,database|As an admin, I want deleted items to be soft-deleted so that we can recover accidentally removed products.

**Acceptance Criteria**
- Add `deleted_at TIMESTAMPTZ` column to `inventory_items`
- Modify queries to exclude soft-deleted items by default
- Add restore endpoint'

'Add stock movement tracking table|enhancement,database|As a warehouse manager, I want to track stock movements (in/out) so that I can audit quantity changes over time.

**Acceptance Criteria**
- Create a `stock_movements` table with item_id, quantity_change, reason, and user_id
- Add appropriate indexes and foreign keys'

'Add unique constraint on supplier email|enhancement,database|As a DBA, I want supplier emails to be unique so that we don'"'"'t accidentally create duplicate supplier records.

**Acceptance Criteria**
- Add `UNIQUE` constraint on `suppliers.contact_email`
- Update `schema.sql`'

'Add notes column to inventory_items|enhancement,database|As a warehouse worker, I want to add freeform notes to items so that I can record special handling instructions.

**Acceptance Criteria**
- Add `notes TEXT` column to `inventory_items` table
- Default to empty string
- Update relevant types and queries'

# ─── UI Features (16-30) ──────────────────────────────────────

'Add dark/light theme toggle|enhancement,ui|As a user, I want to switch between dark and light themes so that I can use the app comfortably in any lighting environment.

**Acceptance Criteria**
- Add a theme toggle button in the header
- Persist preference in localStorage
- Light theme should use appropriate contrast colors'

'Add item count badge to category filter|enhancement,ui|As a user, I want to see how many items are in each category in the filter dropdown so that I understand the distribution at a glance.

**Acceptance Criteria**
- Show count next to each category name in the dropdown
- Update counts when search is active'

'Add export to CSV button for inventory|enhancement,ui|As a manager, I want to export the current inventory list to CSV so that I can share it with stakeholders who prefer spreadsheets.

**Acceptance Criteria**
- Add "Export CSV" button to the inventory tab
- Export should respect current search/filter state
- Download as `inventory-export.csv`'

'Add keyboard shortcuts for common actions|enhancement,ui|As a power user, I want keyboard shortcuts so that I can navigate the app faster without using the mouse.

**Acceptance Criteria**
- `N` to open Add Item modal
- `Esc` to close any open modal
- `/` to focus the search bar'

'Show last updated timestamp on items|enhancement,ui|As an inventory manager, I want to see when each item was last updated so that I can identify stale records.

**Acceptance Criteria**
- Add "Last Updated" column to the inventory table
- Format as relative time (e.g., "2 hours ago")'

'Add confirmation dialog before deleting|enhancement,ui|As an admin, I want a clear confirmation dialog before deleting items so that I don'"'"'t accidentally remove products.

**Acceptance Criteria**
- Replace browser `confirm()` with a styled modal
- Show item name and SKU in the confirmation message
- Include a "Cancel" button that is visually prominent'

'Add loading spinner to tab content|enhancement,ui|As a user, I want to see a loading indicator when switching tabs so that I know data is being fetched.

**Acceptance Criteria**
- Show spinner in Low Stock and Reorder tabs while loading
- Replace spinner with data or empty state message when complete'

'Add toast notification auto-dismiss timer|enhancement,ui|As a user, I want success notifications to disappear automatically but error notifications to stay until dismissed so that I don'"'"'t miss important error messages.

**Acceptance Criteria**
- Success toasts auto-dismiss after 3 seconds
- Error toasts require manual dismissal (add close button)'

'Highlight out-of-stock rows in red|enhancement,ui|As a warehouse worker, I want out-of-stock items to stand out visually so that I can quickly identify urgent restocking needs.

**Acceptance Criteria**
- Add a subtle red background tint to table rows where quantity is 0
- Should not interfere with row hover state'

'Add breadcrumb navigation to item detail|enhancement,ui|As a user, I want breadcrumb navigation in the item detail view so that I can easily return to the inventory list.

**Acceptance Criteria**
- Show "Inventory > Item Name" breadcrumb in the detail modal
- "Inventory" link closes the modal and returns to the list'

'Add mobile responsive layout|enhancement,ui|As a user on a phone, I want the UI to work on mobile screens so that I can check inventory from the warehouse floor.

**Acceptance Criteria**
- Table should scroll horizontally on small screens
- Stats cards should stack vertically
- Modals should be full-width on mobile'

'Add empty state illustration for no results|enhancement,ui|As a user, I want a friendly empty state when search returns no results so that the page doesn'"'"'t look broken.

**Acceptance Criteria**
- Show an icon and helpful message when search/filter returns zero items
- Suggest clearing the search or trying different terms'

'Add item image URL support|enhancement,ui|As a user, I want to see product images in the item detail view so that I can visually confirm the correct product.

**Acceptance Criteria**
- Display image thumbnail in the detail modal if `image_url` is set
- Show a placeholder icon for items without images'

'Add quantity Quick-Edit inline button|enhancement,ui|As a warehouse worker, I want to quickly adjust item quantity from the table without opening a full edit form so that stock updates are faster.

**Acceptance Criteria**
- Add +/- buttons next to quantity in the table (visible when logged in as admin/manager)
- Buttons should call the update endpoint and refresh the row'

'Show supplier name in inventory table|enhancement,ui|As an inventory manager, I want to see which supplier provides each item directly in the table so that I can contact them quickly.

**Acceptance Criteria**
- Add a "Supplier" column to the inventory table
- Fetch and display supplier name (may require a JOIN or separate lookup)'

# ─── Auth & Security (31-35) ──────────────────────────────────

'Add rate limiting per user instead of per IP|enhancement,security|As a security engineer, I want rate limiting tied to authenticated users so that shared-IP environments like offices aren'"'"'t unfairly throttled.

**Acceptance Criteria**
- Authenticated requests should be rate-limited per user ID
- Unauthenticated requests continue to use IP-based limiting'

'Add refresh token support|enhancement,security|As a user, I want my session to auto-refresh so that I don'"'"'t get logged out in the middle of work.

**Acceptance Criteria**
- Return a refresh token alongside the access token at login
- Add `POST /api/users/refresh` endpoint
- Access token TTL: 15 minutes; Refresh token TTL: 7 days'

'Add user profile endpoint|enhancement,api,security|As an authenticated user, I want a `/api/users/me` endpoint so that I can see my own account details without knowing my ID.

**Acceptance Criteria**
- Add `GET /api/users/me` route
- Return the current user'"'"'s info based on JWT claims
- Exclude password_hash from response'

'Add role display to login response|enhancement,api|As a frontend developer, I want the login response to include the user'"'"'s full role permissions so that I can show/hide UI elements correctly.

**Acceptance Criteria**
- Login response already includes `role` — verify it'"'"'s present and typed
- Document the three roles and their permissions in the API reference'

'Add failed login lockout|enhancement,security|As a security engineer, I want accounts to be temporarily locked after 5 failed login attempts so that brute-force attacks are mitigated.

**Acceptance Criteria**
- Track failed login attempts per email
- Lock account for 15 minutes after 5 consecutive failures
- Return 429 status during lockout'

# ─── Validation & Error Handling (36-40) ──────────────────────

'Add duplicate SKU detection with helpful message|enhancement,api|As a user creating items, I want a clear error message when I use a duplicate SKU so that I know to pick a different one.

**Acceptance Criteria**
- Catch unique constraint violation on `sku` column
- Return 409 with message: "An item with SKU {sku} already exists"'

'Add request ID to all error responses|enhancement,api|As a developer debugging issues, I want every error response to include a unique request ID so that I can trace problems in logs.

**Acceptance Criteria**
- Generate a UUID for each request
- Include it in the `meta.requestId` field of all responses
- Log the request ID with every log entry'

'Validate supplier_id exists on item creation|enhancement,api|As a user creating items, I want helpful feedback when I enter an invalid supplier ID so that I can correct the mistake.

**Acceptance Criteria**
- Check that `supplier_id` references an existing supplier before inserting
- Return 400 with message: "Supplier with ID {id} not found"'

'Add max page size validation|enhancement,api|As a developer, I want the API to reject unreasonably large page sizes so that a single request can'"'"'t overload the database.

**Acceptance Criteria**
- Enforce maximum `pageSize` of 100
- Return 400 if requested page size exceeds the limit'

'Return 400 for non-numeric item IDs|enhancement,api|As a developer, I want the API to return 400 instead of 500 when a non-numeric ID is passed so that errors are clear.

**Acceptance Criteria**
- Validate `:id` parameter is a positive integer in all item routes
- Return 400 with message: "Invalid item ID"'

# ─── Developer Experience (41-45) ─────────────────────────────

'Add npm script to reset the database|enhancement,dx|As a developer, I want a single command to reset the database so that I can start fresh during testing.

**Acceptance Criteria**
- Add `npm run db:reset` script
- Should delete the `data/` directory and restart the server'

'Add health check database connectivity test|enhancement,api|As a DevOps engineer, I want the health endpoint to verify database connectivity so that monitoring can detect DB issues.

**Acceptance Criteria**
- Health check should run a simple `SELECT 1` query
- Return `"database": "ok"` or `"database": "error"` in the response'

'Add request timing to response headers|enhancement,dx|As a developer, I want to see response times in headers so that I can identify slow endpoints.

**Acceptance Criteria**
- Add `X-Response-Time` header to all responses
- Value should be in milliseconds'

'Add OpenAPI/Swagger spec file|enhancement,docs|As a developer, I want an OpenAPI spec so that I can import the API into tools like Postman or generate client libraries.

**Acceptance Criteria**
- Create `docs/openapi.yaml` with all endpoint definitions
- Include request/response schemas and auth requirements'

'Add environment variable validation on startup|enhancement,dx|As a developer, I want the app to fail fast with a clear message if required environment variables are missing so that I don'"'"'t get cryptic errors later.

**Acceptance Criteria**
- Check for `JWT_SECRET` on startup
- Exit with code 1 and a descriptive error message if missing'

# ─── Documentation & Testing (46-50) ──────────────────────────

'Document all error response codes in API reference|enhancement,docs|As a developer integrating with this API, I want a list of all possible error codes so that I can handle them in my client.

**Acceptance Criteria**
- Add an "Error Codes" section to `docs/api-reference.md`
- List each HTTP status code with its meaning and example response'

'Add example curl commands to API reference|enhancement,docs|As a workshop attendee, I want ready-to-copy curl commands for each endpoint so that I can test the API quickly.

**Acceptance Criteria**
- Add curl examples for every endpoint in `docs/api-reference.md`
- Include auth headers where required'

'Add unit tests for item validation|enhancement,testing|As a developer, I want unit tests for the Zod validation schemas so that I can catch validation regressions.

**Acceptance Criteria**
- Test `CreateItemSchema` with valid and invalid payloads
- Test boundary conditions (empty strings, negative numbers, missing fields)'

'Add integration test for login flow|enhancement,testing|As a developer, I want an integration test covering the full login flow so that auth regressions are caught early.

**Acceptance Criteria**
- Test successful login returns a valid JWT
- Test invalid password returns 401
- Test missing fields returns 400'

'Add README badges for build status|enhancement,docs|As a visitor to the repo, I want status badges in the README so that I can quickly see if the project is healthy.

**Acceptance Criteria**
- Add badges for: Node.js version, license, and last commit
- Place them below the title in README.md'

)

created=0
failed=0

for entry in "${ISSUES[@]}"; do
  # Parse title|labels|body
  title="${entry%%|*}"
  rest="${entry#*|}"
  labels="${rest%%|*}"
  body="${rest#*|}"

  echo -n "Creating: ${title:0:60}... "

  if gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --label "$labels" \
    --body "$body" \
    > /dev/null 2>&1; then
    echo "✓"
    ((created++))
  else
    echo "✗"
    ((failed++))
  fi

  # Small delay to avoid rate limiting
  sleep 0.5
done

echo ""
echo "Done! Created: $created, Failed: $failed"
