'use strict'

const request = require('./request')
const from = require('from2').obj
const parse = require('./parse')

function fetch (cb) {
  request(function (err, res, data) {
    if (err) return cb(err)
    return cb(null, parse(data))
  })
}

function createStream () {
  return from(function (size, next) {
    fetch((err, items) => {
      if (err) return next(err)
      items.forEach(this.push.bind(this))
      return next(null, null)
    })
  })
}

module.exports = createStream
