const sequelize = require('../config/database');
const User = require('../models/user');
const BirthRegistration = require('../models/birthRegistration');
const DeathRegistration = require('../models/deathRegistration');
const MarriageRegistration = require('../models/marriageRegistration');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed Users
    await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        fullName: 'Abebe Kebede',
        email: 'abebe@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'admin'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        fullName: 'Mulugeta Tesfaye',
        email: 'mulugeta@example.com',
        password: await bcrypt.hash('password123', 12),
        role: 'user'
      }
    ]);

    // Seed Birth Registrations
    await BirthRegistration.bulkCreate([
      {
        childName: 'Selam Tesfaye',
        fatherName: 'Tesfaye Bekele',
        motherName: 'Aster Kebede',
        dateOfBirth: new Date('2020-01-15'),
        gender: 'female',
        placeOfBirth: 'Addis Ababa',
        status: 'pending',
        userId: '550e8400-e29b-41d4-a716-446655440002'
      }
    ]);

    // Seed Death Registrations
    await DeathRegistration.bulkCreate([
      {
        fullName: 'Getachew Alemayehu',
        dateOfDeath: new Date('2023-06-20'),
        placeOfDeath: 'Bahir Dar',
        causeOfDeath: 'Natural causes',
        status: 'pending',
        userId: '550e8400-e29b-41d4-a716-446655440002'
      }
    ]);

    // Seed Marriage Registrations
    await MarriageRegistration.bulkCreate([
      {
        groomName: 'Yohannes Tadesse',
        brideName: 'Selamawit Gebremedhin',
        dateOfMarriage: new Date('2022-12-10'),
        placeOfMarriage: 'Addis Ababa',
        witnesses: ['Alemayehu Worku', 'Tigist Mengistu'],
        status: 'pending',
        userId: '550e8400-e29b-41d4-a716-446655440002'
      }
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedData();
