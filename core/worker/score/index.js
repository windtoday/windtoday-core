'use strict'

const { map, size } = require('lodash')
const { waterfall } = require('async')

const createGetPriceScore = require('../../score/price')
const search = require('../../db/search')

function createProviderWorker ({ log, propName, data }) {
  const count = size(data)
  const getPriceScore = createGetPriceScore({log, propName, data})

  const tasks = [
    function updateDate (next) {
      log.info('update', { count })
      const batch = map(data, function (item) {
        const { objectID } = item
        const {score, scoreDetail} = getPriceScore(item)
        const propNameScore = `${propName}Score`

        const updatedItem = {
          objectID,
          [propNameScore]: score,
          [`${propNameScore}Detail`]: scoreDetail
        }

        log.debug('score', updatedItem)
        return updatedItem
      })

      return search.partialUpdateObjects(batch, next)
    }
  ]

  const execWorker = cb => waterfall(tasks, cb)

  execWorker.log = log

  return execWorker
}

module.exports = createProviderWorker
