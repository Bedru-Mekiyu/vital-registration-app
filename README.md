<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Sequelize-6.28-52B0E7?logo=sequelize" alt="Sequelize" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/i18n-5_languages-0891B2" alt="i18n: 5 languages" />
  <img src="https://img.shields.io/badge/shadcn/ui-51_components-000000" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.83-FF4154" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/React_Hook_Form-7.61-EC5990" alt="React Hook Form" />
  <br />
  <img src="https://img.shields.io/badge/status-development-22c55e" alt="Status: Development" />
  <img src="https://img.shields.io/badge/license-MIT-22c55e" alt="License: MIT" />
</p>

<div align="center">
  <h1>🌍 Vital Registration App</h1>
  <p><strong>A national life-events and civic engagement platform for digital vital registration.</strong></p>
  <p>Birth, death, marriage, divorce, and adoption registration with certificate management, audit trails, and analytics.</p>
</div>

<br />

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [User Roles & Permissions](#user-roles--permissions)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

---

## Overview

**Vital Registration App** is a full-stack web platform designed to digitalize national vital event registration — births, deaths, marriages, divorces, and adoptions. Citizens can submit registrations, track certificate status, and download digitally signed PDF certificates. Administrators and clerks manage workflows through role-based dashboards with audit logging, analytics, and gamification.

The application features **two parallel backend implementations**:

- **Modern stack (TypeScript + Prisma)** — Full certificate lifecycle management with 7 database models, 6 user roles, audit logging, notifications, badges/gamification, family tree, analytics, SMS, and blockchain anchoring endpoints
- **Legacy stack (JavaScript + Sequelize)** — Core vital registration CRUD (birth, death, marriage) with user/admin roles and PDF certificate generation

The frontend is a **React 18 SPA** with TypeScript, 33 routes, Supabase authentication, 5-language i18n support, and 51 shadcn/ui components.

> Built as a digital public good for Ethiopia's civil registration system.

---

## Problem Statement

Many developing nations still rely on paper-based vital registration systems, leading to:

- **Incomplete records** — births and deaths going unregistered, especially in rural areas
- **Fraud and forgery** — paper certificates can be easily falsified
- **No transparency** — citizens cannot track the status of their applications
- **Inefficient workflows** — manual processing delays approvals
- **No data-driven policy** — lack of real-time demographic data for government planning

**Vital Registration App** addresses these challenges by providing:

- **Digital submission** — citizens register life events online
- **Immutable audit trails** — every action is logged with timestamps and user identity
- **Role-based workflow** — clerks, verifiers, approvers, and admins each have defined responsibilities
- **QR-verifiable certificates** — digitally signed PDFs with verification API
- **Real-time analytics** — dashboards for data-driven policy decisions
- **Gamification** — badges incentivize timely registration and efficient processing
- **Multilingual access** — 5 Ethiopian languages supported in the UI

---

## Key Features

### Vital Registration

| Feature | Description | Status |
|---------|-------------|--------|
| **👶 Birth Registration** | Register births with child, father, mother details; PDF certificate | ✅ |
| **💀 Death Registration** | Register deaths with cause, place, date; PDF certificate | ✅ |
| **💍 Marriage Registration** | Register marriages with groom, bride, witnesses; PDF certificate | ✅ |
| **📄 Divorce Registration** | Certificate type defined in schema | 🔜 Partial |
| **👨‍👩‍👧‍👦 Adoption Registration** | Certificate type defined in schema | 🔜 Partial |

### Certificate Management

| Feature | Description | Status |
|---------|-------------|--------|
| **📜 Digital Certificates** | PDF generation with pdfkit (birth, death, marriage) | ✅ |
| **🔍 Public Verification** | Verify certificates by ID or certificate number (no auth) | ✅ |
| **✅ Workflow** | Submit → Verify → Approve → Issue → Download | ✅ |
| **🏷️ QR Codes** | QR embedded in approved certificates | ✅ |
| **📎 Document Upload** | Upload supporting documents | ✅ |

### User & Access

| Feature | Description | Status |
|---------|-------------|--------|
| **🔐 Authentication** | JWT-based (Express) + Supabase Auth (frontend) | ✅ |
| **👥 Role Management** | 6 roles: Citizen, Clerk, Verifier, Approver, Admin, Court Official | ✅ |
| **🔒 Data Isolation** | Citizens see only own records; admins see all | ✅ |

### Monitoring & Engagement

| Feature | Description | Status |
|---------|-------------|--------|
| **📊 Dashboard Analytics** | Aggregated stats, trends, regional distribution | ✅ |
| **📋 Audit Logs** | Immutable action log with IP, user agent, timestamps | ✅ |
| **🔔 Notifications** | System alerts for status changes, approvals, verifications | ✅ |
| **🏅 Badges / Gamification** | 6 badge types with automatic eligibility checks | ✅ |
| **👪 Family Tree** | Relationship mapping between certificate holders | ✅ |

### Communication & Integration

| Feature | Description | Status |
|---------|-------------|--------|
| **📱 SMS Notifications** | EthioTelecom API integration with mock fallback | ✅ |
| **⛓️ Blockchain Anchoring** | External API for certificate hash storage (mock-ready) | ✅ |
| **📖 API Documentation** | Swagger UI at `/api-docs` | ✅ |

### Frontend Features

| Feature | Description | Status |
|---------|-------------|--------|
| **🌐 i18n** | Amharic, Afan Oromo, Somali, Tigrinya, English | ✅ |
| **🎨 51 UI Components** | shadcn/ui with Radix primitives | ✅ |
| **🌙 Dark Mode** | Full theme with system preference detection | ✅ |
| **♿ Accessibility Menu** | Font size, contrast, reduced motion, cursor options | ✅ |
| **📱 PWA Support** | Install prompt for progressive web app | ✅ |
| **🎤 Voice Commands** | Simulated voice navigation | ✅ |
| **📷 QR Scanner** | Simulated camera-based QR scanning | ✅ |
| **🔐 2FA / Biometric UI** | Simulated multi-factor authentication screens | ✅ |

### Planned / Partially Implemented

| Feature | Status | Notes |
|---------|--------|-------|
| Email Notifications | ❌ | Nodemailer not installed |
| USSD Integration | ❌ | No USSD code; SMS endpoint exists |
| Cross-Border API | ❌ | Not implemented |
| Docker / Docker Compose | ❌ | No Dockerfiles |
| Flutter Mobile Apps | ❌ | Not implemented |
| Refresh Tokens | ❌ | Env vars exist, no code |
| Redis Caching | ❌ | Env vars exist, no code |
| Jest / Cypress Tests | ❌ | Badges in README but not installed |
| Adoptions / Divorce Workflows | 🔜 | Certificate types exist in schema, no routes |

---

## User Roles & Permissions

| Role | Capabilities | Restrictions |
|------|-------------|--------------|
| **👤 Citizen** | Register life events, view own certificates, manage profile, family tree | Cannot view other users' data, cannot verify/approve |
| **🏥 Clerk** | Process registrations, update statuses | Cannot approve final issuance |
| **🔍 Verifier** | Verify certificate authenticity, mark as verified | Cannot approve |
| **✅ Approver** | Final approval of certificates for issuance | Cannot self-approve own applications |
| **🛡️ Admin** | Full system access, user management, analytics, reports, audit logs | — |
| **⚖️ Court Official** | Marriage and adoption legal processing | Limited to court-related workflows |

### Access Control Summary

```
Public (no auth)        → Verify certificate, health check, API docs
Citizen                 → Own CRUD, own dashboard, own notifications
Clerk                   → List/update certificates, send SMS
Verifier                → Verify certificates, reject
Approver                → Approve/reject certificates
Admin                   → Everything + audit logs, analytics, badges, blockchain
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React 18 + Vite)                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    App.tsx                                 │   │
│  │  QueryClientProvider + AuthProvider + ThemeProvider        │   │
│  │  + i18n initialization                                     │   │
│  └──────────┬───────────────────────────────────────────────┘   │
│             │                                                    │
│  ┌──────────┴───────────────────────────────────────────────┐   │
│  │              React Router v6 (33 routes)                   │   │
│  │  /  /auth/:type  /dashboard/*  /documents  /admin          │   │
│  │  /family-tree  /rewards  /verify  /services  /analytics    │   │
│  │  /audit-logs  /transparency  /education  /api-docs  ...    │   │
│  └──────────┬───────────────────────────────────────────────┘   │
│             │                                                    │
│  ┌──────────┴───────────────────────────────────────────────┐   │
│  │              Data Layer                                    │   │
│  │  TanStack Query (server state)  +  AuthContext (Supabase)  │   │
│  │  ThemeContext (dark/light)  +  zustand (listed, unused)    │   │
│  └──────────┬───────────────────────────────────────────────┘   │
│             │                                                    │
│  ┌──────────┴───────────────────────────────────────────────┐   │
│  │              Supabase JS SDK (direct DB calls)             │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       │ (browser → Supabase API)
                       │ (dev proxy: localhost:5173 → Supabase)
                       │
┌──────────────────────┴───────────────────────────────────────────┐
│              BACKEND (Express + Dual ORM)                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware Pipeline                                       │   │
│  │  helmet() → cors() → rateLimit() → json() → morgan()      │   │
│  └──────────┬───────────────────────────────────────────────┘   │
│             │                                                    │
│  ┌──────────┴──────────────────┬─────────────────────────────┐  │
│  │   JS Codebase (Sequelize)   │   TS Codebase (Prisma)      │  │
│  │                             │                             │  │
│  │  Routes:                    │  Routes:                    │  │
│  │  /api/v1/auth               │  /api/auth                  │  │
│  │  /api/v1/births             │  /api/certificates          │  │
│  │  /api/v1/deaths             │  /api/users                 │  │
│  │  /api/v1/marriages          │  /api/dashboard             │  │
│  │                             │  /api/audit                 │  │
│  │  Services:                  │  /api/notifications         │  │
│  │  authService                │  /api/badges                │  │
│  │  birthService               │  /api/family                │  │
│  │  deathService               │  /api/verification          │  │
│  │  marriageService            │  /api/sms                   │  │
│  │  pdfService                 │  /api/blockchain            │  │
│  │                             │  /api/analytics             │  │
│  │  Models:                    │  /api/reports               │  │
│  │  User (user/admin)          │                             │  │
│  │  BirthRegistration          │  Models (7):                │  │
│  │  DeathRegistration          │  User, Certificate,         │  │
│  │  MarriageRegistration       │  FamilyMember, AuditLog,    │  │
│  │                             │  Notification, Badge,       │  │
│  │                             │  UserBadge                  │  │
│  └─────────────────────────────┴─────────────────────────────┘  │
│             │                                                    │
│  ┌──────────┴───────────────────────────────────────────────┐   │
│  │                     PostgreSQL                             │   │
│  │              (via Sequelize or Prisma)                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **Dual backend codebases** — The JS/Sequelize codebase handles basic CRUD for vital events. The TS/Prisma codebase provides the full certificate management system with workflow, gamification, analytics, and integrations. Both connect to the same PostgreSQL instance.
- **Supabase for frontend auth** — The frontend uses Supabase Auth directly for sign-in/sign-up; the backend uses its own JWT-based auth for API routes.
- **Server state via TanStack Query** — All API data fetching uses React Query with automatic caching, refetching, and loading state management.
- **shadcn/ui component library** — 51 pre-built, customizable UI components from Radix primitives.
- **i18n with 5 languages** — Full translation support for Amharic, Afan Oromo, Somali, Tigrinya, and English using i18next.
- **PDF generation on server** — Certificates are generated server-side using pdfkit with Ethiopian context styling.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 18.3.1](https://react.dev/) | UI library |
| [TypeScript 5.8](https://www.typescriptlang.org/) | Type safety |
| [Vite 5.4](https://vitejs.dev/) | Build tool and dev server |
| [React Router DOM 6.30](https://reactrouter.com/) | Client-side routing |
| [TanStack React Query 5.83](https://tanstack.com/query) | Server state management |
| [Supabase JS 2.57](https://supabase.com/) | Backend-as-a-service (auth + DB) |
| [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) (51 components) | UI component library |
| [i18next 25](https://www.i18next.com/) + [react-i18next 15](https://react.i18next.com/) | Internationalization (5 languages) |
| [React Hook Form 7.61](https://react-hook-form.com/) + [Zod 3.25](https://zod.dev/) | Form validation |
| [Recharts 2.15](https://recharts.org/) | Charting library |
| [Lucide React 0.462](https://lucide.dev/) | Icons |
| [date-fns 3](https://date-fns.org/) | Date utilities |
| [Zustand 5](https://github.com/pmndrs/zustand) | State management (listed, minimal usage) |

### Backend (TypeScript + Prisma)
| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) (>=18) | Runtime |
| [TypeScript 5.8](https://www.typescriptlang.org/) | Type safety |
| [Express 4.18](https://expressjs.com/) | Web framework |
| [Prisma](https://www.prisma.io/) | ORM with PostgreSQL |
| [JWT](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Authentication |
| [Joi](https://joi.dev/) | Request validation |
| [Helmet](https://helmetjs.github.io/) | HTTP security headers |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Rate limiting |
| [Winston](https://github.com/winstonjs/winston) + [Morgan](https://github.com/expressjs/morgan) | Logging |
| [pdfkit](https://github.com/foliojs/pdfkit) | PDF certificate generation |
| [qrcode](https://github.com/soldair/node-qrcode) | QR code generation |
| [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) | API documentation |

### Backend (JavaScript + Sequelize)
| Technology | Purpose |
|------------|---------|
| [Express 4.18](https://expressjs.com/) | Web framework |
| [Sequelize 6.28](https://sequelize.org/) | ORM with PostgreSQL |
| [JWT](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Authentication |
| [express-validator](https://express-validator.github.io/) | Request validation |
| [Helmet](https://helmetjs.github.io/) | HTTP security headers |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Rate limiting |
| [Winston](https://github.com/winstonjs/winston) + [Morgan](https://github.com/expressjs/morgan) | Logging |
| [pdfkit](https://github.com/foliojs/pdfkit) | PDF certificate generation |

---

## Database Design

### Prisma Schema (7 models, 6 enums)

```
┌──────────┐     ┌─────────────┐     ┌────────────────┐
│   User   │────→│ Certificate  │←────│  FamilyMember   │
│          │     │              │     │                 │
│ id (cuid)│     │ id (cuid)    │     │ id (cuid)       │
│ email    │     │ type (enum)  │     │ userId          │
│ password │     │ status (enum)│     │ certificateId   │
│ role     │     │ applicantId  │     │ relationship    │
│ firstName│     │ verifierId   │     │ relatedPerson   │
│ lastName │     │ approverId   │     └────────────────┘
│ phone    │     │ qrCode       │
│ isActive │     │ blockchain   │     ┌────────────────┐
└────┬─────┘     │   Hash       │     │   AuditLog     │
     │           │ documentUrl  │     │                │
     │           │ issuedAt     │     │ id (cuid)      │
     │           │ expiresAt    │     │ userId         │
     │           └──────┬───────┘     │ certificateId  │
     │                  │             │ action         │
     │     ┌────────────┴──────┐     │ details (Json) │
     │     │  Notification     │     │ ipAddress      │
     │     │                   │     │ userAgent      │
     │     │ id (cuid)         │     │ timestamp      │
     │     │ userId            │     └────────────────┘
     │     │ certificateId     │
     │     │ type (enum)       │     ┌────────────────┐
     │     │ title / message   │     │     Badge      │
     │     │ isRead            │     │                │
     │     └───────────────────┘     │ id (cuid)      │
     │                               │ name (unique)  │
     └───────────────────────────→│ description  │
                                 │ icon / color  │
                                 │ criteria(Json)│
                                 │ isActive      │
                                 └───────┬────────┘
                                         │
                                 ┌───────┴────────┐
                                 │   UserBadge     │
                                 │                 │
                                 │ userId+badgeId  │
                                 │ earnedAt        │
                                 │ isVisible       │
                                 └─────────────────┘
```

### Enums

| Enum | Values |
|------|--------|
| **UserRole** | `CITIZEN`, `CLERK`, `VERIFIER`, `APPROVER`, `ADMIN`, `COURT_OFFICIAL` |
| **CertificateType** | `BIRTH`, `DEATH`, `MARRIAGE`, `DIVORCE`, `ADOPTION` |
| **CertificateStatus** | `PENDING`, `UNDER_REVIEW`, `VERIFIED`, `APPROVED`, `ISSUED`, `REJECTED`, `EXPIRED` |
| **Gender** | `MALE`, `FEMALE`, `OTHER` |
| **Relationship** | `FATHER`, `MOTHER`, `SPOUSE`, `CHILD`, `SIBLING`, `GUARDIAN` |
| **NotificationType** | `STATUS_UPDATE`, `APPROVAL_REQUEST`, `DOCUMENT_READY`, `VERIFICATION_REQUIRED`, `SYSTEM_ALERT` |

### Sequelize Models (Legacy)

| Model | Key Fields |
|-------|-----------|
| **User** | id (UUID), fullName, email (unique), password (bcrypt), role (user/admin) |
| **BirthRegistration** | id (UUID), childName, fatherName, motherName, dateOfBirth, gender, placeOfBirth, status (pending/approved/rejected) |
| **DeathRegistration** | id (UUID), fullName, dateOfDeath, placeOfDeath, causeOfDeath, status |
| **MarriageRegistration** | id (UUID), groomName, brideName, dateOfMarriage, placeOfMarriage, witnesses (JSON), status |

---

## API Reference

### TypeScript Backend (Prisma) — `/api/*`

#### Authentication
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Register new user |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| `GET` | `/api/auth/profile` | JWT | Get current user profile |
| `GET` | `/api/auth/admin` | JWT+Admin | Admin test endpoint |

#### Certificates
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/certificates` | JWT | Create certificate application |
| `GET` | `/api/certificates` | JWT | List certificates (filtered/paginated) |
| `GET` | `/api/certificates/:id` | JWT | Get certificate by ID |
| `POST` | `/api/certificates/:id/verify` | JWT+Verifier/Admin | Verify certificate |
| `POST` | `/api/certificates/:id/approve` | JWT+Approver/Admin | Approve certificate |
| `POST` | `/api/certificates/:id/reject` | JWT+Verifier/Approver/Admin | Reject certificate |
| `GET` | `/api/certificates/:id/download` | JWT | Download certificate PDF |

#### Users & Dashboard
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/users/profile` | JWT | Get user profile |
| `GET` | `/api/dashboard/stats` | JWT | Aggregated dashboard statistics |
| `GET` | `/api/analytics` | JWT+Staff | Analytics data (trends, types, regions) |
| `GET` | `/api/reports` | JWT+Staff | Reports data |
| `GET` | `/api/reports/generate` | JWT+Admin/Clerk | Generate report |

#### Audit & Monitoring
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/audit` | JWT+Admin/Approver | List audit logs |

#### Notifications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/notifications` | JWT | List user notifications |
| `PATCH` | `/api/notifications/:id/read` | JWT | Mark notification as read |
| `PATCH` | `/api/notifications/mark-all-read` | JWT | Mark all notifications read |
| `DELETE` | `/api/notifications/:id` | JWT | Delete notification |

#### Gamification
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/badges` | JWT | List all badges |
| `GET` | `/api/badges/user/:userId` | JWT | Get user's earned badges |
| `GET` | `/api/badges/recent` | JWT | Recent badges (last 7 days) |
| `POST` | `/api/badges/check-eligibility` | JWT | Check and award badges |

#### Family Tree
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/family/tree` | JWT | Get user's family tree (grouped by relationship) |

#### Verification
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/verification/:id` | No | Verify certificate by ID |
| `GET` | `/api/verification/number/:certificateNumber` | No | Verify certificate by number |

#### Integrations
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/sms/send` | JWT+Admin/Clerk | Send SMS notification (EthioTelecom API with mock fallback) |
| `POST` | `/api/blockchain/create` | JWT+Admin | Store certificate hash on blockchain (external API) |

#### System
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | No | Health check |
| `GET` | `/api-docs` | No | Swagger API documentation |

### JavaScript Backend (Sequelize) — `/api/v1/*`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/auth/register` | No | Register user |
| `POST` | `/api/v1/auth/login` | No | Login |
| `POST` | `/api/v1/births` | JWT | Create birth registration |
| `GET` | `/api/v1/births` | JWT | List birth registrations (paginated) |
| `PATCH` | `/api/v1/births/:id/status` | JWT+Admin | Update birth status |
| `GET` | `/api/v1/births/:id/certificate` | JWT+Admin | Download birth PDF certificate |
| `POST` | `/api/v1/deaths` | JWT | Create death registration |
| `GET` | `/api/v1/deaths` | JWT | List death registrations |
| `PATCH` | `/api/v1/deaths/:id/status` | JWT+Admin | Update death status |
| `GET` | `/api/v1/deaths/:id/certificate` | JWT+Admin | Download death PDF certificate |
| `POST` | `/api/v1/marriages` | JWT | Create marriage registration |
| `GET` | `/api/v1/marriages` | JWT | List marriage registrations |
| `PATCH` | `/api/v1/marriages/:id/status` | JWT+Admin | Update marriage status |
| `GET` | `/api/v1/marriages/:id/certificate` | JWT+Admin | Download marriage PDF certificate |

---

## Project Structure

```
vital-registration-app/
├── README.md
│
├── frontend/                           # React SPA (Vite + TypeScript)
│   ├── .env                            # Supabase credentials
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── components.json                 # shadcn/ui config
│   ├── index.html
│   ├── public/
│   ├── supabase/
│   │   └── types.ts                    # Supabase auto-generated types
│   ├── src/
│   │   ├── main.tsx                    # React entry
│   │   ├── App.tsx                     # Providers + Router (33 routes)
│   │   ├── index.css                   # Tailwind + CSS variables
│   │   ├── assets/
│   │   ├── lib/
│   │   │   ├── i18n.ts                 # i18next config (5 languages)
│   │   │   └── utils.ts               # cn() utility
│   │   ├── hooks/
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx         # Supabase auth state
│   │   │   └── ThemeContext.tsx        # Dark/light theme
│   │   ├── integrations/supabase/
│   │   │   └── client.ts              # Supabase client singleton
│   │   ├── components/
│   │   │   ├── ui/                    # 51 shadcn/ui components
│   │   │   ├── layout/               # Header, Footer
│   │   │   ├── sections/             # Hero, Features, CallToAction
│   │   │   └── custom/               # 16 custom feature components
│   │   └── pages/                    # 35 page components
│   │       ├── auth/                 # Login/Register
│   │       ├── dashboard/            # User dashboard
│   │       ├── admin/                # Admin dashboard
│   │       ├── documents/            # Document manager
│   │       ├── appointments/         # Appointment scheduling
│   │       ├── family-tree/          # Family tree view
│   │       ├── rewards/              # Badges & gamification
│   │       ├── services/             # Service application forms
│   │       ├── verify/               # Certificate verification
│   │       └── ...                   # Static pages (about, contact, FAQ, etc.)
│
└── backend/                            # Express API (Dual Codebase)
    ├── .env                            # DB credentials, JWT secrets
    ├── .env.example
    ├── package.json                    # Root config (empty)
    ├── package-lock.json
    ├── error.log
    │
    ├── server.js                       # JS entry point (Sequelize)
    ├── config/
    │   └── database.js                 # Sequelize DB connection
    ├── models/                         # Sequelize models
    │   ├── user.js
    │   ├── birthRegistration.js
    │   ├── deathRegistration.js
    │   └── marriageRegistration.js
    ├── controllers/                    # Express controllers (JS)
    ├── routes/                         # Express routes (JS)
    ├── services/                       # Business logic (JS)
    ├── middleware/                     # Auth, error, validation (JS)
    ├── utils/                          # Utility functions (JS)
    ├── seeders/                        # Sequelize seed data
    │
    ├── prisma/                         # Prisma ORM schema
    │   ├── schema.prisma              # 7 models, 6 enums
    │   └── seed.ts                    # TypeScript seeder
    │
    └── src/                            # TypeScript codebase
        ├── index.ts                    # TS entry point (Prisma)
        ├── routes/                     # TS routes (12 files)
        ├── middleware/                 # Auth, error handler (TS)
        └── utils/                      # Prisma client, logger, audit
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18 (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) >= 14
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Bedru-Mekiyu/vital-registration-app.git
cd vital-registration-app

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables

#### Backend (`backend/.env`)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vital_registration"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vital_registration
DB_USER=user
DB_PASSWORD=password

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=90d
JWT_REFRESH_SECRET=your-refresh-secret    # (env var only — not yet implemented)
JWT_REFRESH_EXPIRES_IN=7d                 # (env var only — not yet implemented)

# Server
PORT=5000
NODE_ENV=development

# Integrations (optional — mocked if not set)
ETHIO_TELECOM_SMS_URL=https://api.ethiotelecom.et/sms
ETHIO_TELECOM_API_KEY=your-api-key
BLOCKCHAIN_API_URL=https://api.blockchain-service.et
BLOCKCHAIN_API_KEY=your-blockchain-key

# Redis (optional — env var only, not yet implemented)
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

> **⚠️ Security Notice:** The `.env` files in this repository contain live credentials. These should be **rotated immediately** if this code is used in a shared or production environment. Add `.env` to `.gitignore` and use environment variables in production.

### Initialize Database

```bash
# Option A: Prisma (modern stack)
cd backend
npx prisma migrate dev
npx prisma db seed        # Optional: seed with sample data

# Option B: Sequelize (legacy stack)
# The JS codebase syncs on server start

# Option C: Both (to have both codebases ready)
```

### Running Locally

```bash
# Terminal 1: Start the backend (TypeScript + Prisma stack)
cd backend
npx ts-node src/index.ts

# Terminal 2: Start the backend (JavaScript + Sequelize stack)
cd backend
npm run dev              # or: nodemon server.js

# Terminal 3: Start the frontend
cd frontend
npm run dev              # Vite dev server at localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

#### Frontend (`frontend/package.json`)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

#### Backend (`backend/package.json`)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (JS codebase) |
| `npm start` | Start production (JS codebase) |

---

## Development Workflow

1. **Database schema changes (Prisma)** — Edit `backend/prisma/schema.prisma`, run `npx prisma migrate dev --name <name>`
2. **Database schema changes (Sequelize)** — Edit models in `backend/models/`, server syncs on restart
3. **Add API route (TS)** — Create file in `backend/src/routes/`, mount in `backend/src/index.ts`
4. **Add API route (JS)** — Create file in `backend/routes/`, mount in `backend/server.js`
5. **Add frontend page** — Create component in `frontend/src/pages/`, add route in `App.tsx`
6. **Add UI component** — Use `npx shadcn-ui@latest add <component-name>` or create manually
7. **Add translation** — Edit `frontend/src/lib/i18n.ts` with new key-value pairs per language
8. **Lint** — `cd frontend && npm run lint`

---

## Testing

> ⚠️ **Tests are not yet implemented.** Neither Jest nor Vitest is configured in either codebase.

| Area | Status | Notes |
|------|--------|-------|
| Frontend unit tests | ❌ | No testing dependencies installed |
| Backend unit tests | ❌ | No testing dependencies installed |
| Integration tests | ❌ | Not implemented |
| E2E tests | ❌ | Not implemented |
| Test runners | ❌ | Jest/Cypress badges exist but packages are not installed |

The following would integrate well:
- **Vitest** for frontend component and hook tests
- **Jest** for backend service and controller tests
- **Supertest** for API integration tests

---

## Deployment

### Recommended Platforms

| Platform | Notes |
|----------|-------|
| [Render](https://render.com/) | Web service + managed PostgreSQL |
| [Railway](https://railway.app/) | Full-stack deployment with PostgreSQL |
| [Heroku](https://heroku.com/) | Container-based deployment |

### Deploying the Backend

```bash
# Build TypeScript codebase
cd backend
npx tsc

# Run Prisma migrations
npx prisma migrate deploy

# Start
node dist/index.ts          # TS codebase
# or
node server.js              # JS codebase
```

### Deploying the Frontend

```bash
cd frontend
npm run build
# Output goes to dist/ — serve via any static host or CDN
```

### Production Considerations

| Requirement | Details |
|-------------|---------|
| Database | PostgreSQL with Prisma migrations or Sequelize sync |
| Node.js | >= 18 |
| Environment Variables | All `.env` vars must be set in hosting platform |
| HTTPS | Required in production (use platform TLS termination) |
| Secrets | Rotate all credentials from `.env` files; never commit `.env` |
| Dual Codebase | Deploy either JS or TS backend, not both |

---

## Security

### Implemented Measures

| Measure | Implementation |
|---------|---------------|
| **Password Hashing** | bcryptjs with 10-12 salt rounds |
| **JWT Authentication** | Token-based with configurable expiry |
| **Rate Limiting** | 100 requests per 15 minutes per IP |
| **HTTP Security Headers** | `helmet` middleware |
| **CORS** | Configured with origin whitelist |
| **Input Validation** | express-validator (JS) / Joi (TS) |
| **SQL Injection Prevention** | ORM parameterized queries |
| **Error Sanitization** | Production errors hide stack traces |
| **Role-Based Access Control** | 6 roles with granular middleware |
| **Data Isolation** | Citizens see only own records |
| **Account Deactivation** | `isActive` check on authentication |
| **Request Body Size Limit** | 10MB max |
| **Audit Logging** | All actions logged with metadata |

### Security Gaps

| Gap | Risk | Recommended Fix |
|-----|------|-----------------|
| No refresh tokens | Sessions cannot be refreshed securely | Implement JWT refresh token rotation |
| No token blacklisting | Logged-out tokens remain valid | Add Redis-backed token blacklist |
| No CSRF protection | Cross-site request forgery | Add `csurf` or `csrf-csrf` middleware |
| No HTTPS enforcement | Traffic interception | Add HTTPS redirect middleware |
| `.env` committed | Credential leakage | Remove from git, rotate secrets, add to `.gitignore` |
| No email verification | Unverified accounts can use system | Add email verification flow |
| No account lockout | Brute force attacks | Add per-account rate limiting |
| Duplicate codebases | Maintenance complexity | Consolidate to single codebase |

---

## Contributing

Contributions are welcome, especially for:

- Adding tests (Vitest, Jest, Supertest)
- Consolidating the dual codebase
- Implementing adoption and divorce workflows
- Adding email notifications (Nodemailer)
- Dockerizing the application
- Improving documentation

1. **Fork** the repository
2. **Create a branch** — `git checkout -b feature/my-feature`
3. **Make your changes**
4. **Lint** — `cd frontend && npm run lint`
5. **Commit** with a clear message
6. **Push** to your fork
7. **Open a Pull Request**

---

## Roadmap

### Phase 1 — MVP (Current)
- [x] Core birth, death, marriage registration
- [x] PDF certificate generation
- [x] JWT authentication with 6 user roles
- [x] Certificate workflow (create → verify → approve → issue)
- [x] Audit logging
- [x] Frontend with 33 routes, i18n (5 languages), dark mode
- [x] Dashboard analytics and reports

### Phase 2 — In Progress
- [ ] Adoption and divorce registration workflows
- [ ] Email notifications (Nodemailer)
- [ ] USSD integration for feature phone access
- [ ] Blockchain certificate anchoring (API endpoint exists, needs integration)
- [ ] Docker Compose for local development
- [ ] Test infrastructure (Vitest + Jest)

### Phase 3 — Future
- [ ] Flutter mobile applications
- [ ] Cross-border certificate verification API
- [ ] Advanced analytics and predictive dashboards
- [ ] Incentive/gamification system live deployment
- [ ] Service worker for offline support
- [ ] Real-time notifications via WebSockets

---

## FAQ

### Why are there two backend codebases?
The project evolved from a JavaScript/Sequelize prototype to a full TypeScript/Prisma implementation. Both are kept for reference; the TypeScript codebase is the active development target.

### Is authentication required for all features?
Public endpoints include certificate verification (by ID or number), health check, and Swagger docs. All other routes require JWT authentication with appropriate role permissions.

### How do I reset the database?
For Prisma: `npx prisma migrate reset` followed by `npx prisma db seed`.
For Sequelize: Delete `database.sqlite` or drop/recreate the PostgreSQL schema.

### Can I run only one backend?
Yes. The JS and TS codebases are independent Express applications connecting to the same PostgreSQL database. Run only the one you need.

### How do I add a new language?
Edit `frontend/src/lib/i18n.ts` and add translations under a new language key (e.g., `aa` for Afar). The language switcher in the UI will automatically detect available languages.

### The `.env` file has real credentials. What should I do?
Rotate all credentials immediately. The Supabase key, database password, and JWT secrets in `.env` should be treated as compromised. Generate new secrets and never commit `.env` to version control.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React](https://react.dev/) — UI framework
- [Express](https://expressjs.com/) — Web framework
- [Prisma](https://www.prisma.io/) — Modern ORM
- [Sequelize](https://sequelize.org/) — Legacy ORM
- [Supabase](https://supabase.com/) — Backend-as-a-service
- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [TanStack Query](https://tanstack.com/query) — Server state management
- [i18next](https://www.i18next.com/) — Internationalization framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [pdfkit](http://pdfkit.org/) — PDF generation

---

<p align="center">
  <sub>Built as a digital public good for civic transformation in Ethiopia</sub>
</p>
