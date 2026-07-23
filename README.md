# Mini ERP + CRM Operations Portal

A full-stack ERP + CRM Operations Portal designed to simplify business operations by managing customers, products, inventory, and challans through a secure Role-Based Access Control (RBAC) system. The application provides separate access levels for Admin, Sales, Accounts, and Warehouse users, ensuring secure and efficient business workflows.

---

## Live Demo

**Frontend**

https://mini-erp-crm-one.vercel.app

**Backend API**

https://mini-erp-crm-kz5v.onrender.com

---

# Features

## Authentication & Authorization

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (RBAC)
- Persistent Login

## Dashboard

- Business Overview
- Total Customers
- Total Products
- Inventory Summary
- Quick Navigation

## Customer Management

- Create Customer
- Update Customer
- Delete Customer
- Search Customers
- Customer Type Management
- Customer Status Management

## Product Management

- Create Product
- Update Product
- Delete Product
- SKU Management
- Product Categories
- Warehouse Assignment

## Inventory Management

- Stock In
- Stock Out
- Inventory Tracking
- Stock Movement History
- Low Stock Monitoring

## Challan Management

- Create Challans
- Manage Challans
- Customer Selection
- Product Selection
- Quantity Management
- Challan Status Tracking

---

# Role-Based Access

| Module | Admin | Sales | Accounts | Warehouse |
|---------|:-----:|:------:|:---------:|:---------:|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Customers | ✓ | ✓ | ✓ | ✗ |
| Products | ✓ | ✓ | ✗ | ✓ |
| Inventory | ✓ | ✗ | ✗ | ✓ |
| Challans | ✓ | ✓ | ✗ | ✓ |

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

## Database

- PostgreSQL
- Supabase

## Deployment

- Frontend – Vercel
- Backend – Render
- Database – Supabase PostgreSQL

---

# System Architecture

```
                 React + Vite
                      │
                  Axios Client
                      │
                      ▼
              Express.js Backend
                      │
              JWT Authentication
                      │
                  Prisma ORM
                      │
                      ▼
          Supabase PostgreSQL Database
```

---

# Project Structure

```
mini-erp-crm
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── hooks
│   │   └── utils
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── server
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── config
│   │   └── app.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/bhanuprakash1312/mini-erp-crm.git

cd mini-erp-crm
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
DATABASE_URL=YOUR_SUPABASE_POSTGRESQL_DATABASE_URL
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

Generate the Prisma Client.

```bash
npx prisma generate
```

Create the database tables.

```bash
npx prisma db push
```

Seed the database.

```bash
npx prisma db seed
```

Start the backend server.

```bash
npm run dev
```

---

# Frontend Setup

Navigate to the frontend directory.

```bash
cd client
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the development server.

```bash
npm run dev
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=YOUR_SUPABASE_POSTGRESQL_DATABASE_URL
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | admin123 |
| Sales | sales@gmail.com | sales123 |
| Accounts | accounts@gmail.com | accounts123 |
| Warehouse | warehouse@gmail.com | warehouse123 |

---

# REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Login User |

---

## Customers

| Method | Endpoint |
|---------|----------|
| GET | `/api/customers` |
| POST | `/api/customers` |
| PUT | `/api/customers/:id` |
| DELETE | `/api/customers/:id` |

---

## Products

| Method | Endpoint |
|---------|----------|
| GET | `/api/products` |
| POST | `/api/products` |
| PUT | `/api/products/:id` |
| DELETE | `/api/products/:id` |

---

## Inventory

| Method | Endpoint |
|---------|----------|
| GET | `/api/inventory` |
| POST | `/api/inventory` |

---

## Challans

| Method | Endpoint |
|---------|----------|
| GET | `/api/challans` |
| POST | `/api/challans` |

---

# Database

This project uses **Supabase PostgreSQL** as the cloud-hosted relational database. Prisma ORM is used for schema management, database access, and query execution.

Configure your backend using the following environment variable:

```env
DATABASE_URL=YOUR_SUPABASE_POSTGRESQL_DATABASE_URL
```

---

# Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Authorization
- Secure Environment Variables
- Prisma ORM
- PostgreSQL Database

---

# Deployment

## Frontend

Vercel

## Backend

Render

## Database

Supabase PostgreSQL

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# Author

**BhanuPrakash**

GitHub: https://github.com/bhanuprakash1312

Email: bp136897@gmail.com


If you found this project useful, consider giving it a star on GitHub.
