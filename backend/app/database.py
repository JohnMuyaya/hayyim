from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("uri = "mongodb+srv://johnmuyaya:<CEO&FounderofKnot>@cluster0.khnkmtk.mongodb.net/?appName=Cluster0"
"))
db = client["messaging_db"]

users = db["users"]
messages = db["messages"]
conversations = db["conversations"]