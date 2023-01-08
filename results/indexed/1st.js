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
                    planCacheKey: '2AD378D6',
                    maxIndexedOrSolutionsReached: false,
                    maxIndexedAndSolutionsReached: false,
                    maxScansToExplodeReached: false,
                    winningPlan: {
                        queryPlan: {
                            stage: 'GROUP',
                            planNodeId: 3,
                            inputStage: {
                                stage: 'FETCH',
                                planNodeId: 2,
                                inputStage: {
                                    stage: 'IXSCAN',
                                    planNodeId: 1,
                                    keyPattern: { flightDate: -1 },
                                    indexName: 'flightDate_-1',
                                    isMultiKey: false,
                                    multiKeyPaths: { flightDate: [] },
                                    isUnique: false,
                                    isSparse: false,
                                    isPartial: false,
                                    indexVersion: 2,
                                    direction: 'forward',
                                    indexBounds: {
                                        flightDate: [
                                            '[new Date(1650326400000), new Date(1650240000000)]'
                                        ]
                                    }
                                }
                            }
                        },
                        slotBasedPlan: {
                            slots: '$$RESULT=s18 env: { s1 = TimeZoneDatabase(America/Halifax...Arctic/Longyearbyen) (timeZoneDB), s3 = 1673192688526 (NOW), s2 = Nothing (SEARCH_META) }',
                            stages: '[3] mkobj s18 [_id = s15, total = s17] true false \n' +
                                '[3] project [s17 = doubleDoubleSumFinalize (s16)] \n' +
                                '[3] group [s15] [s16 = aggDoubleDoubleSum (1)] \n' +
                                '[3] project [s15 = fillEmpty (s14, null)] \n' +
                                '[3] project [s14 = getField (s12, "destinationAirport")] \n' +
                                '[2] nlj [] [s8, s4, s5, s6, s7] \n' +
                                '    left \n' +
                                '        [1] nlj [s5, s7] [s9, s10] \n' +
                                '            left \n' +
                                '                [1] project [s5 = "flightDate_-1", s7 = {"flightDate" : -1}, s9 = KS(877FFFFE7FC0E193FF0104), s10 = KS(877FFFFE7FC607EFFFFE04)] \n' +
                                '                [1] limit 1 \n' +
                                '                [1] coscan \n' +
                                '            right \n' +
                                '                [1] project [s4 = s11] \n' +
                                '                [1] ixseek s9 s10 s6 s8 s11 [] @"6f75967d-d808-4ccf-81a9-5e57465ea894" @"flightDate_-1" true \n' +
                                '            \n' +
                                '        \n' +
                                '    right \n' +
                                '        [2] limit 1 \n' +
                                '        [2] seek s8 s12 s13 s4 s5 s6 s7 [] @"6f75967d-d808-4ccf-81a9-5e57465ea894" true false \n' +
                                '    \n'
                        }
                    },
                    rejectedPlans: []
                },
                executionStats: {
                    executionSuccess: true,
                    nReturned: 16,
                    executionTimeMillis: 1387,
                    totalKeysExamined: 1381406,
                    totalDocsExamined: 1381406,
                    executionStages: {
                        stage: 'mkobj',
                        planNodeId: 3,
                        nReturned: 16,
                        executionTimeMillisEstimate: 1387,
                        opens: 1,
                        closes: 1,
                        saveState: 1382,
                        restoreState: 1382,
                        isEOF: 1,
                        objSlot: 18,
                        fields: [],
                        projectFields: ['_id', 'total'],
                        projectSlots: [Long("15"), Long("17")],
                        forceNewObject: true,
                        returnOldObject: false,
                        inputStage: {
                            stage: 'project',
                            planNodeId: 3,
                            nReturned: 16,
                            executionTimeMillisEstimate: 1387,
                            opens: 1,
                            closes: 1,
                            saveState: 1382,
                            restoreState: 1382,
                            isEOF: 1,
                            projections: { '17': 'doubleDoubleSumFinalize (s16) ' },
                            inputStage: {
                                stage: 'group',
                                planNodeId: 3,
                                nReturned: 16,
                                executionTimeMillisEstimate: 1387,
                                opens: 1,
                                closes: 1,
                                saveState: 1382,
                                restoreState: 1382,
                                isEOF: 1,
                                groupBySlots: [Long("15")],
                                expressions: { '16': 'aggDoubleDoubleSum (1) ' },
                                usedDisk: false,
                                spilledRecords: 0,
                                spilledBytesApprox: 0,
                                inputStage: {
                                    stage: 'project',
                                    planNodeId: 3,
                                    nReturned: 1381406,
                                    executionTimeMillisEstimate: 1385,
                                    opens: 1,
                                    closes: 1,
                                    saveState: 1382,
                                    restoreState: 1382,
                                    isEOF: 1,
                                    projections: { '15': 'fillEmpty (s14, null) ' },
                                    inputStage: {
                                        stage: 'project',
                                        planNodeId: 3,
                                        nReturned: 1381406,
                                        executionTimeMillisEstimate: 1383,
                                        opens: 1,
                                        closes: 1,
                                        saveState: 1382,
                                        restoreState: 1382,
                                        isEOF: 1,
                                        projections: { '14': 'getField (s12, "destinationAirport") ' },
                                        inputStage: {
                                            stage: 'nlj',
                                            planNodeId: 2,
                                            nReturned: 1381406,
                                            executionTimeMillisEstimate: 1371,
                                            opens: 1,
                                            closes: 1,
                                            saveState: 1382,
                                            restoreState: 1382,
                                            isEOF: 1,
                                            totalDocsExamined: 1381406,
                                            totalKeysExamined: 1381406,
                                            collectionScans: 0,
                                            collectionSeeks: 1381406,
                                            indexScans: 0,
                                            indexSeeks: 1,
                                            indexesUsed: ['flightDate_-1'],
                                            innerOpens: 1381406,
                                            innerCloses: 1,
                                            outerProjects: [],
                                            outerCorrelated: [
                                                Long("8"),
                                                Long("4"),
                                                Long("5"),
                                                Long("6"),
                                                Long("7")
                                            ],
                                            outerStage: {
                                                stage: 'nlj',
                                                planNodeId: 1,
                                                nReturned: 1381406,
                                                executionTimeMillisEstimate: 1326,
                                                opens: 1,
                                                closes: 1,
                                                saveState: 1382,
                                                restoreState: 1382,
                                                isEOF: 1,
                                                totalDocsExamined: 0,
                                                totalKeysExamined: 1381406,
                                                collectionScans: 0,
                                                collectionSeeks: 0,
                                                indexScans: 0,
                                                indexSeeks: 1,
                                                indexesUsed: ['flightDate_-1'],
                                                innerOpens: 1,
                                                innerCloses: 1,
                                                outerProjects: [Long("5"), Long("7")],
                                                outerCorrelated: [Long("9"), Long("10")],
                                                outerStage: {
                                                    stage: 'project',
                                                    planNodeId: 1,
                                                    nReturned: 1,
                                                    executionTimeMillisEstimate: 0,
                                                    opens: 1,
                                                    closes: 1,
                                                    saveState: 1382,
                                                    restoreState: 1382,
                                                    isEOF: 1,
                                                    projections: {
                                                        '5': '"flightDate_-1" ',
                                                        '7': '{"flightDate" : -1} ',
                                                        '9': 'KS(877FFFFE7FC0E193FF0104) ',
                                                        '10': 'KS(877FFFFE7FC607EFFFFE04) '
                                                    },
                                                    inputStage: {
                                                        stage: 'limit',
                                                        planNodeId: 1,
                                                        nReturned: 1,
                                                        executionTimeMillisEstimate: 0,
                                                        opens: 1,
                                                        closes: 1,
                                                        saveState: 1382,
                                                        restoreState: 1382,
                                                        isEOF: 1,
                                                        limit: 1,
                                                        inputStage: {
                                                            stage: 'coscan',
                                                            planNodeId: 1,
                                                            nReturned: 1,
                                                            executionTimeMillisEstimate: 0,
                                                            opens: 1,
                                                            closes: 1,
                                                            saveState: 1382,
                                                            restoreState: 1382,
                                                            isEOF: 0
                                                        }
                                                    }
                                                },
                                                innerStage: {
                                                    stage: 'project',
                                                    planNodeId: 1,
                                                    nReturned: 1381406,
                                                    executionTimeMillisEstimate: 1326,
                                                    opens: 1,
                                                    closes: 1,
                                                    saveState: 1382,
                                                    restoreState: 1382,
                                                    isEOF: 1,
                                                    projections: { '4': 's11 ' },
                                                    inputStage: {
                                                        stage: 'ixseek',
                                                        planNodeId: 1,
                                                        nReturned: 1381406,
                                                        executionTimeMillisEstimate: 1322,
                                                        opens: 1,
                                                        closes: 1,
                                                        saveState: 1382,
                                                        restoreState: 1382,
                                                        isEOF: 1,
                                                        indexName: 'flightDate_-1',
                                                        keysExamined: 1381406,
                                                        seeks: 1,
                                                        numReads: 1381407,
                                                        recordSlot: 6,
                                                        recordIdSlot: 8,
                                                        snapshotIdSlot: 11,
                                                        seekKeySlotLow: 9,
                                                        seekKeySlotHigh: 10,
                                                        outputSlots: [],
                                                        indexKeysToInclude: '00000000000000000000000000000000'
                                                    }
                                                }
                                            },
                                            innerStage: {
                                                stage: 'limit',
                                                planNodeId: 2,
                                                nReturned: 1381406,
                                                executionTimeMillisEstimate: 44,
                                                opens: 1381406,
                                                closes: 1,
                                                saveState: 1382,
                                                restoreState: 1382,
                                                isEOF: 1,
                                                limit: 1,
                                                inputStage: {
                                                    stage: 'seek',
                                                    planNodeId: 2,
                                                    nReturned: 1381406,
                                                    executionTimeMillisEstimate: 44,
                                                    opens: 1381406,
                                                    closes: 1,
                                                    saveState: 1382,
                                                    restoreState: 1382,
                                                    isEOF: 0,
                                                    numReads: 1381406,
                                                    recordSlot: 12,
                                                    recordIdSlot: 13,
                                                    seekKeySlot: 8,
                                                    snapshotIdSlot: 4,
                                                    indexIdSlot: 5,
                                                    indexKeySlot: 6,
                                                    indexKeyPatternSlot: 7,
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
                }
            },
            nReturned: Long("16"),
            executionTimeMillisEstimate: Long("1387")
        },
        {
            '$sort': { sortKey: { total: -1 }, limit: Long("1") },
            totalDataSizeSortedBytesEstimate: Long("0"),
            usedDisk: false,
            spills: Long("0"),
            nReturned: Long("1"),
            executionTimeMillisEstimate: Long("1387")
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
