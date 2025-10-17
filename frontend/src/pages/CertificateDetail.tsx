import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Download, Share2, QrCode, Clock, Eye, Printer as Print, MessageSquare, AlertTriangle } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { motion } from 'framer-motion';
import QRCodeComponent from 'react-qr-code';
import clsx from 'clsx';
import CertificatePreview from '../components/CertificatePreview';
import toast from 'react-hot-toast';

const CertificateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { data: certificate, isLoading } = useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const response = await axios.get(`/api/certificates/${id}`);
      return response.data;
    },
    enabled: !!id
  });

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    UNDER_REVIEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    VERIFIED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  };

  const typeIcons = {
    BIRTH: '👶',
    DEATH: '💀',
    MARRIAGE: '💍',
    DIVORCE: '💔',
    ADOPTION: '👨‍👩‍👧‍👦',
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/certificates/${id}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${certificate.certificateNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download certificate');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate.type} Certificate`,
          text: `Certificate for ${certificate.fullName}`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Certificate not found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          The certificate you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <button
          onClick={() => navigate('/certificates')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Certificates
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/certificates')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Certificate Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {certificate.certificateNumber}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {certificate.status === 'APPROVED' && (
            <>
              <button 
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button 
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </>
          )}
          <button 
            onClick={handleShare}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Certificate Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">
                  {typeIcons[certificate.type as keyof typeof typeIcons]}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t(certificate.type)}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {certificate.fullName}
                  </p>
                </div>
              </div>
              <span className={clsx(
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                statusColors[certificate.status as keyof typeof statusColors]
              )}>
                {t(certificate.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Personal Information
                </h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Full Name</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.fullName}</dd>
                  </div>
                  {certificate.dateOfBirth && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(certificate.dateOfBirth).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  {certificate.placeOfBirth && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Place of Birth</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.placeOfBirth}</dd>
                    </div>
                  )}
                  {certificate.gender && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Gender</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.gender}</dd>
                    </div>
                  )}
                  {certificate.nationality && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Nationality</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.nationality}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Family Information
                </h3>
                <dl className="space-y-2">
                  {certificate.fatherName && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Father's Name</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.fatherName}</dd>
                    </div>
                  )}
                  {certificate.motherName && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Mother's Name</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.motherName}</dd>
                    </div>
                  )}
                  {certificate.spouseName && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Spouse's Name</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.spouseName}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {certificate.dateOfEvent && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Event Information
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Date of Event</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(certificate.dateOfEvent).toLocaleDateString()}
                    </dd>
                  </div>
                  {certificate.placeOfEvent && (
                    <div>
                      <dt className="text-sm text-gray-600 dark:text-gray-400">Place of Event</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.placeOfEvent}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>

          {/* Approval Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Processing Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Application Submitted</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(certificate.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {certificate.verifiedAt && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Verified by {certificate.verifier?.firstName} {certificate.verifier?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(certificate.verifiedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {certificate.approvedAt && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Approved by {certificate.approver?.firstName} {certificate.approver?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(certificate.approvedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {certificate.status === 'PENDING' && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Awaiting Review</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">In progress</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Information
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-400">Certificate Number</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">{certificate.certificateNumber}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-400">Application Date</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(certificate.createdAt).toLocaleDateString()}
                </dd>
              </div>
              {certificate.issuedAt && (
                <div>
                  <dt className="text-sm text-gray-600 dark:text-gray-400">Issue Date</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(certificate.issuedAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-400">Applicant</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {certificate.applicant?.firstName} {certificate.applicant?.lastName}
                </dd>
              </div>
            </dl>
          </div>

          {/* QR Code */}
          {certificate.qrCode && certificate.status === 'APPROVED' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Verification QR Code
                </h3>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeComponent
                    value={`${window.location.origin}/verify/${certificate.id}`}
                    size={150}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Scan to verify this certificate
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Actions
            </h3>
            <div className="space-y-3">
              {certificate.status === 'APPROVED' && (
                <>
                  <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </button>
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Certificate
                  </button>
                </>
              )}
              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Certificate
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Certificate Preview
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <CertificatePreview certificate={certificate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateDetail;