'use strict'

const CONFIG = require('config').algoliasearch
const algoliasearch = require('algoliasearch')
const {forEach, assign, get} = require('lodash')

const appId = get(global, CONFIG.app_id)
const apiKey = get(global, CONFIG.api_key)

const client = algoliasearch(appId, apiKey)
const index = client.initIndex(CONFIG.index)

function fetchAll (cb) {
  const hits = []

  return index
    .browseAll()
    .on('result', content => forEach(content.hits, hit => hits.push(hit)))
    .on('end', () => cb(null, hits))
    .on('error', err => cb(err, hits))
}

module.exports = assign(index, {fetchAll})
