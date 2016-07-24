'use strict'

var schema = require('../schema')
var log = require('../log')
var lodash = require('lodash')

function CreateProvider (add) {
  function createProvider (blueprint) {
    var context = {
      log: log(blueprint.name),
      validate: schema,
      stats: {
        valid: 0,
        total: 0
      },
      add: add
    }

    var _start = lodash.bind(blueprint.start, context)

    function provider (cb) {
      _start(function () {
        context.log.info('stats valid=%s total=%s', context.stats.valid, context.stats.total)
        return cb.apply(cb, arguments)
      })
    }

    return lodash.assign(provider, lodash.omit(blueprint, ['start']))
  }
  return createProvider
}

module.exports = CreateProvider
