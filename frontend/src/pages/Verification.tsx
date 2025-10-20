import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Verification: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: verification, isLoading } = useQuery({
    queryKey: ['verification', id],
    queryFn: async () => {
      const response = await axios.get(`/api/verification/${id}`);
      return response.data;
    },
    enabled: !!id,
    retry: false
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (!verification || !verification.valid) {
      return <XCircle className="h-16 w-16 text-red-500" />;
    }
    if (verification.certificate?.expired) {
      return <AlertTriangle className="h-16 w-16 text-yellow-500" />;
    }
    return <CheckCircle className="h-16 w-16 text-green-500" />;
  };

  const getStatusColor = () => {
    if (!verification || !verification.valid) {
      return 'from-red-500 to-red-600';
    }
    if (verification.certificate?.expired) {
      return 'from-yellow-500 to-yellow-600';
    }
    return 'from-green-500 to-green-600';
  };

  const getStatusText = () => {
    if (!verification || !verification.valid) {
      return 'Invalid Certificate';
    }
    if (verification.certificate?.expired) {
      return 'Certificate Expired';
    }
    return 'Valid Certificate';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${getStatusColor()} p-8 text-center text-white`}>
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 mr-3" />
              <h1 className="text-3xl font-bold">Certificate Verification</h1>
            </div>
            <p className="text-white/90">
              Official Civil Registry System
            </p>
          </div>

          {/* Verification Result */}
          <div className="p-8">
            <div className="text-center mb-8">
              {getStatusIcon()}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                {getStatusText()}
              </h2>
              {verification?.error && (
                <p className="text-red-600 dark:text-red-400 mt-2">
                  {verification.error}
                </p>
              )}
            </div>

            {verification?.certificate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Certificate Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Certificate Number</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {verification.certificate.certificateNumber}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Certificate Type</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {verification.certificate.type}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Full Name</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {verification.certificate.fullName}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Status</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {verification.certificate.status}
                    </dd>
                  </div>
                  
                  {verification.certificate.dateOfEvent && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Date of Event</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(verification.certificate.dateOfEvent).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  
                  {verification.certificate.placeOfEvent && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Place of Event</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {verification.certificate.placeOfEvent}
                      </dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Issue Date</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(verification.certificate.issuedAt).toLocaleDateString()}
                    </dd>
                  </div>
                  
                  {verification.certificate.approver && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Approved By</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {verification.certificate.approver.firstName} {verification.certificate.approver.lastName}
                      </dd>
                    </div>
                  )}
                </div>

                {verification.certificate.expired && (
                  <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                          Certificate Expired
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          This certificate has expired and may no longer be valid for official use.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This verification was performed on {new Date().toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Civil Registry System - Government of Ethiopia
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Verification;