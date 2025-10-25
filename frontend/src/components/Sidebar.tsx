import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  User, 
  Users, 
  Shield, 
  Activity,
  Award,
  BarChart3,
  Bell,
  FileBarChart,
  HelpCircle,
  Settings as SettingsIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const location = useLocation();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard, current: location.pathname === '/' },
    { name: t('certificates'), href: '/certificates', icon: FileText, current: location.pathname.startsWith('/certificates') },
    { name: t('newCertificate'), href: '/certificates/new', icon: Plus, current: location.pathname === '/certificates/new' },
    { name: t('family'), href: '/family', icon: Users, current: location.pathname === '/family' },
    { name: t('profile'), href: '/profile', icon: User, current: location.pathname === '/profile' },
  ];

  // Add admin/staff specific navigation
  if (user?.role && ['ADMIN', 'CLERK', 'VERIFIER', 'APPROVER'].includes(user.role)) {
    navigation.push(
      { name: t('audit'), href: '/audit', icon: Shield, current: location.pathname === '/audit' },
      { name: 'Analytics', href: '/analytics', icon: BarChart3, current: location.pathname === '/analytics' },
      { name: 'Reports', href: '/reports', icon: FileBarChart, current: location.pathname === '/reports' }
    );
  }

  // Add notifications for all users
  navigation.push(
    { name: 'Notifications', href: '/notifications', icon: Bell, current: location.pathname === '/notifications' },
    { name: 'Help', href: '/help', icon: HelpCircle, current: location.pathname === '/help' }
  );

  // Add settings for all users
  navigation.push(
    { name: 'Settings', href: '/settings', icon: SettingsIcon, current: location.pathname === '/settings' }
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="flex items-center space-x-2">
          <Award className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">CivReg</span>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
        
        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            {t('achievements')}
          </h3>
          <BadgesSummary />
        </div>
      </nav>
    </div>
  );
};

const BadgesSummary: React.FC = () => {
  const { user } = useAuth();
  
  const { data: badges } = useQuery({
    queryKey: ['user-badges-summary', user?.id],
    queryFn: async () => {
      const response = await axios.get(`/api/badges/user/${user?.id}`);
      return response.data.slice(0, 3); // Show only first 3 badges
    },
    enabled: !!user?.id
  });

  return (
    <div className="mt-3 space-y-2">
      {badges?.map((userBadge: any) => (
        <div key={userBadge.id} className="flex items-center space-x-2 p-2 rounded-md bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800">
          <span className="text-lg">{userBadge.badge.icon}</span>
          <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
            {userBadge.badge.name}
          </span>
        </div>
      ))}
      {(!badges || badges.length === 0) && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No badges earned yet
        </p>
      )}
    </div>
  );
};

export default Sidebar;