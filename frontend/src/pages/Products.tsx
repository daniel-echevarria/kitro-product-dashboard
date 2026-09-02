import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Pagination } from '../components/Pagination';

interface ProductsResponse {
  items: Product[];
  total: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  total_sold: number;
}

export const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const skip = (page - 1) * limit;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products?search=${search}&limit=${limit}&sort_by=${sortBy}&sort_order=${sortOrder}&skip=${skip}`,
      );
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, [search, limit, sortBy, sortOrder, page]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  if (!products) return <p className="text-gray-500">Loading...</p>;

  const totalPages = Math.ceil(products.total / limit);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <input
        type="search"
        placeholder="Search products..."
        className="border border-zinc-400 w-full px-2 py-3 rounded-2xl mb-4"
        onChange={handleSearchChange}
        value={search}
      />
      <div className="flex gap-4 mb-4">
        <label htmlFor="limit">
          Products Per Page
          <select
            name="limit"
            id="limit"
            className="ml-2 border rounded p-1"
            onChange={handleLimitChange}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
        <label htmlFor="sort_by">
          Sort By:
          <select
            name="sort_by"
            id="sort_by"
            className="ml-2 border rounded p-1"
            onChange={handleSortByChange}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
        <label htmlFor="sort_order">
          Order:
          <select
            name="sort_order"
            id="sort_order"
            className="ml-2 border rounded p-1"
            onChange={handleSortOrderChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Total Sold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.items.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                <td className="px-6 py-4">
                  {Number(p.price).toLocaleString('de-CH', { style: 'currency', currency: 'EUR' })}
                </td>
                <td className="px-6 py-4">{p.stock_quantity.toLocaleString()}</td>
                <td className="px-6 py-4">{p.total_sold.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalProducts={products.total}
        limit={limit}
        onPrevious={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </>
  );
};
