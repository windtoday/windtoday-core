'use strict'

const checkRequiredParams = require('../util/check-required-params')
const providers = require('../providers')
const createLogger = require('../log')
const { waterfall } = require('async')
const { noop, partial } = require('lodash')
const isUp = require('../util/is-up')
const db = require('../db')

const CONST = {
  CHECK_HOSTS: require('config').check_hosts,
  REQUIRED_PARAMS: [
    'provider',
    'type',
    'category'
  ]
}

function createWorker (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { provider, type, category } = opts

  const hosts = CONST.CHECK_HOSTS[provider]
  const log = createLogger(provider)
  const worker = providers[provider](type, category)

  waterfall([
    partial(isUp, hosts),
    function clean (next) {
      log.info('reachability')
      const filters = `provider:${provider} AND type:${type} AND category:${category}`
      return db.deleteByQuery('', {filters}, next)
    },
    function insert (next) {
      log.info('clean')
      return worker(next)
    }
  ], function (err) {
    if (!err) return log.info('insert')
    log.error({reason: err.message || err})
    process.exit(err ? err.code || 1 : 0)
  })
}

module.exports = createWorker
