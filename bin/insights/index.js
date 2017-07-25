'use strict'

const { waterfall } = require('async')

const createProcessExit = require('../../core/util/create-process-exit')
const createScoreWorker = require('../../core/worker/score')
const createShareWorker = require('../../core/worker/share')
const createLogger = require('../../core/log')
const search = require('../../core/db/search')
const {assign, map, pick} = require('lodash')

const log = createLogger({ keyword: 'insights', diff: true })
const processExit = createProcessExit(log)

const _createScoreWorker = data => {
  const log = createLogger({ keyword: 'insights:price', diff: true })
  const propName = 'price'
  return createScoreWorker({ log, propName, data })
}

const _createShareWorker = data => {
  const log = createLogger({ keyword: 'insights:share', diff: true })
  return createShareWorker({ log, data })
}

const mergeScoreData = (data, scoredData) => map(data, (doc, index) =>
  assign({}, doc, pick(scoredData[index], ['priceScore', 'priceScoreDetail']))
)

const tasks = [
  function fetch (next) {
    return search.fetchAll(next)
  },
  function scoreWorker (data, next) {
    return _createScoreWorker(data)((err, scoredData) => next(err, scoredData, data))
  },
  function shareWorker (scoredData, data, next) {
    return _createShareWorker(mergeScoreData(data, scoredData))(next)
  }
]

log.info('starting')
waterfall(tasks, processExit)
