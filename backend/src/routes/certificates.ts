import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import Joi from 'joi';
import { prisma } from '../utils/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import { createAuditLog } from '../utils/auditLogger';

const router = express.Router();

const certificateSchema = Joi.object({
  type: Joi.string().valid('BIRTH', 'DEATH', 'MARRIAGE', 'DIVORCE', 'ADOPTION').required(),
  fullName: Joi.string().required(),
  dateOfBirth: Joi.date().optional(),
  placeOfBirth: Joi.string().optional(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
  nationality: Joi.string().optional(),
  fatherName: Joi.string().optional(),
  motherName: Joi.string().optional(),
  spouseName: Joi.string().optional(),
  dateOfEvent: Joi.date().optional(),
  placeOfEvent: Joi.string().optional(),
});

/**
 * @swagger
 * /api/certificates:
 *   post:
 *     summary: Create a new certificate application
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [BIRTH, DEATH, MARRIAGE, DIVORCE, ADOPTION]
 *               fullName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               placeOfBirth:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               nationality:
 *                 type: string
 *               fatherName:
 *                 type: string
 *               motherName:
 *                 type: string
 *               spouseName:
 *                 type: string
 *               dateOfEvent:
 *                 type: string
 *                 format: date
 *               placeOfEvent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Certificate application created successfully
 */
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { error } = certificateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userId = req.user.id;
    const certificateNumber = `CRT-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;

    const certificate = await prisma.certificate.create({
      data: {
        ...req.body,
        applicantId: userId,
        certificateNumber,
        dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
        dateOfEvent: req.body.dateOfEvent ? new Date(req.body.dateOfEvent) : null,
      },
    });

    // Create audit log
    await createAuditLog({
      userId,
      certificateId: certificate.id,
      action: 'CERTIFICATE_CREATED',
      details: { type: certificate.type, certificateNumber },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(201).json({
      message: 'Certificate application created successfully',
      certificate,
    });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get certificates (user's own or all for staff)
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Certificates retrieved successfully
 */
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { status, type, page = 1, limit = 10 } = req.query;

    const where: any = {};
    
    // Citizens can only see their own certificates
    if (userRole === 'CITIZEN') {
      where.applicantId = userId;
    }

    // Add filters
    if (status) where.status = status;
    if (type) where.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        where,
        include: {
          applicant: {
            select: { firstName: true, lastName: true, email: true }
          },
          verifier: {
            select: { firstName: true, lastName: true }
          },
          approver: {
            select: { firstName: true, lastName: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.certificate.count({ where }),
    ]);

    res.json({
      certificates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates/{id}:
 *   get:
 *     summary: Get certificate by ID
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate retrieved successfully
 */
router.get('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const where: any = { id };
    if (userRole === 'CITIZEN') {
      where.applicantId = userId;
    }

    const certificate = await prisma.certificate.findUnique({
      where,
      include: {
        applicant: {
          select: { firstName: true, lastName: true, email: true, phone: true }
        },
        verifier: {
          select: { firstName: true, lastName: true }
        },
        approver: {
          select: { firstName: true, lastName: true }
        },
        auditLogs: {
          orderBy: { timestamp: 'desc' },
          include: {
            user: {
              select: { firstName: true, lastName: true }
            }
          }
        }
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates/{id}/verify:
 *   post:
 *     summary: Verify a certificate (for verifiers)
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Certificate verified successfully
 */
router.post('/:id/verify', authenticateToken, requireRole(['VERIFIER', 'ADMIN']), async (req: any, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const userId = req.user.id;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: 'VERIFIED',
        verifierId: userId,
        verifiedAt: new Date(),
        notes,
      },
      include: {
        applicant: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    // Create audit log
    await createAuditLog({
      userId,
      certificateId: id,
      action: 'CERTIFICATE_VERIFIED',
      details: { certificateNumber: certificate.certificateNumber, notes },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Create notification for applicant
    await prisma.notification.create({
      data: {
        userId: certificate.applicantId,
        certificateId: id,
        type: 'STATUS_UPDATE',
        title: 'Certificate Verified',
        message: `Your ${certificate.type} certificate has been verified and is now pending approval.`,
      },
    });

    res.json({
      message: 'Certificate verified successfully',
      certificate,
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates/{id}/approve:
 *   post:
 *     summary: Approve a certificate (for approvers)
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Certificate approved successfully
 */
router.post('/:id/approve', authenticateToken, requireRole(['APPROVER', 'ADMIN']), async (req: any, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const userId = req.user.id;

    // Generate QR code for verification
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${id}`;
    const qrCode = await QRCode.toDataURL(verificationUrl);

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approverId: userId,
        approvedAt: new Date(),
        issuedAt: new Date(),
        qrCode,
        notes,
      },
      include: {
        applicant: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    // Create audit log
    await createAuditLog({
      userId,
      certificateId: id,
      action: 'CERTIFICATE_APPROVED',
      details: { certificateNumber: certificate.certificateNumber, notes },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Create notification for applicant
    await prisma.notification.create({
      data: {
        userId: certificate.applicantId,
        certificateId: id,
        type: 'DOCUMENT_READY',
        title: 'Certificate Ready',
        message: `Your ${certificate.type} certificate has been approved and is ready for download.`,
      },
    });

    res.json({
      message: 'Certificate approved successfully',
      certificate,
    });
  } catch (error) {
    console.error('Approve certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates/{id}/reject:
 *   post:
 *     summary: Reject a certificate
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Certificate rejected successfully
 */
router.post('/:id/reject', authenticateToken, requireRole(['VERIFIER', 'APPROVER', 'ADMIN']), async (req: any, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    if (!reason) {
      return res.status(400).json({ error: 'Rejection reason is required' });
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: 'REJECTED',
        notes: reason,
      },
      include: {
        applicant: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    // Create audit log
    await createAuditLog({
      userId,
      certificateId: id,
      action: 'CERTIFICATE_REJECTED',
      details: { certificateNumber: certificate.certificateNumber, reason },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Create notification for applicant
    await prisma.notification.create({
      data: {
        userId: certificate.applicantId,
        certificateId: id,
        type: 'STATUS_UPDATE',
        title: 'Certificate Rejected',
        message: `Your ${certificate.type} certificate application has been rejected. Reason: ${reason}`,
      },
    });

    res.json({
      message: 'Certificate rejected successfully',
      certificate,
    });
  } catch (error) {
    console.error('Reject certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/certificates/{id}/download:
 *   get:
 *     summary: Download certificate PDF
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate PDF downloaded successfully
 */
router.get('/:id/download', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const where: any = { id };
    if (userRole === 'CITIZEN') {
      where.applicantId = userId;
    }

    const certificate = await prisma.certificate.findUnique({
      where,
      include: {
        applicant: true,
        verifier: true,
        approver: true
      }
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    if (certificate.status !== 'APPROVED') {
      return res.status(400).json({ error: 'Certificate is not approved for download' });
    }

    // Generate PDF (mock implementation)
    // In production, use a PDF generation library like puppeteer or jsPDF
    const pdfBuffer = Buffer.from(`Certificate PDF for ${certificate.certificateNumber}`);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${certificate.certificateNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;