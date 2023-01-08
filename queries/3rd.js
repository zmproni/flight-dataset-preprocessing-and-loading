db.tickets.explain('executionStats').aggregate([
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