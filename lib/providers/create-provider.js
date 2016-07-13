'use strict'

var schema = require('../schema')
var log = require('../log')
var lodash = require('lodash')
var ora = require('ora')

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

    blueprint.start = function start (cb) {
      var spinner = ora(blueprint.name).start()
      _start(function () {
        spinner.stop()
        context.log.info('%s/%s', context.stats.valid, context.stats.total)
        return cb.apply(cb, arguments)
      })
    }

    return blueprint
  }
  return createProvider
}

module.exports = CreateProvider
