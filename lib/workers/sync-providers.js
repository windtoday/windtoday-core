'use strict'

/**
 * Main method used for hydrate database requiring all the providers
 */

var log = require('../log')('sync_providers')
var providers = require('../providers')
var timeSpan = require('time-span')()
var prettyMs = require('pretty-ms')
var async = require('async')
var db = require('../db')

async.waterfall([
  function cleanAll (next) {
    log.debug('clean')
    return db.clearAll(next)
  },
  function insertAll (next) {
    log.debug('insert')
    return db.insertAll(providers, next)
  }
], function (err) {
  if (err) throw err
  log.info(prettyMs(timeSpan()))
})
