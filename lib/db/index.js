'use strict'

var lodash = require('lodash')
var CONFIG = require('config')
var appId = CONFIG.algoliasearch.app_id
var apiKey = CONFIG.algoliasearch.api_key
var index = CONFIG.algoliasearch.index
var algoliasearch = require('algoliasearch')

var client = algoliasearch(appId, apiKey)

index = lodash.reduce(index, function (acc, indexName) {
  acc[indexName] = client.initIndex(indexName)
  return acc
}, {})

module.exports = index
