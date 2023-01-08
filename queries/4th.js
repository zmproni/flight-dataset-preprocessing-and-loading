// 4. Update all documents in the collection with legId = c38a6e4b807d15541e5866676febcbec
// Set the equipmentDescription field to "Airbus A320-200"
db.tickets.explain('executionStats').update(
    {legId: 'c38a6e4b807d15541e5866676febcbec'},
    {$set: {  equipmentDescription: "Airbus A320-200"}},
  )
  