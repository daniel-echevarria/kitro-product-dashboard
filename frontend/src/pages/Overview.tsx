import { useState, useEffect } from 'react';

export const OverviewPage = () => {
  const [metrics, setMetrics] = useState(null);
  useEffect(() => {
    const getMetrics = async () => {
      const metrics = await fetch('http://127.0.0.1:8000/metrics');
      const res = await metrics.json();
      setMetrics(res);
    };
    getMetrics();
  }, []);
  console.log(metrics);
  return <h1>Overview Page</h1>;
};
