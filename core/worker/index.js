'use strict'

const checkRequiredParams = require('../util/check-required-params')
const getExtractor = require('./get-extractor')
const providers = require('../providers')
const createLogger = require('../log')
const { waterfall } = require('async')
const { partial } = require('lodash')
const isUp = require('../util/is-up')
const db = require('../db')

const CONST = {
  CHECK_HOSTS: require('config').check_hosts,
  REQUIRED_PARAMS: [ 'provider', 'type', 'category' ]
}

function createWorker (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { provider, type, category } = opts
  const hosts = CONST.CHECK_HOSTS[provider]
  const loggerKeyword = `${provider}_${type}_${category}`
  const log = createLogger(loggerKeyword)
  const worker = providers[provider]({extractor: getExtractor(opts), category, type})

  waterfall([
    // partial(isUp, hosts),
    // function clean (next) {
    //   log.info('checked hosts reachability ✔ (1/3)')
    //   const filters = `provider:${provider} AND type:${type} AND category:${category}`
    //   return db.deleteByQuery('', {filters}, next)
    // },
    function insert (next) {
      log.info('cleaned old instances ✔ (2/3)')
      return worker(next)
    }
  ], function (err) {
    if (!err) return log.info('inserted new instances ✔ (3/3)')
    log.error({reason: err.message || err})
    process.exit(err ? err.code || 1 : 0)
  })
}

module.exports = createWorker
