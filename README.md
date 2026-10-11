# MERN Stack To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served through a REST API, and managed from a React interface
without any page reloads.

> Course: 23CSB40B Web Technology · Assignment 2 · MBCET, Thiruvananthapuram
> Name: _<your name>_ · Roll No: _<your roll no>_
> GitHub: _<paste your repository URL>_

## Features
- Add a task (empty or whitespace-only titles are rejected)
- View all tasks, loaded from the database when the page opens
- Mark a task complete / incomplete (completed tasks are struck through)
- Edit a task's title inline
- Delete a task
- Everything updates on screen without a full page reload

## Project structure
```
MERN_ToDoList/
├── backend/
│   ├── models/Task.js        # Mongoose schema: title, completed, createdAt
│   ├── routes/tasks.js       # GET / POST / PUT / DELETE /api/tasks
│   ├── server.js             # Express app, CORS, MongoDB connection
│   ├── .env.example          # Variable names only (copy to .env)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # TaskForm, TaskList, TaskItem
│   │   ├── api.js            # fetch calls to the backend
│   │   ├── App.jsx           # state (useState) + data loading (useEffect)
│   │   └── index.css
│   ├── .env.example
│   └── package.json
├── screenshots/
├── .gitignore                # excludes node_modules and .env
└── README.md
```

## Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer
- MongoDB: either a local installation, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## How to run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # on Windows: copy .env.example .env
```
Open `.env` and fill in the values:

| Variable        | Example                                   | Meaning                                  |
|-----------------|-------------------------------------------|------------------------------------------|
| `MONGO_URI`     | `mongodb://127.0.0.1:27017/todo-app`      | MongoDB connection string (or Atlas URI) |
| `PORT`          | `5000`                                    | Port the API listens on                  |
| `CLIENT_ORIGIN` | `http://localhost:3000`                   | Frontend address allowed by CORS         |

Then start the server:
```bash
npm start
```
You should see `Connected to MongoDB` and `Server running on http://localhost:5000`.

### 2. Frontend (in a second terminal)
```bash
cd frontend
npm install
npm start
```
Open **http://localhost:3000**.
(Optional: if your API is not on `http://localhost:5000`, copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.)

## REST API

| Method | Endpoint          | Description                                  | Success | Errors   |
|--------|-------------------|----------------------------------------------|---------|----------|
| GET    | `/api/tasks`      | List all tasks                               | 200     | 500      |
| POST   | `/api/tasks`      | Add a task. Body: `{ "title": "..." }`       | 201     | 400, 500 |
| PUT    | `/api/tasks/:id`  | Update `title` and/or `completed`            | 200     | 400, 404 |
| DELETE | `/api/tasks/:id`  | Delete a task                                | 200     | 404      |

Task document:
```json
{ "_id": "...", "title": "Buy milk", "completed": false, "createdAt": "2026-10-10T08:30:00.000Z" }
```

## Screenshots
See the `screenshots/` folder: adding a task, completing a task, deleting a task, and the merged pull requests.

## Security notes
- The MongoDB connection string lives in `backend/.env`, which is git-ignored. Only `.env.example` is committed.
- CORS is restricted to the frontend's address instead of allowing every origin.
- Titles are converted with `String()`, trimmed, and rejected with `400` if empty.
