'use strict'

const boardFactory = require('../board')
const sailFactory = require('../sail')
const REGEX_BLACKLIST = RegExp(require('./words.json').join('|'), 'i')

function factory (opts) {
  const sail = sailFactory(opts.sailLogger)
  const board = boardFactory(opts.boardLogger)

  /**
   * Detect board/sail from not determinated input.
   */
  function mixin (str) {
    if (REGEX_BLACKLIST.test(str)) return

    var boardExtracted = board(str)
    if (boardExtracted.model) return boardExtracted

    var sailExtracted = sail(str)
    if (sailExtracted.model) return sailExtracted
    if (sailExtracted.brand) return sailExtracted

    return boardExtracted
  }

  return mixin
}

module.exports = factory
