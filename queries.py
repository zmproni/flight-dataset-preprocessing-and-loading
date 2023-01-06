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
# TODO: Change the date range to the holiday season
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

# TODO: Make some of the queries do something other than just aggregation,
# For example 

# Query 3

# Query 4