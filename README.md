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
- [Contact](#-contact)

---

## 📌 About the Project

The **Tour Management System** is a robust backend service built to support a full-featured tour booking platform in **Bangladesh**. It provides secure authentication, scalable APIs, admin features, and payment integration to enable users to book guided tours while empowering admins with powerful management tools.

---

### 🔗 Live Demo

- **Frontend:** [tour-management-client.vercel.app](https://tour-management-client.vercel.app)
- **Backend API:** [tourmanagementsystemv1.vercel.app/api/v1](https://tourmanagementsystemv1.vercel.app)

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

```
tour-management-backend/
├── dist/
├── node_modules/
├── src/
│	└── app/
│ 	│	├── configurations/
│ 	│	├── database/
│ 	│	├── middlewares/
│	│	├── modules/
│ 	│	├── auth/
│ 	│	│	└── auth.helpers/
│	│	├── booking/
│ 	│	├── division/
│	│	├── guide/
│	│	├── otp/
│	│	├── payment/
│	│	│	└── payment.helpers/
│	│	├── sslCommerz/
│	│	├── tour/
│	│	│	└── type/
│	│	├── user/
│	│	│	└── user.helpers/
│	│	├──  routes/
│	│	├── templates/
│	│	├── types/
│	│	│	└── express/
│	│	└── utils/
│	│	│	├── helpers.error/
│	│	│	└── pdf
│	│	├── app.ts
│	│	├── jest.setup.ts
│	│	└── server.ts
├── .env
├── .env.dev
├── .env.example
├── eslint.config.mjs
├── jest.config.js
├── package-lock.json
├── package.json
├── .gitignore
├── README.md
├──  tsconfig.json
└── vercel.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/itsanamulhassan/tour_management_server.git
```

```bash
cd tour-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file in the root directory

```bash
touch .env.example
```

## 🔐 Environment Variables

Add the following:

```
PORT=5000
DB_URL=your_mongodb_connection_uri_here
NODE_ENV=development
JWT_ACCESS_SECRET=your_access_secret_here
JWT_ACCESS_SECRET_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_SECRET_EXPIRES_IN=7d
BCRYPT_SALT_ROUND=10
SUPER_ADMIN_EMAIL= admin@example.com
SUPER_ADMIN_PASSWORD=your_admin_password_here
REDIS_USER=your_redis_username
REDIS_PASSWORD=your_redis_password
REDIS_PORT=6379
REDIS_HOST=your_redis_host_url
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password_here
SMTP_FROM="Tour Management <your_email@example.com>"
SMTP_HOST=smtp.example.com
SMTP_PORT=587
EXPRESS_SESSION_SECRET=your_session_secret_here
FRONTEND_BASE_URL=http://localhost:3000
ACCESS_COOKIE_NAME=access_token
REFRESH_COOKIE_NAME=refresh_token
SSL_STORE_ID=your_ssl_store_id_here
SSL_STORE_PASS=your_ssl_store_password_here
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
SSL_IPN_URL=http://localhost:5000/api/v1/payment/ipn
SSL_SUCCESS_BACKEND_URL=http://localhost:5000/api/v1/payment/success
SSL_FAIL_BACKEND_URL=http://localhost:5000/api/v1/payment/fail
SSL_CANCEL_BACKEND_URL=http://localhost:5000/api/v1/payment/cancel
SSL_SUCCESS_FRONTEND_URL=http://localhost:3000/payment/success
SSL_FAIL_FRONTEND_URL=http://localhost:3000/payment/fail
SSL_CANCEL_FRONTEND_URL=http://localhost:3000/payment/cancel
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
CLOUDINARY_URL=your_cloudinary_url_here

```

### 4. Run the server (dev)

```base
npm run dev
```

## 📘 API Documentation

All APIs are prefixed with /api/v1

---

### 🔐 Auth Routes

| Method   | Endpoint                             | Description                                                                |
| -------- | ------------------------------------ | -------------------------------------------------------------------------- |
| **POST** | `/api/v1/auths/signin`               | Sign in using email and password                                           |
| **POST** | `/api/v1/auths/refresh_access_token` | Retrieve a new access token using a refresh token                          |
| **POST** | `/api/v1/auths/signout`              | Sign out and invalidate the current session                                |
| **POST** | `/api/v1/auths/forget_password`      | Send a password reset link or OTP to user’s email                          |
| **POST** | `/api/v1/auths/reset_password`       | Reset password after verification _(Requires authorization)_               |
| **POST** | `/api/v1/auths/change_password`      | Change password for logged-in user _(Requires authorization)_              |
| **POST** | `/api/v1/auths/set_password`         | Set a new password for a newly verified account _(Requires authorization)_ |
| **GET**  | `/api/v1/auths/google`               | Initiate Google OAuth login flow                                           |
| **GET**  | `/api/v1/auths/google/callback`      | Google OAuth callback URL for handling login success or failure            |

---

### 🧑‍💼 Guide Endpoints

| Method     | Endpoint                           | Description                                  | Authorization                             |
| ---------- | ---------------------------------- | -------------------------------------------- | ----------------------------------------- |
| **POST**   | `/api/v1/guides/create`            | Create a new guide (file upload supported)   | User role: `USER`                         |
| **GET**    | `/api/v1/guides/all`               | Retrieve all guides                          | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **GET**    | `/api/v1/guides/:id`               | Retrieve a single guide by ID                | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/guides/delete/:id`        | Delete a guide by ID                         | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **PATCH**  | `/api/v1/guides/update/:id`        | Update a guide by ID (file upload supported) | Roles: `ADMIN`, `SUPERADMIN`, `GUIDE`     |
| **PATCH**  | `/api/v1/guides/update/status/:id` | Update guide status (e.g., active/inactive)  | Admin roles: `ADMIN`, `SUPERADMIN`        |

---

### 🔢 OTP Endpoints

| Method   | Endpoint             | Description                            | Authorization             |
| -------- | -------------------- | -------------------------------------- | ------------------------- |
| **POST** | `/api/v1/otp/send`   | Send an OTP to a user’s email or phone | Public (no auth required) |
| **POST** | `/api/v1/otp/verify` | Verify the OTP code                    | Public (no auth required) |

---

### 💳 Payment Endpoints

| Method   | Endpoint                       | Description                        | Authorization                             |
| -------- | ------------------------------ | ---------------------------------- | ----------------------------------------- |
| **POST** | `/api/v1/payments/update/:id`  | Update payment details by ID       | Public (or role-based if implemented)     |
| **POST** | `/api/v1/payments/success`     | Handle successful payment callback | Public (from payment gateway)             |
| **POST** | `/api/v1/payments/fail`        | Handle failed payment callback     | Public (from payment gateway)             |
| **POST** | `/api/v1/payments/cancel`      | Handle canceled payment callback   | Public (from payment gateway)             |
| **GET**  | `/api/v1/payments/all`         | Retrieve all payments              | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **GET**  | `/api/v1/payments/:id`         | Retrieve payment details by ID     | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **GET**  | `/api/v1/payments/invoice/:id` | Retrieve payment invoice by ID     | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **POST** | `/api/v1/payments/validate`    | Validate payment information       | Public (from payment gateway or client)   |

---

### 📊 Statistics Endpoints

| Method  | Endpoint                     | Description                 | Authorization                      |
| ------- | ---------------------------- | --------------------------- | ---------------------------------- |
| **GET** | `/api/v1/statistics/user`    | Retrieve user statistics    | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET** | `/api/v1/statistics/tour`    | Retrieve tour statistics    | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET** | `/api/v1/statistics/booking` | Retrieve booking statistics | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET** | `/api/v1/statistics/payment` | Retrieve payment statistics | Admin roles: `ADMIN`, `SUPERADMIN` |

---

### 🏞️ Tour Endpoints

| Method     | Endpoint                   | Description                                              | Authorization                      |
| ---------- | -------------------------- | -------------------------------------------------------- | ---------------------------------- |
| **POST**   | `/api/v1/tours/create`     | Create a new tour (file upload supported for thumbnails) | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/tours/all`        | Retrieve all tours                                       | Admin roles: `ADMIN`, `SUPERADMIN` |
| **PATCH**  | `/api/v1/tours/update/:id` | Update a tour by ID (file upload supported)              | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/tours/single/:id` | Retrieve a single tour by ID                             | Admin roles: `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/tours/delete/:id` | Delete a tour by ID                                      | Admin roles: `ADMIN`, `SUPERADMIN` |

---

### 🏷️ Tour Type Endpoints

| Method     | Endpoint                        | Description                       | Authorization                      |
| ---------- | ------------------------------- | --------------------------------- | ---------------------------------- |
| **POST**   | `/api/v1/tour_types/create`     | Create a new tour type            | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/tour_types/all`        | Retrieve all tour types           | Admin roles: `ADMIN`, `SUPERADMIN` |
| **PATCH**  | `/api/v1/tour_types/update/:id` | Update a tour type by ID          | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/tour_types/single/:id` | Retrieve a single tour type by ID | Admin roles: `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/tour_types/delete/:id` | Delete a tour type by ID          | Admin roles: `ADMIN`, `SUPERADMIN` |

---

### 👤 User Routes

| Method     | Endpoint                   | Description                                          | Authorization                             |
| ---------- | -------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| **POST**   | `/api/v1/users/register`   | Create a new user                                    | Public                                    |
| **GET**    | `/api/v1/users/all`        | Retrieve all users                                   | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **GET**    | `/api/v1/users/single/:id` | Retrieve a single user by ID                         | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **GET**    | `/api/v1/users/me`         | Retrieve current logged-in user info by access token | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **PATCH**  | `/api/v1/users/update/:id` | Update a user by ID                                  | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/users/delete/:id` | Delete a user by ID                                  | User roles: `USER`, `ADMIN`, `SUPERADMIN` |

---

### 🗂 Division Endpoints

| Method     | Endpoint                      | Description                                     | Authorization                      |
| ---------- | ----------------------------- | ----------------------------------------------- | ---------------------------------- |
| **POST**   | `/api/v1/division/create`     | Create a new division (file upload supported)   | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/division/all`        | Retrieve all divisions                          | Admin roles: `ADMIN`, `SUPERADMIN` |
| **PATCH**  | `/api/v1/division/update/:id` | Update a division by ID (file upload supported) | Admin roles: `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/division/single/:id` | Retrieve a single division by ID                | Admin roles: `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/division/delete/:id` | Delete a division by ID                         | Admin roles: `ADMIN`, `SUPERADMIN` |

---

### 📅 Booking Routes

| Method     | Endpoint                            | Description                                       | Authorization                             |
| ---------- | ----------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| **POST**   | `/api/v1/booking/create`            | Create a new booking                              | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/booking/all`               | Retrieve all bookings                             | Admin roles: `ADMIN`, `SUPERADMIN`        |
| **GET**    | `/api/v1/booking/me`                | Retrieve bookings for logged-in user              | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **GET**    | `/api/v1/booking/:id`               | Retrieve booking details by ID                    | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/booking/delete/:id`        | Delete a booking by ID                            | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **DELETE** | `/api/v1/booking/update/:id`        | Update booking information by ID                  | User roles: `USER`, `ADMIN`, `SUPERADMIN` |
| **PATCH**  | `/api/v1/booking/update/status/:id` | Update booking status (e.g., confirmed, canceled) | User roles: `USER`, `ADMIN`, `SUPERADMIN` |

---

## 🎯 Use Case: Booking a Tour

    User registers and verifies OTP

    Logs in and browses tours

    Books a tour with a date

    System creates booking (status: pending)

    User redirected to SSLCommerz

    On success → Booking confirmed, Payment paid

## 📋 Functional Requirements

    FR1–FR20 (See detailed list in project spec)

## 🛡️ Non-Functional Requirements

    NFR1: 500ms response for 95% requests

    NFR2: Support 1,000+ concurrent users

    NFR3: Secure password storage (bcrypt)

    NFR4: JWT validation, RBAC

    NFR5: Redis fault-tolerance

    NFR6: 99.5% uptime SLA

## 🚀 Deployment

Recommended Platforms:

    Vercel
    MongoDB Atlas & Redis Cloud

## 🤝 Contributing

We welcome contributions! Follow these steps:

    Fork the repo

    Create a feature branch: git checkout -b feature/feature-name

    Commit your changes: git commit -m "Added XYZ"

    Push to branch: git push origin feature/feature-name

    Open a Pull Request

## 📧 Contact

Md Anamul Hassan  
📩 Email

```base
 itsanamulhassan@gmail.com
```

🌐 Website

```base
 https://anamul-hassan-web.web.app
```

---

Let me know if you'd like this README exported as a **`.md` file**, a **PDF**, or want to tailor it to **TypeScript**, **Docker**, or CI/CD pipelines.
