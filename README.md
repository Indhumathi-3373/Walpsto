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
- `frontend/public/images/` UI assets

## Setup
1. Start MongoDB locally (default connection is `mongodb://localhost:27017/create_account`).
2. Copy `.env.example` to `.env` and fill in your local values.
3. Install backend dependencies:
   - `cd backend`
   - `npm install`
4. Start the backend server:
   - `npm start`
5. Open the app:
   - `http://localhost:8000` (served from `frontend/index.html`)

## Deployment
- Recommended split deployment:
  - Deploy `backend/` as a Node web service on Render, Railway, or similar.
  - Deploy `frontend/` as a static site on Vercel.
- Backend environment variables:
  - `MONGODB_URI`
  - `SESSION_SECRET`
  - `CLIENT_ORIGIN=https://your-frontend-domain`
  - `NODE_ENV=production`
- Frontend API base:
  - Update each page's `<meta name="api-base">` to your deployed backend URL, or keep it empty if the frontend is served by the same origin as the API.
- Uploads:
  - The current document upload flow writes files to `backend/uploads/`.
  - This works on traditional servers, but ephemeral platforms may wipe uploaded files between deploys/restarts.
  - For long-term production use, move uploads to object storage such as Cloudinary, S3, or UploadThing.
- Health check:
  - The backend now exposes `GET /health` for deployment health probes.

## Environment
Use `.env.example` as the template. Do not commit real secrets.

- `SESSION_SECRET` overrides the default development secret.
- `MONGODB_URI` points at your MongoDB instance.
- `PORT` changes the server port (default `8000`).
- `CLIENT_ORIGIN` is a comma-separated allowlist when the frontend is deployed separately.
- `NODE_ENV=production` enables secure production cookie settings.

## Deployment Notes
- `.gitignore` now excludes `.env`, `backend/node_modules/`, and `backend/uploads/`.
- If `.env` was committed previously, rotate those secrets in your provider dashboards before deploying.

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
