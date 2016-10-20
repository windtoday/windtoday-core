'use strict'

const boardFactory = require('../../../identify/board')
const sailFactory = require('../../../identify/sail')
const createLogger = require('../../../log')
const { noop } = require('lodash')

function specificExtractor (opts) {
  const { category, loggerKeyword } = opts

  if (category === 'sails') {
    return sailFactory(createLogger(`${loggerKeyword}_unidentify`))
  }

  if (category === 'boards') {
    return boardFactory(createLogger(`${loggerKeyword}_unidentify`))
  }

  return mixinFactory({
    sailLogger: createLogger(`${loggerKeyword}_mixin_unidentify`),
    boardLogger: createLogger(`${loggerKeyword}_mixin_unidentify`)
  })
}

module.exports = specificExtractor
