'use strict'

const { waterfall } = require('async')

const createProcessExit = require('../../core/util/create-process-exit')
const createScoreWorker = require('../../core/worker/score')
const createShareWorker = require('../../core/worker/share')
const createStatsWorker = require('../../core/worker/stats')
const createLog = require('../../core/log')
const search = require('../../core/db/search')

const log = createLog({ keyword: 'insights', diff: true })
const processExit = createProcessExit(log)

const _createScoreWorker = data => {
  const log = createLog({ keyword: 'insights:price', diff: true })
  const propName = 'price'
  return createScoreWorker({ log, propName, data })
}

const _createShareWorker = data => {
  const log = createLog({ keyword: 'insights:share', diff: true })
  return createShareWorker({ log, data })
}

const _createStatsWorker = data => {
  const log = createLog({ keyword: 'insights:stats', diff: true })
  return createStatsWorker({ log, data })
}

const tasks = [
  next => search.fetchAll(next),
  (data, next) => _createScoreWorker(data)(next),
  (data, next) => _createShareWorker(data)(err => (next(err, data))),
  (data, next) => _createStatsWorker(data)(next)
]

log.info('starting')
waterfall(tasks, processExit)
