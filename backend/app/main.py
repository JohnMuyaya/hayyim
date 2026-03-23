from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import client
from .routes import auth_routes, chat_routes
from .websocket import ws

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    try:
        client.admin.command('ping')
        print("✅ MongoDB Connection Successful")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")

@app.get("/")
async def root():
    return {"message": "Hayyim Chat Application Backend is Running!"}

app.include_router(auth_routes.router)
app.include_router(chat_routes.router)
app.include_router(ws.router)