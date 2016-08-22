'use strict'

/**
 * Main method used for hydrate database requiring all the providers
 */

var log = require('../core/log')('sync_providers')
var isAllReachable = require('is-all-reachable')
var providers = require('../core/providers')
var HOSTS = require('config').check_hosts
var format = require('util').format
var async = require('async')
var db = require('../core/db')

async.waterfall([
  function checkReachability (next) {
    isAllReachable(HOSTS, function (err, isAllAvailable, unReachableHost) {
      if (err) return (err)
      if (!isAllAvailable) return next(format('unreachable host %s', unReachableHost))
      return next()
    })
  },
  function cleanAll (next) {
    log.debug('reachability')
    return db.clearAll(next)
  },
  function insertAll (next) {
    log.debug('clean')
    return db.insertAll(providers, next)
  }
], function (err) {
  if (!err) return log.debug('insert')
  log.error({reasong: err.message || err})
  process.exit(err ? err.code || 1 : 0)
})
