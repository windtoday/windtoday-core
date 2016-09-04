'use strict'

const algoliasearch = require('algoliasearch')
const CONFIG = require('config').algoliasearch
const { each } = require('async')

const appId = process.env[CONFIG.app_id]
const apiKey = process.env[CONFIG.api_key]
const client = algoliasearch(appId, apiKey)
const index = client.initIndex(CONFIG.index)

index.insertAll = function insertAll (providers, cb) {
  each(providers, function (provider, next) {
    return provider(next)
  }, cb)
}

module.exports = index
