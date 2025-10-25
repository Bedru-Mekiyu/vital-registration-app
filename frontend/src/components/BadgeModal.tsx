import React from 'react';
import { X, Award, Calendar, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}

interface BadgeModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ badge, isOpen, onClose }) => {
  if (!badge) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="text-6xl mb-4">{badge.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{badge.name}</h2>
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm opacity-90">Achievement Unlocked</span>
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                {badge.description}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Earned on {new Date(badge.earnedAt).toLocaleDateString()}</span>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Awesome!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;