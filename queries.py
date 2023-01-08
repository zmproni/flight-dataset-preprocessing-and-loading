from datetime import datetime, tzinfo, timezone
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
URI = os.getenv('MONGO_CONNECTION_STRING')

client = MongoClient(URI)

# Query 1
# What is the most popular airport during holiday season

# Aggregation pipeline

result_1 = client['expedia']['sample'].aggregate([
    {
        '$match': {
            'flightDate': {
                '$gte': datetime(2022, 4, 20, 0, 0, 0, tzinfo=timezone.utc), 
                '$lte': datetime(2022, 4, 22, 0, 0, 0, tzinfo=timezone.utc)
            }
        }
    }, {
        '$group': {
            '_id': '$destinationAirport', 
            'total': {
                '$count': {}
            }
        }
    }, {
        '$sort': {
            'total': -1
        }
    }, {
        '$limit': 1
    }
])

# Query 2
# Look for flights from LAX to JFK or LGA with the lowest base fare
result_2 = client['expedia']['sample'].aggregate([
    {
        '$match': {
            'startingAirport': 'LAX', 
            'destinationAirport': {
                '$in': [
                    'JFK', 'LGA'
                ]
            }
        }
    }, {
        '$sort': {
            'baseFare': 1
        }
    }, {
        '$limit': 10
    }, {
        '$project': {
            '_id': 0, 
            'airline': {
                '$arrayElemAt': [
                    '$segments.airlineName', 0
                ]
            }, 
            'airlineCode': {
                '$arrayElemAt': [
                    '$segments.airlineCode', 0
                ]
            }, 
            'flightId': '$legId', 
            'destinationAirport': '$destinationAirport', 
            'baseFare': '$baseFare', 
            'flightDate': '$flightDate'
        }
    }
])

# find() method
client['expedia']['sample'].find({
  '$startingAirport': "LAX",
  '$destinationAirport': { '$in': ["JFK", "LGA"] }
}, {
  '_id': 0,
  'airline': { '$arrayElemAt': ["$segments.airlineName", 0] },
  'airlineCode': { '$arrayElemAt': ["$segments.airlineCode", 0] },
  'flightId': "$legId",
  'destinationAirport': "$destinationAirport",
  'baseFare': "$baseFare",
  'flightDate': "$flightDate"
}).sort({ 'baseFare': 1 }).limit(10)

# TODO: Make some of the queries do something other than just aggregation,
# For example 

# Query 3
result_3 = client['expedia']['sample'].aggregate([
    {
        '$group': {
            '_id': {
                'departureTime': {
                    '$arrayElemAt': [
                        '$segments.departureTimeRaw', 0
                    ]
                }, 
                'arrivalTime': {
                    '$arrayElemAt': [
                        '$segments.arrivalTimeRaw', -1
                    ]
                }, 
                'startingAirport': "$startingAirport",
                'arrivalAirport': "$destinationAirport", 
                'airline': {
                    '$arrayElemAt': [
                        '$segments.airlineName', 0
                    ]
                }, 
                'conncetions': {
                    '$size': '$segments'
                }
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'airline': '$_id.airline', 
            'departureTime': '$_id.departureTime', 
            'arrivalTime': '$_id.arrivalTime', 
            'startingAirport': '$_id.startingAirport', 
            'arrivalAirport': '$_id.arrivalAirport', 
            'conncetions': {
                '$subtract': [
                    '$_id.conncetions', 1
                ]
            }
        }
    }, {
        '$out': 'flights'
    }
])

# Query 4
# Update the equipmentDescription of a flight
result_4 = client['expedia']['sample'].update(
    {'legId': 'c38a6e4b807d15541e5866676febcbec'},
    {'$set': {  "equipmentDescription": "Airbus A320-200"}},
)