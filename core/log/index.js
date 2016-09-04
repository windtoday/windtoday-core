'use strict'

/**
 * Logging façade
 */

var Acho = require('acho')
var isProduction = process.env.NODE_ENV === 'production'

var loggers = {
  sync_providers: {
    keyword: 'sync',
    diff: true
  },
  totalwind: {
    keyword: 'totalwind',
    level: isProduction ? 'info' : 'all'
  },
  sail_detector: {
    keyword: 'sail_detector'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
