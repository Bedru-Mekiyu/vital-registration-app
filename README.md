# 🌍 vital-registration-app
🚀 **National Life-Events & Civic Engagement Platform**  

A robust, secure, and modern web application designed to be the foundational digital infrastructure for a nation's vital event registration and civic participation. Built with **international-standard security, accessibility, and multilingual support** as its core principles.

---

## ✨ Key Features
This platform is more than just a registry; it's a **comprehensive digital public good**:

- **Citizen Portal**:  
  A user-friendly dashboard for citizens to register life events (births, marriages, etc.), manage their digital certificates, and view their family tree.

- **Institutional Workflows**:  
  Dedicated portals for hospitals, courts, and religious institutions to verify and manage life events with immutable audit trails.

- **Government Administration**:  
  A powerful suite of tools for clerks and regional/national admins to oversee the entire ecosystem, with advanced analytics and system management.

- **Digital Certificates**:  
  Secure, QR-verifiable PDF certificates are automatically generated and stored in a personal wallet.

- **Gamification**:  
  A points and rewards system encourages timely registrations and efficient verifications, fostering a more engaged citizenry.

- **Transparency Dashboard**:  
  A publicly accessible dashboard provides real-time statistics and insights into civic events, building public trust.

---

## 🛡️ Core Principles

| **Standard**   | **Description** |
|----------------|-----------------|
| **Security**   | Adherence to OWASP Top 10, GDPR, ISO/IEC 27001, and NIST SP 800-53. Data sovereignty is prioritized with in-country hosting. |
| **Accessibility** | Built with WCAG 2.1 AA compliance, including full keyboard and screen reader support, along with dark/light theme and RTL/LTR toggles. |
| **Multilingual** | Native support for multiple national languages including Amharic, Afan Oromo, Somali, Tigrinya, and English, with an easily expandable architecture. |
| **Transparency** | All events are recorded in an immutable audit log and certificates are verifiable via unique QR codes. |

---

## 🛠️ Technology Stack
The platform is a **full-stack JavaScript application**, leveraging modern, scalable, and secure technologies:

- **Frontend**: React (with Vite), React Router, TailwindCSS, shadcn/ui components, i18next for multilingual support.  
- **Backend**: Node.js with Express for a robust REST API.  
- **Database**: PostgreSQL with Prisma ORM or Sequelize.  
- **Authentication**: JWT for sessions, bcrypt for password hashing.  
- **Communication**: Nodemailer (emails), Twilio or EthioTelecom APIs (SMS).  
- **Utilities**: pdfkit (certificate generation), qrcode (QR codes), Jest (unit tests), Cypress (E2E tests).  
- **Infrastructure**: Docker Compose for local development and deployment.  

---

## 💻 Getting Started

### Prerequisites
- Node.js   
- PostgreSQL  
- Yarn or npm  

### Installation
Clone the repository:
```bash
git clone https://github.com/Bedru-Mekiyu/vital-registration-app.git
cd vital-registration-app
