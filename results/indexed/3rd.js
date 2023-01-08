result = {
    explainVersion: '1',
    stages: [
      {
        '$cursor': {
          queryPlanner: {
            namespace: 'expedia.tickets',
            indexFilterSet: false,
            parsedQuery: {},
            queryHash: '321D05C0',
            planCacheKey: '321D05C0',
            maxIndexedOrSolutionsReached: false,
            maxIndexedAndSolutionsReached: false,
            maxScansToExplodeReached: false,
            winningPlan: {
              stage: 'PROJECTION_SIMPLE',
              transformBy: {
                destinationAirport: 1,
                segments: 1,
                startingAirport: 1,
                _id: 0
              },
              inputStage: { stage: 'COLLSCAN', direction: 'forward' }
            },
            rejectedPlans: []
          },
          executionStats: {
            executionSuccess: true,
            nReturned: 7930000,
            executionTimeMillis: 15540,
            totalKeysExamined: 0,
            totalDocsExamined: 7930000,
            executionStages: {
              stage: 'PROJECTION_SIMPLE',
              nReturned: 7930000,
              executionTimeMillisEstimate: 556,
              works: 7930002,
              advanced: 7930000,
              needTime: 1,
              needYield: 0,
              saveState: 9373,
              restoreState: 9373,
              isEOF: 1,
              transformBy: {
                destinationAirport: 1,
                segments: 1,
                startingAirport: 1,
                _id: 0
              },
              inputStage: {
                stage: 'COLLSCAN',
                nReturned: 7930000,
                executionTimeMillisEstimate: 413,
                works: 7930002,
                advanced: 7930000,
                needTime: 1,
                needYield: 0,
                saveState: 9373,
                restoreState: 9373,
                isEOF: 1,
                direction: 'forward',
                docsExamined: 7930000
              }
            }
          }
        },
        nReturned: Long("7930000"),
        executionTimeMillisEstimate: Long("12273")
      },
      {
        '$group': {
          _id: {
            departureTime: {
              '$arrayElemAt': [ '$segments.departureTimeRaw', { '$const': 0 } ]
            },
            arrivalTime: {
              '$arrayElemAt': [ '$segments.arrivalTimeRaw', { '$const': -1 } ]
            },
            startingAirport: '$startingAirport',
            arrivalAirport: '$destinationAirport',
            airline: {
              '$arrayElemAt': [ '$segments.airlineName', { '$const': 0 } ]
            },
            conncetions: { '$size': [ '$segments' ] }
          }
        },
        maxAccumulatorMemoryUsageBytes: {},
        totalOutputDataSizeBytes: Long("8363871"),
        usedDisk: false,
        spills: Long("0"),
        nReturned: Long("9941"),
        executionTimeMillisEstimate: Long("15531")
      },
      {
        '$project': {
          airline: '$_id.airline',
          departureTime: '$_id.departureTime',
          arrivalTime: '$_id.arrivalTime',
          startingAirport: '$_id.startingAirport',
          arrivalAirport: '$_id.arrivalAirport',
          conncetions: { '$subtract': [ '$_id.conncetions', { '$const': 1 } ] },
          _id: false
        },
        nReturned: Long("9941"),
        executionTimeMillisEstimate: Long("15538")
      },
      {
        '$out': { db: 'expedia', coll: 'flights' },
        nReturned: Long("0"),
        executionTimeMillisEstimate: Long("15538")
      }
    ],
    serverInfo: {
      host: 'project-vmwarevirtualplatform',
      port: 27017,
      version: '6.0.3',
      gitVersion: 'f803681c3ae19817d31958965850193de067c516'
    },
    serverParameters: {
      internalQueryFacetBufferSizeBytes: 104857600,
      internalQueryFacetMaxOutputDocSizeBytes: 104857600,
      internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
      internalDocumentSourceGroupMaxMemoryBytes: 104857600,
      internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
      internalQueryProhibitBlockingMergeOnMongoS: 0,
      internalQueryMaxAddToSetBytes: 104857600,
      internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600
    },
    command: {
      aggregate: 'tickets',
      pipeline: [
        {
          '$group': {
            _id: {
              departureTime: { '$arrayElemAt': [ '$segments.departureTimeRaw', 0 ] },
              arrivalTime: { '$arrayElemAt': [ '$segments.arrivalTimeRaw', -1 ] },
              startingAirport: '$startingAirport',
              arrivalAirport: '$destinationAirport',
              airline: { '$arrayElemAt': [ '$segments.airlineName', 0 ] },
              conncetions: { '$size': '$segments' }
            }
          }
        },
        {
          '$project': {
            _id: 0,
            airline: '$_id.airline',
            departureTime: '$_id.departureTime',
            arrivalTime: '$_id.arrivalTime',
            startingAirport: '$_id.startingAirport',
            arrivalAirport: '$_id.arrivalAirport',
            conncetions: { '$subtract': [ '$_id.conncetions', 1 ] }
          }
        },
        { '$out': 'flights' }
      ],
      cursor: {},
      '$db': 'expedia'
    },
    ok: 1
  }
  