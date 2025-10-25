import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NotificationPanel from './NotificationPanel';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useI18n();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await axios.get('/api/notifications');
      return response.data;
    }
  });

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'am', name: t('amharic'), flag: '🇪🇹' },
    { code: 'or', name: t('oromo'), flag: '🇪🇹' },
    { code: 'ti', name: t('tigrinya'), flag: '🇪🇹' },
    { code: 'ar', name: t('arabic'), flag: '🇸🇦' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Civil Registry System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            {showLanguages && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLanguages(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                      language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {notifications?.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationPanel
                notifications={notifications?.notifications || []}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setShowProfile(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;