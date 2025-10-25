import React from 'react';
import { Clock, User, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  certificate?: string;
  details?: any;
}

interface ActivityTimelineProps {
  activities: Activity[];
  className?: string;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, className = '' }) => {
  const getActionIcon = (action: string) => {
    if (action.includes('CREATED')) return <FileText className="h-4 w-4 text-blue-500" />;
    if (action.includes('APPROVED')) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (action.includes('REJECTED')) return <XCircle className="h-4 w-4 text-red-500" />;
    if (action.includes('VERIFIED')) return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    if (action.includes('LOGIN')) return <User className="h-4 w-4 text-purple-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('CREATED')) return 'bg-blue-100 dark:bg-blue-900/20';
    if (action.includes('APPROVED')) return 'bg-green-100 dark:bg-green-900/20';
    if (action.includes('REJECTED')) return 'bg-red-100 dark:bg-red-900/20';
    if (action.includes('VERIFIED')) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (action.includes('LOGIN')) return 'bg-purple-100 dark:bg-purple-900/20';
    return 'bg-gray-100 dark:bg-gray-900/20';
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-3"
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(activity.action)}`}>
            {getActionIcon(activity.action)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatAction(activity.action)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              by {activity.user}
            </p>
            {activity.certificate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Certificate: {activity.certificate}
              </p>
            )}
          </div>
        </motion.div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No recent activities
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Activities will appear here as they happen.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;