'use strict'

const checkRequiredParams = require('../util/check-required-params')
const createProcessExit = require('../util/process-exit')
const providers = require('../providers')
const createLogger = require('../log')
const { waterfall } = require('async')
const { partial } = require('lodash')
const isUp = require('../util/is-up')
const db = require('../db')

const CONST = {
  CHECK_HOSTS: require('config').check_hosts,
  REQUIRED_PARAMS: [ 'provider', 'type' ]
}

function createLoggerKeyword (opts) {
  const { provider, type, category } = opts
  let keyword = `${provider}_${type}`
  if (category) keyword += `_${category}`
  return keyword
}

function createFilter (opts) {
  const { provider, type, category } = opts
  let filter = `provider:${provider} AND type:${type}`
  if (category) filter += ` AND category:${category}`
  return filter
}

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
      const filters = createFilter(opts)
      return db.deleteByQuery('', {filters}, next)
    },
    function insert (next) {
      log.info('cleaned old instances ✔ (2/3)')
      return worker(next)
    }
  ]

  waterfall(tasks, function (err, stats) {
    if (err) return processExit(err)
    log.debug('stats', stats)
    log.info('inserted new instances ✔ (3/3)')
    return processExit()
  })
}

module.exports = createWorker
