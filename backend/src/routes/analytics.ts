import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['ADMIN', 'CLERK', 'VERIFIER', 'APPROVER']), async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

    // Total applications
    const totalApplications = await prisma.certificate.count({
      where: {
        createdAt: {
          gte: daysAgo
        }
      }
    });

    // Approved today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const approvedToday = await prisma.certificate.count({
      where: {
        status: 'APPROVED',
        approvedAt: {
          gte: today
        }
      }
    });

    // Pending review
    const pendingReview = await prisma.certificate.count({
      where: {
        status: {
          in: ['PENDING', 'UNDER_REVIEW']
        }
      }
    });

    // Active users (users who logged in within the period)
    const activeUsers = await prisma.auditLog.groupBy({
      by: ['userId'],
      where: {
        action: 'USER_LOGIN',
        timestamp: {
          gte: daysAgo
        }
      }
    });

    // Application trends (daily data)
    const applicationTrends = await prisma.certificate.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: daysAgo
        }
      },
      _count: {
        id: true
      }
    });

    // Process trends data
    const trendsData = [];
    for (let i = parseInt(days as string) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = applicationTrends.filter(trend => {
        const trendDate = trend.createdAt.toISOString().split('T')[0];
        return trendDate === dateStr;
      }).reduce((sum, trend) => sum + trend._count.id, 0);

      trendsData.push({
        date: dateStr,
        applications: count
      });
    }

    // Certificate types distribution
    const certificateTypes = await prisma.certificate.groupBy({
      by: ['type'],
      where: {
        createdAt: {
          gte: daysAgo
        }
      },
      _count: {
        type: true
      }
    });

    const typesData = certificateTypes.map(ct => ({
      name: ct.type,
      count: ct._count.type
    }));

    // Processing times (mock data for now)
    const processingTimes = [
      { stage: 'Application', averageTime: 0.1 },
      { stage: 'Review', averageTime: 1.5 },
      { stage: 'Verification', averageTime: 2.0 },
      { stage: 'Approval', averageTime: 0.8 },
      { stage: 'Issuance', averageTime: 0.3 }
    ];

    // Regional data (mock data)
    const regionalData = [
      { region: 'Addis Ababa', applications: 450 },
      { region: 'Oromia', applications: 320 },
      { region: 'Amhara', applications: 280 },
      { region: 'Tigray', applications: 150 },
      { region: 'SNNP', applications: 200 },
      { region: 'Somali', applications: 120 }
    ];

    res.json({
      totalApplications,
      approvedToday,
      pendingReview,
      activeUsers: activeUsers.length,
      applicationTrends: trendsData,
      certificateTypes: typesData,
      processingTimes,
      regionalData
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;