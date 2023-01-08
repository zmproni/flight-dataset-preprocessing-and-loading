results = {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'expedia.tickets',
    indexFilterSet: false,
    parsedQuery: { legId: { '$eq': 'c38a6e4b807d15541e5866676febcbec' } },
    queryHash: '172A34AE',
    planCacheKey: '172A34AE',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    winningPlan: {
      stage: 'UPDATE',
      inputStage: {
        stage: 'COLLSCAN',
        filter: { legId: { '$eq': 'c38a6e4b807d15541e5866676febcbec' } },
        direction: 'forward'
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 0,
    executionTimeMillis: 1,
    totalKeysExamined: 0,
    totalDocsExamined: 1678,
    executionStages: {
      stage: 'UPDATE',
      nReturned: 0,
      executionTimeMillisEstimate: 0,
      works: 1680,
      advanced: 0,
      needTime: 1679,
      needYield: 0,
      saveState: 1,
      restoreState: 1,
      isEOF: 1,
      nMatched: 1,
      nWouldModify: 1,
      nWouldUpsert: 0,
      inputStage: {
        stage: 'COLLSCAN',
        filter: { legId: { '$eq': 'c38a6e4b807d15541e5866676febcbec' } },
        nReturned: 1,
        executionTimeMillisEstimate: 0,
        works: 1679,
        advanced: 1,
        needTime: 1678,
        needYield: 0,
        saveState: 2,
        restoreState: 2,
        isEOF: 0,
        direction: 'forward',
        docsExamined: 1678
      }
    }
  },
  command: {
    update: 'tickets',
    updates: [
      {
        q: { legId: 'c38a6e4b807d15541e5866676febcbec' },
        u: { '$set': { equipmentDescription: 'Airbus A320-200' } }
      }
    ],
    ordered: true,
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
