db.tickets.explain("executionStats").aggregate([
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
