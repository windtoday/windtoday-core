'use strict'

const { waterfall } = require('async')
const { defaults } = require('lodash')

const checkHostsAvailability = require('../util/check-hosts-availability')
const checkRequiredParams = require('../util/check-required-params')
const createLoggerKeyword = require('./create-logger-keyword')
const createWorkerFromProvider = require('../provider')
const createLogger = require('../log')
const CONST = require('./constants')
const DEFAULT = require('./defaults')

function createWorker (opts) {
  opts = defaults(opts, DEFAULT)
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)

  const { provider, checkHosts } = opts

  const log = opts.log = createLogger({
    keyword: createLoggerKeyword(opts),
    diff: true
  })

  const worker = createWorkerFromProvider[provider](opts)

  const tasks = [
    function ping (next) {
      if (!checkHosts) return next()
      const hosts = CONST.CHECK_HOSTS[provider]
      log.info('hosts reachability')
      return checkHostsAvailability(hosts, next)
    },
    function insert (next) {
      return worker(next)
    }
  ]

  function execWorker (cb) {
    waterfall(tasks, function (err, stats) {
      if (!err) {
        log.info('finished', stats)
        return cb(err)
      }
    })
  }

  execWorker.log = log

  return execWorker
}

module.exports = createWorker
