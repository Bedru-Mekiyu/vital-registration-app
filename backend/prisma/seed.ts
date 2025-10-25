import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@civilregistry.gov' },
    update: {},
    create: {
      email: 'admin@civilregistry.gov',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      phone: '+251911000000',
    },
  });

  // Create sample staff users
  const verifierPassword = await bcrypt.hash('verifier123', 12);
  const verifier = await prisma.user.upsert({
    where: { email: 'verifier@civilregistry.gov' },
    update: {},
    create: {
      email: 'verifier@civilregistry.gov',
      password: verifierPassword,
      firstName: 'John',
      lastName: 'Verifier',
      role: 'VERIFIER',
      phone: '+251911000001',
    },
  });

  const approverPassword = await bcrypt.hash('approver123', 12);
  const approver = await prisma.user.upsert({
    where: { email: 'approver@civilregistry.gov' },
    update: {},
    create: {
      email: 'approver@civilregistry.gov',
      password: approverPassword,
      firstName: 'Jane',
      lastName: 'Approver',
      role: 'APPROVER',
      phone: '+251911000002',
    },
  });

  // Create sample citizen
  const citizenPassword = await bcrypt.hash('citizen123', 12);
  const citizen = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      email: 'citizen@example.com',
      password: citizenPassword,
      firstName: 'Ahmed',
      lastName: 'Mohammed',
      role: 'CITIZEN',
      phone: '+251911123456',
    },
  });

  // Create badges
  const badges = [
    {
      name: 'First Steps',
      description: 'Applied for your first certificate',
      icon: '🏆',
      color: '#10B981',
      criteria: { minCertificates: 1 },
    },
    {
      name: 'Certificate Collector',
      description: 'Applied for 5 or more certificates',
      icon: '📋',
      color: '#3B82F6',
      criteria: { minCertificates: 5 },
    },
    {
      name: 'Registry Master',
      description: 'Successfully obtained 10 approved certificates',
      icon: '👑',
      color: '#F59E0B',
      criteria: { minApproved: 10 },
    },
    {
      name: 'Early Adopter',
      description: 'One of the first users of the system',
      icon: '🚀',
      color: '#8B5CF6',
      criteria: { earlyUser: true },
    },
    {
      name: 'Family Documenter',
      description: 'Registered multiple family member documents',
      icon: '👨‍👩‍👧‍👦',
      color: '#EF4444',
      criteria: { familyDocuments: 2 },
    },
    {
      name: 'Union Certified',
      description: 'Successfully registered a marriage certificate',
      icon: '💍',
      color: '#EC4899',
      criteria: { marriageCertificate: true },
    },
  ];

  for (const badgeData of badges) {
    await prisma.badge.upsert({
      where: { name: badgeData.name },
      update: {},
      create: badgeData,
    });
  }

  // Award "Early Adopter" badge to citizen
  const earlyAdopterBadge = await prisma.badge.findUnique({
    where: { name: 'Early Adopter' }
  });

  if (earlyAdopterBadge) {
    await prisma.userBadge.upsert({
      where: {
        userId_badgeId: {
          userId: citizen.id,
          badgeId: earlyAdopterBadge.id,
        }
      },
      update: {},
      create: {
        userId: citizen.id,
        badgeId: earlyAdopterBadge.id,
      },
    });
  }

  // Create sample certificate
  const certificate = await prisma.certificate.create({
    data: {
      certificateNumber: 'CRT-SAMPLE-001',
      type: 'BIRTH',
      status: 'APPROVED',
      applicantId: citizen.id,
      fullName: 'Ahmed Mohammed Ali',
      dateOfBirth: new Date('1995-06-15'),
      placeOfBirth: 'Addis Ababa, Ethiopia',
      gender: 'MALE',
      nationality: 'Ethiopian',
      fatherName: 'Mohammed Ali Hassan',
      motherName: 'Fatima Ibrahim Ahmed',
      dateOfEvent: new Date('1995-06-15'),
      placeOfEvent: 'Addis Ababa, Ethiopia',
      verifierId: verifier.id,
      verifiedAt: new Date(),
      approverId: approver.id,
      approvedAt: new Date(),
      issuedAt: new Date(),
    },
  });

  // Award "First Steps" badge to citizen
  const firstStepsBadge = await prisma.badge.findUnique({
    where: { name: 'First Steps' }
  });

  if (firstStepsBadge) {
    await prisma.userBadge.upsert({
      where: {
        userId_badgeId: {
          userId: citizen.id,
          badgeId: firstStepsBadge.id,
        }
      },
      update: {},
      create: {
        userId: citizen.id,
        badgeId: firstStepsBadge.id,
      },
    });
  }

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      userId: citizen.id,
      certificateId: certificate.id,
      action: 'CERTIFICATE_CREATED',
      details: { type: 'BIRTH', certificateNumber: 'CRT-SAMPLE-001' },
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: verifier.id,
      certificateId: certificate.id,
      action: 'CERTIFICATE_VERIFIED',
      details: { certificateNumber: 'CRT-SAMPLE-001' },
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: approver.id,
      certificateId: certificate.id,
      action: 'CERTIFICATE_APPROVED',
      details: { certificateNumber: 'CRT-SAMPLE-001' },
    },
  });

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: citizen.id,
      certificateId: certificate.id,
      type: 'DOCUMENT_READY',
      title: 'Certificate Ready',
      message: 'Your birth certificate has been approved and is ready for download.',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin user: admin@civilregistry.gov / admin123');
  console.log('👤 Verifier: verifier@civilregistry.gov / verifier123');
  console.log('👤 Approver: approver@civilregistry.gov / approver123');
  console.log('👤 Citizen: citizen@example.com / citizen123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });