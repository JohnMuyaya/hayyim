from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Use environment variable for Atlas URI. Example (in backend/.env):
# MONGO_URI="mongodb+srv://<user>:<password>@cluster0.khnkmtk.mongodb.net/messaging_db?retryWrites=true&w=majority"
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/messaging_db")

client = MongoClient(mongo_uri)
db = client["messaging_db"]

users = db["users"]
messages = db["messages"]
conversations = db["conversations"]