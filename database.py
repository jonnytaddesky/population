from pymongo import MongoClient


DB_URI = "mongodb://localhost:27017/"


class Database:
    def __init__(self, name):
        self.client = MongoClient(DB_URI)
        self.db = self.client[name]
        self.collection = None

    def useCollection(self, col_name):
        self.collection = self.db[col_name]

    def find(self, filters=None):
        print('[Database] Find: filters={}'.format(filters))
        return self.collection.find(filters)

    def insert(self, data):
        print('[Database] Insert: data={}'.format(data))
        self.collection.insert(data)
        return True
