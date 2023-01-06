import pymongo
import time
import dotenv
import os

# Load .env file
dotenv.load_dotenv()

URI = os.getenv('MONGO_CONNECTION_STRING')
LIMIT = 100_000

def calculate_elapsed_time(start):
    elapsed = time.perf_counter() - start
    return elapsed

def main():
    # Track the time it takes to insert the data
    start = time.perf_counter()

    # Connect to MongoDB
    with pymongo.MongoClient(URI) as client:
        db = client.expedia
        tickets = db.tickets.find(limit=LIMIT)
        for count, ticket in enumerate(tickets):
            result = db.sample.insert_one(ticket)

            #calculate progress
            progress = (count  + 1) / LIMIT * 100

            # Print current elapsed time & progress
            curr_elapsed = calculate_elapsed_time(start)
            print(f'\rCurrent elapsed time: {curr_elapsed:.2f} seconds\tProgress: {progress:.1f}%', end='')

    end = time.perf_counter()
    elapsed = calculate_elapsed_time(start)
    print(f'Elapsed time: {elapsed:.2f} seconds')

if __name__ == '__main__':
    main()

    