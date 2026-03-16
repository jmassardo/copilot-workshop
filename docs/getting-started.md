# Getting Started

This guide walks you through setting up and running the Inventory Tracker API on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 20+** — [Download here](https://nodejs.org/)
- **Git** — [Download here](https://git-scm.com/)

> **No PostgreSQL installation required!** The project uses [PGlite](https://pglite.dev/), an embedded PostgreSQL engine that runs entirely inside Node.js via WebAssembly. All data is stored in a local `data/` directory.

## Step 1: Clone the Repository

```bash
git clone https://github.com/jmassardo/copilot-workshop.git
cd copilot-workshop
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your preferences:

```
PORT=3000
JWT_SECRET=pick-a-strong-secret-here
LOG_LEVEL=info
```

## Step 4: Start the Server

The database is automatically initialized on first startup — no manual setup needed:

```bash
npm run dev
```

On first run you’ll see:

```
First run detected — initializing database...
Schema created successfully
Seed data loaded successfully
Database initialization complete
Inventory Tracker API running on port 3000
```

Subsequent starts skip initialization and use the existing data.

> **Starting fresh?** Delete the `data/` directory and restart to re-initialize.

## Step 5: Test the API

```bash
# Health check
curl http://localhost:3000/health

# List all items (public endpoint)
curl http://localhost:3000/api/items

# Login to get a token
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `ECONNREFUSED` on database | Delete the `data/` directory and restart to re-initialize |
| `relation does not exist` | Delete the `data/` directory and restart to re-create the schema |
| `JWT_SECRET` errors | Make sure `.env` has a `JWT_SECRET` value set |
| Port already in use | Change the `PORT` in `.env` or stop the other process |
