from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ..database import messages

router = APIRouter()

clients = {}

@router.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await websocket.accept()
    clients[username] = websocket
    try:
        while True:
            data = await websocket.receive_json()
            
            # Persist the message to MongoDB
            messages.insert_one({
                "sender": username,
                "receiver": data["receiver"],
                "content": data["content"]
            })

            receiver = data["receiver"]
            if receiver in clients:
                await clients[receiver].send_json({
                    "from": username,
                    "content": data["content"],
                    "status": "delivered"
                })
    except WebSocketDisconnect:
        print(f"Client {username} disconnected (Normal)")
    except Exception as e:
        print(f"WebSocket Error for {username}: {e}")
    finally:
        if username in clients:
            del clients[username]