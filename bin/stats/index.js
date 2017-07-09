'use strict'

const {size} = require('lodash')

const createProcessExit = require('../../core/util/create-process-exit')
const createStatsWorker = require('../../core/worker/stats')
const createLogger = require('../../core/log')

const test = item => item.price && size(item.category) === 1 && item.year
const getKey = item => `${item.year}.${item.condition}.${item.category}`
const propName = 'price'

const log = createLogger({
  keyword: 'stats',
  diff: true
})

const statsWorker = createStatsWorker({log, test, getKey, propName})

// TODO: Determinate arguments for score worker
// TODO: Pass to stats worker following a data interface
const processExit = createProcessExit(log)

statsWorker(processExit)
