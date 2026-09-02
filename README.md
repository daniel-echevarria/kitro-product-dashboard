# KITRO Product Dashboard

A full-stack product dashboard for managing and analyzing food product inventory. Built with FastAPI and React as part of the KITRO Software Engineer assessment.

## Tech Stack

**Backend:** Python 3.13, FastAPI, SQLModel, PostgreSQL (Neon)
**Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite

## Features

- Overview page with KPI metric cards (total sold, total available, gains after taxes)
- Searchable product table with pagination and sorting by name/price
- German reduced VAT rate (7%) applied to revenue calculations, consistent with EUR pricing
- Responsive layout with sidebar navigation

## Getting Started

### Prerequisites

- [Python 3.13+](https://www.python.org/)
- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [Node.js 18+](https://nodejs.org/)

### Backend

```bash
cd backend

# Install dependencies
uv sync

# Set up environment variables (a pre-configured database with seed data is provided)
cp .env.example .env

# Seed the database with sample data
uv run python -m kitro_backend.seed

# Start the API server
uv run fastapi dev src/kitro_backend/main.py
```

The API runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| GET    | /health     | Health check                         |
| GET    | /products   | List products (search, sort, paginate) |
| GET    | /metrics    | Aggregated KPIs for the dashboard    |

### Query Parameters for `/products`

| Parameter  | Type   | Default | Description                    |
|------------|--------|---------|--------------------------------|
| search     | string | —       | Filter products by name        |
| sort_by    | string | —       | Sort by `name` or `price`      |
| sort_order | string | asc     | `asc` or `desc`                |
| skip       | int    | 0       | Offset for pagination          |
| limit      | int    | 10      | Items per page (1–100)         |

## Notes

> The `.env.example` file contains a real database connection string pointing to a hosted Neon PostgreSQL instance pre-seeded with sample data, so you can run the app immediately. In a production setting, credentials would never be committed to the repository.

## Assumptions

- Product prices are in EUR as specified in the user stories
- German reduced VAT rate of 7% applied to food products
- Gains after taxes = sum of (total_sold x price x 0.93) across all products
- Database seeded with 100 sample products using Faker
- KITRO brand colors from the assignment palette applied throughout the UI
