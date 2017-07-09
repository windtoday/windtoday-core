'use strict'

const {map, size} = require('lodash')
const {waterfall} = require('async')

const createGetScore = require('../../score/create-get-score')
const aggregateProp = require('../../score/aggregate-prop')
const search = require('../../db/search')

function createProviderWorker (opts) {
  const {log, test, getKey, propName, data} = opts
  const count = size(data)

  const tasks = [
    function createAggregate (next) {
      log.info('fetch', {count})
      const aggregate = aggregateProp({data, test, getKey, propName})
      return next(null, aggregate)
    },
    function createScore (aggregate, next) {
      log.info('aggregate %J', aggregate)
      const getScore = createGetScore({aggregate, test, getKey, propName})
      return next(null, getScore)
    },
    function updateDate (getScore, next) {
      log.info('update', {count})
      const batch = map(data, function (item) {
        const {objectID} = item
        const score = getScore(item)
        const scoreKey = `${propName}Score`
        return { [scoreKey]: score, objectID }
      })

      return search.partialUpdateObjects(batch, next)
    }
  ]

  const execWorker = cb => waterfall(tasks, cb)

  execWorker.log = log

  return execWorker
}

module.exports = createProviderWorker
