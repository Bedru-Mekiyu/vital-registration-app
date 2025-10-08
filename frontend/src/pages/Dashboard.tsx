import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Activity, 
  Award,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Star,
  Trophy
} from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import ActivityTimeline from '../components/ActivityTimeline';
import BadgeModal from '../components/BadgeModal';

const Dashboard: React.FC = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  const [selectedBadge, setSelectedBadge] = React.useState(null);
  const [showBadgeModal, setShowBadgeModal] = React.useState(false);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/stats');
      return response.data;
    }
  });

  const { data: recentBadges } = useQuery({
    queryKey: ['recent-badges'],
    queryFn: async () => {
      const response = await axios.get('/api/badges/recent');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: t('totalCertificates'),
      value: dashboardData?.userStats?.totalCertificates || 0,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up' as const
    },
    {
      title: t('pendingCertificates'),
      value: dashboardData?.userStats?.pendingCertificates || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+5%',
      trend: 'up' as const
    },
    {
      title: t('approvedCertificates'),
      value: dashboardData?.userStats?.approvedCertificates || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up' as const
    },
    {
      title: 'Total Users',
      value: dashboardData?.totalUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%',
      trend: 'up' as const
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {t('welcome')}, {user?.firstName}! 👋
            </h1>
            <p className="text-blue-100 mt-2">
              Here's what's happening with your certificates today.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <Link
                to="/certificates/new"
                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                New Application
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              {recentBadges?.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedBadge(recentBadges[0]);
                    setShowBadgeModal(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-colors"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  New Badge!
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-blue-100 text-sm">Today</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.name}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('monthlyTrends')}
            </h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData?.monthlyTrends || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Certificate Types Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('certificateTypes')}
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData?.certificateTypes || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(dashboardData?.certificateTypes || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges/Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('achievements')}
            </h3>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <Link
                to="/profile"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {dashboardData?.badges?.map((badge: any) => (
              <div
                key={badge.id}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedBadge(badge);
                  setShowBadgeModal(true);
                }}
              >
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {badge.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {badge.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {(!dashboardData?.badges || dashboardData.badges.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No badges earned yet. Complete more actions to earn badges!
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('recentActivities')}
            </h3>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <Link
                to="/audit"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All
              </Link>
            </div>
          </div>
          <ActivityTimeline 
            activities={dashboardData?.recentActivities?.slice(0, 5) || []}
          />
        </motion.div>
      </div>

      {/* Badge Modal */}
      <BadgeModal
        badge={selectedBadge}
        isOpen={showBadgeModal}
        onClose={() => {
          setShowBadgeModal(false);
          setSelectedBadge(null);
        }}
      />
    </div>
  );
};

export default Dashboard;