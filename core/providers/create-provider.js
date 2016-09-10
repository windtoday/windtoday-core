'use strict'

const schema = require('../schema')
const { bind } = require('lodash')
const db = require('../db')

function createProvider (provider, log) {
  const ctx = {
    validate: schema,
    stats: { add: 0, total: 0 },
    db: db
  }

  const _start = bind(provider.start, ctx)

  function start (cb) {
    _start(function () {
      provider.log.debug('stats', ctx.stats)
      return cb.apply(cb, arguments)
    })
  }

  return start
}

module.exports = createProvider
