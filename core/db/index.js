'use strict'

const algoliasearch = require('algoliasearch')
const CONFIG = require('config').algoliasearch
const { reduce } = require('lodash')
const { each } = require('async')

const appId = process.env[CONFIG.app_id]
const apiKey = process.env[CONFIG.api_key]
const allIndex = CONFIG.index
const client = algoliasearch(appId, apiKey)

const index = reduce(allIndex, function (acc, indexName) {
  acc[indexName] = client.initIndex(indexName)
  return acc
}, {})

index.clearAll = function clearAll (cb) {
  each(allIndex, function (indexName, next) {
    return index[indexName].clearIndex(next)
  }, cb)
}

index.insertAll = function insertAll (providers, cb) {
  each(providers, function (provider, next) {
    return provider(next)
  }, cb)
}

module.exports = index
