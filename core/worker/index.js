'use strict'

const checkRequiredParams = require('../util/check-required-params')
const createLoggerKeyword = require('./create-logger-keyword')
const createProcessExit = require('./create-process-exit')
const providers = require('../providers')
const createLogger = require('../log')
const { waterfall } = require('async')
const { partial } = require('lodash')
const CONST = require('./constants')
const isUp = require('./is-up')

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
    function insert (next) {
      log.info('hosts reachability ✔ (1/2)')
      return worker(next)
    }
  ]

  waterfall(tasks, function (err, stats) {
    if (err) log.error(err)
    else log.info('finished', stats, '✔ (2/2)')
    return processExit(err)
  })
}

module.exports = createWorker
