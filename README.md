# 🧑‍💻 Member & Attendance Management Dashboard

This is a **Full Stack Web Application** built with **Node.js (Express)** for the backend, **React.js** for the frontend, and **SQL (MySQL/PostgreSQL)** for the database. It is designed to help **admins** manage a database of **organization members**, track their **attendance**, and perform **CRUD operations** securely using **token-based authentication (JWT)**.

The system features role-based access, ensuring that **only authorized admins** can create, update, or delete member and attendance data, while regular users can only view limited information.

---

## 📜 Detailed Project Description

This dashboard serves as an internal tool for managing **members** of a club, event, or organization and tracking their **attendance records**. The system includes the following components:

- ✅ **Authentication System**: Users must log in using their credentials. Upon successful login, a **JSON Web Token (JWT)** is issued and used for authorization in subsequent requests.
- 🔒 **Role-Based Access Control**: Only users with an **admin role** can perform sensitive operations such as adding, editing, or deleting members and attendance records.
- 👥 **Members Management**:
  - Displays a table of all registered members with fields: `ID`, `Name`, and `Committee`.
  - Clicking a member row opens a **details page**, showing the member's information and their full attendance history.
  - Admins can **edit** a member's name or committee and **delete** a member entirely.
- 🗓️ **Attendance Management**:
  - Shows a table listing attendance logs with filtering/sorting capabilities.
  - Admins can **add new attendance records** manually.
  - Admins can also **delete** attendance records if needed.
- 🆕 **Add Member Page**:
  - A dedicated form page for adding a new member.
  - Fields: `Name`, `Committee` (auto-generated ID).
  - Only accessible to admins.
- ⚙️ **Security Features**:
  - Frontend routes are protected using **React Route Guards**.
  - Backend APIs use **middleware** to verify JWTs and check for admin roles.
  - Tokens are stored securely in **localStorage** and automatically attached to API requests using Axios interceptors.

---

## 🧰 Tech Stack

### 🌐 Frontend – React.js
- React Router DOM for client-side routing
- Axios for HTTP requests
- Context API or Redux for user state and token management
- Bootstrap / Tailwind / Material UI (optional for styling)
- Protected Routes (admin-only pages)

### 🛠 Backend – Node.js + Express.js
- Express framework
- JWT for authentication & authorization
- Middleware for route protection
- SQL Database (MySQL/PostgreSQL)
- ORM like Sequelize or raw SQL queries
- bcrypt.js for password hashing

---

## 🧪 Core Functionalities

### ✅ Members Table
- View all registered members
- Search by name or committee
- Sort by ID or Name

### 🧑‍💼 Member Details Page
- Full member info
- Displays attendance logs
- Admin can edit Name and Committee

### 🆕 Add Member Page
- Add new member (admin only)
- Auto-generate ID

### 🗓️ Attendance Table
- View all attendance records
- Filter by member
- Delete attendance (admin only)

### 🔐 Authentication & Authorization
- Login required
- JWT token generation and verification
- Role-checking middleware

---

## 🔐 Sample API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/members` | Get all members |
| `GET` | `/api/members/:id` | Get member details with attendance |
| `POST` | `/api/members` | Add a new member (admin only) |
| `PUT` | `/api/members/:id` | Edit member (admin only) |
| `DELETE` | `/api/members/:id` | Delete member (admin only) |
| `GET` | `/api/attendance` | List all attendance records |
| `POST` | `/api/attendance` | Mark new attendance (admin only) |
| `DELETE` | `/api/attendance/:id` | Delete attendance (admin only) |

---
