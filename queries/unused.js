
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
