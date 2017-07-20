'use strict'

const { map, size } = require('lodash')
const { waterfall } = require('async')

const createGetPriceScore = require('../../score/price')
const search = require('../../db/search')

function createProviderWorker ({ log, propName, data }) {
  const count = size(data)
  const getPriceScore = createGetPriceScore({log, propName, data})

  const tasks = [
    function updateDate (getScore, next) {
      log.info('update', { count })
      const batch = map(data, function (item) {
        const { objectID } = item
        const score = getPriceScore(item)
        const propNameScore = `${propName}Score`
        return { [propNameScore]: score, objectID }
      })

      return search.partialUpdateObjects(batch, next)
    }
  ]

  const execWorker = cb => waterfall(tasks, cb)

  execWorker.log = log

  return execWorker
}

module.exports = createProviderWorker
