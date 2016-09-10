'use strict'

const sailFactory = require('../identify/sail')
const boardFactory = require('../identify/board')
const mixinFactory = require('../identify/mixin')
const createLogger = require('../log')

function getExtractor (opts) {
  const { provider, type, category } = opts
  const loggerKeyword = `${provider}_${type}_${category}`

  if (category === 'sails') {
    return sailFactory(createLogger(`${loggerKeyword}_sail`))
  }

  if (category === 'boards') {
    return boardFactory(createLogger(`${loggerKeyword}_board`))
  }

  if (category === 'formula') {
    return mixinFactory({
      sailLogger: createLogger(`${loggerKeyword}_sail`),
      boardLogger: createLogger(`${loggerKeyword}_board`)
    })
  }

  throw new Error('Not extractor determined.')
}

module.exports = getExtractor
