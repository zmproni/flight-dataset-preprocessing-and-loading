// Q1 Index
db.tickets.createIndex(
    {"legId": 1,},
    {
        unique: false,
        name: "legId_1", 
        sparse: false, 
    }
)

// Q2 Index
db.tickets.createIndex(
    {"flightDate": 1,},
    {unique: false}
)

// Q3 Index
db.tickets.createIndex({
    'segments.airlineName': 1,
    'segments.departureTimeRaw': 1,
    'segments.arrivalTimeRaw': 1,
    'startingAirport': 1,
    'destinationAirport': 1
})


// Q4 Index
db.tickets.createIndex(
    { 'segments.airlineName': 1 },
    { partialFilterExpression: { 'segments.airlineName': 'American Airlines' } }
)