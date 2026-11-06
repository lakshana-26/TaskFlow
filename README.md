# TaskFlow – Full Stack Task Management Dashboard

**TaskFlow** is a modern, responsive, and robust Full Stack Task Management Dashboard built with React, Vite, Bootstrap, Node.js, Express.js, and MongoDB.

> **Tagline:** "Plan your work, track your progress."

---

## Architecture & Tech Stack

- **Frontend:**
  - React.js (v19)
  - Vite (v8)
  - Bootstrap (v5.3)
  - Custom CSS Design System
  - Axios (v1.7)
- **Backend:**
  - Node.js (ES Modules)
  - Express.js (v4.21)
  - Mongoose (v8.9)
  - CORS
  - Dotenv
- **Database:**
  - MongoDB (`taskmanager` database)

---

## Features

1. **Header:**
   - Blue gradient header.
   - Title: **TaskFlow**.
   - Tagline: *"Plan your work, track your progress."*
   - Real-time dynamic total task counter pill (e.g., `4 Tasks`).

2. **Main Dashboard:**
   - Heading: *"Task Management Dashboard"*
   - Subtitle: *"Organize your daily tasks in one place."*

3. **Task Input:**
   - Text input field with placeholder `"Enter your task..."`.
   - Violet-colored **`+ Add Task`** button.
   - Client-side and server-side validation to reject empty tasks.

4. **Task Categories (Pastel Theme Columns):**
   - **PENDING:** Light blue pastel theme with task cards and count badge.
   - **ONGOING:** Light violet/purple pastel theme with task cards and count badge.
   - **COMPLETED:** Light green pastel theme with completed task cards and count badge.

5. **Task Card Functionality:**
   - Clean white rounded card with status-coded indicator.
   - Status change dropdown (`Pending`, `Ongoing`, `Completed`).
   - Automatically transitions task between columns on status update.
   - Delete task button.
   - Instant count updates and database synchronization.

---

## REST API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/tasks` | Fetch all tasks from MongoDB |
| `POST` | `/api/tasks` | Add a new task (validation: non-empty title) |
| `PATCH` | `/api/tasks/:id` | Update task status (`Pending`, `Ongoing`, `Completed`) |
| `DELETE` | `/api/tasks/:id` | Delete a task from MongoDB |

---

## How to Run

### 1. Start MongoDB
Ensure MongoDB is running locally on port 27017:
```bash
# Windows Service check
Get-Service -Name MongoDB
```

### 2. Start the Backend Server (Port 5000)
```bash
cd backend
npm install
npm start
```
*Backend runs on `http://localhost:5000` connected to `mongodb://127.0.0.1:27017/taskmanager`.*

### 3. Start the Frontend Application (Port 5173)
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://127.0.0.1:5173/`.*

### 4. Run Automated Verification Suite
```bash
cd backend
node test-suite.js
```
