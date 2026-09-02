import { useState, useEffect } from 'react';
import { ShoppingCart, Package, Euro } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

type Metrics = {
  total_sold: number;
  total_available: number;
  total_gains_after_taxes: number;
};

export const OverviewPage = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/metrics`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const res = await response.json();
        setMetrics(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
      }
    };
    getMetrics();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!metrics) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Products Sold"
          value={metrics.total_sold.toLocaleString()}
          color="bg-[#F9F0F4]"
          icon={ShoppingCart}
        />
        <MetricCard
          label="Total Products Available"
          value={metrics.total_available.toLocaleString()}
          color="bg-[#F3F3EF]"
          icon={Package}
        />
        <MetricCard
          label="Total Gains After Taxes"
          value={metrics.total_gains_after_taxes.toLocaleString('de-CH', {
            style: 'currency',
            currency: 'EUR',
          })}
          color="bg-[#C6e6e3]/30"
          icon={Euro}
        />
      </div>
    </div>
  );
};
