# 🌍 Tour Management System - Backend

**Version:** 1.0  
**Prepared By:** Anamul Hassan  
**Tech Stack:** Node.js | Express.js | MongoDB | Redis | JWT | SSLCommerz

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Use Case: Booking a Tour](#-use-case-booking-a-tour)
- [Functional Requirements](#-functional-requirements)
- [Non-Functional Requirements](#-non-functional-requirements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About the Project

The **Tour Management System** is a robust backend service built to support a full-featured tour booking platform in **Bangladesh**. It provides secure authentication, scalable APIs, admin features, and payment integration to enable users to book guided tours while empowering admins with powerful management tools.

---

## ✅ Features

- 🔐 User registration & OTP-based verification
- 🔑 JWT authentication and role-based access (RBAC)
- 🧑 Admin panel for users, tours, and booking management
- 🗺️ Tour listing with filters by division, price, and keyword
- 📅 Secure tour booking system with payment
- 💳 SSLCommerz payment gateway integration
- 📈 RESTful API design (versioned under `/api/v1`)
- 🚀 Scalable, modular-based architecture

---

## 🧱 System Architecture

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Cloud - Atlas)
- **Cache/OTP Storage:** Redis
- **Authentication:** JWT, OTP via Email
- **Payments:** SSLCommerz
- **Frontend (separate):** React
- **Deployment:** Vercel

---

## 🧰 Tech Stack

| Category           | Technology                      |
| ------------------ | ------------------------------- |
| Language           | TypeScript                      |
| Framework          | Express.js                      |
| Database           | MongoDB (Mongoose)              |
| Caching            | Redis                           |
| Auth               | JWT, OTP                        |
| Payment            | SSLCommerz                      |
| Architecture       | Modular                         |
| Dev Tools/ Testing | Nodemon, ESLint, Prettier, Jest |
| Deployment         | Vercel                          |

---

## 📂 Folder Structure

tour-management-backend/
├── src/
| └── app/
│ ├── configurations/
│ ├── database/
│ ├── middlewares/
│ ├── modules/
| | ├── auth/
| | | └── auth.helpers/
| | ├── booking/
| | ├── division/
| | ├── guide/
| | ├── otp/
| | ├── payment/
| | | └── payment.helpers/
| | ├── sslCommerz/
| | ├── tour/
| | | └── type/
| | └── user/
| | └── user.helpers/
│ ├── routes/
| ├── templates/
│ ├── types/
| | └── express/
│ └── utils/
| ├── helpers.error/
| └── pdf

├── .env
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/tour-management-backend.git
cd tour-management-backend

2. Install dependencies

npm install

3. Create a .env file in the root directory

touch .env

Add the following:

PORT=5000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/tour
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
SSL_COMMERZ_STORE_ID=your_store_id
SSL_COMMERZ_STORE_PASSWORD=your_password
NODE_ENV=development

4. Run the server (dev)

npm run dev

📘 API Documentation

All APIs are prefixed with /api/v1
🔐 Auth Routes

    POST /api/v1/auth/register – Register with OTP

    POST /api/v1/auth/login – Login with email/Google

    POST /api/v1/auth/verify – Verify OTP

👤 User Routes

    GET /api/v1/users/profile – Get user profile

    PATCH /api/v1/users/profile – Update profile

🧭 Tour Routes

    GET /api/v1/tours – List & filter tours

    POST /api/v1/tours – Create tour (Admin)

    GET /api/v1/tours/:id – Tour details

📅 Booking Routes

    POST /api/v1/bookings – Book a tour

    GET /api/v1/bookings/my – My bookings

    PATCH /api/v1/bookings/:id/status – Update booking status (Admin)

💳 Payment Routes

    POST /api/v1/payments/initiate – Start payment

    POST /api/v1/payments/success – Success handler

    POST /api/v1/payments/fail – Fail handler

🎯 Use Case: Booking a Tour

    User registers and verifies OTP

    Logs in and browses tours

    Books a tour with a date

    System creates booking (status: pending)

    User redirected to SSLCommerz

    On success → Booking confirmed, Payment paid

📋 Functional Requirements

    FR1–FR20 (See detailed list in project spec)

🛡️ Non-Functional Requirements

    NFR1: 500ms response for 95% requests

    NFR2: Support 1,000+ concurrent users

    NFR3: Secure password storage (bcrypt)

    NFR4: JWT validation, RBAC

    NFR5: Redis fault-tolerance

    NFR6: 99.5% uptime SLA

🚀 Deployment

Recommended Platforms:

    Vercel

    Render

    DigitalOcean

    AWS EC2

    MongoDB Atlas & Redis Cloud

🤝 Contributing

We welcome contributions! Follow these steps:

    Fork the repo

    Create a feature branch: git checkout -b feature/feature-name

    Commit your changes: git commit -m "Added XYZ"

    Push to branch: git push origin feature/feature-name

    Open a Pull Request

📧 Contact

Next Level Team
📩 Email: support@nextlevelteam.com
🌐 Website: nextlevelteam.com (placeholder)


---

Let me know if you'd like this README exported as a **`.md` file**, a **PDF**, or want to tailor it to **TypeScript**, **Docker**, or CI/CD pipelines.

```
