import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        include: {
          certificate: {
            select: { certificateNumber: true, type: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    res.json({
      notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id/read', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await prisma.notification.update({
      where: { 
        id,
        userId // Ensure user can only mark their own notifications as read
      },
      data: { isRead: true },
    });

    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/mark-all-read', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;

    await prisma.notification.updateMany({
      where: { 
        userId,
        isRead: false
      },
      data: { isRead: true },
    });

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await prisma.notification.delete({
      where: { 
        id,
        userId // Ensure user can only delete their own notifications
      },
    });

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;