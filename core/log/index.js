'use strict'

/**
 * Logging façade
 */

var Acho = require('acho')
var emailBuffer = require('./email-buffer')
var isProduction = process.env.NODE_ENV === 'production'

var loggers = {
  sync_providers: {
    keyword: 'sync',
    diff: true
  },
  totalwind: {
    keyword: 'totalwind'
  },
  sail_extractor: {
    keyword: 'sail_extractor',
    transport: isProduction ? emailBuffer('[sail_extractor] unmatched cases') : console.log
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
