'use strict'

const boardFactory = require('../board')
const sailFactory = require('../sail')
const category = require('../../category')

function factory (opts) {
  const sailExtracted = sailFactory(opts.sailLogger)
  const boardExtracted = boardFactory(opts.boardLogger)

  /**
   * Detect category and data associated from not determinated input.
   */
  function mixin (str) {
    const sail = sailExtracted(str)
    if (sail.model) return sail

    const board = boardExtracted(str)
    if (board.model) return board

    if (sail.brand) {
      return {
        brand: sail.brand,
        category: category.others
      }
    }

    if (board.brand) {
      return {
        brand: board.brand,
        category: category.others
      }
    }

    // TODO: implement mast, fin & boom support

    /* not determinated */

    return {
      category: category.others
    }
  }

  return mixin
}

module.exports = factory
