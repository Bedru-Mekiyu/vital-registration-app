import React from 'react';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  certificate?: {
    certificateNumber: string;
    type: string;
  };
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose }) => {
  const queryClient = useQueryClient();

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.patch(`/api/notifications/${notificationId}/read`);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'STATUS_UPDATE':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'DOCUMENT_READY':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'VERIFICATION_REQUIRED':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  {notification.certificate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.certificate.type} - {notification.certificate.certificateNumber}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;