results = {
    explainVersion: '1',
    queryPlanner: {
      namespace: 'expedia.tickets',
      indexFilterSet: false,
      parsedQuery: { legId: { '$eq': 'c38a6e4b807d15541e5866676febcbec' } },
      queryHash: '172A34AE',
      planCacheKey: '0BC0C420',
      maxIndexedOrSolutionsReached: false,
      maxIndexedAndSolutionsReached: false,
      maxScansToExplodeReached: false,
      winningPlan: {
        stage: 'UPDATE',
        inputStage: {
          stage: 'FETCH',
          inputStage: {
            stage: 'IXSCAN',
            keyPattern: { legId: -1 },
            indexName: 'legId_-1',
            isMultiKey: false,
            multiKeyPaths: { legId: [] },
            isUnique: false,
            isSparse: false,
            isPartial: false,
            indexVersion: 2,
            direction: 'forward',
            indexBounds: {
              legId: [
                '["c38a6e4b807d15541e5866676febcbec", "c38a6e4b807d15541e5866676febcbec"]'
              ]
            }
          }
        }
      },
      rejectedPlans: []
    },
    executionStats: {
      executionSuccess: true,
      nReturned: 0,
      executionTimeMillis: 2,
      totalKeysExamined: 1,
      totalDocsExamined: 1,
      executionStages: {
        stage: 'UPDATE',
        nReturned: 0,
        executionTimeMillisEstimate: 0,
        works: 2,
        advanced: 0,
        needTime: 1,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        nMatched: 1,
        nWouldModify: 1,
        nWouldUpsert: 0,
        inputStage: {
          stage: 'FETCH',
          nReturned: 1,
          executionTimeMillisEstimate: 0,
          works: 1,
          advanced: 1,
          needTime: 0,
          needYield: 0,
          saveState: 1,
          restoreState: 1,
          isEOF: 0,
          docsExamined: 1,
          alreadyHasObj: 0,
          inputStage: {
            stage: 'IXSCAN',
            nReturned: 1,
            executionTimeMillisEstimate: 0,
            works: 1,
            advanced: 1,
            needTime: 0,
            needYield: 0,
            saveState: 1,
            restoreState: 1,
            isEOF: 0,
            keyPattern: { legId: -1 },
            indexName: 'legId_-1',
            isMultiKey: false,
            multiKeyPaths: { legId: [] },
            isUnique: false,
            isSparse: false,
            isPartial: false,
            indexVersion: 2,
            direction: 'forward',
            indexBounds: {
              legId: [
                '["c38a6e4b807d15541e5866676febcbec", "c38a6e4b807d15541e5866676febcbec"]'
              ]
            },
            keysExamined: 1,
            seeks: 1,
            dupsTested: 0,
            dupsDropped: 0
          }
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
  