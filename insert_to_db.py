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

# %%
def process_data(df):
    #replace na values with empty string
    df.totalTravelDistance = df.totalTravelDistance.fillna('0')
    df.segmentsEquipmentDescription = df.segmentsEquipmentDescription.fillna('')

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

    # split segements by || separator
    df_ = df.iloc[:, 15:].apply(lambda x: x.str.split('\|\|'))

    # function that takes dataframe row and converts the segment features into a list of segment objects 
    def convert_to_segments(row):
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
    # apply function to dataframe
    segment = df_.apply(convert_to_segments, axis=1)

    # drop columns from 15th to the end 
    df__ = df.iloc[:, :15]

    #merge segment column with dataframe and name it segments
    df__['segments'] = segment

    # convert every row of the dataframe to a dictionary and append it to a list
    documents = []
    for index, row in df__.iterrows():
        documents.append(row.to_dict())



    # Connect to the database
    client = MongoClient()
    collection = client['expedia']['tickets']

    #Insert the data into the database
    collection.insert_many(documents)
    client.close()

    return documents

# %%
if __name__ == '__main__':
    # Read .env file
    load_dotenv()


    # Read the csv file in chunks
    chunksize = 10**4

    # Count number of processes
    num_processes = psutil.cpu_count(logical=False)
    print('Number of processes: ', num_processes)

    with pd.read_csv('./itineraries.csv', chunksize=chunksize) as reader:
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

            print('\r' + str(i+1), ' / ', '8214', f'\tChunk time: {elapsed:.6f} seconds', end='')   

     


