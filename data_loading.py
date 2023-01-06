# %%
import numpy as np
import pandas as pd
import psutil
import time
import os
from dotenv import load_dotenv
from multiprocessing import Pool
from datetime import datetime
from pymongo import MongoClient

load_dotenv()
URI = os.getenv('MONGO_CONNECTION_STRING')
# %%

def replace_na(df):
    df.totalTravelDistance = df.totalTravelDistance.fillna('0')
    df.segmentsEquipmentDescription = df.segmentsEquipmentDescription.fillna('')
    return df

def convert_datatype(df):
    df.searchDate = pd.to_datetime(df.searchDate, format='%Y-%m-%d')
    df.flightDate  = pd.to_datetime(df.flightDate, format='%Y-%m-%d')
    df.elapsedDays = df.elapsedDays.astype(int)
    df.isBasicEconomy = df.isBasicEconomy.astype(bool)
    df.isBasicEconomy = df.isBasicEconomy.astype(bool)
    df.isRefundable = df.isRefundable.astype(bool)
    df.isNonStop = df.isNonStop.astype(bool)
    df.baseFare = df.baseFare.astype(float)
    df.totalFare = df.totalFare.astype(float)
    df.seatsRemaining = df.seatsRemaining.astype(int)
    df.totalTravelDistance = df.totalTravelDistance.astype(int)
    return df

def split_segments(row):
    segments = []
    for i in range(len(row[0])):
        if row[i] is not None:
            segment = {
                'departureTimeEpochSeconds': int(row[0][i]),
                'departureTimeRaw': datetime.fromisoformat(row[1][i]),
                'arrivalTimeEpochSeconds': int(row[2][i]),
                'arrivalTimeRaw': datetime.fromisoformat(row[3][i]),
                'arrivalAirportCode': row[4][i],
                'departureAirportCode': row[5][i],
                'airlineName': row[6][i],
                'airlineCode': row[7][i],
                'equipmentDescription': row[8][i],
                'durationInSeconds': int(row[9][i]),
                'distance': row[10][i],
                'cabinCode': row[11][i],
            }
            segments.append(segment)
    return segments   

def process_data(df):
    #replace na values with empty string
    df = replace_na(df)

    #convert datatypes
    df = convert_datatype(df)

    # split segements by || separator
    df_ = df.iloc[:, 15:].apply(lambda x: x.str.split('\|\|'))

    # apply function to dataframe
    segment = df_.apply(split_segments, axis=1)

    # drop columns from 15th to the end 
    df__ = df.iloc[:, :15]

    #merge segment column with dataframe and name it segments
    df__['segments'] = segment

    # convert every row of the dataframe to a dictionary and append it to a list
    documents = []
    for index, row in df__.iterrows():
        documents.append(row.to_dict())

    # Connect to the database
    # Get env variables
    connection_string = os.getenv('MONGO_CONNECTION_STRING')

    with MongoClient(connection_string) as client:
        collection = client['expedia']['tickets']
        #Insert the data into the database
        collection.insert_many(documents)

    return documents

# %%
ENTRIES = 82.1 * 10**6
CHUNK_SIZE = 10**4
FILE = './agoda_tickets.csv'

if __name__ == '__main__':
    # Read .env file
    load_dotenv()

    # Count number of processes
    num_processes = psutil.cpu_count(logical=False)
    print('Number of processes: ', num_processes)

    with pd.read_csv(FILE, chunksize=CHUNK_SIZE) as reader:
        for i, chunk in enumerate(reader):
            # Track runtime of code 
            start = time.perf_counter()

            # Split the chunk into smaller chunks
            chunk_split = np.array_split(chunk, num_processes)
            data = []
            # Process the data in parallel
            try:
                with Pool(num_processes) as pool:
                    data = pool.map(process_data, chunk_split)
            except Exception as e:
                print(e)

            # Track runtime of code
            end = time.perf_counter()
            elapsed = end - start

            print('\r' + f"{str(i+1)} / {ENTRIES / CHUNK_SIZE} \tChunk time: {elapsed:.6f} seconds", end='')   