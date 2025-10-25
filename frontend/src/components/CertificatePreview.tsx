import React from 'react';
import { Shield, Calendar, MapPin, User, Users, Heart } from 'lucide-react';
import QRCodeComponent from 'react-qr-code';

interface CertificatePreviewProps {
  certificate: any;
  className?: string;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ certificate, className = '' }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BIRTH': return '👶';
      case 'DEATH': return '💀';
      case 'MARRIAGE': return '💍';
      case 'DIVORCE': return '💔';
      case 'ADOPTION': return '👨‍👩‍👧‍👦';
      default: return '📄';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Federal Democratic Republic of Ethiopia
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Civil Registration and Vital Statistics Agency
        </h2>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <span className="text-3xl">{getTypeIcon(certificate.type)}</span>
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {certificate.type} CERTIFICATE
          </h3>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
              <p className="font-semibold text-gray-900 dark:text-white">{certificate.fullName}</p>
            </div>
          </div>

          {certificate.dateOfBirth && (
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(certificate.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {certificate.placeOfBirth && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Place of Birth</p>
                <p className="font-semibold text-gray-900 dark:text-white">{certificate.placeOfBirth}</p>
              </div>
            </div>
          )}

          {certificate.gender && (
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                <p className="font-semibold text-gray-900 dark:text-white">{certificate.gender}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {certificate.fatherName && (
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Father's Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{certificate.fatherName}</p>
              </div>
            </div>
          )}

          {certificate.motherName && (
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mother's Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{certificate.motherName}</p>
              </div>
            </div>
          )}

          {certificate.nationality && (
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nationality</p>
                <p className="font-semibold text-gray-900 dark:text-white">{certificate.nationality}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Certificate Number</p>
              <p className="font-semibold text-gray-900 dark:text-white">{certificate.certificateNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Issued on</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : 'Pending'}
          </p>
          {certificate.approver && (
            <p className="text-xs text-gray-400 mt-1">
              By: {certificate.approver.firstName} {certificate.approver.lastName}
            </p>
          )}
        </div>

        {certificate.qrCode && (
          <div className="text-center">
            <div className="bg-white p-2 rounded">
              <QRCodeComponent
                value={`${window.location.origin}/verify/${certificate.id}`}
                size={80}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Scan to verify</p>
          </div>
        )}
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <Shield className="h-64 w-64 text-gray-500" />
      </div>
    </div>
  );
};

export default CertificatePreview;