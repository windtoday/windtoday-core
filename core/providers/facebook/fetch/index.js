'use strict'

const CONFIG = require('config').facebook
const { map } = require('lodash')
const graph = require('fbgraph')
const parse = require('./parse')

const requests = map(CONFIG.groups_ids, function (id) {
  return {
    method: 'GET',
    relative_url: `/${id}/feed?limit=${CONFIG.limit}`
  }
})

graph.setAccessToken(process.env[CONFIG.access_token])

function fetch (cb) {
  graph.batch(requests, function (err, res) {
    if (err) return cb(err)
    return cb(null, parse(res))
  })
}

module.exports = fetch
