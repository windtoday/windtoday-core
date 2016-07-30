'use strict'

/**
 * Logging façade
 */

var Acho = require('acho')
var emailTransport = require('./email')

var loggers = {
  sync_providers: {
    keyword: 'sync',
    diff: true
  },
  totalwind: {
    keyword: 'totalwind'
  },
  sail_extractor: {
    keyword: 'sail_extractor'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
