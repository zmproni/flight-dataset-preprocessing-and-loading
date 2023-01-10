// 4. Update all documents in the collection with legId = c38a6e4b807d15541e5866676febcbec
// Set the equipmentDescription field to "Airbus A320-200"
db.tickets.explain('executionStats').updateMany(
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
  })
