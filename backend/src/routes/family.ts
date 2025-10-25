import express from 'express';
import { prisma } from '../utils/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/tree', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;

    const familyMembers = await prisma.familyMember.findMany({
      where: { userId },
      include: {
        certificate: {
          select: {
            id: true,
            type: true,
            fullName: true,
            dateOfEvent: true,
            status: true
          }
        }
      }
    });

    // Group by relationship
    const familyTree = familyMembers.reduce((acc, member) => {
      if (!acc[member.relationship]) {
        acc[member.relationship] = [];
      }
      acc[member.relationship].push({
        id: member.id,
        name: member.relatedPersonName,
        certificate: member.certificate
      });
      return acc;
    }, {} as any);

    res.json({ familyTree });
  } catch (error) {
    console.error('Get family tree error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;