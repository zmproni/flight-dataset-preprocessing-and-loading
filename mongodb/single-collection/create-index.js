/**  Log runtime function */
function logRuntime(fun) {
    let start = performance.now()
    
    fun()
    
    let end = performance.now()
    let time = end - start
    print(`Runtime: ${time} ms`)
}

// Q1 Index
const createLegIdIndex =  () =>  db.tickets.createIndex(
    {"legId": 1,},
    {
        unique: false,
        name: "legId_1", 
        sparse: false, 
    }
)

// Q2 Index
const createFlightDateIndex =  () =>  db.tickets.createIndex(
    {
        "startingAirport": 1,
        "destinationAirport": 1,
    },
    {unique: false}
)

// Q3 Index
const createCompoundIndex =  () =>  db.tickets.createIndex({
    'segments.airlineName': 1,
    'segments.departureTimeRaw': 1,
    'segments.arrivalTimeRaw': 1,
    'startingAirport': 1,
    'destinationAirport': 1
})


// Q4 Index
const partialFilterIndex = () => db.tickets.createIndex(
    { 'segments.airlineName': 1 },
    { partialFilterExpression: { 'segments.airlineName': 'American Airlines' } }
)


// Run queries with time logging
logRuntime(createLegIdIndex)
logRuntime(createFlightDateIndex)
logRuntime(createCompoundIndex)
logRuntime(partialFilterIndex)
