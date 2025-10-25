import { prisma } from './database';

interface AuditLogData {
  userId?: string;
  certificateId?: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

export const createAuditLog = async (data: AuditLogData) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        certificateId: data.certificateId,
        action: data.action,
        details: data.details,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};