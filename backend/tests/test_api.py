from fastapi.testclient import TestClient
from kitro_backend.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_get_products():
    response = client.get("/products")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert isinstance(data["items"], list)
    assert isinstance(data["total"], int)


def test_get_products_pagination():
    response = client.get("/products?limit=5&skip=0")
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) <= 5


def test_get_products_search():
    response = client.get("/products?search=bread")
    assert response.status_code == 200
    data = response.json()
    for product in data["items"]:
        assert "bread" in product["name"].lower()


def test_get_products_sort_by_name():
    response = client.get("/products?sort_by=name&sort_order=asc&limit=100")
    assert response.status_code == 200
    data = response.json()
    names = [p["name"] for p in data["items"]]
    assert names == sorted(names)


def test_get_products_sort_by_price_desc():
    response = client.get("/products?sort_by=price&sort_order=desc&limit=100")
    assert response.status_code == 200
    data = response.json()
    prices = [float(p["price"]) for p in data["items"]]
    assert prices == sorted(prices, reverse=True)


def test_get_products_invalid_limit():
    response = client.get("/products?limit=0")
    assert response.status_code == 422


def test_get_metrics():
    response = client.get("/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "total_sold" in data
    assert "total_available" in data
    assert "total_gains_after_taxes" in data
    assert data["total_sold"] >= 0
    assert data["total_available"] >= 0
    assert data["total_gains_after_taxes"] >= 0
