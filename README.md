# Team Task Manager

A full-stack task management platform built for teams, collaboration, and productivity tracking. The application allows admins to create projects, assign tasks, monitor progress, and manage team workflow efficiently.

## Live Demo

Frontend: https://team-task-manager-one-silk.vercel.app/

## GitHub Repository

https://github.com/Harpreet567/team-task-manager.git

---

# Features

## Authentication & Authorization

* User Registration & Login
* JWT Authentication
* Role-Based Access Control (Admin / Member)

## Project Management

* Create and manage projects
* View all active projects
* Team collaboration support

## Task Management

* Create tasks with descriptions
* Assign tasks to team members
* Add assigned date and deadline date
* Edit existing tasks
* Delete tasks
* Update task status:

  * Pending
  * In Progress
  * Completed

## Dashboard

* Total Tasks
* Completed Tasks
* Overdue Tasks
* Task progress tracking

## Member Access Control

* Members can only view tasks assigned to them
* Members cannot modify tasks of other users
* Admin has complete control over projects and tasks

---

# Tech Stack

## Frontend

* React.js
* CSS3
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# Folder Structure

team-task-manager/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ └── server.js

│

├── frontend/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── services/

│ │ └── App.js

│

└── README.md

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Harpreet567/team-task-manager.git
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Environment Variables

Create a `.env` file inside the backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Deployment

## Backend Deployment

* Render

## Frontend Deployment

* Vercel

## Database

* MongoDB Atlas

---

# Future Improvements

* Task priority levels
* File attachments
* Email notifications
* Team chat integration
* Dark / Light mode
* Activity logs

---

# Author

Harpreet Singh

Built as a full-stack MERN project for project and task management.
