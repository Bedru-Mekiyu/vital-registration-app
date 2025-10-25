import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: Get all badges
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all badges
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const badges = await prisma.badge.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { userBadges: true }
        }
      }
    });

    res.json(badges.map(badge => ({
      ...badge,
      usersCount: badge._count.userBadges
    })));
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/badges/user/{userId}:
 *   get:
 *     summary: Get user badges
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User badges retrieved successfully
 */
router.get('/user/:userId', authenticateToken, async (req: any, res) => {
  try {
    const { userId } = req.params;
    const requesterId = req.user.id;

    // Users can only see their own badges, unless admin/staff
    if (userId !== requesterId && !['ADMIN', 'CLERK'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const userBadges = await prisma.userBadge.findMany({
      where: { 
        userId,
        isVisible: true 
      },
      include: {
        badge: true
      },
      orderBy: { earnedAt: 'desc' }
    });

    res.json(userBadges.map(ub => ({
      id: ub.id,
      badge: ub.badge,
      earnedAt: ub.earnedAt
    })));
  } catch (error) {
    console.error('Get user badges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/badges/recent:
 *   get:
 *     summary: Get recent badges for current user
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent badges retrieved successfully
 */
router.get('/recent', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    
    const recentBadges = await prisma.userBadge.findMany({
      where: { 
        userId,
        isVisible: true,
        earnedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: {
        badge: true
      },
      orderBy: { earnedAt: 'desc' },
      take: 3
    });

    res.json(recentBadges.map(ub => ({
      id: ub.id,
      badge: ub.badge,
      earnedAt: ub.earnedAt
    })));
  } catch (error) {
    console.error('Get recent badges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/badges/check-eligibility:
 *   post:
 *     summary: Check badge eligibility for user
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Badge eligibility checked
 */
router.post('/check-eligibility', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    
    // Get user stats
    const userStats = await getUserStats(userId);
    
    // Get available badges
    const badges = await prisma.badge.findMany({
      where: { isActive: true }
    });

    // Check eligibility and award new badges
    const newBadges = [];
    
    for (const badge of badges) {
      // Check if user already has this badge
      const existingBadge = await prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId: badge.id
          }
        }
      });

      if (!existingBadge && checkBadgeCriteria(badge, userStats)) {
        // Award badge
        const userBadge = await prisma.userBadge.create({
          data: {
            userId,
            badgeId: badge.id
          },
          include: {
            badge: true
          }
        });
        
        newBadges.push(userBadge);
      }
    }

    res.json({
      message: 'Badge eligibility checked',
      newBadges: newBadges.map(ub => ({
        id: ub.id,
        badge: ub.badge,
        earnedAt: ub.earnedAt
      }))
    });
  } catch (error) {
    console.error('Check badge eligibility error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function getUserStats(userId: string) {
  const certificates = await prisma.certificate.count({
    where: { applicantId: userId }
  });

  const approvedCertificates = await prisma.certificate.count({
    where: { 
      applicantId: userId,
      status: 'APPROVED'
    }
  });

  const birthCertificates = await prisma.certificate.count({
    where: { 
      applicantId: userId,
      type: 'BIRTH'
    }
  });

  const marriageCertificates = await prisma.certificate.count({
    where: { 
      applicantId: userId,
      type: 'MARRIAGE'
    }
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdAt: true }
  });

  const daysSinceJoining = user ? 
    Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return {
    totalCertificates: certificates,
    approvedCertificates,
    birthCertificates,
    marriageCertificates,
    daysSinceJoining
  };
}

function checkBadgeCriteria(badge: any, stats: any): boolean {
  const criteria = badge.criteria as any;
  
  switch (badge.name) {
    case 'First Steps':
      return stats.totalCertificates >= 1;
    case 'Certificate Collector':
      return stats.totalCertificates >= 5;
    case 'Registry Master':
      return stats.approvedCertificates >= 10;
    case 'Early Adopter':
      return stats.daysSinceJoining >= 30;
    case 'Family Documenter':
      return stats.birthCertificates >= 2;
    case 'Union Certified':
      return stats.marriageCertificates >= 1;
    default:
      return false;
  }
}

export default router;