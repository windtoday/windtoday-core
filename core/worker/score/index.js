'use strict'

const {waterfall} = require('async')
const {map, size} = require('lodash')

const createGetScore = require('../../score/create-get-score')
const aggregateProp = require('../../score/aggregate-prop')
const search = require('../../db/search')

function createProviderWorker (opts) {
  const {log, test, getKey, propName} = opts

  const tasks = [
    function fetchData (next) {
      return search.fetchAll(next)
    },
    function createAggregate (data, next) {
      log.info('fetch', {count: size(data)})
      const aggregate = aggregateProp({data, test, getKey, propName})
      return next(null, aggregate, data)
    },
    function createScore (aggregate, data, next) {
      log.info('aggregate %J', aggregate)
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

  function execWorker (cb) {
    waterfall(tasks, function (err) {
      if (!err) log.info('finished')
      return cb(err)
    })
  }

  execWorker.log = log

  return execWorker
}

module.exports = createProviderWorker
