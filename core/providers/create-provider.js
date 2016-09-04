'use strict'

const { bind, omit, assign } = require('lodash')
const schema = require('../schema')
const log = require('../log')
const db = require('../db')

function createProvider (blueprint) {
  const context = {
    log: log(blueprint.name),
    validate: schema,
    stats: {
      add: 0,
      total: 0
    },
    db: db
  }

  const _start = bind(blueprint.start, context)

  function provider (cb) {
    _start(function () {
      context.log.info('stats', context.stats)
      return cb.apply(cb, arguments)
    })
  }

  return assign(provider, omit(blueprint, ['start']))
}

module.exports = createProvider
