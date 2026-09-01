import random
from decimal import Decimal

from faker import Faker
from sqlmodel import Session, select

from kitro_backend.database import create_db_and_tables, engine
from kitro_backend.models import Product

fake = Faker()

FOODS = [
    "Pasta",
    "Olive Oil",
    "Bread",
    "Cheese",
    "Tomato Sauce",
    "Rice",
    "Butter",
    "Yogurt",
    "Flour",
    "Honey",
    "Milk",
    "Cream",
    "Vinegar",
    "Sugar",
    "Salt",
]

NUM_PRODUCTS = 100


def seed():
    create_db_and_tables()

    with Session(engine) as session:
        # Delete existing products so running twice doesn't double the data
        existing = session.exec(select(Product)).all()
        for product in existing:
            session.delete(product)
        session.commit()

        # Generate new products
        products = []
        for _ in range(NUM_PRODUCTS):
            product = Product(
                name=f"{fake.company().split()[0]} {fake.random_element(FOODS)}",
                price=Decimal(str(round(random.uniform(1.50, 45.00), 2))),
                stock_quantity=random.randint(0, 500),
                total_sold=random.randint(0, 2000),
            )
            products.append(product)

        session.add_all(products)
        session.commit()

        print(f"Seeded {len(products)} products.")


if __name__ == "__main__":
    seed()
