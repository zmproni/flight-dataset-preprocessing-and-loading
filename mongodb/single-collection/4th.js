db.tickets.explain('executionStats').update(
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
  }
)
