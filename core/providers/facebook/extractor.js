'use strict'

const createAutodetection = require('../../identify/autodetection')

function extractor (opts) {
  const { log } = opts
  const loggerKeyword = log.keyword
  return createAutodetection(loggerKeyword)
}

module.exports = extractor
