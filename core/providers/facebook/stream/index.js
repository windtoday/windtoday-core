'use strict'

const CONFIG = require('config').facebook
const { map } = require('lodash')
const graph = require('fbgraph')
const from = require('from2').obj
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

function createStream () {
  return from(function (size, next) {
    var _this = this
    fetch((err, items) => {
      if (err) return next(err)
      items.forEach((item) => this.push(item))
      return next(null, null)
    })
  })
}

module.exports = createStream
