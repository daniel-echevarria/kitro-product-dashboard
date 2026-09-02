from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import col, func, select

from kitro_backend.database import SessionDep, create_db_and_tables
from kitro_backend.models import Product


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="KITRO Product Dashboard", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products")
def read_products(
    session: SessionDep,
    skip: int = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    search: str | None = None,
    sort_by: str | None = None,
    sort_order: str = "asc",
):
    statement = select(Product)

    if search:
        statement = statement.where(col(Product.name).ilike(f"%{search}%"))

    total = session.exec(select(func.count()).select_from(statement.subquery())).one()

    if sort_by == "name":
        order = col(Product.name)
    elif sort_by == "price":
        order = col(Product.price)
    else:
        order = col(Product.id)

    if sort_order == "desc":
        order = order.desc()

    statement = statement.order_by(order).offset(skip).limit(limit)
    products = session.exec(statement).all()

    return {"items": products, "total": total}


FOOD_VAT_RATE = 0.07


@app.get("/metrics")
def read_metrics(session: SessionDep):
    total_sold = session.exec(select(func.sum(Product.total_sold))).one() or 0
    total_available = session.exec(select(func.sum(Product.stock_quantity))).one() or 0
    total_gains_after_taxes = (
        session.exec(
            select(
                func.sum(Product.total_sold * Product.price * (1 - FOOD_VAT_RATE))
            )
        ).one()
        or 0
    )
    return {
        "total_sold": total_sold,
        "total_available": total_available,
        "total_gains_after_taxes": total_gains_after_taxes,
    }
