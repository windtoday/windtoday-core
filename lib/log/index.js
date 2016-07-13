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
  },
  totalwind: {
    keyword: 'sail_extract'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
