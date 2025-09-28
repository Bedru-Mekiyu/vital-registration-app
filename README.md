# 🌍 vital-registration-app
🚀 **National Life-Events & Civic Engagement Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![Node.js](https://img.shields.io/badge/Node.js-LTS-blue.svg)](https://nodejs.org)  
[![React](https://img.shields.io/badge/Frontend-React-61dafb.svg)](https://react.dev)  
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org)  
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748.svg?logo=prisma)](https://www.prisma.io)  
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com)  
[![Jest](https://img.shields.io/badge/Tests-Jest-C21325.svg?logo=jest&logoColor=white)](https://jestjs.io)  
[![Cypress](https://img.shields.io/badge/E2E-Cypress-17202C.svg?logo=cypress&logoColor=white)](https://www.cypress.io)  
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)  

A robust, secure, and modern web application designed to be the **foundational digital infrastructure** for a nation's vital event registration and civic participation.  
Built with **international-standard security, accessibility, and multilingual support** at its core.  

---

## 🌟 Vision
Our mission is to **digitalize vital registrations** in a way that is:  
- **Inclusive** → Works for everyone (urban, rural, feature phones, smartphones).  
- **Transparent** → Immutable audit logs and verifiable certificates.  
- **Trustworthy** → Secure, standards-compliant, and government-grade.  
- **Engaging** → Encourages timely registrations through gamification and rewards.  
- **Global-ready** → Cross-border APIs, blockchain anchoring, and multilingual support.  

This project aspires to **make civic technology in Ethiopia and beyond one step ahead** in the digital transformation journey.  

---

## ✨ Key Features
- **👤 Citizen Portal** → Register life events (births, marriages, divorces, deaths, adoptions), manage digital certificates, and explore a family tree.  
- **🏥 Institutional Workflows** → Hospitals, courts, and religious organizations verify life events with immutable audit trails.  
- **🏛️ Government Administration** → Clerks, regional, and national admins manage the system with powerful analytics dashboards.  
- **📜 Digital Certificates** → Automatically generated QR-verifiable PDFs, securely stored in personal wallets.  
- **🎮 Gamification** → Citizens and institutions earn points for timely registration and efficient processing.  
- **📊 Transparency Dashboard** → Real-time public stats to build trust through transparency.  

---

## 🛡️ Core Principles

| **Standard**     | **Description** |
|------------------|-----------------|
| **Security**     | Adheres to OWASP Top 10, GDPR, ISO/IEC 27001, NIST SP 800-53. Data sovereignty with in-country hosting. |
| **Accessibility**| WCAG 2.1 AA compliance: keyboard navigation, screen reader support, dark/light/high-contrast themes, RTL/LTR toggles. |
| **Multilingual** | Supports Amharic, Afan Oromo, Somali, Tigrinya, English (expandable to all national languages). |
| **Transparency** | Immutable audit logs + certificate verification via QR, SMS, blockchain. |

---

## 🛠️ Technology Stack
- **Frontend** → React (Vite), React Router, TailwindCSS, shadcn/ui, i18next  
- **Backend** → Node.js with Express, RESTful API design  
- **Database** → PostgreSQL with Prisma ORM or Sequelize  
- **Auth & Security** → JWT for sessions, bcrypt for password hashing  
- **Communication** → Nodemailer (emails), Twilio/EthioTelecom APIs (SMS/USSD)  
- **Utilities** → pdfkit (certificates), qrcode (QR codes), Jest, Cypress  
- **Infrastructure** → Docker Compose for easy local setup and deployment  

---

## 💻 Getting Started

### 🔧 Prerequisites
- [Node.js (LTS)](https://nodejs.org)  
- [PostgreSQL](https://www.postgresql.org)  
- npm or yarn  
- Docker (optional)  

### 🚀 Installation

# Clone the repository
git clone https://github.com/your-username/vital-registration-app.git
cd vital-registration-app

# Install dependencies
npm install

# Setup database (create .env file)
DATABASE_URL="postgresql://user:password@localhost:5432/your-db-name"

# Run migrations (example with Prisma)
npx prisma migrate dev

# Start backend
npm run start:backend

# Start frontend (in a new terminal)
npm run start:frontend


## 🌐 Open in Browser
👉 [http://localhost:3000](http://localhost:3000)

---

## 📡 Extended Integrations
- **📱 USSD/SMS (EthioTelecom)** → Feature phone inclusivity  
- **⛓️ Blockchain Anchoring** → Tamper-proof certificates  
- **🌐 Cross-Border API** → Secure international verification  

---

## ✅ Acceptance Criteria
The platform is production-ready when:  
- Citizens can complete full workflows → **Register → Verify → Approve → Issue**  
- Adoption workflows (court + clerk approval) function correctly  
- Certificates are verifiable via QR code, SMS, blockchain  
- Family tree updates automatically with new events  
- Transparency dashboard shows real-time stats  
- Full support for multilingual, RTL/LTR, dark/light/contrast modes  
- Immutable audit logs are available for all events  

---

## 👥 User Roles
- **👤 Citizen** → Register events, manage certificates  
- **🏥 Institutional User** → Verify events (hospitals, courts, religious orgs)  
- **📝 Clerk** → Approve events at the local level  
- **🏛️ Regional/National Admin** → System oversight & management  
- **🔍 Auditor** → Read-only access to immutable logs  

---

## 🗺️ Roadmap
- ✅ **MVP** → Core registrations, approvals, certificates  
- 🔜 **Phase 2** → Advanced analytics, blockchain anchoring, cross-border APIs  
- 🔮 **Phase 3** → Production USSD/SMS integration, Flutter mobile apps, incentives  

---

## 🤝 Contributing
We ❤️ contributions!  
1. Fork the repository  
2. Create a new branch (`feature/new-module`)  
3. Commit your changes  
4. Push and submit a Pull Request 🚀  

👉 See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.  

---

## 🔒 Security
- Follow responsible disclosure for vulnerabilities  
- Report issues securely via [SECURITY.md](SECURITY.md)  

---

## 📜 License
This project is licensed under the **MIT License**.  

---

## ⭐ Why This Matters
This platform is a **digital public good** that:  
- Builds trust in government services  
- Digitalizes Ethiopia’s civic processes to **world-class standards**  
- Provides **inclusive access** (urban, rural, smartphones, feature phones)  
- Enables **data-driven policymaking**  
- Promotes **unity and transparency** nationwide  
