'use strict'

var algoliasearch = require('algoliasearch')
var lodash = require('lodash')
var CONFIG = require('config')
var async = require('async')

var appId = CONFIG.algoliasearch.app_id
var apiKey = CONFIG.algoliasearch.api_key
var index = CONFIG.algoliasearch.index

var client = algoliasearch(appId, apiKey)

index = lodash.reduce(index, function (acc, indexName) {
  acc[indexName] = client.initIndex(indexName)
  return acc
}, {})

function clearAll (cb) {
  async.each(index, function (index, next) {
    index.clearIndex(function (err, content) {
      return next(err)
    })
  })
}

function insertAll (providers, cb) {
  async.each(providers, function (provider, next) {
    provider(function (err, items) {
      if (err) return next(err, items)
      async.each(items, function (item, done) {
        if (index[item.type]) return index[item.type].addObject(item, next)
        return done()
      })
    })
  }, cb)
}

module.exports = index
module.exports.clearAll = clearAll
module.exports.insertAll = insertAll
