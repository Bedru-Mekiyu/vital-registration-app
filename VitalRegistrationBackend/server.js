// server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const birthRoutes = require('./routes/birthRoutes');
const deathRoutes = require('./routes/deathRoutes');
const marriageRoutes = require('./routes/marriageRoutes');
const { logger } = require('./utils/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/births', birthRoutes);
app.use('/api/v1/deaths', deathRoutes);
app.use('/api/v1/marriages', marriageRoutes);

// Error handling
app.use(errorMiddleware);

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();