'use strict'

const checkRequiredParams = require('../util/check-required-params')
const createLoggerKeyword = require('./logger-keyword')
const createProcessExit = require('./process-exit')
const createFilters = require('./filters')
const providers = require('../providers')
const createLogger = require('../log')
const { waterfall } = require('async')
const { partial } = require('lodash')
const CONST = require('./constants')
const isUp = require('./is-up')
const db = require('../db')

function createWorker (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { provider } = opts
  const hosts = CONST.CHECK_HOSTS[provider]
  const log = opts.log = createLogger({
    keyword: createLoggerKeyword(opts),
    diff: true
  })
  const processExit = createProcessExit(log)
  const worker = providers[provider](opts)

  const tasks = [
    partial(isUp, hosts),
    function clean (next) {
      log.info('hosts reachability ✔ (1/3)')
      const filters = createFilters(opts)
      return db.deleteByQuery('', {filters}, next)
    },
    function insert (next) {
      log.info('cleaned old instances ✔ (2/3)')
      return worker(next)
    }
  ]

  waterfall(tasks, function (err, stats) {
    if (err) return processExit(err)
    log.info('inserted new instances', stats, '✔ (3/3)')
    return processExit()
  })
}

module.exports = createWorker
