'use strict'

/**
 * Logging façade
 */

const Acho = require('acho')
const isProduction = process.env.NODE_ENV === 'production'

const loggers = {
  sync_providers: {
    keyword: 'sync',
    diff: true
  },
  totalwind: {
    keyword: 'totalwind',
    level: isProduction ? 'info' : 'all'
  },
  sail_unidentify: {
    keyword: 'sail_unidentify'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
