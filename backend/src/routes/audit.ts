import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['ADMIN', 'APPROVER']), async (req, res) => {
  try {
    const { page = 1, limit = 20, action, userId } = req.query;

    const where: any = {};
    if (action) where.action = action;
    if (userId) where.userId = userId;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true }
          },
          certificate: {
            select: { certificateNumber: true, type: true }
          }
        },
        orderBy: { timestamp: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;