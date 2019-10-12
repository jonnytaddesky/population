from pymongo import MongoClient


DB_URI = "mongodb://localhost:27017/"
DB_NAME = "population"
COLLECTION_NAME = "users"


class Database:
    def __init__(self):
        self.client = MongoClient(DB_URI)
        self.db = self.client[DB_NAME]
        self.collection = self.db[COLLECTION_NAME]

    def find(self, filters=None):
        pass

    def insert(self, data):
        pass
