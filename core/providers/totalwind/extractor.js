'use strict'

const createAutodetection = require('../../identify/create-autodetection')
const identifiers = require('../../identify')
const createLogger = require('../../log')

function createExtractor (log, path) {
  const extractor = identifiers[path]
  return extractor(log)
}

function specificExtractor (opts) {
  const { path, log } = opts
  const loggerKeyword = log.keyword
  const extractorLogger = createLogger(`${loggerKeyword}_unidentify`)

  switch (path) {
    case 'sails':
      return createExtractor(extractorLogger, 'sail')
    case 'boards':
      return createExtractor(extractorLogger, 'board')
    default:
      return createAutodetection(loggerKeyword)
  }
}

module.exports = specificExtractor
