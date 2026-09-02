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

  useEffect(() => {
    const getMetrics = async () => {
      const metrics = await fetch(`${import.meta.env.VITE_API_URL}/metrics`);
      const res = await metrics.json();
      setMetrics(res);
    };
    getMetrics();
  }, []);

  if (!metrics) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Products Sold"
          value={metrics.total_sold.toLocaleString()}
          color="border-[#ED695F]"
          icon={ShoppingCart}
        />
        <MetricCard
          label="Total Products Available"
          value={metrics.total_available.toLocaleString()}
          color="border-[#507E6A]"
          icon={Package}
        />
        <MetricCard
          label="Total Gains After Taxes"
          value={metrics.total_gains_after_taxes.toLocaleString('de-CH', {
            style: 'currency',
            currency: 'EUR',
          })}
          color="border-[#FFDA47]"
          icon={Euro}
        />
      </div>
    </div>
  );
};
