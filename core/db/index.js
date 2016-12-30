'use strict'

const algoliasearch = require('algoliasearch')
const CONFIG = require('config').algoliasearch
const appId = process.env[CONFIG.app_id]
const apiKey = process.env[CONFIG.api_key]
const client = algoliasearch(appId, apiKey)
const index = client.initIndex(CONFIG.index)

module.exports = index
