'use strict'

const createAutodetection = require('../../identify/autodetection')
const identifiers = require('../../identify')
const createLogger = require('../../log')

function createExtractor (log, path) {
  const extractor = identifiers[path]
  return extractor(log)
}

function specificExtractor (opts) {
  const { path, log } = opts
  let loggerKeyword = log.keyword
  const extractorLogger = createLogger(`${loggerKeyword}_${path}_unidentify`)

  switch (path) {
    case 'sails':
      return createExtractor(extractorLogger, 'sail')
    case 'boards':
      return createExtractor(extractorLogger, 'board')
    case 'masts':
      return createExtractor(extractorLogger, 'mast')
    case 'booms':
      return createExtractor(extractorLogger, 'boom')
    case 'fins':
      return createExtractor(extractorLogger, 'fin')
    default:
      loggerKeyword = `${loggerKeyword}_${path}`
      return createAutodetection(loggerKeyword)
  }
}

module.exports = specificExtractor
