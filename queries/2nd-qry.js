db.tickets.explain('executionStats').find({
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