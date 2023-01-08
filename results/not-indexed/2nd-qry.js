result = {
    explainVersion: '1',
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
                _id: 0,
                airline: { '$arrayElemAt': ['$segments.airlineName', 0] },
                airlineCode: { '$arrayElemAt': ['$segments.airlineCode', 0] },
                flightId: '$legId',
                destinationAirport: '$destinationAirport',
                baseFare: '$baseFare',
                flightDate: '$flightDate'
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
        executionTimeMillis: 4699,
        totalKeysExamined: 0,
        totalDocsExamined: 7930000,
        executionStages: {
            stage: 'PROJECTION_DEFAULT',
            nReturned: 10,
            executionTimeMillisEstimate: 235,
            works: 7930013,
            advanced: 10,
            needTime: 7930002,
            needYield: 0,
            saveState: 7930,
            restoreState: 7930,
            isEOF: 1,
            transformBy: {
                _id: 0,
                airline: { '$arrayElemAt': ['$segments.airlineName', 0] },
                airlineCode: { '$arrayElemAt': ['$segments.airlineCode', 0] },
                flightId: '$legId',
                destinationAirport: '$destinationAirport',
                baseFare: '$baseFare',
                flightDate: '$flightDate'
            },
            inputStage: {
                stage: 'SORT',
                nReturned: 10,
                executionTimeMillisEstimate: 230,
                works: 7930013,
                advanced: 10,
                needTime: 7930002,
                needYield: 0,
                saveState: 7930,
                restoreState: 7930,
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
                    executionTimeMillisEstimate: 223,
                    works: 7930002,
                    advanced: 128466,
                    needTime: 7801535,
                    needYield: 0,
                    saveState: 7930,
                    restoreState: 7930,
                    isEOF: 1,
                    direction: 'forward',
                    docsExamined: 7930000
                }
            }
        }
    },
    command: {
        find: 'tickets',
        filter: {
            startingAirport: 'LAX',
            destinationAirport: { '$in': ['JFK', 'LGA'] }
        },
        sort: { baseFare: 1 },
        projection: {
            _id: 0,
            airline: { '$arrayElemAt': ['$segments.airlineName', 0] },
            airlineCode: { '$arrayElemAt': ['$segments.airlineCode', 0] },
            flightId: '$legId',
            destinationAirport: '$destinationAirport',
            baseFare: '$baseFare',
            flightDate: '$flightDate'
        },
        limit: 10,
        '$db': 'expedia'
    },
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
    ok: 1
}
