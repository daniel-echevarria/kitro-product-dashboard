import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
  icon: LucideIcon;
}

export const MetricCard = ({ label, value, color, icon: Icon }: MetricCardProps) => (
  <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <Icon className="h-6 w-6 text-gray-400" />
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);
