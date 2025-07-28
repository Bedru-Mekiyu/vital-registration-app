const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MarriageRegistration = sequelize.define('MarriageRegistration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  groomName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brideName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfMarriage: {
    type: DataTypes.DATE,
    allowNull: false
  },
  placeOfMarriage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  witnesses: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false
  }
});

module.exports = MarriageRegistration;
