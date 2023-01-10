/**  Log runtime function */
function logRuntime(fun) {
    let start = performance.now()
    
    result = fun()
    
    let end = performance.now()
    let time = end - start
    print(`Runtime: ${time} ms`)
}

//-------------------------------------------
// With explain

const q1 = () => db.tickets.aggregate([
    {
        $match: {
            flightDate: {
                $gte: new Date("2022-04-18"),
                $lte: new Date("2022-04-19"),
            },
        },
    },
    {
        $group: {
            _id: "$destinationAirport",
            total: { $count: {} },
        },
    },
    {
        $sort: {
            total: -1,
        },
    },
    {
        $limit: 1,
    },
]).explain("executionStats")

const q2 = () => db.tickets.aggregate([
    {
        $match: {
            startingAirport: "LAX",
            destinationAirport: {
                $in: ["JFK", "LGA"],
            },
        },
    },
    {
        $sort: {
            baseFare: 1,
        },
    },
    {
        $limit: 10,
    },
    {
        $project: {
            _id: 0,
            airline: {
                $arrayElemAt: ["$segments.airlineName", 0],
            },
            airlineCode: {
                $arrayElemAt: ["$segments.airlineCode", 0],
            },
            flightId: "$legId",
            destinationAirport: "$destinationAirport",
            baseFare: "$baseFare",
            flightDate: "$flightDate",
        },
    },
]).explain("executionStats")

const q2_ = () => db.tickets.find({
    startingAirport: "LAX",
    destinationAirport: { $in: ["JFK", "LGA"] }
}, {
    _id: 0,
    airline: { $arrayElemAt: ["$segments.airlineName", 0] },
    airlineCode: { $arrayElemAt: ["$segments.airlineCode", 0] },
    flightId: "$legId",
    destinationAirport: "$destinationAirport",
    baseFare: "$baseFare",
    flightDate: "$flightDate"
}).sort({ baseFare: 1 }).limit(10).explain("executionStats")

const q3 = () => db.tickets.aggregate([
    {
        $group: {
            _id: {
                departureTime: {
                    $arrayElemAt: ["$segments.departureTimeRaw", 0],
                },
                arrivalTime: {
                    $arrayElemAt: ["$segments.arrivalTimeRaw", -1],
                },
                startingAirport: "$startingAirport",
                arrivalAirport: "$destinationAirport",
                airline: {
                    $arrayElemAt: ["$segments.airlineName", 0],
                },
                conncetions: {
                    $size: "$segments",
                },
            },
        },
    },
    {
        $project: {
            _id: 0,
            airline: "$_id.airline",
            departureTime: "$_id.departureTime",
            arrivalTime: "$_id.arrivalTime",
            startingAirport: "$_id.startingAirport",
            arrivalAirport: "$_id.arrivalAirport",
            conncetions: {
                $subtract: ["$_id.conncetions", 1],
            },
        },
    },
    {
        $out: "flights",
    },
]).explain("executionStats")

const q4 = () => db.tickets.explain("executionStats").update(
    { "segments.airlineName": "American Airlines" },
    {
      $set: {
        baseFare: {
          $cond: {
            if: { $eq: ['$isNonStop', true] },
            then: { $add: ['$baseFare', 50] },
            else: { $add: ['$baseFare', 20] },
          }
        },
        totalFare: {
          $cond: {
            if: { $eq: ['$isNonStop', true] },
            then: { $add: ['$totalFare', 50] },
            else: { $add: ['$totalFare', 20] },
          }
        }
      },
    },
    { 
      upsert: false, 
      multi: true,
})

//-------------------------------------------
// Without explain

const q11 = () => db.tickets.aggregate([
    {
        $match: {
            flightDate: {
                $gte: new Date("2022-04-18"),
                $lte: new Date("2022-04-19"),
            },
        },
    },
    {
        $group: {
            _id: "$destinationAirport",
            total: { $count: {} },
        },
    },
    {
        $sort: {
            total: -1,
        },
    },
    {
        $limit: 1,
    },
])

const q21 = () => db.tickets.aggregate([
    {
        $match: {
            startingAirport: "LAX",
            destinationAirport: {
                $in: ["JFK", "LGA"],
            },
        },
    },
    {
        $sort: {
            baseFare: 1,
        },
    },
    {
        $limit: 10,
    },
    {
        $project: {
            _id: 0,
            airline: {
                $arrayElemAt: ["$segments.airlineName", 0],
            },
            airlineCode: {
                $arrayElemAt: ["$segments.airlineCode", 0],
            },
            flightId: "$legId",
            destinationAirport: "$destinationAirport",
            baseFare: "$baseFare",
            flightDate: "$flightDate",
        },
    },
])

const q2_1 = () => db.tickets.find({
    startingAirport: "LAX",
    destinationAirport: { $in: ["JFK", "LGA"] }
}, {
    _id: 0,
    airline: { $arrayElemAt: ["$segments.airlineName", 0] },
    airlineCode: { $arrayElemAt: ["$segments.airlineCode", 0] },
    flightId: "$legId",
    destinationAirport: "$destinationAirport",
    baseFare: "$baseFare",
    flightDate: "$flightDate"
}).sort({ baseFare: 1 }).limit(10)

const q31 = () => db.tickets.aggregate([
    {
        $group: {
            _id: {
                departureTime: {
                    $arrayElemAt: ["$segments.departureTimeRaw", 0],
                },
                arrivalTime: {
                    $arrayElemAt: ["$segments.arrivalTimeRaw", -1],
                },
                startingAirport: "$startingAirport",
                arrivalAirport: "$destinationAirport",
                airline: {
                    $arrayElemAt: ["$segments.airlineName", 0],
                },
                conncetions: {
                    $size: "$segments",
                },
            },
        },
    },
    {
        $project: {
            _id: 0,
            airline: "$_id.airline",
            departureTime: "$_id.departureTime",
            arrivalTime: "$_id.arrivalTime",
            startingAirport: "$_id.startingAirport",
            arrivalAirport: "$_id.arrivalAirport",
            conncetions: {
                $subtract: ["$_id.conncetions", 1],
            },
        },
    },
    {
        $out: "flights",
    },
])

const q41 = () => db.tickets.update(
    { "segments.airlineName": "American Airlines" },
    {
      $set: {
        baseFare: {
          $cond: {
            if: { $eq: ['$isNonStop', true] },
            then: { $add: ['$baseFare', 50] },
            else: { $add: ['$baseFare', 20] },
          }
        },
        totalFare: {
          $cond: {
            if: { $eq: ['$isNonStop', true] },
            then: { $add: ['$totalFare', 50] },
            else: { $add: ['$totalFare', 20] },
          }
        }
      },
    },
    { 
      upsert: false, 
      multi: true,
})

// ---------------------------------------------------
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
const isNonStopIndex = () => db.tickets.createIndex(
    { 'isNonStop': 1 },
    { partialFilterExpression: { 'isNonStop': true } }
)

// Run queries with time logging
print()
logRuntime(q1)
logRuntime(q2)
logRuntime(q2_)
logRuntime(q3)
logRuntime(q4)


print()
logRuntime(createLegIdIndex)
logRuntime(createFlightDateIndex)
logRuntime(createCompoundIndex)
logRuntime(partialFilterIndex)
logRuntime(isNonStopIndex)


print()
logRuntime(q1)
logRuntime(q2)
logRuntime(q2_)
logRuntime(q3)
logRuntime(q4)


print()
logRuntime(q11)
logRuntime(q21)
logRuntime(q2_1)
logRuntime(q31)
logRuntime(q41)

