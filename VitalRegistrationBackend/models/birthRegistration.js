const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BirthRegistration = sequelize.define('BirthRegistration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  childName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  placeOfBirth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false
  }
});

module.exports = BirthRegistration;
