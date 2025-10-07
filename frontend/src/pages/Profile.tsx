import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User, Mail, Phone, Calendar, Award, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const { data: badges } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      const response = await axios.get(`/api/badges/user/${user?.id}`);
      return response.data;
    },
    enabled: !!user?.id
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-blue-100 mt-1 capitalize">
              {user?.role.toLowerCase().replace('_', ' ')}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {user && 'phone' in user && (
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(user as any).phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              )}

              {user && 'createdAt' in user && (
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date((user as any).createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Badges & Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Account Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Certificates</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {badges?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-5 w-5 text-yellow-600 mr-2" />
              Achievements
            </h3>
            
            <div className="space-y-3">
              {badges && badges.length > 0 ? (
                badges.map((userBadge: any) => (
                  <div
                    key={userBadge.id}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="text-2xl">
                      {userBadge.badge.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {userBadge.badge.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {userBadge.badge.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Earned {new Date(userBadge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Award className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    No badges yet
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Complete actions to earn badges and achievements!
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;