'use strict'

/**
 * Logging façade
 */

var Acho = require('acho')

var loggers = {
  sync_providers: {
    keyword: 'sync',
    diff: true
  },
  totalwind: {
    keyword: 'totalwind'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
