'use strict'

var schema = require('../schema')
var lodash = require('lodash')
var log = require('../log')
var db = require('../db')

function createProvider (blueprint) {
  var context = {
    log: log(blueprint.name),
    validate: schema,
    stats: {
      valid: 0,
      add: 0,
      total: 0
    },
    db: db
  }

  var _start = lodash.bind(blueprint.start, context)

  function provider (cb) {
    _start(function () {
      context.log.info('stats', context.stats)
      return cb.apply(cb, arguments)
    })
  }

  return lodash.assign(provider, lodash.omit(blueprint, ['start']))
}

module.exports = createProvider
