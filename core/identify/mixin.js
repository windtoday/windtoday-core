'use strict'

const board = require('./board')
const sail = require('./sail')

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
