# Hayyim Chat Application

A real-time messaging application built with **FastAPI**, **React**, and **MongoDB**.

## 🔴 Live Demo

- **Live App:** https://hayyim-1.onrender.com
- **Live API:** https://hayyim.onrender.com

## 🚀 Tech Stack

- **Backend:** Python (FastAPI), WebSockets, PyMongo
- **Frontend:** JavaScript (React)
- **Database:** MongoDB Atlas
- **Deployment:** Docker, Render

## 📂 Project Structure

- `backend/`: FastAPI server source code.
- `frontend/`: React client source code.
- `docker-compose.yml`: Configuration to run the app locally with Docker.

## 🛠️ Setup & Installation

### 1. Environment Configuration

Ensure your `backend/.env` file contains your MongoDB connection string:

```properties
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/messaging_db?retryWrites=true&w=majority
```

### 2. Run with Docker (Recommended)

Run the entire stack (Frontend + Backend) with a single command:

```bash
docker-compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### 3. Manual Local Development (Optional)

If you prefer running without Docker:

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## ☁️ Deployment

This project is configured for deployment on **Render**.

1. **Backend:** Deploy as a **Web Service**. Add the `MONGO_URI` environment variable.
2. **Frontend:** Deploy as a **Static Site**. Add `REACT_APP_API_URL` (HTTPS) and `REACT_APP_WS_URL` (WSS) environment variables pointing to your backend.