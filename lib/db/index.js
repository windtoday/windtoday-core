'use strict'

var algoliasearch = require('algoliasearch')
var lodash = require('lodash')
var CONFIG = require('config')
var async = require('async')

var appId = CONFIG.algoliasearch.app_id
var apiKey = CONFIG.algoliasearch.api_key
var allIndex = CONFIG.algoliasearch.index
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
