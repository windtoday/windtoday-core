'use strict'

const boardFactory = require('./board/factory')
const sailFactory = require('./sail/factory')
const createLog = require('../log')

const sail = sailFactory(createLog('mixin_sail_unidentify'))
const board = boardFactory(createLog('mixin_board_unidentify'))

const REGEX_EXCLUDE = /fin|aleta|m[aá]st/

function mixin (str) {
  if (REGEX_EXCLUDE.test(str)) return

  var boardExtracted = board(str)
  if (boardExtracted.model) return boardExtracted

  var sailExtracted = sail(str)
  if (sail.model) return sailExtracted
  if (sailExtracted.brand) return sailExtracted

  return boardExtracted
}

module.exports = mixin
