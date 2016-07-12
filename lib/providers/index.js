'use strict'

function providers (add) {
  var createProvider = require('./create-provider')(add)
  return [
    createProvider(require('./totalwind'))
  ]
}

module.exports = providers
