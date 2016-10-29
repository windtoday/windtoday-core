'use strict'

const createAutodetection = require('../../identify/create-autodetection')
const identifiers = require('../../identify')
const createLogger = require('../../log')

function createExtractor (log, category) {
  const extractor = identifiers[category]
  return extractor(log)
}

function specificExtractor (opts) {
  const { category, log } = opts
  const loggerKeyword = log.keyword
  const extractorLogger = createLogger(`${loggerKeyword}_unidentify`)

  switch (category) {
    case 'sails':
      return createExtractor(extractorLogger, 'sail')
    case 'boards':
      return createExtractor(extractorLogger, 'board')
    default:
      return createAutodetection(extractorLogger)
  }
}

module.exports = specificExtractor
