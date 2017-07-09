'use strict'

const {waterfall} = require('async')
const {map, size} = require('lodash')

const createGetScore = require('../../score/create-get-score')
const aggregateProp = require('../../score/aggregate-prop')
const search = require('../../db/search')

function createScoreWorker (opts) {
  const {log, test, getKey, propName} = opts

  function scoreWorker (data, cb) {
    const tasks = [
      function createAggregate (data, next) {
        log.info('score:fetch', {count: size(data)})
        const aggregate = aggregateProp({data, test, getKey, propName})
        return next(null, aggregate, data)
      },
      function createScore (aggregate, data, next) {
        log.info('score:aggregate %J', aggregate)
        const getScore = createGetScore({aggregate, test, getKey, propName})
        return next(null, getScore, data)
      },
      function updateDate (getScore, data, next) {
        const batch = map(data, function (item) {
          const {objectID} = item
          const score = getScore(item)
          const scoreKey = `${propName}Score`
          return { [scoreKey]: score, objectID }
        })

        return search.partialUpdateObjects(batch, next)
      }
    ]

    return waterfall(tasks, cb)
  }

  return scoreWorker
}

module.exports = createScoreWorker
