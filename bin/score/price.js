'use strict'

const {size} = require('lodash')

const createProcessExit = require('../../core/util/create-process-exit')
const createScoreWorker = require('../../core/worker/score')
const createLogger = require('../../core/log')

const test = item => item.price && size(item.category) === 1 && item.year
const getKey = item => `${item.year}.${item.condition}.${item.category}`
const propName = 'price'

const log = createLogger({
  keyword: 'score:price',
  diff: true
})

const scoreWorker = createScoreWorker({log, test, getKey, propName})
const processExit = createProcessExit(log)

scoreWorker(processExit)
