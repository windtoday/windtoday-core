'use strict'

const boardFactory = require('../../../identify/board')
const mixinFactory = require('../../../identify/mixin')
const sailFactory = require('../../../identify/sail')
const createLogger = require('../../../log')

function specificExtractor (opts) {
  const { category, loggerKeyword } = opts

  if (category === 'sails') {
    return sailFactory(createLogger(`${loggerKeyword}_unidentify`))
  }

  if (category === 'boards') {
    return boardFactory(createLogger(`${loggerKeyword}_unidentify`))
  }

  if (category === 'formula') {
    return mixinFactory({
      sailLogger: createLogger(`${loggerKeyword}_mixin_unidentify`),
      boardLogger: createLogger(`${loggerKeyword}_mixin_unidentify`)
    })
  }

  throw new Error('Not extractor determined.')
}

module.exports = specificExtractor
