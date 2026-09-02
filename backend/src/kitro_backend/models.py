from decimal import Decimal

from sqlmodel import Field, SQLModel


class ProductBase(SQLModel):
    name: str = Field(index=True)
    price: Decimal = Field(max_digits=10, decimal_places=2, index=True)
    stock_quantity: int
    total_sold: int


class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class ProductPublic(ProductBase):
    id: int


class ProductListResponse(SQLModel):
    items: list[ProductPublic]
    total: int
