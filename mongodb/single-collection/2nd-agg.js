db.tickets.explain("executionStats").aggregate([
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