import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['ADMIN', 'CLERK', 'VERIFIER', 'APPROVER']), async (req, res) => {
  try {
    const { days = 30, type = 'summary' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

    // Certificate trends
    const trends = [];
    for (let i = parseInt(days as string) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = await prisma.certificate.count({
        where: {
          createdAt: {
            gte: new Date(dateStr),
            lt: new Date(new Date(dateStr).getTime() + 24 * 60 * 60 * 1000)
          }
        }
      });

      trends.push({
        date: dateStr,
        applications: count
      });
    }

    // Certificate type distribution
    const distribution = await prisma.certificate.groupBy({
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

    const distributionData = distribution.map(d => ({
      name: d.type,
      count: d._count.type
    }));

    // Status overview
    const statusOverview = await prisma.certificate.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: daysAgo
        }
      },
      _count: {
        status: true
      }
    });

    const statusData = statusOverview.map(s => ({
      status: s.status,
      count: s._count.status
    }));

    res.json({
      trends,
      distribution: distributionData,
      statusOverview: statusData,
      period: `${days} days`,
      type
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/generate', authenticateToken, requireRole(['ADMIN', 'CLERK']), async (req, res) => {
  try {
    const { type, days = 30 } = req.query;
    
    // This would generate actual PDF reports
    // For now, return a mock response
    res.json({
      message: 'Report generation started',
      type,
      days,
      downloadUrl: `/api/reports/download/${type}-${Date.now()}.pdf`
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;