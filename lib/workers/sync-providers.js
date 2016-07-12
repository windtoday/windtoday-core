'use strict'

/**
 * Main method used for hydratate database requiring all the providers
 */

var log = require('../core/log')('sync_providers')
var algoliasearch = require('algoliasearch')
var timeSpan = require('time-span')()
var prettyMs = require('pretty-ms')
var CONFIG = require('config')
var async = require('async')

var client = algoliasearch(CONFIG.algoliasearch.app_id, CONFIG.algoliasearch.api_key)
var index = client.initIndex(CONFIG.db.index)
// var createProvider = require('../providers/create-provider')(index.addObject)

var providers = require('../providers')(require('lodash').noop)

providers[0].start(process.exit)

// async.waterfall([
//   function clean (next) {
//     log.debug('» clean')
//     index.clearIndex(function (err, content) {
//       return next(err)
//     })
//   },
//   function insert (next) {
//     log.debug('» insert')
//     return async.parallel(providers, next)
//   }
// ], function (err) {
//   if (err) throw err
//   log.success(prettyMs(timeSpan()))
// })
