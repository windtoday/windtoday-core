'use strict'

const { waterfall } = require('async')

const createProcessExit = require('../../core/util/create-process-exit')
const createScoreWorker = require('../../core/worker/score')
const createShareWorker = require('../../core/worker/share')
const createLogger = require('../../core/log')
const search = require('../../core/db/search')

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

const tasks = [
  next => search.fetchAll(next),
  (data, next) => _createScoreWorker(data)(next),
  (data, next) => _createShareWorker(data)(next)
]

log.info('starting')
waterfall(tasks, processExit)
