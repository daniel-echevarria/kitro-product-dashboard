# KITRO Product Dashboard

A full-stack product dashboard for managing and analyzing food product inventory, built for the KITRO Software Engineer assessment.

**Tech Stack:** Python 3.13 · FastAPI · SQLModel · PostgreSQL (Neon) · React 19 · TypeScript · Tailwind CSS 4 · Vite

## Quick Start

### Prerequisites

- [Python 3.13+](https://www.python.org/)
- [uv](https://docs.astral.sh/uv/) — install with `curl -LsSf https://astral.sh/uv/install.sh | sh`
- [Node.js 18+](https://nodejs.org/)

### 1. Start the backend

```bash
cd backend
uv sync
cp .env.example .env
uv run fastapi dev src/kitro_backend/main.py
```

### 2. Start the frontend

In another terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

> The provided environment configuration points to a pre-seeded Neon PostgreSQL database so the application can be run without setting up a database locally. In a production environment, database credentials would be managed through secure environment variables or a secrets manager rather than committed to the repository.

## Implementation Notes

- Product filtering, sorting, and pagination are handled server-side through query parameters
- KPI metrics (total sold, total available, gains after taxes) are calculated in PostgreSQL
- German reduced VAT rate of 7% applied to food products, consistent with EUR pricing
- KITRO brand colors from the assignment palette applied throughout the UI
- Database seeded with 100 products using Faker
