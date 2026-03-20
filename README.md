# Chat Application (FastAPI + React + MongoDB)

This repository contains a real-time chat app:
- FastAPI backend (REST + WebSockets)
- React frontend (with WebSocket client)
- MongoDB for persistent messages
- Docker Compose local setup

## Backend endpoints
- `POST /login` (auth placeholder)
- `POST /chat/send` (save chat message)
- `GET /chat/messages` (retrieve persisted messages)
- `ws://<host>/ws/{username}` (real-time message delivery)

## Local development
1. Create `.env` in `backend/`:
   - `MONGO_URI=mongodb://mongo:27017` (or Atlas URI)
2. Build + run:
   - `docker-compose up --build`
3. Visit frontend:
   - http://localhost:3000
4. Backend API:
   - http://localhost:8000
5. MongoDB (inside compose):
   - mongodb://localhost:27017

## Deploy online (free tier suggestions)
1. MongoDB Atlas (free 512MB)
   - Create cluster, get URI, set `MONGO_URI`.
2. Railway / Render / Fly.io (check free limits)
   - Deploy backend service (port 8000, set env var `MONGO_URI`).
   - Deploy frontend static app.

## Why GET is needed
- `POST /chat/send` writes messages into MongoDB.
- `GET /chat/messages` reads persisted data and displays history.
- Without GET, clients cannot sync stored chat history after reload.

## Persistence behavior
- Saved in `messages` collection by `backend/app/routes/chat_routes.py`.
- WebSocket used for live delivery; REST used for persistence/read.

## Notes
- Enable CORS in `backend/app/main.py` (already done).
- Frontend `frontend/src/api.js` currently points at `http://localhost:8000`.
  - In production set to deployed API URL (`https://api.example.com`).

## Optional improvements
- Add filtering by user / conversation.
- Add authentication with JWT.
- Add message timestamps.

