# MERN Task Manager

Simple MERN app with login and a dashboard task manager.

## Setup

1. Install dependencies in both folders:
   - `cd server && npm install`
   - `cd ../client && npm install`
2. Create `.env` in `server` with:
   ```env
   PORT=5000
   MONGO_URI=https://website-mgnc.onrender.com
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server and client:
   - `cd server && npm run dev`
   - `cd ../client && npm start`

## Features
- Login form
- Protected dashboard
- Task CRUD on dashboard
