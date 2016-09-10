'use strict'

const boardFactory = require('./board')
const sailFactory = require('./sail')

const REGEX_EXCLUDE = /fin|aleta|m[aá]st/

function factory (opts) {
  const sail = sailFactory(opts.sailLogger)
  const board = boardFactory(opts.boardLogger)

  function mixin (str) {
    if (REGEX_EXCLUDE.test(str)) return

    var boardExtracted = board(str)
    if (boardExtracted.model) return boardExtracted

    var sailExtracted = sail(str)
    if (sail.model) return sailExtracted
    if (sailExtracted.brand) return sailExtracted

    return boardExtracted
  }

  return mixin
}

module.exports = factory
