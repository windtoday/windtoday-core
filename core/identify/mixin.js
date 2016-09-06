'use strict'

const { isEmpty } = require('lodash')
const board = require('./board')
const sail = require('./sail')

function mixin (str) {
  if (/aleta/.test(str)) return

  var boardExtracted = board(str)
  if (boardExtracted.model) return boardExtracted

  var sailExtracted = sail(str)
  if (sail.model) return sailExtracted
  if (sailExtracted.brand) return sailExtracted

  return boardExtracted
}

module.exports = mixin
