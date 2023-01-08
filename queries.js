// use expedia

// 1. Aggregation pipeline that finds the most popular destination airport for flights departing on April 20, 2022 to April 22, 2022
// Returns the airport code and the number of flights
db.tickets.aggregate([
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

// 2. Aggregation pipeline
// Finds flights from LAX to JFK or LGA and sorts them by baseFare in ascending order
// Returns the first 10 results
db.tickets.find([
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

// Finds flights from LAX to JFK or LGA and sorts them by baseFare in ascending order
// Returns the first 10 results
db.tickets.find({
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

// Aggregation pipeline, groups all tickets by unique flights and creates a new collection
db.tickets.aggregate([
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

// 4. Update all documents in the collection with legId = c38a6e4b807d15541e5866676febcbec
// Set the equipmentDescription field to "Airbus A320-200"
db.tickets.update(
  {legId: 'c38a6e4b807d15541e5866676febcbec'},
  {$set: {  equipmentDescription: "Airbus A320-200"}},
)


// Unrelated 
// Special
// Filter:
filter = { $expr: { $gt: [{ $size: '$segments' }, 2] } }
// Project:
project = { 'legId': 1, 
  'startingAirport': 1, 
  'destinationAirport': 1,
  'isNonStop': 1,
  'airlineName': { $arrayElemAt: ['$segments.airlineName', 0] },
  'departureTime': { $arrayElemAt: ["$segments.departureTimeRaw", 0] },
  'firstConnectionDepTime': {  
    $cond: {
      if: { $eq: ['$isNonStop', false] },
      then: { $arrayElemAt: ['$segments.departureTimeRaw', 1] },
      else: '$$REMOVE',
    }
  }, 
  'secondConnectionDepTime': {$arrayElemAt: ['$segments.departureTimeRaw', 1]},
  'totalConnections': { $subtract: [{$size: '$segments'}, 1]}
}
