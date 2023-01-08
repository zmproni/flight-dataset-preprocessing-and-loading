result = {
    explainVersion: '1',
    stages: [
        {
            '$cursor': {
                queryPlanner: {
                    namespace: 'expedia.tickets',
                    indexFilterSet: false,
                    parsedQuery: {
                        '$and': [
                            { startingAirport: { '$eq': 'LAX' } },
                            { destinationAirport: { '$in': ['JFK', 'LGA'] } }
                        ]
                    },
                    queryHash: '23FDE817',
                    planCacheKey: '23FDE817',
                    maxIndexedOrSolutionsReached: false,
                    maxIndexedAndSolutionsReached: false,
                    maxScansToExplodeReached: false,
                    winningPlan: {
                        stage: 'PROJECTION_DEFAULT',
                        transformBy: {
                            baseFare: 1,
                            destinationAirport: 1,
                            flightDate: 1,
                            legId: 1,
                            'segments.airlineCode': 1,
                            'segments.airlineName': 1,
                            _id: 0
                        },
                        inputStage: {
                            stage: 'SORT',
                            sortPattern: { baseFare: 1 },
                            memLimit: 104857600,
                            limitAmount: 10,
                            type: 'simple',
                            inputStage: {
                                stage: 'COLLSCAN',
                                filter: {
                                    '$and': [
                                        { startingAirport: { '$eq': 'LAX' } },
                                        { destinationAirport: { '$in': ['JFK', 'LGA'] } }
                                    ]
                                },
                                direction: 'forward'
                            }
                        }
                    },
                    rejectedPlans: []
                },
                executionStats: {
                    executionSuccess: true,
                    nReturned: 10,
                    executionTimeMillis: 4839,
                    totalKeysExamined: 0,
                    totalDocsExamined: 7930000,
                    executionStages: {
                        stage: 'PROJECTION_DEFAULT',
                        nReturned: 10,
                        executionTimeMillisEstimate: 281,
                        works: 7930013,
                        advanced: 10,
                        needTime: 7930002,
                        needYield: 0,
                        saveState: 7931,
                        restoreState: 7931,
                        isEOF: 1,
                        transformBy: {
                            baseFare: 1,
                            destinationAirport: 1,
                            flightDate: 1,
                            legId: 1,
                            'segments.airlineCode': 1,
                            'segments.airlineName': 1,
                            _id: 0
                        },
                        inputStage: {
                            stage: 'SORT',
                            nReturned: 10,
                            executionTimeMillisEstimate: 275,
                            works: 7930013,
                            advanced: 10,
                            needTime: 7930002,
                            needYield: 0,
                            saveState: 7931,
                            restoreState: 7931,
                            isEOF: 1,
                            sortPattern: { baseFare: 1 },
                            memLimit: 104857600,
                            limitAmount: 10,
                            type: 'simple',
                            totalDataSizeSorted: 31683,
                            usedDisk: false,
                            spills: 0,
                            inputStage: {
                                stage: 'COLLSCAN',
                                filter: {
                                    '$and': [
                                        { startingAirport: { '$eq': 'LAX' } },
                                        { destinationAirport: { '$in': ['JFK', 'LGA'] } }
                                    ]
                                },
                                nReturned: 128466,
                                executionTimeMillisEstimate: 267,
                                works: 7930002,
                                advanced: 128466,
                                needTime: 7801535,
                                needYield: 0,
                                saveState: 7931,
                                restoreState: 7931,
                                isEOF: 1,
                                direction: 'forward',
                                docsExamined: 7930000
                            }
                        }
                    }
                }
            },
            nReturned: Long("10"),
            executionTimeMillisEstimate: Long("4840")
        },
        {
            '$project': {
                airline: {
                    '$arrayElemAt': ['$segments.airlineName', { '$const': 0 }]
                },
                airlineCode: {
                    '$arrayElemAt': ['$segments.airlineCode', { '$const': 0 }]
                },
                flightId: '$legId',
                destinationAirport: '$destinationAirport',
                baseFare: '$baseFare',
                flightDate: '$flightDate',
                _id: false
            },
            nReturned: Long("10"),
            executionTimeMillisEstimate: Long("4840")
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
                '$match': {
                    startingAirport: 'LAX',
                    destinationAirport: { '$in': ['JFK', 'LGA'] }
                }
            },
            { '$sort': { baseFare: 1 } },
            { '$limit': 10 },
            {
                '$project': {
                    _id: 0,
                    airline: { '$arrayElemAt': ['$segments.airlineName', 0] },
                    airlineCode: { '$arrayElemAt': ['$segments.airlineCode', 0] },
                    flightId: '$legId',
                    destinationAirport: '$destinationAirport',
                    baseFare: '$baseFare',
                    flightDate: '$flightDate'
                }
            }
        ],
        cursor: {},
        '$db': 'expedia'
    },
    ok: 1
}
