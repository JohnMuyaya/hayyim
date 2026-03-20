from fastapi import APIRouter, WebSocket

router = APIRouter()

clients = {}

@router.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await websocket.accept()
    clients[username] = websocket
    try:
        while True:
            data = await websocket.receive_json()
            receiver = data["receiver"]
            if receiver in clients:
                await clients[receiver].send_json({
                    "from": username,
                    "content": data["content"],
                    "status": "delivered"
                })
    except:
        pass
    finally:
        if username in clients:
            del clients[username]