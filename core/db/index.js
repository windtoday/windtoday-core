'use strict'

var algoliasearch = require('algoliasearch')
var CONFIG = require('config').algoliasearch
var lodash = require('lodash')
var async = require('async')

var appId = process.env[CONFIG.app_id]
var apiKey = process.env[CONFIG.api_key]
var allIndex = CONFIG.index
var client = algoliasearch(appId, apiKey)

var index = lodash.reduce(allIndex, function (acc, indexName) {
  acc[indexName] = client.initIndex(indexName)
  return acc
}, {})

index.clearAll = function clearAll (cb) {
  async.each(allIndex, function (indexName, next) {
    return index[indexName].clearIndex(next)
  }, cb)
}

index.insertAll = function insertAll (providers, cb) {
  async.each(providers, function (provider, next) {
    return provider(next)
  }, cb)
}

module.exports = index
