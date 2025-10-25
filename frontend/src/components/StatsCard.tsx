import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  trend = 'neutral',
  delay = 0
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'down': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrendColor()}`}>
                {change}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`${color} rounded-xl p-3`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;