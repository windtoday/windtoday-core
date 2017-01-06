'use strict'

const CONFIG = require('config').algoliasearch
const algoliasearch = require('algoliasearch')
const {get} = require('lodash')

const appId = get(global, CONFIG.app_id)
const apiKey = get(global, CONFIG.api_key)

const client = algoliasearch(appId, apiKey)
const index = client.initIndex(CONFIG.index)

module.exports = index
