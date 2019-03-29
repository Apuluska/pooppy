from pymongo import MongoClient
import json

if __name__ == "__main__":
    mongo_client = MongoClient('localhost', 27017)
    db = mongo_client.pooppyDB
    collection = db.bin
    papeleras = json.load(open('papeleras.json'))
    for papelera in papeleras['entry']:
        p = {
            'bag': False,
            'address': {
                'addressName': papelera['title'],
                'lat': papelera['geo:lat'],
                'lng': papelera['geo:long']
            }
        }
        try:
            collection.insert_one(p)
        except:
            print("Error insertando la papelera " + p["address"]['addressName'])