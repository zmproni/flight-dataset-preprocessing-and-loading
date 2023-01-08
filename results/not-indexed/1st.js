result = {
    explainVersion: '2',
    stages: [
        {
            '$cursor': {
                queryPlanner: {
                    namespace: 'expedia.tickets',
                    indexFilterSet: false,
                    parsedQuery: {
                        '$and': [
                            {
                                flightDate: { '$lte': ISODate("2022-04-19T00:00:00.000Z") }
                            },
                            {
                                flightDate: { '$gte': ISODate("2022-04-18T00:00:00.000Z") }
                            }
                        ]
                    },
                    queryHash: '17C63AC8',
                    planCacheKey: '17C63AC8',
                    maxIndexedOrSolutionsReached: false,
                    maxIndexedAndSolutionsReached: false,
                    maxScansToExplodeReached: false,
                    winningPlan: {
                        queryPlan: {
                            stage: 'GROUP',
                            planNodeId: 2,
                            inputStage: {
                                stage: 'COLLSCAN',
                                planNodeId: 1,
                                filter: {
                                    '$and': [
                                        {
                                            flightDate: { '$lte': ISODate("2022-04-19T00:00:00.000Z") }
                                        },
                                        {
                                            flightDate: { '$gte': ISODate("2022-04-18T00:00:00.000Z") }
                                        }
                                    ]
                                },
                                direction: 'forward'
                            }
                        },
                        slotBasedPlan: {
                            slots: '$$RESULT=s10 env: { s1 = TimeZoneDatabase(Asia/Thimphu...Asia/Ashgabat) (timeZoneDB), s3 = 1673200966815 (NOW), s2 = Nothing (SEARCH_META) }',
                            stages: '[2] mkobj s10 [_id = s7, total = s9] true false \n' +
                                '[2] project [s9 = doubleDoubleSumFinalize (s8)] \n' +
                                '[2] group [s7] [s8 = aggDoubleDoubleSum (1)] \n' +
                                '[2] project [s7 = fillEmpty (s6, null)] \n' +
                                '[2] project [s6 = getField (s4, "destinationAirport")] \n' +
                                '[1] filter {applyClassicMatcher (ClassicMatcher({ $and: [ { flightDate: { $lte: new Date(1650326400000) } }, { flightDate: { $gte: new Date(1650240000000) } } ] }), s4)} \n' +
                                '[1] scan s4 s5 none none none none [] @"6f75967d-d808-4ccf-81a9-5e57465ea894" true false '
                        }
                    },
                    rejectedPlans: []
                },
                executionStats: {
                    executionSuccess: true,
                    nReturned: 16,
                    executionTimeMillis: 18998,
                    totalKeysExamined: 0,
                    totalDocsExamined: 7930000,
                    executionStages: {
                        stage: 'mkobj',
                        planNodeId: 2,
                        nReturned: 16,
                        executionTimeMillisEstimate: 18997,
                        opens: 1,
                        closes: 1,
                        saveState: 7931,
                        restoreState: 7931,
                        isEOF: 1,
                        objSlot: 10,
                        fields: [],
                        projectFields: ['_id', 'total'],
                        projectSlots: [Long("7"), Long("9")],
                        forceNewObject: true,
                        returnOldObject: false,
                        inputStage: {
                            stage: 'project',
                            planNodeId: 2,
                            nReturned: 16,
                            executionTimeMillisEstimate: 18997,
                            opens: 1,
                            closes: 1,
                            saveState: 7931,
                            restoreState: 7931,
                            isEOF: 1,
                            projections: { '9': 'doubleDoubleSumFinalize (s8) ' },
                            inputStage: {
                                stage: 'group',
                                planNodeId: 2,
                                nReturned: 16,
                                executionTimeMillisEstimate: 18997,
                                opens: 1,
                                closes: 1,
                                saveState: 7931,
                                restoreState: 7931,
                                isEOF: 1,
                                groupBySlots: [Long("7")],
                                expressions: { '8': 'aggDoubleDoubleSum (1) ' },
                                usedDisk: false,
                                spilledRecords: 0,
                                spilledBytesApprox: 0,
                                inputStage: {
                                    stage: 'project',
                                    planNodeId: 2,
                                    nReturned: 1381406,
                                    executionTimeMillisEstimate: 18982,
                                    opens: 1,
                                    closes: 1,
                                    saveState: 7931,
                                    restoreState: 7931,
                                    isEOF: 1,
                                    projections: { '7': 'fillEmpty (s6, null) ' },
                                    inputStage: {
                                        stage: 'project',
                                        planNodeId: 2,
                                        nReturned: 1381406,
                                        executionTimeMillisEstimate: 18982,
                                        opens: 1,
                                        closes: 1,
                                        saveState: 7931,
                                        restoreState: 7931,
                                        isEOF: 1,
                                        projections: { '6': 'getField (s4, "destinationAirport") ' },
                                        inputStage: {
                                            stage: 'filter',
                                            planNodeId: 1,
                                            nReturned: 1381406,
                                            executionTimeMillisEstimate: 18962,
                                            opens: 1,
                                            closes: 1,
                                            saveState: 7931,
                                            restoreState: 7931,
                                            isEOF: 1,
                                            numTested: 7930000,
                                            filter: 'applyClassicMatcher (ClassicMatcher({ $and: [ { flightDate: { $lte: new Date(1650326400000) } }, { flightDate: { $gte: new Date(1650240000000) } } ] }), s4) ',
                                            inputStage: {
                                                stage: 'scan',
                                                planNodeId: 1,
                                                nReturned: 7930000,
                                                executionTimeMillisEstimate: 18803,
                                                opens: 1,
                                                closes: 1,
                                                saveState: 7931,
                                                restoreState: 7931,
                                                isEOF: 1,
                                                numReads: 7930000,
                                                recordSlot: 4,
                                                recordIdSlot: 5,
                                                fields: [],
                                                outputSlots: []
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            nReturned: Long("16"),
            executionTimeMillisEstimate: Long("18997")
        },
        {
            '$sort': { sortKey: { total: -1 }, limit: Long("1") },
            totalDataSizeSortedBytesEstimate: Long("0"),
            usedDisk: false,
            spills: Long("0"),
            nReturned: Long("1"),
            executionTimeMillisEstimate: Long("18997")
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
                    flightDate: {
                        '$gte': ISODate("2022-04-18T00:00:00.000Z"),
                        '$lte': ISODate("2022-04-19T00:00:00.000Z")
                    }
                }
            },
            {
                '$group': { _id: '$destinationAirport', total: { '$count': {} } }
            },
            { '$sort': { total: -1 } },
            { '$limit': 1 }
        ],
        cursor: {},
        '$db': 'expedia'
    },
    ok: 1
}
