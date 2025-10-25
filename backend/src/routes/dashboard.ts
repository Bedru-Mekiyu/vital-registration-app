import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 */
router.get('/stats', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Base stats for all users
    const userCertificates = await prisma.certificate.count({
      where: { applicantId: userId }
    });

    const pendingCertificates = await prisma.certificate.count({
      where: { 
        applicantId: userId,
        status: 'PENDING'
      }
    });

    const approvedCertificates = await prisma.certificate.count({
      where: { 
        applicantId: userId,
        status: 'APPROVED'
      }
    });

    // Admin/staff specific stats
    let adminStats = {};
    if (['ADMIN', 'CLERK', 'VERIFIER', 'APPROVER'].includes(userRole)) {
      const totalCertificates = await prisma.certificate.count();
      const pendingVerification = await prisma.certificate.count({
        where: { status: 'UNDER_REVIEW' }
      });
      const pendingApproval = await prisma.certificate.count({
        where: { status: 'VERIFIED' }
      });
      const totalUsers = await prisma.user.count();

      adminStats = {
        totalCertificates,
        pendingVerification,
        pendingApproval,
        totalUsers,
      };
    }

    // Recent activities
    const recentActivities = await prisma.auditLog.findMany({
      where: userRole === 'CITIZEN' ? { userId } : {},
      take: 10,
      orderBy: { timestamp: 'desc' },
      include: {
        user: {
          select: { firstName: true, lastName: true }
        },
        certificate: {
          select: { certificateNumber: true, type: true }
        }
      }
    });

    // User badges
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true
      }
    });

    // Certificate type distribution
    const certificateTypes = await prisma.certificate.groupBy({
      by: ['type'],
      where: userRole === 'CITIZEN' ? { applicantId: userId } : {},
      _count: {
        type: true
      }
    });

    // Monthly certificate trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyCertificates = await prisma.certificate.groupBy({
      by: ['createdAt'],
      where: {
        ...(userRole === 'CITIZEN' ? { applicantId: userId } : {}),
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _count: {
        id: true
      }
    });

    // Process monthly data
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const count = monthlyCertificates.filter(cert => {
        const certMonth = `${cert.createdAt.getFullYear()}-${String(cert.createdAt.getMonth() + 1).padStart(2, '0')}`;
        return certMonth === monthKey;
      }).reduce((sum, cert) => sum + cert._count.id, 0);

      monthlyData.push({
        month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        count
      });
    }

    res.json({
      userStats: {
        totalCertificates: userCertificates,
        pendingCertificates,
        approvedCertificates,
      },
      ...adminStats,
      recentActivities: recentActivities.map(activity => ({
        id: activity.id,
        action: activity.action,
        timestamp: activity.timestamp,
        user: activity.user ? `${activity.user.firstName} ${activity.user.lastName}` : 'System',
        certificate: activity.certificate?.certificateNumber,
        details: activity.details
      })),
      badges: userBadges.map(ub => ({
        id: ub.badge.id,
        name: ub.badge.name,
        description: ub.badge.description,
        icon: ub.badge.icon,
        color: ub.badge.color,
        earnedAt: ub.earnedAt
      })),
      certificateTypes: certificateTypes.map(ct => ({
        type: ct.type,
        count: ct._count.type
      })),
      monthlyTrends: monthlyData
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;