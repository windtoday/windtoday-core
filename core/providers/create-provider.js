'use strict'

const schema = require('../schema')
const { bind } = require('lodash')
const db = require('../db')

function createProvider (provider) {
  const ctx = {
    validate: schema,
    stats: { add: 0, total: 0 },
    db: db
  }

  const _start = bind(provider.start, ctx)

  function start (cb) {
    _start(function (err) {
      return cb.apply(cb, [err, ctx.stats])
    })
  }

  return start
}

module.exports = createProvider
