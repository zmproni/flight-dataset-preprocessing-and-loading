db.tickets.createIndex(
    {"legId": 1,},
    {
        unique: false,
        name: "legId_1", 
        sparse: false, 
    }
)

db.tickets.createIndex(
    {"flightDate": 1,},
    {unique: false}
)

db.tickets.createIndex(
    {"airlineName": 1,},
    {unique: false}
)