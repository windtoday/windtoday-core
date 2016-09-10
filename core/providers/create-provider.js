'use strict'

const { bind, assign } = require('lodash')
const schema = require('../schema')
const log = require('../log')
const db = require('../db')

function createProvider (provider) {
  const ctx = {
    log: log(provider.name),
    validate: schema,
    stats: { add: 0, total: 0 },
    db: db
  }

  const _start = bind(provider.start, ctx)

  function start (cb) {
    _start(function () {
      ctx.log.info('stats', ctx.stats)
      return cb.apply(cb, arguments)
    })
  }

  return start
}

module.exports = createProvider
