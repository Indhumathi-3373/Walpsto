# Walpsto

Walpsto is a personal wallet web application for securely storing documents and private diary entries. The frontend is a static HTML/CSS/JS experience, while the backend is a Node.js/Express API backed by MongoDB.

## Features
- Create an account with separate credentials for diary and documents.
- Diary entries: create, edit, list, and delete entries.
- Document vault: upload, list, and delete files.
- Session-based authentication for protected routes.
- Feedback form with a lightweight admin stats/feedback view.

## Tech Stack
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js, Express, Mongoose, Multer, Express Session
- Database: MongoDB

## Project Structure
- `frontend/` Static pages and scripts (served by the backend in production)
- `backend/` Express server, routes, and MongoDB models
- `images/` UI assets

## Setup
1. Start MongoDB locally (default connection is `mongodb://localhost:27017/create_account`).
2. Install backend dependencies:
   - `cd backend`
   - `npm install`
3. Start the backend server:
   - `npm start`
4. Open the app:
   - `http://localhost:8000` (served from `frontend/index.html`)

## Environment
You can optionally set:
- `SESSION_SECRET` to override the default development secret.
- `MONGODB_URI` to point at a production Mongo instance.
- `PORT` to change the server port (default `8000`).
- `CLIENT_ORIGIN` (comma-separated) if you serve the frontend separately and need CORS.

## API Overview
All routes are mounted under `/frontend` in the server.

- `POST /frontend/create_account`
- `POST /frontend/loginfordiary`
- `POST /frontend/loginfordocument`
- `GET /frontend/diary`
- `POST /frontend/diary`
- `PUT /frontend/diary/:id`
- `DELETE /frontend/diary/:id`
- `GET /frontend/documents`
- `POST /frontend/documents` (multipart form field: `file`)
- `DELETE /frontend/documents/:id`
- `POST /frontend/feedback`
- `GET /frontend/admin/feedback`
- `GET /frontend/admin/stats`
- `GET /frontend/session`
- `POST /frontend/logout`

## Notes
- Uploaded documents are stored in `backend/uploads/`.
- The server runs on port `8000` by default.
