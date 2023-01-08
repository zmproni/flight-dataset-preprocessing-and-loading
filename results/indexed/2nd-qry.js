
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
            planCacheKey: '53CFE66C',
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
                    stage: 'FETCH',
                        inputStage: {
                        stage: 'IXSCAN',
                            keyPattern: { startingAirport: 1, destinationAirport: 1 },
                        indexName: 'startingAirport_1_destinationAirport_1',
                            isMultiKey: false,
                                multiKeyPaths: { startingAirport: [], destinationAirport: [] },
                        isUnique: false,
                            isSparse: false,
                                isPartial: false,
                                    indexVersion: 2,
                                        direction: 'forward',
                                            indexBounds: {
                            startingAirport: ['["LAX", "LAX"]'],
                                destinationAirport: ['["JFK", "JFK"]', '["LGA", "LGA"]']
                        }
                    }
                }
            }
        },
        rejectedPlans: []
    },
    executionStats: {
        executionSuccess: true,
            nReturned: 10,
                executionTimeMillis: 131,
                    totalKeysExamined: 128467,
                        totalDocsExamined: 128466,
                            executionStages: {
            stage: 'PROJECTION_DEFAULT',
                nReturned: 10,
                    executionTimeMillisEstimate: 5,
                        works: 128478,
                            advanced: 10,
                                needTime: 128467,
                                    needYield: 0,
                                        saveState: 128,
                                            restoreState: 128,
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
                        executionTimeMillisEstimate: 5,
                            works: 128478,
                                advanced: 10,
                                    needTime: 128467,
                                        needYield: 0,
                                            saveState: 128,
                                                restoreState: 128,
                                                    isEOF: 1,
                                                        sortPattern: { baseFare: 1 },
                memLimit: 104857600,
                    limitAmount: 10,
                        type: 'simple',
                            totalDataSizeSorted: 31683,
                                usedDisk: false,
                                    spills: 0,
                                        inputStage: {
                    stage: 'FETCH',
                        nReturned: 128466,
                            executionTimeMillisEstimate: 4,
                                works: 128467,
                                    advanced: 128466,
                                        needTime: 0,
                                            needYield: 0,
                                                saveState: 128,
                                                    restoreState: 128,
                                                        isEOF: 1,
                                                            docsExamined: 128466,
                                                                alreadyHasObj: 0,
                                                                    inputStage: {
                        stage: 'IXSCAN',
                            nReturned: 128466,
                                executionTimeMillisEstimate: 2,
                                    works: 128467,
                                        advanced: 128466,
                                            needTime: 0,
                                                needYield: 0,
                                                    saveState: 128,
                                                        restoreState: 128,
                                                            isEOF: 1,
                                                                keyPattern: { startingAirport: 1, destinationAirport: 1 },
                        indexName: 'startingAirport_1_destinationAirport_1',
                            isMultiKey: false,
                                multiKeyPaths: { startingAirport: [], destinationAirport: [] },
                        isUnique: false,
                            isSparse: false,
                                isPartial: false,
                                    indexVersion: 2,
                                        direction: 'forward',
                                            indexBounds: {
                            startingAirport: ['["LAX", "LAX"]'],
                                destinationAirport: ['["JFK", "JFK"]', '["LGA", "LGA"]']
                        },
                        keysExamined: 128467,
                            seeks: 1,
                                dupsTested: 0,
                                    dupsDropped: 0
                    }
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
