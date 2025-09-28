const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DeathRegistration = sequelize.define('DeathRegistration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfDeath: {
    type: DataTypes.DATE,
    allowNull: false
  },
  placeOfDeath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  causeOfDeath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false
  }
});

module.exports = DeathRegistration;
