import pandas as pd 
import os
import csv
from math import ceil 

# Function to count rows in a file
def count_rows(input):
    with open(input) as f:
        for i, l in enumerate(f):
            pass
    return i

CHUNK_SIZE = 10**4
TARGET_SIZE = 3 * 10**9
FILE = './itineraries.csv'
TARGET_FILE = './agoda_tickets.csv'

if __name__ == '__main__':
    # Delete target file if it exists
    if os.path.exists(TARGET_FILE):
        os.remove(TARGET_FILE)

    # Get file size
    file_size = os.path.getsize(FILE)

    # Calculate row count
    row_count = count_rows(FILE)

    # Calculate 
    row_size = file_size / row_count
    rows_needed = ceil(TARGET_SIZE / row_size)

    # Use pandas to read the file in chunks
    row = 0
    
    df = pd.read_csv(FILE, nrows=0)
    df.to_csv(TARGET_FILE, mode='w', header=True, index=False,  encoding='utf-8')

    with pd.read_csv(FILE, chunksize=CHUNK_SIZE, parse_dates=False) as reader:
        for chunk in reader:
            if row + CHUNK_SIZE > rows_needed:
                break

            while row <= rows_needed:            
                chunk.to_csv(TARGET_FILE, mode='a', header=False, index=False,  encoding='utf-8', quoting=csv.QUOTE_NONNUMERIC)
                row += CHUNK_SIZE

    new_file_size = os.path.getsize(TARGET_FILE)

    print(f'File size: {new_file_size/10**9} GB')
