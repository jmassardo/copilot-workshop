# Getting Started

This guide walks you through setting up and running the Inventory Tracker API on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 20+** — [Download here](https://nodejs.org/)
- **PostgreSQL 15+** — [Download here](https://www.postgresql.org/download/)
- **Git** — [Download here](https://git-scm.com/)

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

Edit `.env` with your database connection details:

```
PORT=3000
DATABASE_URL=postgresql://your-user:your-password@localhost:5432/inventory
JWT_SECRET=pick-a-strong-secret-here
LOG_LEVEL=info
```

## Step 4: Set Up the Database

Create the database and load the schema:

```bash
createdb inventory
psql -d inventory -f sql/schema.sql
psql -d inventory -f sql/seed-data.sql
```

## Step 5: Start the Server

```bash
npm run dev
```

You should see:

```
Inventory Tracker API running on port 3000
```

## Step 6: Test the API

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
| `ECONNREFUSED` on database | Make sure PostgreSQL is running: `pg_isready` |
| `relation does not exist` | Run the schema migration: `psql -d inventory -f sql/schema.sql` |
| `JWT_SECRET` errors | Make sure `.env` has a `JWT_SECRET` value set |
| Port already in use | Change the `PORT` in `.env` or stop the other process |
