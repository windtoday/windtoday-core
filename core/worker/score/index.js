'use strict'

const { map, size } = require('lodash')

const createGetPriceScore = require('../../score/price')
const search = require('../../db/search')

function createProviderWorker ({ log, propName, data }) {
  const count = size(data)
  const getPriceScore = createGetPriceScore({ log, propName, data })

  const execWorker = cb => {
    log.info('update', { count })
    const batch = map(data, item => {
      const { objectID } = item
      const { score, scoreDetail } = getPriceScore(item)
      const propNameScore = `${propName}Score`

      const updatedItem = {
        objectID,
        [propNameScore]: score,
        [`${propNameScore}Detail`]: scoreDetail
      }

      log.debug('score', { title: item.title }, updatedItem)
      return updatedItem
    })

    return search.partialUpdateObjects(batch, (err, info) => cb(err, batch))
  }

  execWorker.log = log

  return execWorker
}

module.exports = createProviderWorker
