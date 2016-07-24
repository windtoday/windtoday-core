'use strict'

/**
 * Main method used for hydrate database requiring all the providers
 */

var log = require('../log')('sync_providers')
var algoliasearch = require('algoliasearch')
var timeSpan = require('time-span')()
var prettyMs = require('pretty-ms')
var CONFIG = require('config')
var lodash = require('lodash')
var async = require('async')

var client = algoliasearch(CONFIG.algoliasearch.app_id, CONFIG.algoliasearch.api_key)
var index = client.initIndex(CONFIG.algoliasearch.index_name)

var add = lodash.bind(index.addObject, index)
var providers = require('../providers')(add)

async.waterfall([
  function clean (next) {
    log.debug('clean')
    index.clearIndex(function (err, content) {
      return next(err)
    })
  },
  function insert (next) {
    log.debug('insert')
    return async.parallel(providers, next)
  }
], function (err) {
  if (err) throw err
  log.info(prettyMs(timeSpan()))
})
