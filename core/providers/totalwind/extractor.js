'use strict'

const createPipeline = require('../../identify/create-pipeline')
const identifiers = require('../../identify')
const createLogger = require('../../log')
const { map } = require('lodash')

function identifierFactory (loggerKeyword) {
  function createIdentifier (categories) {
    return map(categories, function (category) {
      const factory = identifiers[category]
      const log = createLogger(`${loggerKeyword}_unidentify`)
      return factory(log)
    })
  }
  return createIdentifier
}

function specificExtractor (opts) {
  const { category, log } = opts
  const loggerKeyword = log.keyword
  const createIdentifier = identifierFactory(loggerKeyword)
  let identifiers

  switch (category) {
    case 'sails':
      identifiers = createIdentifier(['sail'])
      break
    case 'boards':
      identifiers = createIdentifier(['board'])
      break
    case 'accesories':
      identifiers = createIdentifier(['fin', 'mast'])
      break
    default:
      identifiers = createIdentifier(['sail', 'board', 'fin', 'mast'])
      break
  }

  return createPipeline(identifiers)
}

module.exports = specificExtractor
