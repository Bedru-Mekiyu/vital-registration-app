import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { authenticateToken, requireRole } from './middleware/auth'; // Corrected import
import authRoutes from './routes/auth'; // Default import for Router
import certificateRoutes from './routes/certificates';
import userRoutes from './routes/users';
import dashboardRoutes from './routes/dashboard';
import auditRoutes from './routes/audit';
import notificationRoutes from './routes/notifications';
import badgeRoutes from './routes/badges';
import familyRoutes from './routes/family';
import verificationRoutes from './routes/verification';
import smsRoutes from './routes/sms';
import blockchainRoutes from './routes/blockchain';
import analyticsRoutes from './routes/analytics';
import reportsRoutes from './routes/reports';

import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Civil Registry API',
      version: '1.0.0',
      description: 'Complete Civil Registry Management System API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportsRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;