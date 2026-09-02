import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
  icon: LucideIcon;
}

export const MetricCard = ({ label, value, color, icon: Icon }: MetricCardProps) => (
  <div
    className={`rounded-lg shadow p-6 ${color} hover:scale-105 hover:shadow-lg transition`}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <Icon className="h-6 w-6 text-gray-400" />
    </div>
    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 truncate">{value}</p>
  </div>
);
