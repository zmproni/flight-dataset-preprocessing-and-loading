# Preprocessing and loading of itineraries dataset from Kaggle to MongoDB
This is a script I wrote for a University project meant for personal use and future refrence. The challenge of working with this dataset was its size, at approximately 30gb data processing methods I was accustomed to before became unfeasable. This was due to limitations in memory and speed of execution. 

## Required files
**.env**  
```txt
MONGO_CONNECTION_STRING=<connection string>
```

**itineraries.csv**  
source: https://www.kaggle.com/datasets/dilwong/flightprices?select=itineraries.csv

## Notes 
* This was originally written as a notebook, was later converted to a .py script to call Pool, method. 
* In data_loading I used pandas to read csv. It may not be the best way of writing this, however it was the fastest and easiest for me at the time. Time to write this program was as important as getting the program to run due to deadlines. 😓



## Results table
| Query   | Indexed (Millis) | Not Indexed (Millis) |
| :------ | :--------------- | :------------------- |
| **1**   | 1387             | 18998                |
| **2.1** | 1504             | 4839                 |
| **2.2** | 131              | 4699                 |
| **3**   | 15540            | 14661                |
| **4**   | 2                | 1                    |
