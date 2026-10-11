# Git & GitHub workflow (Part C)

Run these from the project root **after** creating an empty public repository on GitHub
(github.com → New repository → Public → do NOT add a README).
Replace `YOUR_USER` and `YOUR_REPO`. Delete this file before zipping if you prefer.

## 0. One-time setup
```bash
git init -b main
git config user.name  "Your Name"
git config user.email "you@example.com"
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git

# main needs at least one commit before branches can be merged into it.
git add .gitignore README.md
git commit -m "Add .gitignore and README"
git push -u origin main
```
(This is the only commit made directly on main - every feature below goes through a pull request.)

## 1. Backend branch
```bash
git checkout -b feature/backend

git add backend/package.json backend/server.js
git commit -m "Initialise Express server with JSON and CORS"

git add backend/.env.example
git commit -m "Add .env.example and read MONGO_URI with dotenv"

git add backend/models/Task.js
git commit -m "Add Task model"

git add backend/routes/tasks.js
git commit -m "Add GET, POST, PUT and DELETE task endpoints"

git push -u origin feature/backend
```
On GitHub: **Compare & pull request** -> base `main`, compare `feature/backend` -> **Create pull request** -> **Merge pull request**.

## 2. Frontend branch
```bash
git checkout main
git pull origin main
git checkout -b feature/frontend

git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/.env.example frontend/src/main.jsx
git commit -m "Create Vite React app"

git add frontend/src/api.js
git commit -m "Add API helper functions"

git add frontend/src/components
git commit -m "Add TaskForm, TaskList and TaskItem components"

git add frontend/src/App.jsx frontend/src/index.css
git commit -m "Connect App to backend and add styling"

git push -u origin feature/frontend
```
Open a pull request for `feature/frontend` into `main` and merge it, the same way.

## 3. Finish
```bash
git checkout main
git pull origin main
git add README.md screenshots
git commit -m "Add screenshots"      # if you change main directly, use a small branch + PR instead
```
Take the pull-request screenshot from the repository's **Pull requests -> Closed** tab.

## Checklist
- [ ] Repository is public
- [ ] 5+ commits with clear messages
- [ ] `feature/backend` and `feature/frontend` both pushed and merged via PRs
- [ ] `.env` is NOT in the repository (check on GitHub); `.env.example` is
