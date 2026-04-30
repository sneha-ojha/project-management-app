# Project Management App

A full-stack Project Management Web Application built using:

* Node.js
* Express.js
* MongoDB
* Tailwind CSS
* Vanilla JavaScript

This application allows admins and members to collaborate on projects and tasks with role-based access control.

---

# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control

---

## Admin Features

### Project Management

* Create Projects
* Delete Projects
* Update Project Status
* Add Members to Projects
* Remove Members from Projects

### Task Management

* Create Tasks
* Assign Tasks to Members
* Track Task Status
* Update Task Status
* Delete Tasks
* Due Date Tracking
* Priority Tracking

### Team Management

* View All Members
* Delete Members
* View Tasks Assigned To Members

---

## Member Features

* Login Securely
* View Assigned Tasks
* Update Task Status
* Track Overdue Tasks
* View Task Priorities
* Personalized Dashboard

---

# Tech Stack

## Frontend

* HTML
* Tailwind CSS
* Vanilla JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Token)
* bcryptjs

---

# Folder Structure

```text
project-management-app/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── public/
│   ├── dashboard.html
│   ├── login.html
│   ├── signup.html
│   └── js/
│       ├── dashboard.js
│       ├── login.js
│       └── signup.js
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/project-management-app.git
```

---

## 2. Navigate To Project

```bash
cd project-management-app
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create `.env` File

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=your_secret_key
```

---

## 5. Run Application

```bash
npm run dev
```

---

# API Routes

## Authentication Routes

| Method | Route               | Description   |
| ------ | ------------------- | ------------- |
| POST   | /api/auth/signup    | Register User |
| POST   | /api/auth/login     | Login User    |
| GET    | /api/auth/users     | Get All Users |
| DELETE | /api/auth/users/:id | Delete User   |

---

## Project Routes

| Method | Route                           | Description           |
| ------ | ------------------------------- | --------------------- |
| POST   | /api/projects                   | Create Project        |
| GET    | /api/projects                   | Get Projects          |
| PUT    | /api/projects/:id               | Update Project Status |
| DELETE | /api/projects/:id               | Delete Project        |
| PUT    | /api/projects/:id/add-member    | Add Member            |
| PUT    | /api/projects/:id/remove-member | Remove Member         |

---

## Task Routes

| Method | Route          | Description        |
| ------ | -------------- | ------------------ |
| POST   | /api/tasks     | Create Task        |
| GET    | /api/tasks     | Get Tasks          |
| PUT    | /api/tasks/:id | Update Task Status |
| DELETE | /api/tasks/:id | Delete Task        |

---

# Role-Based Access

## Admin

* Full Access
* Manage Projects
* Manage Members
* Assign Tasks
* Delete Tasks
* Delete Members

## Member

* Limited Access
* View Assigned Tasks
* Update Own Task Status

---

# UI Features

* Modern Tailwind Dashboard
* Responsive Design
* Sidebar Navigation
* Dynamic Task Cards
* Overdue Task Highlighting
* Interactive Team Management
* Personalized Member Dashboard

---

# Future Improvements

* Real-time Notifications
* Chat System
* File Uploads
* Team Analytics
* Calendar Integration
* Email Notifications
* Activity Logs
* Dark Mode

---

# Author

Sneha Kashyap Ojha

---

# License

This project is for educational and internship purposes.

