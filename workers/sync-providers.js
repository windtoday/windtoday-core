'use strict'

/**
 * Main method used for hydrate database requiring all the providers
 */

const log = require('../core/log')('sync_providers')
const providers = require('../core/providers')
const isUp = require('../core/util/is-up')
const { waterfall } = require('async')
const db = require('../core/db')

waterfall([
  isUp,
  function cleanAll (next) {
    log.debug('reachability')
    return db.clearIndex(next)
  },
  function insertAll (next) {
    log.debug('clean')
    console.log(db)
    return db.insertAll(providers, next)
  }
], function (err) {
  if (!err) return log.debug('insert')
  log.error({reason: err.message || err})
  process.exit(err ? err.code || 1 : 0)
})
