'use strict'

const {waterfall, parallel} = require('async')
const {size} = require('lodash')

const createProcessExit = require('../../core/util/create-process-exit')
const createScoreWorker = require('../../core/worker/score')
const createLogger = require('../../core/log')
const search = require('../../core/db/search')

const log = createLogger({keyword: 'insights', diff: true})
const processExit = createProcessExit(log)

const _createScoreWorker = data => {
  const test = item => item.price && size(item.category) === 1 && item.year
  const log = createLogger({keyword: 'insights:price', diff: true})
  const getKey = require('../../core/score/get-key')(log)
  const propName = 'priceScore'
  return createScoreWorker({log, test, getKey, propName, data})
}

const tasks = [
  function fetchData (next) {
    log.info('starting')
    return search.fetchAll(next)
  },
  function processData (data, next) {
    const scoreWorker = _createScoreWorker(data)
    return parallel([scoreWorker], next)
  }
]

waterfall(tasks, processExit)
