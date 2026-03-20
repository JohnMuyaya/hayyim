from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import messages

router = APIRouter()

class SendMessageRequest(BaseModel):
    sender: str
    receiver: str
    content: str

@router.post("/chat/send")
async def send_message(request: SendMessageRequest):
    message = {
        "sender": request.sender,
        "receiver": request.receiver,
        "content": request.content
    }
    messages.insert_one(message)
    return {"status": "sent"}

@router.get("/chat/messages")
async def get_messages(limit: int = 100):
    docs = list(messages.find().sort("_id", 1).limit(limit))
    for doc in docs:
        doc["_id"] = str(doc["_id"])
    return {"messages": docs}