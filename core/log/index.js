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
  },
  board_unidentify: {
    keyword: 'board_unidentify'
  },
  mixin_sail_unidentify: {
    keyword: 'mixin_sail_unidentify'
  },
  mixin_board_unidentify: {
    keyword: 'mixin_board_unidentify'
  }
}

function log (namespace) {
  return Acho(loggers[namespace])
}

module.exports = log
