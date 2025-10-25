import express from 'express';
import { prisma } from '../utils/database';

const router = express.Router();

/**
 * @swagger
 * /api/verification/{id}:
 *   get:
 *     summary: Verify certificate by ID (public endpoint)
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate verification result
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { id },
      select: {
        id: true,
        certificateNumber: true,
        type: true,
        status: true,
        fullName: true,
        dateOfEvent: true,
        placeOfEvent: true,
        issuedAt: true,
        expiresAt: true,
        approver: {
          select: { firstName: true, lastName: true }
        }
      },
    });

    if (!certificate) {
      return res.status(404).json({ 
        valid: false,
        error: 'Certificate not found' 
      });
    }

    if (certificate.status !== 'APPROVED') {
      return res.status(400).json({ 
        valid: false,
        error: 'Certificate is not approved' 
      });
    }

    // Check expiration
    const isExpired = certificate.expiresAt && new Date() > certificate.expiresAt;

    res.json({
      valid: !isExpired,
      certificate: {
        ...certificate,
        expired: isExpired
      }
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    res.status(500).json({ 
      valid: false,
      error: 'Internal server error' 
    });
  }
});

/**
 * @swagger
 * /api/verification/number/{certificateNumber}:
 *   get:
 *     summary: Verify certificate by certificate number (public endpoint)
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: certificateNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate verification result
 */
router.get('/number/:certificateNumber', async (req, res) => {
  try {
    const { certificateNumber } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
      select: {
        id: true,
        certificateNumber: true,
        type: true,
        status: true,
        fullName: true,
        dateOfEvent: true,
        placeOfEvent: true,
        issuedAt: true,
        expiresAt: true,
        approver: {
          select: { firstName: true, lastName: true }
        }
      },
    });

    if (!certificate) {
      return res.status(404).json({ 
        valid: false,
        error: 'Certificate not found' 
      });
    }

    if (certificate.status !== 'APPROVED') {
      return res.status(400).json({ 
        valid: false,
        error: 'Certificate is not approved' 
      });
    }

    // Check expiration
    const isExpired = certificate.expiresAt && new Date() > certificate.expiresAt;

    res.json({
      valid: !isExpired,
      certificate: {
        ...certificate,
        expired: isExpired
      }
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    res.status(500).json({ 
      valid: false,
      error: 'Internal server error' 
    });
  }
});

export default router;