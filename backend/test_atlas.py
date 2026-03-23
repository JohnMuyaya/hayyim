import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

# Load the .env file
load_dotenv()

uri = os.getenv("MONGO_URI")
print(f"Testing Connection to: {uri.split('@')[-1]}") # Print only the host part for security

try:
    client = MongoClient(uri)
    # The 'ismaster' command is cheap and checks network connectivity
    client.admin.command('ismaster')
    print("✅ Network: Server is reachable.")
    
    # The 'ping' command checks authentication
    client.admin.command('ping')
    print("✅ Auth: Login successful!")
    
    # Try writing a test document
    db = client["messaging_db"]
    result = db["test_connection"].insert_one({"status": "working"})
    print(f"✅ Write: Successfully inserted document ID: {result.inserted_id}")
    
except OperationFailure:
    print("❌ Auth Failed: Check username/password.")
except ConnectionFailure:
    print("❌ Network Failed: Check IP Whitelist (Network Access) in Atlas.")
except Exception as e:
    print(f"❌ Error: {e}")
